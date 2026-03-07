import fs from 'fs';
import path from 'path';

// Minimal writer using Feishu Open API via openclaw HTTP is not available here.
// This file is a placeholder for agentic-coding implementation.
// We will write to Bitable via OpenClaw feishu_bitable_app_table_record tool inside agent turns.

const inPath = path.resolve(process.cwd(), 'last_output.json');
const out = JSON.parse(fs.readFileSync(inPath, 'utf8'));
console.log(JSON.stringify({
  hint: 'Use OpenClaw feishu_bitable_app_table_record.batch_create from agent turn with these payloads.',
  windowStart: out.windowStart,
  windowEnd: out.windowEnd,
  steamTop100Count: out.steamTop100.length,
  moversCount: out.steamTop500MoversTop10.length,
}, null, 2));
