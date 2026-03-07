import { getGame } from '../data.js';
import { addHistory } from '../state.js';
import { actionBar } from '../ui.js';

export function communityPage(url, params) {
  const id = params.id;
  const g = getGame(id);
  if (!g) return { title: '未找到社区', content: `<div class="empty">未找到社区。</div>` };

  const threadId = url.searchParams.get('thread');

  addHistory({ type: 'community', title: `${g.name} 社区`, href: `#/community/${g.id}` });

  const channels = ['#新手', '#版本更新', '#组队', '#吐槽'];

  if (threadId) {
    const t = g.communityHot.find(x => x.id === threadId) || g.communityHot[0];
    return {
      title: `${g.name} · 话题`,
      content: `
        <div class="crumbs"><a class="link" href="#/community/${g.id}">← 返回社区</a></div>
        <div class="panel">
          <div class="title">${t.title}</div>
          <div class="small muted">👍 ${t.up} · 评论 ${t.replies}</div>
          <div class="why" style="margin-top:10px;">
            这是一个“可点击模拟”的帖子页：
            <ul>
              <li>你可以在这里想象：回复、引用、投票、收藏。</li>
              <li>MVP 重点是把用户从“发现”带到“互动”，形成留存闭环。</li>
            </ul>
          </div>
          <div class="actions">
            <button class="btn">👍 投票</button>
            <button class="btn">💬 回复</button>
            <button class="btn">🔖 收藏</button>
          </div>
        </div>
      `,
    };
  }

  return {
    title: `${g.name} · 社区`,
    content: `
      <div class="panel">
        <div class="row" style="justify-content:space-between;align-items:center;">
          <div>
            <div class="title">频道</div>
            <div class="small muted">像 Discord 一样用频道组织讨论</div>
          </div>
          <a class="btn" href="#/game/${g.id}?tab=overview">回到详情</a>
        </div>
        <div class="chips">${channels.map(c=>`<span class="chip">${c}</span>`).join('')}</div>
        ${actionBar(g.id)}
      </div>

      <div class="section-title">热帖</div>
      <div class="list">
        ${g.communityHot.map(t => `
          <a class="thread" href="#/community/${g.id}?thread=${t.id}">
            <div class="title">${t.title}</div>
            <div class="small muted">👍 ${t.up} · 评论 ${t.replies}</div>
          </a>
        `).join('')}
      </div>
    `,
  };
}
