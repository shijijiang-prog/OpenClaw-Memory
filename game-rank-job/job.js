import fs from 'fs';
import path from 'path';

const STATE_PATH = path.resolve(process.cwd(), 'state.json');

function nowIso() {
  return new Date().toISOString();
}

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  } catch {
    return {
      lastRunAt: null,
      lastSteamTop500: null,
      lastMergedTop500: null,
    };
  }
}

function saveState(s) {
  fs.writeFileSync(STATE_PATH, JSON.stringify(s, null, 2));
}

// TEMP IMPLEMENTATION (works without external fetch)
// Reads a local stub file so we can wire the cron + bitable pipeline now.
async function fetchSteamMostPlayedTop500() {
  const p = path.resolve(process.cwd(), 'steam_most_played_top500.json');
  if (!fs.existsSync(p)) return [];
  const arr = JSON.parse(fs.readFileSync(p, 'utf8'));
  return arr.map((x) => ({
    name: x.name,
    link: x.link,
    rank: x.rank,
    onlineValue: x.onlineValue,
    platform: x.platform || ['PC'],
    isAAA: !!x.isAAA,
  }));
}

async function fetchMobileOnlineTop500() {
  // TODO after API key
  return [];
}

function merge250plus250(steamTop500, mobileTop500) {
  const steam250 = steamTop500.slice(0, 250).map(x => ({...x, source: 'Steam'}));
  const mobile250 = mobileTop500.slice(0, 250).map(x => ({...x, source: 'Mobile(3rdParty)'}));
  const merged = [...steam250, ...mobile250].map((x, i) => ({...x, rank: i+1}));
  return merged;
}

function topMovers(currentTop500, prevTop500) {
  const prevRank = new Map(prevTop500.map((x) => [x.name, x.rank]));
  const movers = [];
  for (const g of currentTop500) {
    const pr = prevRank.get(g.name);
    if (pr != null) {
      const delta = pr - g.rank;
      if (delta > 0) movers.push({ ...g, prevRank: pr, delta });
    }
  }
  movers.sort((a, b) => b.delta - a.delta);
  return movers.slice(0, 10);
}

async function main() {
  const state = loadState();

  const runAt = nowIso();
  const windowEnd = new Date();
  const windowStart = new Date(windowEnd.getTime() - 6 * 60 * 60 * 1000);

  const steamTop500 = await fetchSteamMostPlayedTop500();
  const mobileTop500 = await fetchMobileOnlineTop500();
  const mergedTop500 = merge250plus250(steamTop500, mobileTop500);

  const moversSteam = state.lastSteamTop500 ? topMovers(steamTop500, state.lastSteamTop500) : [];
  const moversMerged = state.lastMergedTop500 ? topMovers(mergedTop500, state.lastMergedTop500) : [];

  const out = {
    runAt,
    windowStart: windowStart.toISOString(),
    windowEnd: windowEnd.toISOString(),
    steamTop100: steamTop500.slice(0, 100),
    steamTop500MoversTop10: moversSteam,
    mergedTop500MoversTop10: moversMerged,
    note: '当前为占位实现：Steam 榜单读取本地 stub 文件；移动端与合并榜需等待第三方 API key 后启用。'
  };

  fs.writeFileSync(path.resolve(process.cwd(), 'last_output.json'), JSON.stringify(out, null, 2));

  state.lastRunAt = runAt;
  state.lastSteamTop500 = steamTop500;
  state.lastMergedTop500 = mergedTop500;
  saveState(state);

  console.log('OK. Wrote last_output.json');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
