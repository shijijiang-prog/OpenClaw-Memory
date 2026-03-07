import { games } from '../data.js';
import { addHistory } from '../state.js';

export function searchPage(url) {
  const q = (url.searchParams.get('q') || '').trim();
  const tag = (url.searchParams.get('tag') || '').trim();

  const tags = Array.from(new Set(games.flatMap(g => g.tags)));

  const filtered = games.filter(g => {
    const okQ = !q || (g.name + g.tagline).toLowerCase().includes(q.toLowerCase());
    const okTag = !tag || g.tags.includes(tag);
    return okQ && okTag;
  });

  const list = filtered.map(g => `
    <div class="list-item">
      <div>
        <div class="title">${g.name}</div>
        <div class="small muted">${g.tagline}</div>
        <div class="tags">${g.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>
      <a class="btn" href="#/game/${g.id}">详情</a>
    </div>
  `).join('') || `<div class="empty">没有匹配结果，换个关键词或标签试试。</div>`;

  addHistory({ type: 'page', title: '搜索', href: '#/search' });

  return {
    title: '搜索 / 筛选',
    content: `
      <form class="search" onsubmit="return false;">
        <input id="q" placeholder="搜索游戏、关键词…" value="${escapeHtml(q)}" />
        <select id="tag">
          <option value="">全部标签</option>
          ${tags.map(t => `<option value="${t}" ${t===tag?'selected':''}>${t}</option>`).join('')}
        </select>
        <button class="btn primary" id="go">搜索</button>
      </form>

      <div class="small muted">结果：${filtered.length} 个</div>
      <div class="list">${list}</div>

      <script>
        (function(){
          const go = document.getElementById('go');
          go.addEventListener('click', ()=>{
            const q = document.getElementById('q').value.trim();
            const tag = document.getElementById('tag').value;
            const params = new URLSearchParams();
            if(q) params.set('q', q);
            if(tag) params.set('tag', tag);
            location.hash = '#/search?' + params.toString();
          });
        })();
      </script>
    `,
  };
}

function escapeHtml(s){
  return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
}
