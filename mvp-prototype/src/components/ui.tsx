import Link from 'next/link';
import { HTMLAttributes, PropsWithChildren } from 'react';

export function cn(...xs: Array<string | undefined | false>) {
  return xs.filter(Boolean).join(' ');
}

// Apple-like card
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-black/10 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]',
        className
      )}
      {...props}
    />
  );
}

export function Badge({ children, tone = 'neutral' }: PropsWithChildren<{ tone?: 'neutral' | 'blue' | 'green' | 'orange' | 'red' }>) {
  const map = {
    neutral: 'bg-black/5 text-black/70 border-black/10',
    blue: 'bg-[#e8f0ff] text-[#1d4ed8] border-[#cfe0ff]',
    green: 'bg-[#e8fff1] text-[#15803d] border-[#c9f7da]',
    orange: 'bg-[#fff3e6] text-[#b45309] border-[#ffe2c2]',
    red: 'bg-[#ffe8e8] text-[#b91c1c] border-[#ffd0d0]',
  };
  return <span className={cn('inline-flex items-center rounded-full border px-2 py-0.5 text-xs', map[tone])}>{children}</span>;
}

export function Button({
  children,
  className,
  variant = 'solid',
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLButtonElement> & { variant?: 'solid' | 'ghost' }>) {
  const base = 'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition active:translate-y-px';
  const solid = 'bg-[#0071e3] text-white hover:bg-[#0066cc]';
  const ghost = 'bg-transparent hover:bg-black/5 text-black/80';
  return (
    <button className={cn(base, variant === 'solid' ? solid : ghost, className)} {...props}>
      {children}
    </button>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'w-full rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none',
        'focus:ring-2 focus:ring-[#0071e3]/30',
        props.className
      )}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        'w-full rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none',
        'focus:ring-2 focus:ring-[#0071e3]/30',
        props.className
      )}
    />
  );
}

export function NavLink({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <Link href={href} className="rounded-full px-3 py-1.5 text-sm text-black/80 hover:bg-black/5">
      {children}
    </Link>
  );
}

// iOS-like segmented control
export function Segmented({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="inline-flex rounded-2xl border border-black/10 bg-black/5 p-1">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={cn(
              'rounded-xl px-3 py-1.5 text-sm transition',
              active ? 'bg-white text-black shadow-sm' : 'text-black/70 hover:text-black'
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
