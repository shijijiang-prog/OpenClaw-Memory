# MVP Prototype (Next.js)

This repo contains the **Next.js Web demo**.

## Run

```bash
cd mvp-prototype
npm i
npm run dev
```

If port 3011 is occupied, use:

```bash
npm run dev -- --port 3022
```

## Discord-like Demo

Entry:
- `/discord`

Key pages:
- Servers list: `/discord/servers`
- Server (channels): `/discord/servers/wg`
- Text channel: `/discord/servers/wg/channel/c1` , `/discord/servers/wg/channel/c2`
- Voice channel (placeholder): `/discord/servers/wg/voice/v1`
- Members: `/discord/servers/wg/members`
- Roles/permissions: `/discord/servers/wg/settings/roles`
- Cross-channel message simulator: `/discord/simulator`

### Demo script (2 mins)
1. Open `/discord/simulator`, enable timer injection (5-10s)
2. Open `/discord/servers` or `/discord/servers/wg` to watch unread numbers grow
3. Click into an unread channel to see **unread divider + jump-to-first-unread**
4. Toggle role permissions in `/discord/servers/wg/settings/roles` and verify enforcement in channel page

## Notes
- The Discord dynamic routes were switched to `useParams()` to avoid Next.js dev dynamic params issues.
