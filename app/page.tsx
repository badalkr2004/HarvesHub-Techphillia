import Link from "next/link";
import Image from "next/image";
import {
  Sprout,
  ArrowRight,
  BarChart3,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Leaf,
  ChevronRight,
  Star,
} from "lucide-react";
import {
  PublicMobileTopBar,
  PublicBottomNav,
} from "@/components/PublicMobileNav";
import {
  StaggerContainer,
  FadeUp,
  ScrollReveal,
  ScaleIn,
  LiftCard,
} from "@/components/HeroAnimations";

export default function Home() {
  return (
    <div className="min-h-screen bg-background pb-bottom-nav md:pb-0">
      {/* ── Mobile native top app bar ── */}
      <PublicMobileTopBar />

      {/* ── Desktop Navbar ── */}
      <header className="hidden border-b border-border/40 bg-background/90 backdrop-blur-xl sticky top-0 z-50 md:block">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Sprout className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-foreground">HarvestHub</span>
          </Link>
          <nav className="flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/marketplace"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Marketplace
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all hover:shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  SECTION 1 — HERO                                            */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Background decorative gradient (desktop) */}
        <div className="hidden md:block absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-primary/[0.04] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#c5e84d]/[0.06] rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-6 md:pt-20 md:pb-16">
          <StaggerContainer className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <FadeUp>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-6 md:mb-8">
                <Leaf className="h-3.5 w-3.5" />
                Techphilia 9.0 — Farm to Table Revolution
              </div>
            </FadeUp>

            {/* Heading */}
            <FadeUp>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                Your Agricultural
                <br />
                Journey{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-primary">Begins Here</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-3 md:h-4 bg-[#c5e84d]/30 rounded-full -z-0" />
                </span>
                {" "}🌾
              </h1>
            </FadeUp>

            {/* Subtitle */}
            <FadeUp>
              <p className="mt-5 md:mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                HarvestHub connects farmers directly with buyers — no middlemen.
                List your produce, get AI-powered pricing, and reach buyers across
                India with fair, transparent trade.
              </p>
            </FadeUp>

            {/* CTAs */}
            <FadeUp>
              <div className="mt-7 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link
                  href="/register"
                  className="group w-full sm:w-auto inline-flex h-12 md:h-13 items-center justify-center rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground shadow-md hover:bg-primary/90 transition-all hover:shadow-lg active:scale-[0.97]"
                >
                  Start Selling
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/marketplace"
                  className="group w-full sm:w-auto inline-flex h-12 md:h-13 items-center justify-center rounded-full border-2 border-border bg-background px-7 text-base font-semibold text-foreground hover:bg-accent transition-all active:scale-[0.97]"
                >
                  Browse Marketplace
                  <ChevronRight className="ml-1 h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
              </div>
            </FadeUp>
          </StaggerContainer>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  SECTION 2 — BENTO SHOWCASE GRID                             */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-12 md:pb-24">
        {/* Top row — large image + text card */}
        <div className="grid gap-4 md:gap-5 md:grid-cols-5">
          {/* Large farm image */}
          <ScaleIn className="md:col-span-3 relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-[380px]">
            <Image
              src="/farm/hero-landscape.png"
              alt="Lush green Indian farmland"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-foreground">
                <Sprout className="h-3.5 w-3.5 text-primary" />
                Our Farmers
              </span>
            </div>
          </ScaleIn>

          {/* Right column */}
          <div className="md:col-span-2 flex flex-col gap-4 md:gap-5">
            {/* Green text card */}
            <ScaleIn
              delay={0.1}
              className="flex-1 rounded-2xl md:rounded-3xl bg-[#c5e84d]/20 border border-[#c5e84d]/30 p-6 md:p-8 flex flex-col justify-center"
            >
              <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-3">
                Unveiling the World
                <br />
                of Agriculture
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                India&apos;s farming ecosystem reimagined — cutting out middlemen,
                empowering farmers with AI pricing, and creating a direct bridge
                to buyers nationwide.
              </p>
              <Link
                href="/marketplace"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors w-fit"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm group-hover:shadow-md transition-shadow">
                  <ArrowRight className="h-4 w-4 -rotate-45" />
                </span>
                Learn More
              </Link>
            </ScaleIn>

            {/* Small produce image */}
            <ScaleIn
              delay={0.2}
              className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-video md:aspect-auto md:min-h-[160px]"
            >
              <Image
                src="/farm/produce-closeup.png"
                alt="Fresh farm produce"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </ScaleIn>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid gap-4 md:gap-5 md:grid-cols-3 mt-4 md:mt-5">
          {/* Farmer portrait */}
          <ScaleIn
            delay={0.15}
            className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/3]"
          >
            <Image
              src="/farm/farmer-portrait.png"
              alt="Indian farmer in field"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </ScaleIn>

          {/* Green card */}
          <ScaleIn
            delay={0.2}
            className="rounded-2xl md:rounded-3xl bg-primary/10 border border-primary/20 p-6 md:p-8 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                Your Source for Modern Agriculture
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                From listing your crops in minutes to receiving fair market
                bids — HarvestHub transforms how India trades farm produce.
              </p>
            </div>
            <Link
              href="/register"
              className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-semibold text-background w-fit hover:bg-foreground/90 transition-colors active:scale-[0.97]"
            >
              Learn More
            </Link>
          </ScaleIn>

          {/* Farmer with harvest */}
          <ScaleIn
            delay={0.25}
            className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/3]"
          >
            <Image
              src="/farm/farmer-harvest.png"
              alt="Farmer with fresh harvest"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </ScaleIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  SECTION 3 — STATS BAR                                       */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="border-y border-border/60 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/60">
              {[
                { label: "Farmers", value: "2,500+", icon: Users },
                { label: "Crops Listed", value: "12,000+", icon: Leaf },
                { label: "States Covered", value: "18+", icon: TrendingUp },
                { label: "Avg. Price Boost", value: "23%", icon: Star },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center py-6 md:py-8 gap-1"
                >
                  <stat.icon className="h-5 w-5 text-primary mb-1 hidden md:block" />
                  <span className="text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-xs md:text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  SECTION 4 — FEATURES                                        */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
        <ScrollReveal className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Why HarvestHub
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">
            Everything farmers need,
            <br className="hidden md:block" /> in one platform
          </h2>
        </ScrollReveal>

        <div className="grid gap-4 md:gap-5 md:grid-cols-3">
          {/* Feature 1 */}
          <ScrollReveal delay={0}>
            <LiftCard className="rounded-2xl md:rounded-3xl border border-border bg-card p-6 md:p-8 h-full group cursor-default">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mb-5 group-hover:bg-primary/20 transition-colors">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                AI-Powered Pricing
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Get intelligent price suggestions based on your crop, location,
                and current market trends. Never underprice your harvest again.
              </p>
            </LiftCard>
          </ScrollReveal>

          {/* Feature 2 */}
          <ScrollReveal delay={0.1}>
            <LiftCard className="rounded-2xl md:rounded-3xl border border-border bg-card p-6 md:p-8 h-full group cursor-default">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 mb-5 group-hover:bg-emerald-500/20 transition-colors">
                <BarChart3 className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Seller Dashboard
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Track views, compare your prices against market averages, and
                manage all your listings from one clean, real-time dashboard.
              </p>
            </LiftCard>
          </ScrollReveal>

          {/* Feature 3 */}
          <ScrollReveal delay={0.2}>
            <LiftCard className="rounded-2xl md:rounded-3xl border border-border bg-card p-6 md:p-8 h-full group cursor-default">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 mb-5 group-hover:bg-blue-500/20 transition-colors">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Direct Connection
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Buy directly from verified farmers. No intermediaries, no hidden
                fees — just transparent trade between real people.
              </p>
            </LiftCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  SECTION 5 — ABOUT / HOW IT WORKS                            */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="about" className="bg-muted/20 border-y border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
          <div className="grid gap-8 md:gap-12 md:grid-cols-2 items-center">
            {/* Left — image */}
            <ScrollReveal className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/3]">
              <Image
                src="/farm/market-trading.png"
                alt="Agricultural marketplace trading"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent" />
            </ScrollReveal>

            {/* Right — text */}
            <ScrollReveal delay={0.15}>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-5">
                <Sprout className="h-3.5 w-3.5" />
                About HarvestHub
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight mb-4">
                Empowering India&apos;s
                <br /> farming community
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                India&apos;s 150 million farmers deserve fair prices for their hard
                work. HarvestHub eliminates the chain of middlemen that has
                historically eaten into farmer profits, replacing it with a direct,
                AI-powered marketplace where every harvest gets the price it
                deserves.
              </p>
              <div className="space-y-3">
                {[
                  "List produce in under 2 minutes",
                  "AI suggests optimal pricing instantly",
                  "Buyers discover and bid directly",
                  "Secure, transparent transactions",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <svg
                        className="h-3.5 w-3.5 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/register"
                className="mt-8 group inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all hover:shadow-md active:scale-[0.97]"
              >
                Join HarvestHub
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  SECTION 6 — ROLE CARDS                                      */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
        <ScrollReveal className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">
            Built for everyone in the chain
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Whether you grow it, buy it, or move it — HarvestHub has a place for you.
          </p>
        </ScrollReveal>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {[
            {
              title: "Farmers",
              desc: "List crops, get AI pricing, sell directly.",
              emoji: "👨‍🌾",
              bg: "bg-[#c5e84d]/15 border-[#c5e84d]/25",
            },
            {
              title: "Buyers",
              desc: "Browse verified produce, buy fresh from farms.",
              emoji: "🛒",
              bg: "bg-primary/10 border-primary/20",
            },
            {
              title: "Suppliers",
              desc: "Source bulk produce at transparent prices.",
              emoji: "🚛",
              bg: "bg-amber-500/10 border-amber-500/20",
            },
            {
              title: "Agents",
              desc: "Help farmers list and manage their produce.",
              emoji: "🤝",
              bg: "bg-blue-500/10 border-blue-500/20",
            },
          ].map((role, i) => (
            <ScrollReveal key={role.title} delay={i * 0.08}>
              <LiftCard
                className={`rounded-2xl md:rounded-3xl border ${role.bg} p-5 md:p-7 text-center h-full cursor-default`}
              >
                <span className="text-3xl md:text-4xl block mb-3">
                  {role.emoji}
                </span>
                <h3 className="text-base md:text-lg font-bold text-foreground mb-1.5">
                  {role.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {role.desc}
                </p>
              </LiftCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  SECTION 7 — FINAL CTA                                       */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16 md:pb-24">
        <ScrollReveal>
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-primary py-14 md:py-20 px-6 md:px-16 text-center">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72 bg-white/[0.06] rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-40 h-40 md:w-56 md:h-56 bg-white/[0.04] rounded-full translate-y-1/2 -translate-x-1/4" />

            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight">
                Ready to transform
                <br /> how you trade?
              </h2>
              <p className="mt-4 text-primary-foreground/80 max-w-lg mx-auto text-sm md:text-base">
                Join thousands of farmers and buyers already trading on HarvestHub.
                Fair prices, zero middlemen, powered by AI.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/register"
                  className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-base font-semibold text-primary shadow-md hover:bg-white/90 transition-all active:scale-[0.97]"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/marketplace"
                  className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-full border-2 border-white/30 px-7 text-base font-semibold text-primary-foreground hover:bg-white/10 transition-all active:scale-[0.97]"
                >
                  Explore Market
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Footer (hidden on mobile since bottom nav takes its role) ── */}
      <footer className="hidden border-t border-border/40 md:block">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sprout className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">HarvestHub</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/marketplace" className="hover:text-foreground transition-colors">
                Marketplace
              </Link>
              <Link href="/login" className="hover:text-foreground transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="hover:text-foreground transition-colors">
                Register
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Built for Techphilia 9.0
            </p>
          </div>
        </div>
      </footer>

      {/* ── Mobile native bottom navigation ── */}
      <PublicBottomNav />
    </div>
  );
}
