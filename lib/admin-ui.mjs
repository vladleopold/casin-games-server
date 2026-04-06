function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderLoginActions(authConfig) {
  const actions = [];

  if (authConfig.googleConfigured) {
    actions.push('<a class="button primary" href="/admin/auth/google/start">Sign in with Google</a>');
  }

  if (authConfig.devAuthConfigured) {
    actions.push('<a class="button secondary" href="/admin/auth/dev">Dev Sign-In</a>');
  }

  if (actions.length === 0) {
    actions.push(`
      <div class="notice warning">
        Google OAuth is not configured yet. Set <code>ADMIN_GOOGLE_CLIENT_ID</code> and <code>ADMIN_GOOGLE_CLIENT_SECRET</code>.
      </div>
    `);
  }

  return actions.join("\n");
}

export function renderAdminPage({ authConfig, currentUser, csrfToken, publicOrigin }) {
  const title = currentUser ? "backoficce" : "backoficce sign-in";
  const loginView = !currentUser;
  const currentUserJson = JSON.stringify(currentUser ?? null);
  const authConfigJson = JSON.stringify(authConfig ?? {});
  const csrfTokenJson = JSON.stringify(csrfToken ?? "");
  const publicOriginJson = JSON.stringify(publicOrigin ?? "");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #0c1015;
        --bg-2: #101722;
        --bg-3: #151e2b;
        --panel: rgba(18, 24, 34, 0.94);
        --panel-2: rgba(11, 16, 24, 0.92);
        --line: rgba(255, 255, 255, 0.08);
        --line-strong: rgba(255, 255, 255, 0.16);
        --text: #f4f7fb;
        --muted: #94a3b8;
        --accent: #39c16f;
        --accent-2: #228a59;
        --danger: #ff7b7b;
        --warning: #f6c15f;
        --blue: #5aa2ff;
        --shadow: 0 28px 90px rgba(0, 0, 0, 0.42);
        --radius: 24px;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        font-family: "SF Pro Display", "Segoe UI", sans-serif;
        background:
          radial-gradient(circle at top left, rgba(57, 193, 111, 0.14), transparent 28%),
          radial-gradient(circle at top right, rgba(90, 162, 255, 0.1), transparent 26%),
          linear-gradient(180deg, #0b1016 0%, #090d12 100%);
        color: var(--text);
      }

      .shell {
        width: min(1480px, calc(100vw - 32px));
        margin: 16px auto;
      }

      .card {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        backdrop-filter: blur(18px);
      }

      .hero {
        padding: 36px;
      }

      .login-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
        gap: 22px;
      }

      .dashboard {
        display: grid;
        gap: 22px;
      }

      .masthead {
        display: grid;
        gap: 18px;
      }

      .topbar {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
      }

      .brand {
        display: grid;
        gap: 8px;
      }

      h1,
      h2,
      h3,
      p {
        margin: 0;
      }

      h1 {
        font-size: clamp(34px, 5vw, 66px);
        line-height: 0.95;
        letter-spacing: -0.04em;
      }

      h2 {
        font-size: 26px;
        line-height: 1;
      }

      h3 {
        font-size: 15px;
        line-height: 1.1;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--muted);
      }

      p,
      small,
      .muted {
        color: var(--muted);
      }

      .actions,
      .toolbar,
      .row-actions,
      .nav-cluster {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      }

      .toolbar {
        justify-content: flex-end;
      }

      .switch {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--line);
      }

      .button,
      button {
        appearance: none;
        border: none;
        border-radius: 14px;
        padding: 12px 16px;
        font: inherit;
        font-weight: 700;
        text-decoration: none;
        cursor: pointer;
        color: white;
        transition: transform 120ms ease, opacity 120ms ease, background 120ms ease, border-color 120ms ease;
      }

      .button:hover,
      button:hover {
        transform: translateY(-1px);
      }

      .button.primary,
      button.primary {
        background: linear-gradient(135deg, var(--accent), var(--accent-2));
      }

      .button.secondary,
      button.secondary,
      button.ghost {
        background: rgba(255, 255, 255, 0.06);
        color: var(--text);
        border: 1px solid var(--line);
      }

      .switch button {
        background: transparent;
        color: var(--muted);
        border: 1px solid transparent;
      }

      .switch button.active {
        color: white;
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.12);
      }

      button.danger {
        background: rgba(255, 123, 123, 0.12);
        color: #ffdcdc;
        border: 1px solid rgba(255, 123, 123, 0.28);
      }

      .summary-grid,
      .login-badges,
      .player-metrics,
      .game-metrics,
      .mini-grid,
      .field-grid,
      .tables-grid,
      .settings-grid {
        display: grid;
        gap: 16px;
      }

      .summary-grid,
      .player-metrics,
      .game-metrics {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .login-badges,
      .settings-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .mini-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .field-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .tables-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .metric,
      .panel,
      .badge,
      .list-item,
      .notice {
        background: var(--panel-2);
        border: 1px solid var(--line);
        border-radius: 20px;
      }

      .metric,
      .badge {
        padding: 18px 20px;
      }

      .metric strong,
      .badge strong {
        display: block;
        margin-top: 10px;
        font-size: clamp(22px, 2vw, 36px);
        line-height: 1;
        letter-spacing: -0.03em;
      }

      .panel {
        padding: 22px;
      }

      .workspace {
        display: grid;
        grid-template-columns: minmax(320px, 380px) minmax(0, 1fr);
        gap: 18px;
        align-items: start;
      }

      .rail,
      .detail {
        display: grid;
        gap: 18px;
      }

      .stack {
        display: grid;
        gap: 12px;
      }

      .list-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .list-items {
        display: grid;
        gap: 10px;
      }

      .list-item {
        padding: 16px;
        display: grid;
        gap: 8px;
        cursor: pointer;
        transition: border-color 120ms ease, background 120ms ease, transform 120ms ease;
      }

      .list-item:hover {
        transform: translateY(-1px);
        border-color: var(--line-strong);
      }

      .list-item.active {
        border-color: rgba(57, 193, 111, 0.45);
        background: linear-gradient(180deg, rgba(57, 193, 111, 0.12), rgba(57, 193, 111, 0.04));
      }

      .pill-row {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }

      .pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 12px;
        color: var(--muted);
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.06);
      }

      .pill.role-low {
        color: #d7f1e3;
        background: rgba(57, 193, 111, 0.1);
      }

      .pill.role-middle {
        color: #d5e3ff;
        background: rgba(90, 162, 255, 0.12);
      }

      .pill.role-high {
        color: #ffe5b8;
        background: rgba(246, 193, 95, 0.12);
      }

      .avatar {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.08);
        font-weight: 700;
      }

      .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .user {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .notice {
        padding: 14px 16px;
      }

      .notice.warning {
        border-color: rgba(246, 193, 95, 0.25);
        color: #ffdf9d;
        background: rgba(246, 193, 95, 0.08);
      }

      .notice.error {
        border-color: rgba(255, 123, 123, 0.28);
        color: #ffd7d7;
        background: rgba(255, 123, 123, 0.08);
      }

      .notice.success {
        border-color: rgba(57, 193, 111, 0.25);
        color: #cff6de;
        background: rgba(57, 193, 111, 0.1);
      }

      form {
        display: grid;
        gap: 14px;
      }

      label {
        display: grid;
        gap: 8px;
        font-size: 13px;
        color: var(--muted);
      }

      input,
      select,
      textarea {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.04);
        color: var(--text);
        padding: 12px 14px;
        font: inherit;
        resize: vertical;
      }

      input:focus,
      select:focus,
      textarea:focus {
        outline: 2px solid rgba(57, 193, 111, 0.35);
        border-color: rgba(57, 193, 111, 0.55);
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
        text-align: left;
        padding: 12px 10px;
        border-bottom: 1px solid var(--line);
        vertical-align: top;
        font-size: 14px;
      }

      th {
        color: var(--muted);
        font-weight: 600;
      }

      tr:last-child td {
        border-bottom: none;
      }

      .table-wrap {
        overflow-x: auto;
      }

      .section-copy {
        max-width: 720px;
        font-size: 15px;
      }

      .empty {
        padding: 18px;
        border-radius: 18px;
        border: 1px dashed var(--line);
        color: var(--muted);
      }

      code {
        font-family: "SF Mono", "JetBrains Mono", monospace;
        font-size: 12px;
      }

      @media (max-width: 1180px) {
        .workspace {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 960px) {
        .summary-grid,
        .player-metrics,
        .game-metrics,
        .mini-grid,
        .login-badges,
        .field-grid,
        .tables-grid,
        .settings-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 720px) {
        .shell {
          width: min(100vw - 18px, 100%);
          margin: 9px auto;
        }

        .hero {
          padding: 22px;
        }

        .login-grid,
        .summary-grid,
        .player-metrics,
        .game-metrics,
        .mini-grid,
        .login-badges,
        .field-grid,
        .tables-grid,
        .settings-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <section class="card hero">
        ${loginView ? renderLoginView(authConfig, publicOrigin) : renderDashboardShell(currentUser)}
      </section>
    </main>
    ${loginView ? "" : renderDashboardScript(currentUserJson, authConfigJson, csrfTokenJson, publicOriginJson)}
  </body>
</html>`;
}

function renderLoginView(authConfig, publicOrigin) {
  const domainLine = authConfig.allowedDomain
    ? `<div class="badge"><small>Allowed domain</small><strong>${escapeHtml(authConfig.allowedDomain)}</strong></div>`
    : `<div class="badge"><small>Allowed domain</small><strong>Any authenticated Google account</strong></div>`;

  const emailLine = authConfig.allowedEmails?.length
    ? `<div class="badge"><small>Allowed emails</small><strong>${escapeHtml(authConfig.allowedEmails.join(", "))}</strong></div>`
    : `<div class="badge"><small>Allowed emails</small><strong>Configured in server env if needed</strong></div>`;

  return `
    <div class="login-grid">
      <div class="stack">
        <div class="brand">
          <h1>backoficce</h1>
          <p class="section-copy">Players, games, roles, RTP policy, balance connectors, and product settings for the local slot server.</p>
        </div>
        <div class="actions">
          ${renderLoginActions(authConfig)}
        </div>
        <div class="notice">
          <strong>Callback origin</strong><br />
          <span class="muted">${escapeHtml(publicOrigin || "Derived from current request host")}</span>
        </div>
      </div>
      <div class="login-badges">
        <div class="badge"><small>Google OAuth</small><strong>${authConfig.googleConfigured ? "Configured" : "Missing env"}</strong></div>
        <div class="badge"><small>Dev login</small><strong>${authConfig.devAuthConfigured ? "Enabled" : "Disabled"}</strong></div>
        ${domainLine}
        ${emailLine}
      </div>
    </div>
  `;
}

function renderDashboardShell(currentUser) {
  const picture = currentUser?.picture
    ? `<img src="${escapeHtml(currentUser.picture)}" alt="" />`
    : escapeHtml(String(currentUser?.name ?? currentUser?.email ?? "A").slice(0, 1).toUpperCase());

  return `
    <div class="dashboard">
      <header class="masthead">
        <div class="topbar">
          <div class="brand">
            <h1>backoficce</h1>
            <p class="section-copy">Two main branches: players and games. User analytics stays on the player side; RTP and feature policy stays on the game side.</p>
          </div>
          <div class="toolbar">
            <div class="switch" id="primary-nav">
              <button type="button" class="active" data-view="players">Players</button>
              <button type="button" data-view="games">Games</button>
            </div>
            <button type="button" class="ghost" data-view="settings">Server Settings</button>
            <div class="user">
              <div class="avatar">${picture}</div>
              <div>
                <strong>${escapeHtml(currentUser?.name ?? currentUser?.email ?? "Admin")}</strong><br />
                <span class="muted">${escapeHtml(currentUser?.email ?? "")}</span>
              </div>
              <a class="button secondary" href="/admin/logout">Logout</a>
            </div>
          </div>
        </div>
      </header>

      <div id="admin-flash"></div>
      <div class="summary-grid" id="admin-summary"></div>

      <div class="workspace">
        <aside class="rail" id="admin-rail"></aside>
        <section class="detail" id="admin-detail"></section>
      </div>
    </div>
  `;
}

function renderDashboardScript(currentUserJson, authConfigJson, csrfTokenJson, publicOriginJson) {
  return `
    <script>
      const CURRENT_USER = ${currentUserJson};
      const AUTH_CONFIG = ${authConfigJson};
      const CSRF_TOKEN = ${csrfTokenJson};
      const PUBLIC_ORIGIN = ${publicOriginJson};

      const state = {
        currentView: 'players',
        games: null,
        gameDetail: null,
        gameQuery: '',
        playerDetail: null,
        playerQuery: '',
        players: null,
        selectedGameId: null,
        selectedPlayerId: null,
        settings: null,
      };

      const flashNode = document.getElementById('admin-flash');
      const summaryNode = document.getElementById('admin-summary');
      const railNode = document.getElementById('admin-rail');
      const detailNode = document.getElementById('admin-detail');
      const navNode = document.getElementById('primary-nav');

      function escapeHtml(value) {
        return String(value ?? '')
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')
          .replaceAll('"', '&quot;')
          .replaceAll("'", '&#39;');
      }

      function formatBooleanChoice(value) {
        if (value === true) return 'Enabled';
        if (value === false) return 'Disabled';
        return 'Default';
      }

      function showFlash(type, message) {
        flashNode.innerHTML = '<div class="notice ' + type + '">' + escapeHtml(message) + '</div>';
      }

      function clearFlash() {
        flashNode.innerHTML = '';
      }

      async function api(path, options = {}) {
        const request = { ...options };
        request.headers = {
          Accept: 'application/json',
          ...(request.headers || {}),
        };
        if (request.body && typeof request.body !== 'string') {
          request.headers['Content-Type'] = 'application/json';
          request.body = JSON.stringify(request.body);
        }
        if (request.method && request.method !== 'GET' && request.method !== 'HEAD') {
          request.headers['X-Admin-Csrf-Token'] = CSRF_TOKEN;
        }

        const response = await fetch(path, request);
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(payload.error || payload.message || ('Request failed: ' + response.status));
        }
        return payload;
      }

      function buildSummaryCards() {
        const playerAnalytics = state.players?.analytics || { players: 0 };
        const gameAnalytics = state.games?.analytics || { games: 0 };
        const settingsSummary = state.settings?.summary || {};
        const activeSessions = (state.players?.players || []).reduce((sum, player) => sum + (player.activeSessions || 0), 0);
        return [
          { label: 'Players', value: String(playerAnalytics.players || 0) },
          { label: 'Games', value: String(gameAnalytics.games || 0) },
          { label: 'Active Sessions', value: String(activeSessions) },
          { label: 'Money Server', value: settingsSummary.moneyServerConfigured ? 'Configured' : 'Local' },
          { label: 'Users DB', value: settingsSummary.usersDbConfigured ? 'Configured' : 'Local' },
          { label: 'Roles', value: 'low / middle / high' },
        ];
      }

      function renderSummary() {
        const cards = buildSummaryCards();
        summaryNode.innerHTML = cards.map((card) => (
          '<div class="metric"><small>' + escapeHtml(card.label) + '</small><strong>' + escapeHtml(card.value) + '</strong></div>'
        )).join('');
      }

      function renderPlayerList() {
        const payload = state.players;
        if (!payload) {
          railNode.innerHTML = '<div class="panel"><div class="empty">Loading players…</div></div>';
          return;
        }

        const players = payload.players || [];
        const analytics = payload.analytics || {};
        railNode.innerHTML = ''
          + '<div class="panel stack">'
          +   '<div class="list-header"><div><h2>Players</h2><p class="muted">Search users, inspect roles, balance, RTP, games, and sessions.</p></div><button class="ghost" type="button" data-refresh="players">Refresh</button></div>'
          +   '<form id="player-search-form">'
          +     '<label>Search players<input name="query" value="' + escapeHtml(state.playerQuery) + '" placeholder="player id, email, name" autocomplete="off" /></label>'
          +     '<div class="row-actions"><button class="primary" type="submit">Search</button><button class="ghost" type="button" data-clear-search="players">Clear</button></div>'
          +   '</form>'
          +   '<div class="mini-grid">'
          +     '<div class="badge"><small>Low</small><strong>' + escapeHtml(String(analytics.byRole?.low || 0)) + '</strong></div>'
          +     '<div class="badge"><small>Middle</small><strong>' + escapeHtml(String(analytics.byRole?.middle || 0)) + '</strong></div>'
          +     '<div class="badge"><small>High</small><strong>' + escapeHtml(String(analytics.byRole?.high || 0)) + '</strong></div>'
          +   '</div>'
          +   (analytics.usersDbError ? '<div class="notice warning">' + escapeHtml(analytics.usersDbError) + '</div>' : '')
          +   '<div class="list-items">'
          +     (players.length
            ? players.map((player) => (
              '<button class="list-item ' + (player.playerId === state.selectedPlayerId ? 'active' : '') + '" type="button" data-player-id="' + escapeHtml(player.playerId) + '">'
              + '<div class="list-header"><strong>' + escapeHtml(player.displayName || player.playerId) + '</strong><span class="pill role-' + escapeHtml(player.role) + '">' + escapeHtml(player.role) + '</span></div>'
              + '<div class="muted">' + escapeHtml(player.email || player.playerId) + '</div>'
              + '<div class="pill-row"><span class="pill">' + escapeHtml(player.balanceDisplay) + '</span><span class="pill">' + escapeHtml(player.userRtpDisplay) + '</span><span class="pill">' + escapeHtml(String(player.activeSessions)) + ' sessions</span></div>'
              + '</button>'
            )).join('')
            : '<div class="empty">No players found for this query.</div>')
          +   '</div>'
          + '</div>';
      }

      function renderGamesList() {
        const payload = state.games;
        if (!payload) {
          railNode.innerHTML = '<div class="panel"><div class="empty">Loading games…</div></div>';
          return;
        }

        const games = payload.games || [];
        const analytics = payload.analytics || {};
        railNode.innerHTML = ''
          + '<div class="panel stack">'
          +   '<div class="list-header"><div><h2>Games</h2><p class="muted">Connected games, current analytics, RTP policy, and feature control.</p></div><button class="ghost" type="button" data-refresh="games">Refresh</button></div>'
          +   '<form id="game-search-form">'
          +     '<label>Search games<input name="query" value="' + escapeHtml(state.gameQuery) + '" placeholder="game name, provider, id" autocomplete="off" /></label>'
          +     '<div class="row-actions"><button class="primary" type="submit">Search</button><button class="ghost" type="button" data-clear-search="games">Clear</button></div>'
          +   '</form>'
          +   '<div class="mini-grid">'
          +     '<div class="badge"><small>Games</small><strong>' + escapeHtml(String(analytics.games || 0)) + '</strong></div>'
          +     '<div class="badge"><small>Providers</small><strong>' + escapeHtml(String(analytics.providers || 0)) + '</strong></div>'
          +     '<div class="badge"><small>Active Games</small><strong>' + escapeHtml(String(analytics.activeGames || 0)) + '</strong></div>'
          +   '</div>'
          +   '<div class="list-items">'
          +     (games.length
            ? games.map((game) => (
              '<button class="list-item ' + (game.gameId === state.selectedGameId ? 'active' : '') + '" type="button" data-game-id="' + escapeHtml(game.gameId) + '">'
              + '<div class="list-header"><strong>' + escapeHtml(game.name) + '</strong><span class="pill">' + escapeHtml(game.provider) + '</span></div>'
              + '<div class="muted">' + escapeHtml(game.gameId) + '</div>'
              + '<div class="pill-row"><span class="pill">' + escapeHtml(String(game.activePlayers)) + ' players</span><span class="pill">' + escapeHtml(game.realizedRtpDisplay) + '</span><span class="pill">' + escapeHtml(game.mode) + '</span></div>'
              + '</button>'
            )).join('')
            : '<div class="empty">No games found for this query.</div>')
          +   '</div>'
          + '</div>';
      }

      function renderSettingsRail() {
        const moneyServer = state.settings?.integrations?.moneyServer || {};
        const usersDb = state.settings?.integrations?.usersDb || {};
        railNode.innerHTML = ''
          + '<div class="panel stack">'
          +   '<div><h2>Server Settings</h2><p class="muted">Integration points for external balance and the user database.</p></div>'
          +   '<div class="badge"><small>Money Server</small><strong>' + escapeHtml(moneyServer.enabled ? 'Enabled' : 'Disabled') + '</strong></div>'
          +   '<div class="badge"><small>Users DB</small><strong>' + escapeHtml(usersDb.enabled ? 'Enabled' : 'Disabled') + '</strong></div>'
          +   '<div class="notice">Keep only two main branches in the product UI: <strong>Players</strong> and <strong>Games</strong>. Settings stays secondary.</div>'
          + '</div>';
      }

      function renderPlayersDetail() {
        const detail = state.playerDetail;
        if (!detail) {
          detailNode.innerHTML = '<div class="panel"><div class="empty">Select a player to see analytics, role, balance, game stats, and sessions.</div></div>';
          return;
        }

        const player = detail.player || {};
        const metrics = detail.metrics || [];
        const games = detail.games || [];
        const sessions = detail.sessions || [];
        detailNode.innerHTML = ''
          + '<div class="panel stack">'
          +   '<div class="list-header"><div><h2>' + escapeHtml(player.displayName || player.playerId) + '</h2><p class="muted">' + escapeHtml(player.email || player.playerId) + '</p></div><div class="pill-row"><span class="pill role-' + escapeHtml(player.role) + '">' + escapeHtml(player.role) + '</span><span class="pill">' + escapeHtml(player.source || 'local-runtime') + '</span></div></div>'
          +   (player.balanceError ? '<div class="notice warning">' + escapeHtml(player.balanceError) + '</div>' : '')
          +   '<div class="player-metrics">'
          +     metrics.map((metric) => (
                '<div class="metric"><small>' + escapeHtml(metric.label) + '</small><strong>' + escapeHtml(metric.value) + '</strong></div>'
              )).join('')
          +   '</div>'
          + '</div>'
          + '<div class="settings-grid">'
          +   '<section class="panel stack">'
          +     '<div><h3>Player Role</h3><p class="muted">Roles drive player-specific limits and RTP policy by game.</p></div>'
          +     '<form id="player-role-form">'
          +       '<input type="hidden" name="playerId" value="' + escapeHtml(player.playerId) + '" />'
          +       '<label>Role<select name="role">'
          +         '<option value="low"' + (player.role === 'low' ? ' selected' : '') + '>low</option>'
          +         '<option value="middle"' + (player.role === 'middle' ? ' selected' : '') + '>middle</option>'
          +         '<option value="high"' + (player.role === 'high' ? ' selected' : '') + '>high</option>'
          +       '</select></label>'
          +       '<button class="primary" type="submit">Save role</button>'
          +     '</form>'
          +   '</section>'
          +   '<section class="panel stack">'
          +     '<div><h3>Balance</h3><p class="muted">Set, deposit, or withdraw for the selected player. If the money server is configured, the action goes there first.</p></div>'
          +     '<form id="player-balance-form">'
          +       '<input type="hidden" name="playerId" value="' + escapeHtml(player.playerId) + '" />'
          +       '<div class="field-grid">'
          +         '<label>Action<select name="balanceAction"><option value="set">Set exact balance</option><option value="deposit">Deposit</option><option value="withdraw">Withdraw</option></select></label>'
          +         '<label>Currency<input name="currency" value="' + escapeHtml(player.currency || 'USD') + '" /></label>'
          +       '</div>'
          +       '<label>Amount<input name="amount" type="number" min="0" step="0.01" placeholder="100.00" required /></label>'
          +       '<button class="primary" type="submit">Apply balance update</button>'
          +     '</form>'
          +   '</section>'
          + '</div>'
          + '<div class="tables-grid">'
          +   '<section class="panel stack">'
          +     '<div><h3>Games</h3><p class="muted">Expanded game analytics for this player.</p></div>'
          +     renderTable(
                  ['Game', 'Sessions', 'Bet', 'Win', 'User RTP', 'Updated'],
                  games.map((game) => [
                    escapeHtml(game.name),
                    escapeHtml(String(game.activeSessions)),
                    escapeHtml(game.totalBetDisplay),
                    escapeHtml(game.totalWinDisplay),
                    escapeHtml(game.userRtpDisplay),
                    escapeHtml(game.lastActiveLabel),
                  ]),
                  'No game stats for this player yet.'
                )
          +   '</section>'
          +   '<section class="panel stack">'
          +     '<div><h3>Sessions</h3><p class="muted">Current session state and recent balance context.</p></div>'
          +     renderTable(
                  ['Session', 'Game', 'Balance', 'Bet', 'Win', 'Mode', 'Updated'],
                  sessions.map((session) => [
                    '<code>' + escapeHtml(session.sessionId) + '</code>',
                    escapeHtml(session.gameId),
                    escapeHtml(session.balanceDisplay),
                    escapeHtml(session.totalBetDisplay),
                    escapeHtml(session.totalWinDisplay),
                    escapeHtml(session.mode),
                    escapeHtml(session.updatedAtLabel),
                  ]),
                  'No active sessions for this player.'
                )
          +   '</section>'
          + '</div>';
      }

      function renderGamesDetail() {
        const detail = state.gameDetail;
        if (!detail) {
          detailNode.innerHTML = '<div class="panel"><div class="empty">Select a game to see analytics and policy settings.</div></div>';
          return;
        }

        const game = detail.game || {};
        const metrics = detail.metrics || [];
        const roleAnalytics = detail.roleAnalytics || {};
        const settings = detail.settings || {};
        const sessions = detail.sessions || [];
        detailNode.innerHTML = ''
          + '<div class="panel stack">'
          +   '<div class="list-header"><div><h2>' + escapeHtml(game.name) + '</h2><p class="muted">' + escapeHtml(game.gameId) + ' · ' + escapeHtml(game.provider) + ' · ' + escapeHtml(game.source) + '</p></div><div class="pill-row"><span class="pill">' + escapeHtml(game.mode) + '</span><span class="pill">' + escapeHtml(game.realizedRtpDisplay) + '</span></div></div>'
          +   '<div class="game-metrics">'
          +     metrics.map((metric) => (
                '<div class="metric"><small>' + escapeHtml(metric.label) + '</small><strong>' + escapeHtml(metric.value) + '</strong></div>'
              )).join('')
          +   '</div>'
          + '</div>'
          + '<div class="settings-grid">'
          +   '<section class="panel stack">'
          +     '<div><h3>Game Policy</h3><p class="muted">Overall RTP, role RTP, bonus, freespins, jackpot amounts, and localization defaults.</p></div>'
          +     '<form id="game-settings-form">'
          +       '<input type="hidden" name="gameId" value="' + escapeHtml(game.gameId) + '" />'
          +       '<div class="field-grid">'
          +         '<label>Overall RTP<input name="overallRtp" type="number" min="0" max="1" step="0.01" value="' + escapeHtml(settings.overallRtp ?? '') + '" placeholder="0.10" /></label>'
          +         '<label>Default locale<input name="defaultLocale" value="' + escapeHtml(settings.defaultLocale || '') + '" placeholder="en / uk / ru" /></label>'
          +       '</div>'
          +       '<div class="field-grid">'
          +         '<label>Low role RTP<input name="roleRtpLow" type="number" min="0" max="1" step="0.01" value="' + escapeHtml(settings.roleRtp?.low ?? '') + '" placeholder="0.10" /></label>'
          +         '<label>Middle role RTP<input name="roleRtpMiddle" type="number" min="0" max="1" step="0.01" value="' + escapeHtml(settings.roleRtp?.middle ?? '') + '" placeholder="0.10" /></label>'
          +       '</div>'
          +       '<div class="field-grid">'
          +         '<label>High role RTP<input name="roleRtpHigh" type="number" min="0" max="1" step="0.01" value="' + escapeHtml(settings.roleRtp?.high ?? '') + '" placeholder="0.10" /></label>'
          +         '<label>Supported locales<input name="supportedLocales" value="' + escapeHtml((settings.supportedLocales || []).join(', ')) + '" placeholder="en, uk, ru" /></label>'
          +       '</div>'
          +       '<div class="field-grid">'
          +         '<label>Bonus<select name="bonusEnabled">' + renderBooleanOptions(settings.bonusEnabled) + '</select></label>'
          +         '<label>Freespins<select name="freespinsEnabled">' + renderBooleanOptions(settings.freespinsEnabled) + '</select></label>'
          +       '</div>'
          +       '<div class="field-grid">'
          +         '<label>Grand jackpot<input name="jackpotGrand" type="number" min="0" step="0.01" value="' + escapeHtml(editableMoney(settings.jackpotGrand)) + '" placeholder="2500.00" /></label>'
          +         '<label>Major jackpot<input name="jackpotMajor" type="number" min="0" step="0.01" value="' + escapeHtml(editableMoney(settings.jackpotMajor)) + '" placeholder="375.00" /></label>'
          +       '</div>'
          +       '<label>Mini jackpot<input name="jackpotMini" type="number" min="0" step="0.01" value="' + escapeHtml(editableMoney(settings.jackpotMini)) + '" placeholder="75.00" /></label>'
          +       '<button class="primary" type="submit">Save game settings</button>'
          +     '</form>'
          +   '</section>'
          +   '<section class="panel stack">'
          +     '<div><h3>Role Split</h3><p class="muted">Current player role coverage inside this game.</p></div>'
          +     '<div class="mini-grid">'
          +       '<div class="badge"><small>low</small><strong>' + escapeHtml(String(roleAnalytics.low || 0)) + '</strong></div>'
          +       '<div class="badge"><small>middle</small><strong>' + escapeHtml(String(roleAnalytics.middle || 0)) + '</strong></div>'
          +       '<div class="badge"><small>high</small><strong>' + escapeHtml(String(roleAnalytics.high || 0)) + '</strong></div>'
          +     '</div>'
          +     '<div class="notice">These settings are persistent in server runtime and survive restart.</div>'
          +   '</section>'
          + '</div>'
          + '<section class="panel stack">'
          +   '<div><h3>Sessions</h3><p class="muted">Current player sessions and balance context for this game.</p></div>'
          +   renderTable(
                ['Player', 'Role', 'Balance', 'Bet', 'Win', 'Updated'],
                sessions.map((session) => [
                  escapeHtml(session.playerId || 'unknown'),
                  escapeHtml(session.role),
                  escapeHtml(session.balanceDisplay),
                  escapeHtml(session.totalBetDisplay),
                  escapeHtml(session.totalWinDisplay),
                  escapeHtml(session.updatedAtLabel),
                ]),
                'No active sessions for this game.'
              )
          + '</section>';
      }

      function renderSettingsDetail() {
        const settings = state.settings?.integrations || {};
        const moneyServer = settings.moneyServer || {};
        const usersDb = settings.usersDb || {};
        detailNode.innerHTML = ''
          + '<div class="panel stack">'
          +   '<div><h2>Server Settings</h2><p class="muted">Configure the external money server and PostgreSQL users database. This is the integration layer for players and balances.</p></div>'
          + '</div>'
          + '<div class="settings-grid">'
          +   '<section class="panel stack">'
          +     '<div><h3>Money Server</h3><p class="muted">Render-ready connector for balance read/write.</p></div>'
          +     '<form id="money-server-form">'
          +       '<div class="field-grid">'
          +         '<label>Enabled<select name="enabled"><option value="true"' + (moneyServer.enabled ? ' selected' : '') + '>Enabled</option><option value="false"' + (!moneyServer.enabled ? ' selected' : '') + '>Disabled</option></select></label>'
          +         '<label>Balance unit<select name="balanceUnit"><option value="minor"' + (moneyServer.balanceUnit === 'minor' ? ' selected' : '') + '>minor</option><option value="major"' + (moneyServer.balanceUnit === 'major' ? ' selected' : '') + '>major</option></select></label>'
          +       '</div>'
          +       '<label>Base URL<input name="baseUrl" value="' + escapeHtml(moneyServer.baseUrl || '') + '" placeholder="https://your-wallet-service.onrender.com" /></label>'
          +       '<div class="field-grid">'
          +         '<label>Read path template<input name="readPathTemplate" value="' + escapeHtml(moneyServer.readPathTemplate || '') + '" placeholder="/wallets/{playerId}" /></label>'
          +         '<label>Write path template<input name="writePathTemplate" value="' + escapeHtml(moneyServer.writePathTemplate || '') + '" placeholder="/wallets/{playerId}/balance" /></label>'
          +       '</div>'
          +       '<div class="field-grid">'
          +         '<label>Auth header<input name="authHeaderName" value="' + escapeHtml(moneyServer.authHeaderName || 'Authorization') + '" /></label>'
          +         '<label>Auth scheme<input name="authScheme" value="' + escapeHtml(moneyServer.authScheme || 'Bearer') + '" /></label>'
          +       '</div>'
          +       '<label>API key<input name="apiKey" value="' + escapeHtml(moneyServer.apiKey || '') + '" placeholder="secret token" autocomplete="off" /></label>'
          +       '<button class="primary" type="submit">Save money server</button>'
          +     '</form>'
          +   '</section>'
          +   '<section class="panel stack">'
          +     '<div><h3>Users PostgreSQL</h3><p class="muted">Player list and search can read directly from the site user database.</p></div>'
          +     '<form id="users-db-form">'
          +       '<div class="field-grid">'
          +         '<label>Enabled<select name="enabled"><option value="true"' + (usersDb.enabled ? ' selected' : '') + '>Enabled</option><option value="false"' + (!usersDb.enabled ? ' selected' : '') + '>Disabled</option></select></label>'
          +         '<label>Row limit<input name="limit" type="number" min="1" step="1" value="' + escapeHtml(String(usersDb.limit || 50)) + '" /></label>'
          +       '</div>'
          +       '<label>Connection string<textarea name="connectionString" rows="3" placeholder="postgres://...">' + escapeHtml(usersDb.connectionString || '') + '</textarea></label>'
          +       '<div class="field-grid">'
          +         '<label>Schema<input name="schema" value="' + escapeHtml(usersDb.schema || 'public') + '" /></label>'
          +         '<label>Users table<input name="usersTable" value="' + escapeHtml(usersDb.usersTable || 'users') + '" /></label>'
          +       '</div>'
          +       '<div class="field-grid">'
          +         '<label>ID column<input name="idColumn" value="' + escapeHtml(usersDb.idColumn || 'id') + '" /></label>'
          +         '<label>Email column<input name="emailColumn" value="' + escapeHtml(usersDb.emailColumn || 'email') + '" /></label>'
          +       '</div>'
          +       '<div class="field-grid">'
          +         '<label>Name column<input name="nameColumn" value="' + escapeHtml(usersDb.nameColumn || 'name') + '" /></label>'
          +         '<label>Role column<input name="roleColumn" value="' + escapeHtml(usersDb.roleColumn || 'role') + '" /></label>'
          +       '</div>'
          +       '<button class="primary" type="submit">Save users DB</button>'
          +     '</form>'
          +   '</section>'
          + '</div>';
      }

      function renderBooleanOptions(value) {
        const current = value === true ? 'true' : (value === false ? 'false' : '');
        return ''
          + '<option value=""' + (current === '' ? ' selected' : '') + '>Default</option>'
          + '<option value="true"' + (current === 'true' ? ' selected' : '') + '>Enabled</option>'
          + '<option value="false"' + (current === 'false' ? ' selected' : '') + '>Disabled</option>';
      }

      function editableMoney(value) {
        if (value == null || value === '') {
          return '';
        }
        return String(value);
      }

      function renderTable(headings, rows, emptyText) {
        if (!rows.length) {
          return '<div class="empty">' + escapeHtml(emptyText) + '</div>';
        }
        return ''
          + '<div class="table-wrap"><table><thead><tr>'
          + headings.map((heading) => '<th>' + escapeHtml(heading) + '</th>').join('')
          + '</tr></thead><tbody>'
          + rows.map((row) => (
            '<tr>' + row.map((cell) => '<td>' + cell + '</td>').join('') + '</tr>'
          )).join('')
          + '</tbody></table></div>';
      }

      function renderCurrentView() {
        const buttons = navNode.querySelectorAll('[data-view]');
        buttons.forEach((button) => {
          button.classList.toggle('active', button.getAttribute('data-view') === state.currentView);
        });

        renderSummary();
        if (state.currentView === 'players') {
          renderPlayerList();
          renderPlayersDetail();
          return;
        }
        if (state.currentView === 'games') {
          renderGamesList();
          renderGamesDetail();
          return;
        }
        renderSettingsRail();
        renderSettingsDetail();
      }

      async function refreshPlayers() {
        state.players = await api('/admin/api/backoffice/players?query=' + encodeURIComponent(state.playerQuery));
        if (!state.selectedPlayerId) {
          state.selectedPlayerId = state.players.players?.[0]?.playerId || null;
        }
        renderCurrentView();
      }

      async function refreshGames() {
        state.games = await api('/admin/api/backoffice/games?query=' + encodeURIComponent(state.gameQuery));
        if (!state.selectedGameId) {
          state.selectedGameId = state.games.games?.[0]?.gameId || null;
        }
        renderCurrentView();
      }

      async function refreshSettings() {
        state.settings = await api('/admin/api/backoffice/settings');
        renderCurrentView();
      }

      async function loadPlayerDetail(playerId) {
        if (!playerId) {
          state.playerDetail = null;
          renderCurrentView();
          return;
        }
        state.selectedPlayerId = playerId;
        state.playerDetail = await api('/admin/api/backoffice/players/' + encodeURIComponent(playerId));
        renderCurrentView();
      }

      async function loadGameDetail(gameId) {
        if (!gameId) {
          state.gameDetail = null;
          renderCurrentView();
          return;
        }
        state.selectedGameId = gameId;
        state.gameDetail = await api('/admin/api/backoffice/games/' + encodeURIComponent(gameId));
        renderCurrentView();
      }

      async function initialize() {
        const bootstrap = await api('/admin/api/backoffice/bootstrap');
        state.players = bootstrap.players;
        state.games = bootstrap.games;
        state.settings = bootstrap.settings;
        state.selectedPlayerId = bootstrap.featuredPlayerId;
        state.selectedGameId = bootstrap.featuredGameId;
        renderCurrentView();
        await Promise.all([
          state.selectedPlayerId ? loadPlayerDetail(state.selectedPlayerId) : Promise.resolve(),
          state.selectedGameId ? loadGameDetail(state.selectedGameId) : Promise.resolve(),
        ]);
        clearFlash();
      }

      document.addEventListener('click', async (event) => {
        const viewButton = event.target.closest('[data-view]');
        if (viewButton) {
          state.currentView = viewButton.getAttribute('data-view');
          renderCurrentView();
          return;
        }

        const playerButton = event.target.closest('[data-player-id]');
        if (playerButton) {
          await loadPlayerDetail(playerButton.getAttribute('data-player-id'));
          return;
        }

        const gameButton = event.target.closest('[data-game-id]');
        if (gameButton) {
          await loadGameDetail(gameButton.getAttribute('data-game-id'));
          return;
        }

        const refreshButton = event.target.closest('[data-refresh]');
        if (refreshButton) {
          const kind = refreshButton.getAttribute('data-refresh');
          try {
            if (kind === 'players') {
              await refreshPlayers();
              if (state.selectedPlayerId) {
                await loadPlayerDetail(state.selectedPlayerId);
              }
            } else {
              await refreshGames();
              if (state.selectedGameId) {
                await loadGameDetail(state.selectedGameId);
              }
            }
            await refreshSettings();
            clearFlash();
          } catch (error) {
            showFlash('error', error.message || 'Failed to refresh.');
          }
          return;
        }

        const clearButton = event.target.closest('[data-clear-search]');
        if (clearButton) {
          const kind = clearButton.getAttribute('data-clear-search');
          if (kind === 'players') {
            state.playerQuery = '';
            await refreshPlayers();
            if (state.players.players?.[0]) {
              await loadPlayerDetail(state.players.players[0].playerId);
            }
          } else {
            state.gameQuery = '';
            await refreshGames();
            if (state.games.games?.[0]) {
              await loadGameDetail(state.games.games[0].gameId);
            }
          }
          return;
        }
      });

      document.addEventListener('submit', async (event) => {
        const form = event.target;
        event.preventDefault();

        try {
          if (form.id === 'player-search-form') {
            state.playerQuery = new FormData(form).get('query') || '';
            await refreshPlayers();
            if (state.players.players?.[0]) {
              await loadPlayerDetail(state.players.players[0].playerId);
            }
            return;
          }

          if (form.id === 'game-search-form') {
            state.gameQuery = new FormData(form).get('query') || '';
            await refreshGames();
            if (state.games.games?.[0]) {
              await loadGameDetail(state.games.games[0].gameId);
            }
            return;
          }

          if (form.id === 'player-role-form') {
            const payload = Object.fromEntries(new FormData(form).entries());
            const response = await api('/admin/api/backoffice/players/' + encodeURIComponent(payload.playerId), {
              method: 'POST',
              body: { role: payload.role },
            });
            await refreshPlayers();
            state.playerDetail = response.player;
            renderCurrentView();
            showFlash('success', 'Player role saved.');
            return;
          }

          if (form.id === 'player-balance-form') {
            const payload = Object.fromEntries(new FormData(form).entries());
            const response = await api('/admin/api/backoffice/players/' + encodeURIComponent(payload.playerId), {
              method: 'POST',
              body: payload,
            });
            await refreshPlayers();
            await refreshSettings();
            state.playerDetail = response.player;
            renderCurrentView();
            showFlash('success', 'Player balance updated.');
            return;
          }

          if (form.id === 'game-settings-form') {
            const payload = Object.fromEntries(new FormData(form).entries());
            const response = await api('/admin/api/backoffice/games/' + encodeURIComponent(payload.gameId), {
              method: 'POST',
              body: payload,
            });
            await refreshGames();
            state.gameDetail = response;
            renderCurrentView();
            showFlash('success', 'Game settings saved.');
            return;
          }

          if (form.id === 'money-server-form') {
            const payload = Object.fromEntries(new FormData(form).entries());
            const next = await api('/admin/api/backoffice/settings', {
              method: 'POST',
              body: {
                moneyServer: payload,
                usersDb: state.settings?.integrations?.usersDb || {},
              },
            });
            state.settings = next;
            renderCurrentView();
            showFlash('success', 'Money server settings saved.');
            return;
          }

          if (form.id === 'users-db-form') {
            const payload = Object.fromEntries(new FormData(form).entries());
            const next = await api('/admin/api/backoffice/settings', {
              method: 'POST',
              body: {
                moneyServer: state.settings?.integrations?.moneyServer || {},
                usersDb: payload,
              },
            });
            state.settings = next;
            await refreshPlayers();
            renderCurrentView();
            showFlash('success', 'Users DB settings saved.');
            return;
          }
        } catch (error) {
          showFlash('error', error.message || 'Request failed.');
        }
      });

      initialize().catch((error) => {
        showFlash('error', error.message || 'Failed to load backoffice.');
      });
    </script>
  `;
}
