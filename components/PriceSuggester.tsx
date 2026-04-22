"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Lightbulb } from "lucide-react";

interface PriceSuggesterProps {
  crop: string;
  variety: string;
  quantity: string;
  location: string;
}

export function PriceSuggester({
  crop,
  variety,
  quantity,
  location,
}: PriceSuggesterProps) {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!crop || !quantity || !location) {
      setSuggestion(null);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/ai/suggest-price", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            crop,
            variety: variety || undefined,
            quantity: Number(quantity),
            location,
          }),
        });
        const data = await res.json();
        setSuggestion(data.suggestion);
      } catch {
        setSuggestion(null);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [crop, variety, quantity, location]);

  if (!crop || !quantity || !location) return null;

  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
      {loading ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ) : suggestion ? (
        <div className="flex gap-2">
          <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">
            <span className="font-semibold">AI Suggestion:</span> {suggestion}
          </p>
        </div>
      ) : null}
    </div>
  );
}
