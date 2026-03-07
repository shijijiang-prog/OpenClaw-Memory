import { layout, bindNavActive, bindActions } from './ui.js';
import { homePage } from './pages/home.js';
import { searchPage } from './pages/search.js';
import { gamePage } from './pages/game.js';
import { communityPage } from './pages/community.js';
import { notificationsPage } from './pages/notifications.js';
import { mePage } from './pages/me.js';

function parseHash() {
  const raw = location.hash.slice(1) || '/home';
  const [path, qs] = raw.split('?');
  const url = new URL('http://local' + path + (qs ? '?' + qs : ''));
  return url;
}

function match(url) {
  const path = url.pathname;

  const routes = [
    { re: /^\/home$/, run: (u) => homePage(u) },
    { re: /^\/search$/, run: (u) => searchPage(u) },
    { re: /^\/notifications$/, run: (u) => notificationsPage(u) },
    { re: /^\/me$/, run: (u) => mePage(u) },
    { re: /^\/game\/(?<id>[a-z0-9-]+)$/, run: (u, p) => gamePage(u, p.groups) },
    { re: /^\/community\/(?<id>[a-z0-9-]+)$/, run: (u, p) => communityPage(u, p.groups) },
  ];

  for (const r of routes) {
    const m = path.match(r.re);
    if (m) return () => r.run(url, m);
  }

  return () => ({ title: '404', content: `<div class="empty">页面不存在：${path}</div>` });
}

export function renderApp() {
  const url = parseHash();
  const run = match(url);
  const page = run();
  const app = document.getElementById('app');
  app.innerHTML = layout(page);
  bindNavActive();
  bindActions(app);
}
