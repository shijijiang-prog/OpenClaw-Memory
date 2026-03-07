import { games } from '../data.js';
import { loadState, addHistory } from '../state.js';

export function homePage() {
  const s = loadState();
  const followedCount = s.follows.length;

  const onboardingBanner = followedCount < 3
    ? `<div class="banner warn">
        <div>
          <b>建议先关注 3 个游戏</b>，我们会把“为你更新”做得更准。
          <div class="small">当前已关注：${followedCount}/3</div>
        </div>
        <a class="btn small" href="#/search">去挑选</a>
      </div>`
    : `<div class="banner ok">
        <div><b>为你更新</b>：你关注的游戏与社区今天有新内容。</div>
        <a class="btn small" href="#/notifications">查看通知</a>
      </div>`;

  const cards = games.map((g, idx) => {
    const why = idx === 0 ? `<div class="why">为什么推荐你：${g.why}</div>` : '';
    return `
      <article class="card">
        <div class="card-head">
          <div>
            <div class="title">${g.name}</div>
            <div class="tagline">${g.tagline}</div>
          </div>
          <a class="btn" href="#/game/${g.id}">查看详情</a>
        </div>
        <div class="tags">${g.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        ${why}
        <div class="row">
          <a class="link" href="#/community/${g.id}">进入社区 →</a>
          <span class="muted">热帖：${g.communityHot[0].title}</span>
        </div>
      </article>
    `;
  }).join('');

  // 记录访问
  addHistory({ type: 'page', title: '发现', href: '#/home' });

  return {
    title: '发现',
    content: `
      ${onboardingBanner}
      <div class="section-title">推荐流</div>
      <div class="grid">${cards}</div>
    `,
  };
}
