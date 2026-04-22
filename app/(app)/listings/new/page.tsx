"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PriceSuggester } from "@/components/PriceSuggester";
import { ArrowLeft, Wheat } from "lucide-react";
import Link from "next/link";

export default function NewListingPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user as Record<string, unknown> | undefined;

  const [crop, setCrop] = useState("");
  const [variety, setVariety] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(
    (user?.location as string) || ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crop,
          variety: variety || undefined,
          quantityQuintals: Number(quantity),
          pricePerQuintal: Number(price),
          description: description || undefined,
          location,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create listing");
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create Listing</h1>
          <p className="text-sm text-muted-foreground">
            List your produce for buyers across the marketplace
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Wheat className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Crop Details</CardTitle>
              <CardDescription>
                Fill in your produce details. AI will suggest pricing.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="listing-crop">Crop *</Label>
                <Input
                  id="listing-crop"
                  placeholder="e.g. Wheat"
                  required
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="listing-variety">Variety</Label>
                <Input
                  id="listing-variety"
                  placeholder="e.g. Sharbati"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="listing-quantity">Quantity (quintals) *</Label>
                <Input
                  id="listing-quantity"
                  type="number"
                  min="0.1"
                  step="0.1"
                  placeholder="10"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="listing-price">Price per quintal (₹) *</Label>
                <Input
                  id="listing-price"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="2200"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            {/* AI Price Suggestion */}
            <PriceSuggester
              crop={crop}
              variety={variety}
              quantity={quantity}
              location={location}
            />

            <div className="space-y-2">
              <Label htmlFor="listing-location">Location *</Label>
              <Input
                id="listing-location"
                placeholder="Patna, Bihar"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="listing-description">
                Description{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </Label>
              <Textarea
                id="listing-description"
                placeholder="Describe quality, harvest date, storage conditions…"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Publishing…" : "Publish Listing"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
