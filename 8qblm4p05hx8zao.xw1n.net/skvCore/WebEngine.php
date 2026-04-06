<?php
session_start();

header('Content-Type: text/xml');

define('RTP_TARGET', 96);

$reels = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
];

$paytable = [
    1 => [3 => 10, 4 => 30, 5 => 100],
    2 => [3 => 10, 4 => 30, 5 => 100],
    3 => [3 => 10, 4 => 30, 5 => 100],
    4 => [3 => 10, 4 => 30, 5 => 100],
    5 => [3 => 25, 4 => 75, 5 => 250],
    6 => [3 => 25, 4 => 75, 5 => 250],
    7 => [3 => 40, 4 => 100, 5 => 500],
    8 => [3 => 40, 4 => 100, 5 => 500],
    9 => [3 => 100, 4 => 200, 5 => 1000],
    10 => [3 => 0, 4 => 0, 5 => 0],
    11 => [3 => 5, 4 => 10, 5 => 50],
    12 => [3 => 2, 4 => 5, 5 => 20],
];

$lines = [
    [1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [2, 2, 2, 2, 2], [0, 1, 2, 1, 0], [2, 1, 0, 1, 2],
    [0, 0, 1, 0, 0], [2, 2, 1, 2, 2], [1, 0, 0, 0, 1], [1, 2, 2, 2, 1], [0, 1, 1, 1, 0],
    [2, 1, 1, 1, 2], [0, 2, 0, 2, 0], [2, 0, 2, 0, 2], [1, 0, 2, 0, 1], [1, 2, 0, 2, 1],
    [0, 2, 1, 2, 0], [2, 0, 1, 0, 2], [0, 1, 2, 2, 1], [2, 1, 0, 0, 1], [1, 0, 1, 2, 1],
];

if (!isset($_SESSION['balance'])) {
    $_SESSION['balance'] = 10000;
}
if (!isset($_SESSION['bonus_spins'])) {
    $_SESSION['bonus_spins'] = 0;
}
if (!isset($_SESSION['rtp_total_bet'])) {
    $_SESSION['rtp_total_bet'] = 0;
}
if (!isset($_SESSION['rtp_total_win'])) {
    $_SESSION['rtp_total_win'] = 0;
}

$command = $_GET['command'] ?? 'connect';

if ($command === 'connect') {
    echo '<server command="connect" session="123456789" rnd="987654321" status="ok">
        <system guidcreate="123456789"/>
        <extra>
            <stakeIncrement>1,2,5,10,20,50,100,200,500</stakeIncrement>
            <defaultBet>1</defaultBet>
        </extra>
        <source server-ver="1"/>
        <user currency-id="EUR" is_test="false" type="real" cash_type="real" gs_id="1" wlid="" wl_code_id="1"/>
        <user_new cash="' . $_SESSION['balance'] . '"/>
        <game name="energy_coins" bonus_spins="' . $_SESSION['bonus_spins'] . '"/>
        <rtp_total_bet>' . $_SESSION['rtp_total_bet'] . '</rtp_total_bet>
        <rtp_total_win>' . $_SESSION['rtp_total_win'] . '</rtp_total_win>
    </server>';
    exit;
}

if ($command === 'spin' || ($command === 'bonus_spin' && $_SESSION['bonus_spins'] > 0)) {
    $bet = isset($_GET['bet']) ? (int) $_GET['bet'] : 10;
    if ($command === 'spin' && $_SESSION['balance'] < $bet) {
        echo '<server status="error"><message>Not enough balance</message></server>';
        exit;
    }

    if ($command === 'spin') {
        $_SESSION['balance'] -= $bet;
    }
    if ($command === 'bonus_spin') {
        $_SESSION['bonus_spins']--;
    }

    $_SESSION['rtp_total_bet'] += $bet;

    $currentRtp = $_SESSION['rtp_total_bet'] > 0
        ? ($_SESSION['rtp_total_win'] / $_SESSION['rtp_total_bet']) * 100
        : 0;

    $rtpDiff = RTP_TARGET - $currentRtp;
    $winChance = 50 + ($rtpDiff * 2);
    $winChance = max(5, min(95, $winChance));

    $isWin = mt_rand(1, 100) <= $winChance;

    $window = [];
    for ($r = 0; $r < 5; $r++) {
        shuffle($reels[$r]);
        $window[$r] = array_slice($reels[$r], 0, 3);
    }

    $totalWin = 0;
    $winLines = [];
    foreach ($lines as $lineIdx => $line) {
        $symbols = [];
        for ($r = 0; $r < 5; $r++) {
            $symbols[] = $window[$r][$line[$r]];
        }

        $first = $symbols[0];
        $count = 1;
        for ($i = 1; $i < 5; $i++) {
            if ($symbols[$i] === $first || $symbols[$i] === 9) {
                $count++;
            } else {
                break;
            }
        }

        if (isset($paytable[$first][$count]) && $count >= 3) {
            $win = $paytable[$first][$count] * $bet;
            if (!$isWin) {
                $win = 0;
            }
            $totalWin += $win;

            if ($win > 0) {
                $winLines[] = [
                    'line' => $lineIdx + 1,
                    'symbol' => $first,
                    'count' => $count,
                    'amount' => $win,
                ];
            }
        }
    }

    $bonusCount = 0;
    foreach ($window as $reel) {
        foreach ($reel as $symbol) {
            if ($symbol === 10) {
                $bonusCount++;
            }
        }
    }

    $bonusAwarded = false;
    if ($bonusCount >= 3 && $isWin) {
        $_SESSION['bonus_spins'] += 5;
        $bonusAwarded = true;
    }

    $_SESSION['balance'] += $totalWin;
    $_SESSION['rtp_total_win'] += $totalWin;

    $windowXml = '';
    for ($r = 0; $r < 5; $r++) {
        $windowXml .= '<reel' . ($r + 1) . '>' . implode(',', $window[$r]) . '</reel' . ($r + 1) . '>';
    }

    $winsXml = '';
    foreach ($winLines as $winLine) {
        $winsXml .= '<win line="' . $winLine['line'] . '" symbol="' . $winLine['symbol'] . '" count="' . $winLine['count'] . '" amount="' . $winLine['amount'] . '"/>';
    }

    echo '<server command="' . $command . '" session="123456789" rnd="' . rand(100000, 999999) . '" status="ok">
        <spin_cmd command="bet" session="123456789" rnd="' . rand(100000, 999999) . '" status="ok">
            <window>' . $windowXml . '</window>
            <wins>' . $winsXml . '</wins>
            <game usercash="' . $_SESSION['balance'] . '" line-bet="' . $bet . '" cash-bet="' . $bet . '" cash-win="' . $totalWin . '" bonus_spins="' . $_SESSION['bonus_spins'] . '"/>
            <user_new cash="' . $_SESSION['balance'] . '"/>
            ' . ($bonusAwarded ? '<bonus_spins_awarded count="5"/>' : '') . '
            <rtp_used>' . RTP_TARGET . '</rtp_used>
            <rtp_current>' . round($currentRtp, 2) . '</rtp_current>
            <rtp_total_bet>' . $_SESSION['rtp_total_bet'] . '</rtp_total_bet>
            <rtp_total_win>' . $_SESSION['rtp_total_win'] . '</rtp_total_win>
        </spin_cmd>
    </server>';
    exit;
}

echo '<server status="error"><message>Unknown command</message></server>';
