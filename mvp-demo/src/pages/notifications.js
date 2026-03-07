import { loadState } from '../state.js';
import { addHistory } from '../state.js';

export function notificationsPage() {
  const s = loadState();
  const items = s.notifications.map(n => `
    <a class="notif ${n.unread ? 'unread' : ''}" href="${n.link}">
      <div class="title">[${n.type}] ${n.title}</div>
      <div class="small muted">${n.time}</div>
    </a>
  `).join('') || `<div class="empty">暂无通知。</div>`;

  addHistory({ type: 'page', title: '通知', href: '#/notifications' });

  return {
    title: '通知中心',
    content: `
      <div class="banner ok">
        <div><b>留存触发器</b>：版本更新 / 社区热帖 / 组队回应</div>
        <button class="btn small" data-action="markAllRead">全部已读</button>
      </div>
      <div class="list">${items}</div>
    `,
  };
}
