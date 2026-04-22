"use client";

import { useState, useEffect, useCallback } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  Package,
  Eye,
  TrendingUp,
  BarChart3,
  Power,
} from "lucide-react";

interface ListingData {
  id: string;
  crop: string;
  variety: string | null;
  quantityQuintals: number;
  pricePerQuintal: number;
  isActive: boolean;
  views: number;
  createdAt: string;
  isFresh: boolean;
}

interface MarketData {
  crop: string;
  myPrice: number;
  marketAvg: number;
}

export function SellerDashboard() {
  const { data: session } = authClient.useSession();
  const [listings, setListings] = useState<ListingData[]>([]);
  const [allListings, setAllListings] = useState<ListingData[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = session?.user?.id;

  const fetchData = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const [myRes, allRes] = await Promise.all([
        fetch(`/api/listings?seller_id=${userId}`),
        fetch("/api/listings"),
      ]);
      const myData = await myRes.json();
      const allData = await allRes.json();
      setListings(myData.listings || []);
      setAllListings(allData.listings || []);
    } catch {
      console.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeactivate = async (id: string) => {
    await fetch(`/api/listings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: false }),
    });
    fetchData();
  };

  // Stats
  const activeListings = listings.filter((l) => l.isActive);
  const totalViews = listings.reduce((sum, l) => sum + l.views, 0);
  const avgPrice =
    activeListings.length > 0
      ? activeListings.reduce((sum, l) => sum + l.pricePerQuintal, 0) /
        activeListings.length
      : 0;

  // Market average for crops this seller lists
  const myCrops = [...new Set(activeListings.map((l) => l.crop))];
  const marketListingsForMyCrops = allListings.filter((l) =>
    myCrops.includes(l.crop)
  );
  const marketAvg =
    marketListingsForMyCrops.length > 0
      ? marketListingsForMyCrops.reduce(
          (sum, l) => sum + l.pricePerQuintal,
          0
        ) / marketListingsForMyCrops.length
      : 0;

  // Chart data: my price vs market avg per crop
  const chartData: MarketData[] = myCrops.map((crop) => {
    const myListingsForCrop = activeListings.filter((l) => l.crop === crop);
    const allListingsForCrop = allListings.filter((l) => l.crop === crop);
    return {
      crop,
      myPrice:
        myListingsForCrop.reduce((sum, l) => sum + l.pricePerQuintal, 0) /
        (myListingsForCrop.length || 1),
      marketAvg:
        allListingsForCrop.reduce((sum, l) => sum + l.pricePerQuintal, 0) /
        (allListingsForCrop.length || 1),
    };
  });

  const chartConfig = {
    myPrice: {
      label: "Your Price",
      color: "var(--chart-1)",
    },
    marketAvg: {
      label: "Market Avg",
      color: "var(--chart-2)",
    },
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-72 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Listings</p>
                <p className="text-3xl font-bold mt-1">
                  {activeListings.length}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-3xl font-bold mt-1">{totalViews}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Eye className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Your Avg Price</p>
                <p className="text-3xl font-bold mt-1">
                  ₹{Math.round(avgPrice).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Market Avg</p>
                <p className="text-3xl font-bold mt-1">
                  ₹{Math.round(marketAvg).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <BarChart3 className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Price Comparison Chart */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Your Prices vs Market Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="crop" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `₹${v}`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="myPrice"
                  fill="var(--color-myPrice)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="marketAvg"
                  fill="var(--color-marketAvg)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Listings Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Your Listings</CardTitle>
        </CardHeader>
        <CardContent>
          {activeListings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No active listings yet.{" "}
                <a
                  href="/listings/new"
                  className="text-primary font-medium hover:underline"
                >
                  Create your first listing →
                </a>
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Crop</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price/qtl</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings.map((l) => (
                    <TableRow key={l.id}>
                      <TableCell className="font-medium">
                        {l.crop}
                        {l.variety && (
                          <span className="text-muted-foreground ml-1">
                            ({l.variety})
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{l.quantityQuintals} qtl</TableCell>
                      <TableCell>
                        ₹{l.pricePerQuintal.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell>{l.views}</TableCell>
                      <TableCell>
                        {l.isActive ? (
                          <Badge
                            variant="outline"
                            className="bg-emerald-50 text-emerald-700 border-emerald-200"
                          >
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {l.isActive && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeactivate(l.id)}
                          >
                            <Power className="h-4 w-4 mr-1" />
                            Deactivate
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
