"use client";

import { useState, useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
  Bar,
  BarChart,
  ComposedChart,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useForecastQuery } from "@/hooks/use-forecast-query";
import {
  fetchCropForecast,
  fetchMarketPrices,
  type CropForecastResponse,
  type MarketPriceResponse,
} from "@/lib/forecasting-api";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Activity,
  BarChart3,
  CandlestickChart,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  crops: string[];
}

export function CropPriceChart({ crops }: Props) {
  const [selectedCrop, setSelectedCrop] = useState(crops[0] ?? "Rice");
  const [metric, setMetric] = useState<"Production" | "Yield">("Production");

  // Fetch forecast data
  const {
    data: forecast,
    loading: forecastLoading,
    refetch: refetchForecast,
  } = useForecastQuery<CropForecastResponse>(
    () => fetchCropForecast(selectedCrop, metric),
    [selectedCrop, metric],
  );

  // Fetch market prices
  const {
    data: market,
    loading: marketLoading,
    refetch: refetchMarket,
  } = useForecastQuery<MarketPriceResponse>(
    () => fetchMarketPrices(selectedCrop),
    [selectedCrop],
  );

  const loading = forecastLoading || marketLoading;

  // Build combined chart data
  const chartData = useMemo(() => {
    if (!forecast) return [];
    const metricKey = metric.toLowerCase();
    
    const historical = (forecast.historical_data ?? []).map((d) => ({
      year: d.year,
      value: (d as any)[metricKey],
      type: "historical" as const,
    }));
    const forecastPts = (forecast.forecast ?? []).map((d) => ({
      year: d.year,
      value: (d as any)[metricKey],
      lower: d.lower_bound,
      upper: d.upper_bound,
      type: "forecast" as const,
    }));
    return [...historical, ...forecastPts];
  }, [forecast, metric]);

  // Build price forecast data
  const priceData = useMemo(() => {
    if (!market) return [];
    return [
      { date: "Today", price: market.current_price },
      ...(market.price_forecast ?? []).map((p) => ({
        date: new Date(p.date).toLocaleDateString("en-IN", {
          month: "short",
          year: "2-digit",
        }),
        price: p.price,
      })),
    ];
  }, [market]);

  const trendColor =
    market?.price_trend === "increasing"
      ? "text-emerald-500"
      : market?.price_trend === "decreasing"
      ? "text-red-500"
      : "text-amber-500";

  const TrendIcon =
    market?.price_trend === "increasing"
      ? TrendingUp
      : market?.price_trend === "decreasing"
      ? TrendingDown
      : Minus;

  const handleRefresh = () => {
    refetchForecast();
    refetchMarket();
  };

  return (
    <Card className="overflow-hidden border-border/50 bg-card/95 backdrop-blur-sm">
      <CardHeader className="border-b border-border/30 pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <CandlestickChart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Price & Forecast Terminal</CardTitle>
              <CardDescription className="text-xs">
                AI-powered production forecasts & market price simulation
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="w-[160px] h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {crops.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="h-8 w-8 p-0"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </div>

        {/* Market price summary bar */}
        {market && !marketLoading && (
          <div className="mt-3 flex flex-wrap items-center gap-4 rounded-lg bg-muted/40 px-4 py-2.5">
            <div>
              <span className="text-xs text-muted-foreground">Current Price</span>
              <p className="text-xl font-bold font-mono tracking-tight">
                ₹{market.current_price.toLocaleString("en-IN")}
                <span className="text-xs text-muted-foreground font-normal ml-1">
                  /quintal
                </span>
              </p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <span className="text-xs text-muted-foreground">Trend</span>
              <p className={`flex items-center gap-1 font-semibold capitalize ${trendColor}`}>
                <TrendIcon className="h-4 w-4" />
                {market.price_trend}
              </p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <span className="text-xs text-muted-foreground">Source</span>
              <Badge
                variant="secondary"
                className="mt-0.5 text-[10px] uppercase tracking-wider"
              >
                {market.data_source}
              </Badge>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <span className="text-xs text-muted-foreground">Confidence</span>
              <p className="font-semibold text-sm">
                {forecast?.forecast_confidence
                  ? `${(forecast.forecast_confidence * 100).toFixed(0)}%`
                  : "—"}
              </p>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <Tabs defaultValue="forecast" className="w-full">
          <div className="border-b border-border/30 px-4 pt-2">
            <TabsList variant="line" className="h-9">
              <TabsTrigger value="forecast" className="text-xs gap-1.5">
                <Activity className="h-3.5 w-3.5" /> Production Forecast
              </TabsTrigger>
              <TabsTrigger value="price" className="text-xs gap-1.5">
                <BarChart3 className="h-3.5 w-3.5" /> Price Forecast
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Production Forecast Tab */}
          <TabsContent value="forecast" className="mt-0">
            <div className="flex items-center gap-2 px-4 pt-3">
              <Select
                value={metric}
                onValueChange={(v) => setMetric(v as "Production" | "Yield")}
              >
                <SelectTrigger className="w-[130px] h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Production">Production</SelectItem>
                  <SelectItem value="Yield">Yield</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-[10px] text-muted-foreground">
                {metric === "Production" ? "tonnes" : "tonnes/hectare"}
              </span>
            </div>

            <div className="px-2 py-3 h-[350px]">
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    <span className="text-xs text-muted-foreground">
                      Loading forecast…
                    </span>
                  </div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={chartData}
                    margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
                  >
                    <defs>
                      <linearGradient id="historicalGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(150, 60%, 45%)" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(150, 60%, 45%)" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(200, 80%, 55%)" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(200, 80%, 55%)" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(150, 10%, 80%)"
                      opacity={0.2}
                    />
                    <XAxis
                      dataKey="year"
                      tick={{ fontSize: 11, fill: "hsl(150, 10%, 50%)" }}
                      tickLine={false}
                      axisLine={{ stroke: "hsl(150, 10%, 80%)", opacity: 0.3 }}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "hsl(150, 10%, 50%)" }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) =>
                        v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v.toString()
                      }
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(150, 15%, 12%)",
                        border: "1px solid hsl(150, 40%, 30%)",
                        borderRadius: "8px",
                        padding: "10px 14px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                      }}
                      labelStyle={{ color: "hsl(150, 60%, 85%)", fontWeight: 700, marginBottom: "4px" }}
                      itemStyle={{ color: "hsl(150, 90%, 65%)", fontWeight: 600, fontSize: "14px" }}
                      labelFormatter={(v) => `Year: ${v}`}
                      formatter={(value: number) => [
                        value?.toLocaleString("en-IN") ?? "—",
                        metric,
                      ]}
                    />
                    {/* Forecast divider */}
                    {forecast?.historical_data?.length && (
                      <ReferenceLine
                        x={forecast.historical_data[forecast.historical_data.length - 1]?.year}
                        stroke="hsl(200, 60%, 55%)"
                        strokeDasharray="4 4"
                        opacity={0.6}
                        label={{
                          value: "Forecast →",
                          position: "top",
                          style: { fontSize: 10, fill: "hsl(200, 60%, 55%)" },
                        }}
                      />
                    )}
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(150, 60%, 45%)"
                      fill="url(#historicalGrad)"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 5, strokeWidth: 2, stroke: "hsl(150, 60%, 45%)" }}
                    />
                    {chartData.some((d) => d.type === "forecast" && "lower" in d) && (
                      <>
                        <Area
                          type="monotone"
                          dataKey="upper"
                          stroke="none"
                          fill="hsl(200, 80%, 55%)"
                          fillOpacity={0.08}
                        />
                        <Area
                          type="monotone"
                          dataKey="lower"
                          stroke="none"
                          fill="hsl(200, 80%, 55%)"
                          fillOpacity={0.08}
                        />
                      </>
                    )}
                  </ComposedChart>
                </ResponsiveContainer>
              )}
            </div>
          </TabsContent>

          {/* Price Forecast Tab */}
          <TabsContent value="price" className="mt-0">
            <div className="px-2 py-3 h-[350px]">
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={priceData}
                    margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
                  >
                    <defs>
                      <linearGradient id="priceBarGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(150, 60%, 45%)" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="hsl(150, 60%, 45%)" stopOpacity={0.4} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(150, 10%, 80%)"
                      opacity={0.2}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fill: "hsl(150, 10%, 50%)" }}
                      tickLine={false}
                      axisLine={{ stroke: "hsl(150, 10%, 80%)", opacity: 0.3 }}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "hsl(150, 10%, 50%)" }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `₹${(v / 1000).toFixed(1)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(150, 15%, 12%)",
                        border: "1px solid hsl(150, 40%, 30%)",
                        borderRadius: "8px",
                        padding: "10px 14px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                      }}
                      labelStyle={{ color: "hsl(150, 60%, 85%)", fontWeight: 700, marginBottom: "4px" }}
                      itemStyle={{ color: "hsl(150, 90%, 65%)", fontWeight: 600, fontSize: "14px" }}
                      formatter={(value: number) => [
                        `₹${value?.toLocaleString("en-IN")}`,
                        "Price/quintal",
                      ]}
                    />
                    <Bar
                      dataKey="price"
                      fill="url(#priceBarGrad)"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={48}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
