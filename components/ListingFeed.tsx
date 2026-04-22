"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListingCard, type ListingData } from "@/components/ListingCard";
import { Search, SlidersHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function ListingFeed() {
  const [listings, setListings] = useState<ListingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("freshness");
  const [cropFilter, setCropFilter] = useState("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // 300ms debounce for search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (sort) params.set("sort", sort);
    if (cropFilter && cropFilter !== "all") params.set("crop", cropFilter);

    try {
      const res = await fetch(`/api/listings?${params}`);
      const data = await res.json();
      setListings(data.listings || []);
    } catch {
      console.error("Failed to fetch listings");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, sort, cropFilter]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  // Extract unique crops for filter dropdown
  const uniqueCrops = Array.from(new Set(listings.map((l) => l.crop)));

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="marketplace-search"
            placeholder="Search crops, varieties…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={cropFilter} onValueChange={setCropFilter}>
            <SelectTrigger className="w-[140px]" id="crop-filter">
              <SlidersHorizontal className="h-4 w-4 mr-1" />
              <SelectValue placeholder="All Crops" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Crops</SelectItem>
              {uniqueCrops.map((crop) => (
                <SelectItem key={crop} value={crop}>
                  {crop}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[150px]" id="sort-select">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="freshness">Newest First</SelectItem>
              <SelectItem value="price_asc">Price: Low → High</SelectItem>
              <SelectItem value="price_desc">Price: High → Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      {!loading && (
        <p className="text-sm text-muted-foreground">
          {listings.length} listing{listings.length !== 1 ? "s" : ""} found
        </p>
      )}

      {/* Listings Grid */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 text-5xl">🌾</div>
          <h3 className="text-lg font-semibold">No listings found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
