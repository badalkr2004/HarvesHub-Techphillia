import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const nebius = createOpenAI({
  baseURL: process.env.NEBIUS_BASE_URL,
  apiKey: process.env.NEBIUS_API_KEY,
});

export async function POST(req: Request) {
  const { crop, variety, quantity, location } = await req.json();

  if (!crop || !quantity || !location) {
    return Response.json(
      { error: "crop, quantity, and location are required" },
      { status: 400 }
    );
  }

  try {
    const { text } = await generateText({
      model: nebius(process.env.NEBIUS_MODEL_ID!),
      prompt: `A farmer in ${location} is selling ${quantity} quintals of ${crop}${variety ? `, ${variety}` : ""}. Suggest a competitive price range per quintal in INR (₹) in 1 sentence. Be specific with numbers.`,
      maxOutputTokens: 150,
    });

    return Response.json({ suggestion: text });
  } catch (error) {
    console.error("AI price suggestion error:", error);
    return Response.json(
      { suggestion: "Unable to generate price suggestion at this time. Please set your price based on local market rates." },
      { status: 200 }
    );
  }
}
