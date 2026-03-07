import { getGame } from '../data.js';
import { addHistory } from '../state.js';
import { actionBar } from '../ui.js';

export function gamePage(url, params) {
  const id = params.id;
  const tab = url.searchParams.get('tab') || 'overview';
  const g = getGame(id);
  if (!g) {
    return { title: '未找到', content: `<div class="empty">未找到该游戏。</div>` };
  }

  addHistory({ type: 'game', title: g.name, href: `#/game/${g.id}` });

  const tabs = [
    ['overview', '概览'],
    ['db', '数据库'],
    ['reviews', '评测'],
    ['community', '社区'],
  ];

  const tabNav = `
    <div class="tabs">
      ${tabs.map(([k, label]) => `<a class="tab ${k===tab?'active':''}" href="#/game/${g.id}?tab=${k}">${label}</a>`).join('')}
    </div>
  `;

  const body = {
    overview: `
      <div class="panel">
        <div class="hero">
          <div>
            <div class="title">${g.name}</div>
            <div class="tagline">${g.tagline}</div>
            <div class="why"><b>适合你原因：</b>${g.why}</div>
          </div>
          <div class="mini">
            <div><b>时长</b> ${g.db.sessionLength}</div>
            <div><b>难度</b> ${g.db.difficulty}</div>
            <div><b>版本</b> ${g.db.version}</div>
          </div>
        </div>
        ${actionBar(g.id)}
      </div>

      <div class="section-title">社区热帖（预览）</div>
      <div class="list">
        ${g.communityHot.map(t => `
          <a class="thread" href="#/community/${g.id}?thread=${t.id}">
            <div class="title">${t.title}</div>
            <div class="small muted">👍 ${t.up} · 评论 ${t.replies}</div>
          </a>
        `).join('')}
      </div>
    `,

    db: `
      <div class="panel">
        <div class="kv"><span>平台</span><span>${g.db.platforms.join(' / ')}</span></div>
        <div class="kv"><span>语言</span><span>${g.db.languages.join(' / ')}</span></div>
        <div class="kv"><span>单次体验时长</span><span>${g.db.sessionLength}</span></div>
        <div class="kv"><span>难度</span><span>${g.db.difficulty}</span></div>
        <div class="kv"><span>当前版本</span><span>${g.db.version}</span></div>
        <div class="kv"><span>最近更新</span><span>${g.db.lastUpdate}</span></div>
      </div>
      ${actionBar(g.id)}
    `,

    reviews: `
      <div class="panel">
        <div class="section-title">优点</div>
        <ul>${g.reviews.pros.map(p=>`<li>${p}</li>`).join('')}</ul>
        <div class="section-title">不足</div>
        <ul>${g.reviews.cons.map(c=>`<li>${c}</li>`).join('')}</ul>
        <div class="section-title">适合谁</div>
        <div class="why">${g.reviews.forWho}</div>
      </div>
      ${actionBar(g.id)}
    `,

    community: `
      <div class="banner ok">
        <div><b>社区是留存引擎</b>：加入后你会收到“热帖/版本更新/组队回应”。</div>
        <a class="btn small" href="#/community/${g.id}">进入社区</a>
      </div>
      ${actionBar(g.id)}
    `,
  }[tab] || `<div class="empty">未知标签页</div>`;

  return {
    title: `游戏详情 · ${g.name}`,
    content: `${tabNav}${body}`,
  };
}
