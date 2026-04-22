import Link from "next/link";
import { Sprout, ArrowRight, BarChart3, Zap, Shield } from "lucide-react";
import { PublicMobileTopBar, PublicBottomNav } from "@/components/PublicMobileNav";

export default function Home() {
  return (
    <div className="min-h-screen bg-background pb-bottom-nav md:pb-0">
      {/* Mobile native top app bar */}
      <PublicMobileTopBar />

      {/* Desktop Navbar (unchanged) */}
      <header className="hidden border-b bg-background/80 backdrop-blur-md sticky top-0 z-50 md:block">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Sprout className="h-6 w-6 text-primary" />
            HarvestHub
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-12 md:pt-28 md:pb-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border bg-muted/50 px-4 py-1.5 text-sm font-medium text-muted-foreground mb-6">
            <span className="mr-2">🌾</span>
            Techphilia 9.0 — Connecting Farmers & Buyers
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            Fair prices for{" "}
            <span className="text-primary">every harvest</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            HarvestHub connects farmers directly with buyers — no middlemen.
            List your produce, get AI-powered pricing, and reach buyers across
            India.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 text-base font-medium text-primary-foreground shadow-md hover:bg-primary/90 transition-all hover:shadow-lg"
            >
              Start Selling
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/marketplace"
              className="inline-flex h-12 items-center justify-center rounded-lg border bg-background px-6 text-base font-medium text-foreground hover:bg-accent transition-colors"
            >
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border bg-card p-6 hover:shadow-md transition-shadow">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">AI-Powered Pricing</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Get intelligent price suggestions based on your crop, location,
              and current market trends. Never underprice your harvest again.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-6 hover:shadow-md transition-shadow">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-500/10 mb-4">
              <BarChart3 className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Seller Dashboard</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Track views, compare your prices against market averages, and
              manage all your listings from one clean dashboard.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-6 hover:shadow-md transition-shadow">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500/10 mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Direct Connection</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Buy directly from verified farmers. No intermediaries, no hidden
              fees — just transparent trade between real people.
            </p>
          </div>
        </div>
      </section>

      {/* Footer (hidden on mobile since bottom nav takes its role) */}
      <footer className="hidden border-t md:block">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-6 py-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sprout className="h-4 w-4" />
            HarvestHub
          </div>
          <p className="text-sm text-muted-foreground">
            Built for Techphilia 9.0
          </p>
        </div>
      </footer>

      {/* Mobile native bottom navigation */}
      <PublicBottomNav />
    </div>
  );
}
