"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Store, LayoutDashboard, PlusCircle, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogOut, User as UserIcon } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  show: boolean;
  match?: (pathname: string) => boolean;
}

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [accountOpen, setAccountOpen] = useState(false);

  const user = session?.user as Record<string, unknown> | undefined;
  const role = user?.role as string | undefined;
  const isFarmer = role === "farmer";
  const name = (user?.name as string) || "User";
  const email = (user?.email as string) || "";
  const initial = name.trim().charAt(0).toUpperCase() || "U";

  const handleSignOut = async () => {
    await authClient.signOut();
    setAccountOpen(false);
    router.push("/login");
  };

  const items: NavItem[] = [
    {
      href: "/marketplace",
      label: "Market",
      icon: Store,
      show: true,
      match: (p: string) =>
        p.startsWith("/marketplace") ||
        (p.startsWith("/listings/") && !p.startsWith("/listings/new")),
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      show: isFarmer,
      match: (p: string) => p.startsWith("/dashboard"),
    },
    {
      href: "/listings/new",
      label: "Sell",
      icon: PlusCircle,
      show: isFarmer,
      match: (p: string) => p.startsWith("/listings/new"),
    },
  ].filter((i) => i.show);

  return (
    <>
      <nav
        aria-label="Primary"
        className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur-md shadow-[0_-4px_16px_-4px_rgba(0,0,0,0.06)] md:hidden"
      >
        <ul
          className="mx-auto grid h-[64px] max-w-md items-stretch"
          style={{
            gridTemplateColumns: `repeat(${items.length + 1}, minmax(0,1fr))`,
          }}
        >
          {items.map((item) => {
            const active = item.match ? item.match(pathname) : pathname === item.href;
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
                      active ? "bg-primary/15" : "bg-transparent"
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
                      active
                        ? "font-semibold text-foreground"
                        : "font-medium text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}

          {/* Account tab — opens user sheet */}
          <li className="flex">
            <button
              type="button"
              onClick={() => setAccountOpen(true)}
              aria-label="Account"
              className="flex flex-1 flex-col items-center justify-center gap-1 pt-2 pb-1.5 select-none"
            >
              <span
                className={`flex h-8 w-16 items-center justify-center rounded-full transition-all duration-200 ${
                  accountOpen ? "bg-primary/15" : "bg-transparent"
                }`}
              >
                <User
                  className={`h-[22px] w-[22px] transition-colors ${
                    accountOpen ? "text-primary" : "text-muted-foreground"
                  }`}
                  strokeWidth={accountOpen ? 2.4 : 2}
                />
              </span>
              <span
                className={`text-[11px] leading-none transition-colors ${
                  accountOpen
                    ? "font-semibold text-foreground"
                    : "font-medium text-muted-foreground"
                }`}
              >
                Account
              </span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Account sheet (mobile) */}
      <Sheet open={accountOpen} onOpenChange={setAccountOpen}>
        <SheetContent side="right" className="w-[85%] sm:max-w-sm">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-lg font-semibold">
                {initial}
              </div>
              <div className="min-w-0">
                <p className="truncate text-base font-semibold">{name}</p>
                {role && (
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary mt-0.5">
                    {role}
                  </span>
                )}
              </div>
            </SheetTitle>
            {email && (
              <SheetDescription className="truncate">{email}</SheetDescription>
            )}
          </SheetHeader>

          <div className="px-4 pb-4 mt-2 flex flex-col gap-2">
            <div className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground flex items-start gap-2">
              <UserIcon className="h-4 w-4 mt-0.5 text-primary" />
              <span>
                Signed in as{" "}
                <span className="font-medium text-foreground">{name}</span>
              </span>
            </div>
            <Button
              variant="outline"
              className="w-full justify-center"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
