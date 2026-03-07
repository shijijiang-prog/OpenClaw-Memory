const STOP = new Set([
  'the','a','an','to','and','or','of','in','on','for','with','is','are','was','were','it','this','that','i','you','we','they',
  '的','了','和','是','在','我','你','他','她','它','我们','你们','他们','以及','一个','一些','这','那','就','都','很','也','吗','呢'
]);

function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter(w => !STOP.has(w) && w.length > 1);
}

export function simpleSummary(messages: { user: string; text: string }[]) {
  const topN = messages.slice(-12);
  const joined = topN.map(m => m.text).join(' ');
  const words = tokenize(joined);
  const freq = new Map<string, number>();
  for (const w of words) freq.set(w, (freq.get(w) ?? 0) + 1);
  const topKeywords = [...freq.entries()]
    .sort((a,b) => b[1]-a[1])
    .slice(0, 8)
    .map(([w]) => w);

  const highlights = topN
    .filter(m => tokenize(m.text).some(w => topKeywords.includes(w)))
    .slice(0, 5)
    .map(m => `- ${m.user}: ${m.text}`);

  return {
    title: '房间总结（规则摘要）',
    bullets: [
      '最近讨论集中在：' + (topKeywords.length ? topKeywords.join('、') : '（暂无明显关键词）'),
      '主要需求/问题点：请结合高亮消息进一步整理成行动项',
    ],
    highlights,
  };
}
