import DiscordShell from '@/components/discord/discord-shell';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DiscordShell>{children}</DiscordShell>;
}
