"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MapPin, Mail, Wheat } from "lucide-react";

export interface ListingData {
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

interface ListingCardProps {
  listing: ListingData;
  onView?: (id: string) => void;
}

export function ListingCard({ listing, onView }: ListingCardProps) {
  const handleClick = () => {
    // Fire-and-forget view increment
    fetch(`/api/listings/${listing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ incrementViews: true }),
    });
    onView?.(listing.id);
  };

  return (
    <Card
      className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
      onClick={handleClick}
    >
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Wheat className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground leading-tight">
                {listing.crop}
              </h3>
              {listing.variety && (
                <p className="text-xs text-muted-foreground">{listing.variety}</p>
              )}
            </div>
          </div>
          {listing.isFresh && (
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
              🟢 Fresh
            </Badge>
          )}
        </div>

        {/* Price & Quantity */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="rounded-lg bg-primary/5 p-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Price</p>
            <p className="font-bold text-primary text-lg leading-tight">
              ₹{listing.pricePerQuintal.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-muted-foreground">per quintal</p>
          </div>
          <div className="rounded-lg bg-accent/50 p-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Quantity</p>
            <p className="font-bold text-foreground text-lg leading-tight">
              {listing.quantityQuintals}
            </p>
            <p className="text-xs text-muted-foreground">quintals</p>
          </div>
        </div>

        {/* Seller Info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          {listing.sellerName && (
            <span className="font-medium text-foreground">
              {listing.sellerName}
            </span>
          )}
          {listing.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {listing.location}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="h-3 w-3" />
            {listing.views} views
          </span>
          {listing.sellerEmail && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `mailto:${listing.sellerEmail}?subject=Inquiry about ${listing.crop}`;
              }}
            >
              <Mail className="h-3 w-3 mr-1" />
              Contact Seller
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
