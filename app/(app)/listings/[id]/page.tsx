"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  MapPin,
  Eye,
  Mail,
  Wheat,
  Calendar,
  Scale,
} from "lucide-react";

interface ListingDetail {
  id: string;
  crop: string;
  variety: string | null;
  quantityQuintals: number;
  pricePerQuintal: number;
  description: string | null;
  location: string | null;
  isActive: boolean;
  views: number;
  createdAt: string;
  sellerId: string;
  sellerName: string | null;
  sellerEmail: string | null;
  isFresh: boolean;
}

export default function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [listing, setListing] = useState<ListingDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await fetch(`/api/listings/${id}`);
        const data = await res.json();
        setListing(data.listing || null);
      } catch {
        console.error("Failed to fetch listing");
      } finally {
        setLoading(false);
      }
    }
    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 text-5xl">❌</div>
        <h2 className="text-xl font-semibold">Listing not found</h2>
        <Link href="/marketplace" className="mt-4">
          <Button variant="outline">Back to Marketplace</Button>
        </Link>
      </div>
    );
  }

  const createdDate = new Date(listing.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/marketplace"
          className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {listing.crop}
            {listing.variety ? ` — ${listing.variety}` : ""}
          </h1>
        </div>
        {listing.isFresh && (
          <Badge className="ml-auto bg-emerald-100 text-emerald-700 border-emerald-200">
            🟢 Fresh
          </Badge>
        )}
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Price & Quantity Hero */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-primary/5 p-5 text-center">
              <p className="text-sm text-muted-foreground mb-1">
                Price per quintal
              </p>
              <p className="text-3xl font-bold text-primary">
                ₹{listing.pricePerQuintal.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="rounded-xl bg-accent/50 p-5 text-center">
              <p className="text-sm text-muted-foreground mb-1">
                Available Quantity
              </p>
              <p className="text-3xl font-bold text-foreground">
                {listing.quantityQuintals}{" "}
                <span className="text-base font-normal text-muted-foreground">
                  qtl
                </span>
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Wheat className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Crop:</span> {listing.crop}
              {listing.variety && ` (${listing.variety})`}
            </div>
            {listing.location && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Location:</span>{" "}
                {listing.location}
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Scale className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Total Value:</span> ₹
              {(
                listing.pricePerQuintal * listing.quantityQuintals
              ).toLocaleString("en-IN")}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Listed:</span> {createdDate}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Views:</span> {listing.views}
            </div>
          </div>

          {/* Description */}
          {listing.description && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {listing.description}
              </p>
            </div>
          )}

          {/* Seller Card */}
          <div className="rounded-xl border p-4">
            <h3 className="text-sm font-semibold mb-3">Seller Information</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{listing.sellerName}</p>
                <p className="text-sm text-muted-foreground">
                  {listing.sellerEmail}
                </p>
              </div>
              {listing.sellerEmail && (
                <Button
                  onClick={() => {
                    window.location.href = `mailto:${listing.sellerEmail}?subject=Inquiry about ${listing.crop}&body=Hi ${listing.sellerName}, I am interested in your ${listing.crop} listing of ${listing.quantityQuintals} quintals at ₹${listing.pricePerQuintal}/quintal.`;
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Seller
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
