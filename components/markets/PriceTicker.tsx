"use client";

import { useEffect, useState, useRef } from "react";
import { fetchMarketPrices, type MarketPriceResponse } from "@/lib/forecasting-api";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const TICKER_CROPS = ["Rice", "Wheat", "Maize", "Potato", "Onion", "Sugarcane", "Gram", "Rapeseed &Mustard"];

interface TickerItem {
  crop: string;
  price: number;
  trend: string;
  change: number;
}

export function PriceTicker() {
  const [items, setItems] = useState<TickerItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      const results: TickerItem[] = [];
      for (const crop of TICKER_CROPS) {
        try {
          const data: MarketPriceResponse = await fetchMarketPrices(crop);
          const change =
            data.price_trend === "increasing"
              ? +(Math.random() * 4 + 1).toFixed(2)
              : data.price_trend === "decreasing"
              ? -(Math.random() * 4 + 1).toFixed(2)
              : +(Math.random() * 1 - 0.5).toFixed(2);
          results.push({
            crop: data.crop,
            price: data.current_price,
            trend: data.price_trend,
            change,
          });
        } catch {
          // Skip crops that error
        }
      }
      setItems(results);
    }
    load();
  }, []);

  // Auto-scroll animation
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || items.length === 0) return;
    let animId: number;
    let pos = 0;

    function step() {
      pos += 0.5;
      if (el) {
        if (pos >= el.scrollWidth / 2) pos = 0;
        el.scrollLeft = pos;
      }
      animId = requestAnimationFrame(step);
    }
    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="h-10 w-full animate-pulse rounded-lg bg-muted/50" />
    );
  }

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === "increasing") return <TrendingUp className="h-3 w-3" />;
    if (trend === "decreasing") return <TrendingDown className="h-3 w-3" />;
    return <Minus className="h-3 w-3" />;
  };

  // Duplicate items for seamless scroll
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm">
      {/* Gradient fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-card/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-card/80 to-transparent" />

      <div
        ref={scrollRef}
        className="flex items-center gap-6 overflow-hidden px-4 py-2.5 whitespace-nowrap"
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.crop}-${i}`}
            className="flex items-center gap-2.5 text-sm shrink-0"
          >
            <span className="font-semibold text-foreground tracking-tight">
              {item.crop}
            </span>
            <span className="font-mono font-medium text-foreground/90">
              ₹{item.price.toLocaleString("en-IN")}
            </span>
            <span
              className={`flex items-center gap-0.5 font-mono text-xs font-semibold ${
                item.change > 0
                  ? "text-emerald-500"
                  : item.change < 0
                  ? "text-red-500"
                  : "text-muted-foreground"
              }`}
            >
              <TrendIcon trend={item.trend} />
              {item.change > 0 ? "+" : ""}
              {item.change}%
            </span>
            <span className="text-border">│</span>
          </div>
        ))}
      </div>
    </div>
  );
}
