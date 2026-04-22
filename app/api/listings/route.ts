import { db } from "@/db/drizzle";
import { listing, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq, and, desc, asc, sql, or, ilike } from "drizzle-orm";
import { headers } from "next/headers";

// GET /api/listings — public feed with filters
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const crop = searchParams.get("crop");
  const sort = searchParams.get("sort");
  const search = searchParams.get("search");
  const sellerId = searchParams.get("seller_id");

  const conditions = [eq(listing.isActive, true)];

  if (crop) {
    conditions.push(ilike(listing.crop, crop));
  }

  if (sellerId) {
    conditions.push(eq(listing.sellerId, sellerId));
  }

  if (search) {
    conditions.push(
      or(
        ilike(listing.crop, `%${search}%`),
        ilike(listing.variety, `%${search}%`)
      )!
    );
  }

  let orderBy;
  switch (sort) {
    case "price_asc":
      orderBy = asc(listing.pricePerQuintal);
      break;
    case "price_desc":
      orderBy = desc(listing.pricePerQuintal);
      break;
    case "freshness":
    default:
      orderBy = desc(listing.createdAt);
      break;
  }

  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const results = await db
    .select({
      id: listing.id,
      crop: listing.crop,
      variety: listing.variety,
      quantityQuintals: listing.quantityQuintals,
      pricePerQuintal: listing.pricePerQuintal,
      description: listing.description,
      location: listing.location,
      isActive: listing.isActive,
      views: listing.views,
      createdAt: listing.createdAt,
      sellerId: listing.sellerId,
      sellerName: user.name,
      sellerEmail: user.email,
    })
    .from(listing)
    .leftJoin(user, eq(listing.sellerId, user.id))
    .where(and(...conditions))
    .orderBy(orderBy);

  const listings = results.map((r) => ({
    ...r,
    isFresh: r.createdAt >= oneDayAgo,
  }));

  return Response.json({ listings });
}

// POST /api/listings — create listing (farmer only)
export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const currentUser = session.user as Record<string, unknown>;
  if (currentUser.role !== "farmer") {
    return Response.json({ error: "Only farmers can create listings" }, { status: 403 });
  }

  const body = await req.json();
  const { crop, variety, quantityQuintals, pricePerQuintal, description, location } = body;

  if (!crop || !quantityQuintals || !pricePerQuintal) {
    return Response.json({ error: "crop, quantityQuintals, and pricePerQuintal are required" }, { status: 400 });
  }

  const [newListing] = await db
    .insert(listing)
    .values({
      sellerId: session.user.id,
      crop,
      variety: variety || null,
      quantityQuintals: Number(quantityQuintals),
      pricePerQuintal: Number(pricePerQuintal),
      description: description || null,
      location: location || (currentUser.location as string) || null,
    })
    .returning();

  return Response.json({ listing: newListing }, { status: 201 });
}
