function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderWalletAdminPage({ summary, serviceOrigin }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Wallet Admin</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #0a1016;
        --panel: rgba(18, 24, 34, 0.94);
        --panel-2: rgba(11, 16, 24, 0.92);
        --line: rgba(255, 255, 255, 0.08);
        --text: #f3f7fb;
        --muted: #94a3b8;
        --accent: #37c06d;
        --accent-2: #267d55;
        --danger: #ff7f7f;
        --shadow: 0 24px 90px rgba(0, 0, 0, 0.42);
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: "SF Pro Display", "Segoe UI", sans-serif;
        background:
          radial-gradient(circle at top left, rgba(55, 192, 109, 0.14), transparent 28%),
          radial-gradient(circle at top right, rgba(102, 178, 255, 0.12), transparent 24%),
          linear-gradient(180deg, #091018 0%, #060b10 100%);
        color: var(--text);
      }

      .shell {
        width: min(1480px, calc(100vw - 28px));
        margin: 14px auto;
      }

      .card {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 26px;
        box-shadow: var(--shadow);
        backdrop-filter: blur(18px);
        padding: 28px;
      }

      .stack,
      .summary,
      .forms,
      .tables,
      .grid-2 {
        display: grid;
        gap: 16px;
      }

      .stack { gap: 20px; }
      .summary { grid-template-columns: repeat(4, minmax(0, 1fr)); }
      .forms,
      .tables,
      .grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }

      h1, h2, h3, p { margin: 0; }
      h1 { font-size: clamp(34px, 5vw, 64px); line-height: .95; letter-spacing: -.04em; }
      h2 { font-size: 24px; }
      h3 { font-size: 13px; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
      p, small, .muted { color: var(--muted); }

      .topbar,
      .row-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        flex-wrap: wrap;
      }

      .metric,
      .panel,
      .notice {
        background: var(--panel-2);
        border: 1px solid var(--line);
        border-radius: 20px;
      }

      .metric,
      .panel { padding: 18px 20px; }
      .metric strong {
        display: block;
        margin-top: 10px;
        font-size: clamp(22px, 2vw, 34px);
        line-height: 1;
      }

      .notice { padding: 14px 16px; }
      .notice.error {
        background: rgba(255, 127, 127, 0.08);
        border-color: rgba(255, 127, 127, 0.3);
        color: #ffdcdc;
      }
      .notice.success {
        background: rgba(55, 192, 109, 0.1);
        border-color: rgba(55, 192, 109, 0.28);
        color: #d1f6df;
      }

      label {
        display: grid;
        gap: 8px;
        font-size: 13px;
        color: var(--muted);
      }

      input, select, textarea, button {
        font: inherit;
      }

      input, select, textarea {
        width: 100%;
        border-radius: 14px;
        border: 1px solid var(--line);
        background: rgba(255, 255, 255, 0.04);
        color: var(--text);
        padding: 12px 14px;
      }

      button {
        appearance: none;
        border: none;
        border-radius: 14px;
        padding: 12px 16px;
        font-weight: 700;
        cursor: pointer;
        color: white;
      }

      button.primary { background: linear-gradient(135deg, var(--accent), var(--accent-2)); }
      button.secondary {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid var(--line);
      }
      button.danger {
        background: rgba(255, 127, 127, 0.12);
        border: 1px solid rgba(255, 127, 127, 0.26);
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th, td {
        text-align: left;
        padding: 12px 10px;
        border-bottom: 1px solid var(--line);
        font-size: 14px;
        vertical-align: top;
      }

      th { color: var(--muted); font-weight: 600; }
      tr:last-child td { border-bottom: none; }

      .table-wrap { overflow-x: auto; }
      .pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 12px;
        background: rgba(255, 255, 255, 0.06);
        color: var(--muted);
      }

      @media (max-width: 960px) {
        .summary,
        .forms,
        .tables,
        .grid-2 { grid-template-columns: 1fr 1fr; }
      }

      @media (max-width: 720px) {
        .summary,
        .forms,
        .tables,
        .grid-2 { grid-template-columns: 1fr; }
        .card { padding: 20px; }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <section class="card stack">
        <header class="stack">
          <div class="topbar">
            <div>
              <h1>Wallet Admin</h1>
              <p>External user and wallet service for registration, balances, ledger, and future backoffice integration.</p>
            </div>
            <div class="pill">${escapeHtml(serviceOrigin)}</div>
          </div>
          <div class="summary" id="summary">
            ${summary.map((item) => `
              <div class="metric">
                <small>${escapeHtml(item.label)}</small>
                <strong>${escapeHtml(item.value)}</strong>
              </div>
            `).join("")}
          </div>
        </header>

        <div id="flash"></div>

        <section class="forms">
          <div class="panel stack">
            <div>
              <h2>Register User</h2>
              <p class="muted">Create a site user with login credentials and an initial balance.</p>
            </div>
            <form id="register-form" class="stack">
              <div class="grid-2">
                <label>Name<input name="name" placeholder="Player name" required /></label>
                <label>Email<input name="email" type="email" placeholder="player@example.com" required /></label>
              </div>
              <div class="grid-2">
                <label>Password<input name="password" type="password" placeholder="At least 8 chars" required /></label>
                <label>Currency<input name="currency" value="USD" required /></label>
              </div>
              <div class="grid-2">
                <label>Initial balance<input name="balance" type="number" min="0" step="0.01" value="100.00" required /></label>
                <label>Role<select name="role"><option value="low">low</option><option value="middle" selected>middle</option><option value="high">high</option></select></label>
              </div>
              <div class="row-actions">
                <button class="primary" type="submit">Create user</button>
                <button class="secondary" type="button" id="open-register-page">Open public register page</button>
              </div>
            </form>
          </div>

          <div class="panel stack">
            <div>
              <h2>Update Balance</h2>
              <p class="muted">Set, deposit, or withdraw against a player wallet. Every operation goes to the ledger.</p>
            </div>
            <form id="balance-form" class="stack">
              <div class="grid-2">
                <label>Player ID<input name="playerId" placeholder="UUID from table below" required /></label>
                <label>Currency<input name="currency" value="USD" required /></label>
              </div>
              <div class="grid-2">
                <label>Action<select name="action"><option value="set">set</option><option value="deposit">deposit</option><option value="withdraw">withdraw</option></select></label>
                <label>Amount<input name="amount" type="number" min="0" step="0.01" placeholder="25.00" required /></label>
              </div>
              <button class="primary" type="submit">Apply balance action</button>
            </form>
          </div>
        </section>

        <section class="tables">
          <div class="panel stack">
            <div class="topbar">
              <div>
                <h2>Balances</h2>
                <p class="muted">Registered users and current wallet state.</p>
              </div>
              <button class="secondary" type="button" id="refresh-users">Refresh</button>
            </div>
            <label>Search<input id="users-query" placeholder="name, email, id" /></label>
            <div class="table-wrap" id="users-table"></div>
          </div>

          <div class="panel stack">
            <div class="topbar">
              <div>
                <h2>Ledger</h2>
                <p class="muted">Recent wallet actions.</p>
              </div>
              <button class="secondary" type="button" id="refresh-ledger">Refresh</button>
            </div>
            <div class="table-wrap" id="ledger-table"></div>
          </div>
        </section>
      </section>
    </main>

    <script>
      const flashNode = document.getElementById('flash');
      const usersTableNode = document.getElementById('users-table');
      const ledgerTableNode = document.getElementById('ledger-table');
      const queryInput = document.getElementById('users-query');

      function escapeHtml(value) {
        return String(value ?? '')
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')
          .replaceAll('"', '&quot;')
          .replaceAll("'", '&#39;');
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
        const response = await fetch(path, request);
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(payload.error || payload.message || ('Request failed: ' + response.status));
        }
        return payload;
      }

      function renderTable(headings, rows, emptyText) {
        if (!rows.length) {
          return '<div class="muted">' + escapeHtml(emptyText) + '</div>';
        }
        return '<table><thead><tr>'
          + headings.map((heading) => '<th>' + escapeHtml(heading) + '</th>').join('')
          + '</tr></thead><tbody>'
          + rows.map((row) => '<tr>' + row.map((cell) => '<td>' + cell + '</td>').join('') + '</tr>').join('')
          + '</tbody></table>';
      }

      async function refreshUsers() {
        const query = queryInput.value.trim();
        const payload = await api('/api/users?query=' + encodeURIComponent(query));
        usersTableNode.innerHTML = renderTable(
          ['Name', 'Email', 'Player ID', 'Role', 'Balance', 'Currency', 'Updated', ''],
          (payload.users || []).map((user) => [
            escapeHtml(user.name),
            escapeHtml(user.email),
            '<code>' + escapeHtml(user.id) + '</code>',
            '<span class="pill">' + escapeHtml(user.role) + '</span>',
            escapeHtml(user.balanceDisplay),
            escapeHtml(user.currency),
            escapeHtml(user.updatedAtLabel),
            '<button class="secondary" type="button" data-copy-player="' + escapeHtml(user.id) + '">Use</button>',
          ]),
          'No users yet. Create one from the form above.',
        );
      }

      async function refreshLedger() {
        const payload = await api('/api/ledger');
        ledgerTableNode.innerHTML = renderTable(
          ['At', 'Player', 'Action', 'Amount', 'Balance After', 'Actor'],
          (payload.entries || []).map((entry) => [
            escapeHtml(entry.createdAtLabel),
            '<code>' + escapeHtml(entry.playerId) + '</code>',
            escapeHtml(entry.action),
            escapeHtml(entry.amountDisplay),
            escapeHtml(entry.balanceAfterDisplay),
            escapeHtml(entry.actor || 'system'),
          ]),
          'No ledger actions yet.',
        );
      }

      async function refreshAll() {
        await Promise.all([refreshUsers(), refreshLedger()]);
      }

      document.getElementById('register-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        try {
          const payload = Object.fromEntries(new FormData(form).entries());
          const result = await api('/api/auth/register', { method: 'POST', body: payload });
          await refreshAll();
          clearFlash();
          showFlash('success', 'User created: ' + result.user.email);
          form.reset();
        } catch (error) {
          showFlash('error', error.message || 'Failed to create user.');
        }
      });

      document.getElementById('balance-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        try {
          const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
          const result = await api('/wallets/' + encodeURIComponent(payload.playerId) + '/balance', { method: 'POST', body: payload });
          await refreshAll();
          showFlash('success', 'Balance updated: ' + result.wallet.balanceDisplay);
        } catch (error) {
          showFlash('error', error.message || 'Failed to update balance.');
        }
      });

      document.getElementById('refresh-users').addEventListener('click', refreshUsers);
      document.getElementById('refresh-ledger').addEventListener('click', refreshLedger);
      document.getElementById('open-register-page').addEventListener('click', () => {
        window.open('/register', '_blank');
      });
      queryInput.addEventListener('input', () => {
        refreshUsers().catch((error) => showFlash('error', error.message || 'Failed to search users.'));
      });

      document.addEventListener('click', (event) => {
        const button = event.target.closest('[data-copy-player]');
        if (!button) return;
        const playerId = button.getAttribute('data-copy-player') || '';
        const field = document.querySelector('#balance-form input[name="playerId"]');
        if (field) {
          field.value = playerId;
          field.focus();
        }
      });

      refreshAll().catch((error) => showFlash('error', error.message || 'Failed to load wallet admin.'));
    </script>
  </body>
</html>`;
}

export function renderWalletRegisterPage({ serviceOrigin, defaultCurrency, defaultBalanceDisplay }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Register</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #081015;
        --panel: rgba(16, 23, 32, 0.95);
        --line: rgba(255, 255, 255, 0.08);
        --text: #f4f7fb;
        --muted: #9aa9bb;
        --accent: #33bf6b;
        --accent-2: #216d4c;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 20px;
        font-family: "SF Pro Display", "Segoe UI", sans-serif;
        background:
          radial-gradient(circle at top left, rgba(51, 191, 107, 0.16), transparent 28%),
          radial-gradient(circle at bottom right, rgba(91, 160, 255, 0.12), transparent 26%),
          linear-gradient(180deg, #081016 0%, #060b10 100%);
        color: var(--text);
      }
      .card {
        width: min(560px, 100%);
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 24px;
        padding: 28px;
        display: grid;
        gap: 18px;
      }
      h1, p { margin: 0; }
      h1 { font-size: clamp(34px, 5vw, 54px); line-height: .95; letter-spacing: -.04em; }
      p, label, small { color: var(--muted); }
      form { display: grid; gap: 14px; }
      label { display: grid; gap: 8px; font-size: 13px; }
      input, button {
        font: inherit;
      }
      input {
        width: 100%;
        border-radius: 14px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,.04);
        color: var(--text);
        padding: 12px 14px;
      }
      button {
        appearance: none;
        border: none;
        border-radius: 14px;
        padding: 12px 16px;
        font-weight: 700;
        color: white;
        cursor: pointer;
        background: linear-gradient(135deg, var(--accent), var(--accent-2));
      }
      .notice {
        border-radius: 14px;
        padding: 14px 16px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,.04);
        color: var(--muted);
      }
      .notice.success {
        color: #d2f5e0;
        background: rgba(51,191,107,.1);
      }
      .notice.error {
        color: #ffd8d8;
        background: rgba(255,127,127,.08);
      }
    </style>
  </head>
  <body>
    <section class="card">
      <div>
        <h1>Create account</h1>
        <p>Site registration backed by the external wallet server. New users start with ${escapeHtml(defaultBalanceDisplay)} ${escapeHtml(defaultCurrency)} unless changed server-side later.</p>
      </div>
      <div class="notice">Service: ${escapeHtml(serviceOrigin)}</div>
      <div id="flash"></div>
      <form id="register-form">
        <label>Name<input name="name" placeholder="Your name" required /></label>
        <label>Email<input name="email" type="email" placeholder="you@example.com" required /></label>
        <label>Password<input name="password" type="password" placeholder="At least 8 characters" required /></label>
        <button type="submit">Register</button>
      </form>
    </section>
    <script>
      const flashNode = document.getElementById('flash');
      function escapeHtml(value) {
        return String(value ?? '')
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')
          .replaceAll('"', '&quot;')
          .replaceAll("'", '&#39;');
      }
      function showFlash(type, message) {
        flashNode.innerHTML = '<div class="notice ' + type + '">' + escapeHtml(message) + '</div>';
      }
      document.getElementById('register-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const payload = Object.fromEntries(new FormData(form).entries());
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(payload),
          });
          const json = await response.json().catch(() => ({}));
          if (!response.ok) {
            throw new Error(json.error || 'Registration failed');
          }
          form.reset();
          showFlash('success', 'Account created: ' + json.user.email);
        } catch (error) {
          showFlash('error', error.message || 'Registration failed');
        }
      });
    </script>
  </body>
</html>`;
}
