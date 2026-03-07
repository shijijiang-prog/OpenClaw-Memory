import { loadState, toggle, markAllRead } from './state.js';

export function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

export function layout({ title, content }) {
  const state = loadState();
  const unread = state.notifications.filter((n) => n.unread).length;

  return `
  <div class="app">
    <header class="topbar">
      <a class="brand" href="#/home">精神娱乐MVP</a>
      <nav class="topnav">
        <a href="#/home" data-active="home">发现</a>
        <a href="#/search" data-active="search">搜索</a>
        <a href="#/notifications" data-active="notifications">通知${unread ? `<span class=\"badge\">${unread}</span>` : ''}</a>
        <a href="#/me" data-active="me">我的</a>
      </nav>
    </header>

    <main class="main">
      <div class="page-header">
        <h1>${title}</h1>
      </div>
      ${content}
    </main>

    <footer class="footer">MVP Demo · 本地可点击原型（无支付）</footer>
  </div>
  `;
}

export function bindNavActive() {
  const hash = location.hash;
  const map = {
    '#/home': 'home',
    '#/search': 'search',
    '#/notifications': 'notifications',
    '#/me': 'me',
  };
  const key = Object.keys(map).find((k) => hash.startsWith(k));
  const active = map[key] || '';
  document.querySelectorAll('.topnav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.active === active);
  });
}

export function actionBar(gameId) {
  const s = loadState();
  const followed = s.follows.includes(gameId);
  const joined = s.joinedCommunities.includes(gameId);
  const collected = s.collections.includes(gameId);

  return `
  <div class="actions">
    <button class="btn ${followed ? 'primary' : ''}" data-action="toggle" data-list="follows" data-id="${gameId}">
      ${followed ? '已关注' : '关注'}
    </button>
    <button class="btn ${joined ? 'primary' : ''}" data-action="toggle" data-list="joinedCommunities" data-id="${gameId}">
      ${joined ? '已加入社区' : '加入社区'}
    </button>
    <button class="btn ${collected ? 'primary' : ''}" data-action="toggle" data-list="collections" data-id="${gameId}">
      ${collected ? '已收藏' : '收藏'}
    </button>
  </div>
  `;
}

export function bindActions(root = document) {
  root.querySelectorAll('[data-action="toggle"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      toggle(btn.dataset.list, btn.dataset.id);
      location.reload();
    });
  });

  root.querySelectorAll('[data-action="markAllRead"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      markAllRead();
      location.reload();
    });
  });
}
