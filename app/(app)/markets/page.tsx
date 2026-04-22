"use client";

import { useEffect, useState } from "react";
import { PriceTicker } from "@/components/markets/PriceTicker";
import { CropPriceChart } from "@/components/markets/CropPriceChart";
import { fetchCrops } from "@/lib/forecasting-api";

export default function MarketsPage() {
  const [crops, setCrops] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCrops() {
      try {
        const res = await fetchCrops();
        if (res.status === "success" && res.crops.length > 0) {
          setCrops(res.crops);
        } else {
          setCrops(["Rice", "Wheat", "Maize", "Potato", "Onion"]);
        }
      } catch (err) {
        console.error("Failed to load crops", err);
        setCrops(["Rice", "Wheat", "Maize", "Potato", "Onion"]);
      } finally {
        setLoading(false);
      }
    }
    loadCrops();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Market Terminal</h1>
        <p className="text-muted-foreground mt-1">
          AI-powered crop forecasting and market insights
        </p>
      </div>

      <PriceTicker />

      {loading ? (
        <div className="h-[400px] w-full animate-pulse rounded-xl bg-card border" />
      ) : (
        <CropPriceChart crops={crops} />
      )}
    </div>
  );
}
