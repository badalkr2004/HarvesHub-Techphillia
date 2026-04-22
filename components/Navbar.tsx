"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Sprout, LayoutDashboard, Store, PlusCircle, LogOut } from "lucide-react";

export function Navbar() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  const user = session?.user as Record<string, unknown> | undefined;
  const role = user?.role as string | undefined;
  const isFarmer = role === "farmer";

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  const links = [
    { href: "/marketplace", label: "Marketplace", icon: Store, show: true },
    { href: "/markets", label: "Markets", icon: Store, show: true },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, show: isFarmer },
    { href: "/listings/new", label: "New Listing", icon: PlusCircle, show: isFarmer },
  ];

  return (
    <header className="sticky top-0 z-50 hidden w-full border-b bg-background/80 backdrop-blur-md md:block">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Sprout className="h-6 w-6 text-primary" />
          <span>HarvestHub</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="flex items-center gap-1">
          {links
            .filter((l) => l.show)
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
        </nav>

        {/* Desktop User */}
        <div className="flex items-center gap-3">
          {user && (
            <span className="text-sm text-muted-foreground">
              {user.name as string}{" "}
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {role}
              </span>
            </span>
          )}
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-1" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}
