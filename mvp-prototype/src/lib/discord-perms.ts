import type { DiscordRole, DiscordServer } from './discord-mock';

export type PermissionKey = keyof DiscordRole['permissions'];

function rolesKey(serverId: string) {
  return `wg.discord.roles.${serverId}`;
}

function loadRoles(server: DiscordServer): DiscordRole[] {
  if (typeof window === 'undefined') return server.roles;
  try {
    const raw = localStorage.getItem(rolesKey(server.id));
    if (!raw) return server.roles;
    return JSON.parse(raw);
  } catch {
    return server.roles;
  }
}

export function getMember(server: DiscordServer, memberId: string) {
  return server.members.find((m) => m.id === memberId);
}

export function hasPermission(
  server: DiscordServer,
  memberId: string,
  perm: PermissionKey,
) {
  const member = getMember(server, memberId);
  if (!member) return false;

  const roles = loadRoles(server);
  for (const rid of member.roles) {
    const role = roles.find((r) => r.id === rid);
    if (role?.permissions?.[perm]) return true;
  }
  return false;
}
