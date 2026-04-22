"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sprout, Home, Store, LogIn, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function PublicMobileTopBar() {
  return (
    <header className="safe-top sticky top-0 z-40 w-full border-b border-border/60 bg-background/90 backdrop-blur-md md:hidden">
      <div className="flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label="HarvestHub home">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
            <Sprout className="h-5 w-5 text-primary" />
          </div>
          <div className="leading-tight">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Techphilia 9.0
            </p>
            <h1 className="text-[15px] font-semibold text-foreground">HarvestHub</h1>
          </div>
        </Link>

        <Link
          href="/login"
          className="inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-semibold text-primary hover:bg-primary/10 active:bg-primary/20 transition-colors"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}

interface PublicNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  match: (pathname: string) => boolean;
}

const PUBLIC_ITEMS: PublicNavItem[] = [
  {
    href: "/",
    label: "Home",
    icon: Home,
    match: (p) => p === "/",
  },
  {
    href: "/marketplace",
    label: "Market",
    icon: Store,
    match: (p) => p.startsWith("/marketplace"),
  },
  {
    href: "/login",
    label: "Sign In",
    icon: LogIn,
    match: (p) => p === "/login",
  },
  {
    href: "/register",
    label: "Join",
    icon: UserPlus,
    match: (p) => p === "/register",
  },
];

export function PublicBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur-md shadow-[0_-4px_16px_-4px_rgba(0,0,0,0.06)] md:hidden"
    >
      <ul className="mx-auto grid h-[64px] max-w-md grid-cols-4 items-stretch">
        {PUBLIC_ITEMS.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                aria-label={item.label}
                className="flex flex-1 flex-col items-center justify-center gap-1 pt-2 pb-1.5 select-none"
              >
                <span
                  className={`flex h-8 w-16 items-center justify-center rounded-full transition-all duration-200 ${
                    active ? "bg-primary/15" : "bg-transparent group-active:bg-accent"
                  }`}
                >
                  <Icon
                    className={`h-[22px] w-[22px] transition-colors ${
                      active ? "text-primary" : "text-muted-foreground"
                    }`}
                    strokeWidth={active ? 2.4 : 2}
                  />
                </span>
                <span
                  className={`text-[11px] leading-none transition-colors ${
                    active ? "font-semibold text-foreground" : "font-medium text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
