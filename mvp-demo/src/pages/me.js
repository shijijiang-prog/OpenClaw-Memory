import { loadState } from '../state.js';
import { games } from '../data.js';
import { addHistory } from '../state.js';

export function mePage() {
  const s = loadState();
  const mapGame = (id) => games.find(g => g.id === id);

  const follows = s.follows.map(id => mapGame(id)).filter(Boolean);
  const joined = s.joinedCommunities.map(id => mapGame(id)).filter(Boolean);
  const collections = s.collections.map(id => mapGame(id)).filter(Boolean);

  const cards = (arr, emptyText) => {
    if (!arr.length) return `<div class="empty">${emptyText}</div>`;
    return `<div class="cards">
      ${arr.map(g => `
        <a class="mini-card" href="#/game/${g.id}">
          <div class="title">${g.name}</div>
          <div class="small muted">${g.tagline}</div>
        </a>
      `).join('')}
    </div>`;
  };

  addHistory({ type: 'page', title: '我的', href: '#/me' });

  return {
    title: '我的',
    content: `
      <div class="panel">
        <div class="title">偏好</div>
        <div class="chips">
          <span class="chip">${s.user.prefs.genres.join(' / ')}</span>
          <span class="chip">${s.user.prefs.sessionLength}</span>
        </div>
        <div class="small muted">（MVP：偏好用于推荐与“为什么推荐你”解释）</div>
      </div>

      <div class="section-title">关注的游戏</div>
      ${cards(follows, '还没有关注任何游戏。建议先关注 3 个，提升留存。')}

      <div class="section-title">加入的社区</div>
      ${cards(joined, '还没有加入社区。社区是留存引擎。')}

      <div class="section-title">收藏</div>
      ${cards(collections, '还没有收藏。')}

      <div class="section-title">最近浏览</div>
      <div class="panel">
        ${s.history.slice(0,10).map(h => `
          <div class="kv"><span>${new Date(h.at).toLocaleString()}</span><span><a class="link" href="${h.href}">${h.title}</a></span></div>
        `).join('') || '<div class="empty">暂无浏览历史。</div>'}
      </div>
    `,
  };
}
