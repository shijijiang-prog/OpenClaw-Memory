const KEY = 'mvp_state_v1';

const defaultState = {
  user: {
    prefs: { genres: ['独立', 'RPG'], sessionLength: '30-60分钟' },
  },
  follows: [],
  joinedCommunities: [],
  collections: [],
  notifications: [
    { id: 'n1', type: '更新', title: '你关注的《霓虹回声》发布了 1.0 更新', time: '今天 21:30', unread: true, link: '#/game/neon-echo?tab=community' },
    { id: 'n2', type: '热帖', title: '《像素远征》社区热帖：新手必看 Build', time: '今天 20:05', unread: true, link: '#/community/pixel-quest' },
  ],
  history: [],
};

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(defaultState);
    const parsed = JSON.parse(raw);
    return { ...structuredClone(defaultState), ...parsed };
  } catch {
    return structuredClone(defaultState);
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function withState(mutator) {
  const state = loadState();
  mutator(state);
  saveState(state);
  return state;
}

export function addHistory(entry) {
  return withState((s) => {
    s.history.unshift({ ...entry, at: Date.now() });
    s.history = s.history.slice(0, 50);
  });
}

export function toggle(listName, id) {
  return withState((s) => {
    const list = s[listName];
    const i = list.indexOf(id);
    if (i >= 0) list.splice(i, 1);
    else list.push(id);
  });
}

export function markAllRead() {
  return withState((s) => {
    s.notifications.forEach((n) => (n.unread = false));
  });
}
