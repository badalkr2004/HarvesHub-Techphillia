import { db } from "@/db/drizzle";
import { listing, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq, sql } from "drizzle-orm";
import { headers } from "next/headers";

// GET /api/listings/[id] — single listing detail
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

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
    .where(eq(listing.id, id))
    .limit(1);

  if (results.length === 0) {
    return Response.json({ error: "Listing not found" }, { status: 404 });
  }

  const row = results[0];
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  return Response.json({
    listing: {
      ...row,
      isFresh: row.createdAt >= oneDayAgo,
    },
  });
}

// PATCH /api/listings/[id] — update views or deactivate
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  // Increment views (fire-and-forget, no auth needed)
  if (body.incrementViews) {
    await db
      .update(listing)
      .set({ views: sql`${listing.views} + 1` })
      .where(eq(listing.id, id));

    return Response.json({ ok: true });
  }

  // Deactivate/update requires auth
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [existing] = await db
    .select()
    .from(listing)
    .where(eq(listing.id, id))
    .limit(1);

  if (!existing || existing.sellerId !== session.user.id) {
    return Response.json({ error: "Not found or not authorized" }, { status: 403 });
  }

  const updates: Record<string, unknown> = {};
  if (typeof body.isActive === "boolean") updates.isActive = body.isActive;
  if (body.pricePerQuintal) updates.pricePerQuintal = Number(body.pricePerQuintal);
  if (body.quantityQuintals) updates.quantityQuintals = Number(body.quantityQuintals);
  if (body.description !== undefined) updates.description = body.description;

  if (Object.keys(updates).length === 0) {
    return Response.json({ error: "No valid fields to update" }, { status: 400 });
  }

  const [updated] = await db
    .update(listing)
    .set(updates)
    .where(eq(listing.id, id))
    .returning();

  return Response.json({ listing: updated });
}
