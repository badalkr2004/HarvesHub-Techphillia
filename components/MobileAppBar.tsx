"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Sprout } from "lucide-react";

interface PageMeta {
  title: string;
  showBack?: boolean;
  backHref?: string;
}

function getPageMeta(pathname: string): PageMeta {
  if (pathname.startsWith("/marketplace")) {
    return { title: "Marketplace" };
  }
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    return { title: "Dashboard" };
  }
  if (pathname.startsWith("/listings/new")) {
    return { title: "New Listing", showBack: true, backHref: "/dashboard" };
  }
  if (pathname.startsWith("/listings/")) {
    return { title: "Listing", showBack: true, backHref: "/marketplace" };
  }
  return { title: "HarvestHub" };
}

export function MobileAppBar() {
  const pathname = usePathname();
  const router = useRouter();
  const meta = getPageMeta(pathname);

  const handleBack = () => {
    if (meta.backHref) {
      router.push(meta.backHref);
    } else {
      router.back();
    }
  };

  return (
    <header className="safe-top sticky top-0 z-40 w-full border-b border-border/60 bg-background/90 backdrop-blur-md md:hidden">
      <div className="flex h-14 items-center gap-2 px-2">
        {/* Leading: back button OR brand icon */}
        {meta.showBack ? (
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-accent active:bg-accent/80 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        ) : (
          <Link
            href="/"
            aria-label="HarvestHub home"
            className="flex h-10 w-10 items-center justify-center rounded-full text-primary hover:bg-primary/10 active:bg-primary/20 transition-colors"
          >
            <Sprout className="h-[22px] w-[22px]" />
          </Link>
        )}

        {/* Title */}
        <h1 className="flex-1 truncate pr-2 text-[17px] font-semibold tracking-tight text-foreground">
          {meta.title}
        </h1>
      </div>
    </header>
  );
}
