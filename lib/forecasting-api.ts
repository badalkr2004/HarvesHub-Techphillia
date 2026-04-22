/**
 * Forecasting API client — connects to the FastAPI backend.
 *
 * Base URL defaults to http://localhost:8000 (the backend dev server).
 */

const API_BASE =
  process.env.FORECAST_API_URL ?? "https://ae0b-47-31-110-223.ngrok-free.app";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface HistoricalDataPoint {
  year: number;
  value: number;
  [key: string]: unknown;
}

export interface ForecastPoint {
  year: number;
  forecast: number;
  lower_bound?: number;
  upper_bound?: number;
  [key: string]: unknown;
}

export interface CropForecastResponse {
  status: string;
  crop: string;
  metric: string;
  historical_data: HistoricalDataPoint[];
  forecast: ForecastPoint[];
  forecast_confidence: number | null;
  last_updated: string;
}

export interface OptimalCrop {
  crop: string;
  current_yield: number;
  yield_trend: "increasing" | "decreasing" | "stable";
  forecasted_yield?: number;
  growth_potential?: number;
  confidence_score?: number;
  profit_potential: "high" | "moderate" | "low";
}

export interface OptimalCropsResponse {
  status: string;
  region: string;
  optimal_crops: OptimalCrop[];
  explanation: string;
  last_updated: string;
}

export interface PriceForecastPoint {
  date: string;
  price: number;
}

export interface MarketPriceResponse {
  status: string;
  crop: string;
  current_price: number;
  price_trend: "increasing" | "decreasing" | "stable" | "unknown";
  price_forecast: PriceForecastPoint[];
  data_source: string;
  last_updated: string;
}

export interface CropCalendarEntry {
  season: string;
  planting: string;
  harvesting: string;
}

export interface CropCalendarResponse {
  status: string;
  crop_calendars: Record<string, CropCalendarEntry[]>;
  last_updated: string;
}

export interface RegionalDemandItem {
  crop: string;
  forecast_values: number[];
  forecast_years: number[];
}

export interface CropListResponse {
  status: string;
  crops: string[];
  count: number;
}

export interface RegionListResponse {
  status: string;
  regions: string[];
  count: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error");
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------

/** List all available crops in the dataset */
export function fetchCrops(): Promise<CropListResponse> {
  return apiFetch<CropListResponse>("/crops");
}

/** List all available regions / districts */
export function fetchRegions(): Promise<RegionListResponse> {
  return apiFetch<RegionListResponse>("/regions");
}

/** Forecast crop production or yield */
export function fetchCropForecast(
  cropName = "wheat",
  metric = "Production",
): Promise<CropForecastResponse> {
  return apiFetch<CropForecastResponse>("/forecast/crop", {
    method: "POST",
    body: JSON.stringify({ crop_name: cropName, metric }),
  });
}

/** Get optimal crop recommendations for a region */
export function fetchOptimalCrops(
  region = "Buxar",
  topN = 5,
): Promise<OptimalCropsResponse> {
  return apiFetch<OptimalCropsResponse>("/recommend/optimal-crops", {
    method: "POST",
    body: JSON.stringify({ region, top_n: topN }),
  });
}

/** Get simulated market prices for a crop */
export function fetchMarketPrices(
  cropName: string,
): Promise<MarketPriceResponse> {
  return apiFetch<MarketPriceResponse>(
    `/market-prices/${encodeURIComponent(cropName)}`,
  );
}

/** Get crop planting / harvesting calendar */
export function fetchCropCalendar(
  cropName?: string,
): Promise<CropCalendarResponse> {
  return apiFetch<CropCalendarResponse>("/crop-calendar", {
    method: "POST",
    body: JSON.stringify({ crop_name: cropName ?? null }),
  });
}

/** Get regional demand forecasts */
export function fetchRegionalDemand(
  region = "Buxar",
  topN = 5,
  periods = 5,
): Promise<RegionalDemandItem[]> {
  return apiFetch<RegionalDemandItem[]>("/api/forecast/regional_demand", {
    method: "POST",
    body: JSON.stringify({ region, top_n: topN, periods }),
  });
}
