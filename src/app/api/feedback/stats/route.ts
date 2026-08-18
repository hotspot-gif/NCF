import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { feedbacks } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const db = getDb();
    const result = await db
      .select({
        totalResponses: sql<number>`count(*)::int`,
        avgSignalStrength: sql<number>`round(avg(${feedbacks.signalStrength})::numeric, 1)`,
        avgDataSpeed: sql<number>`round(avg(${feedbacks.dataSpeed})::numeric, 1)`,
        avgCallQuality: sql<number>`round(avg(${feedbacks.callQuality})::numeric, 1)`,
        avgSmsReliability: sql<number>`round(avg(${feedbacks.smsReliability})::numeric, 1)`,
        avgNetworkStability: sql<number>`round(avg(${feedbacks.networkStability})::numeric, 1)`,
        avgOverallSatisfaction: sql<number>`round(avg(${feedbacks.overallSatisfaction})::numeric, 1)`,
        avgDownloadSpeed: sql<number>`round(coalesce(avg(${feedbacks.downloadSpeed}), 0)::numeric, 1)`,
        avgUploadSpeed: sql<number>`round(coalesce(avg(${feedbacks.uploadSpeed}), 0)::numeric, 1)`,
        maxDownloadSpeed: sql<number>`coalesce(max(${feedbacks.downloadSpeed}), 0)`,
        maxUploadSpeed: sql<number>`coalesce(max(${feedbacks.uploadSpeed}), 0)`,
        minDownloadSpeed: sql<number>`coalesce(min(${feedbacks.downloadSpeed}), 0)`,
        minUploadSpeed: sql<number>`coalesce(min(${feedbacks.uploadSpeed}), 0)`,
      })
      .from(feedbacks);

    const stats = result[0] || {
      totalResponses: 0,
      avgSignalStrength: 0,
      avgDataSpeed: 0,
      avgCallQuality: 0,
      avgSmsReliability: 0,
      avgNetworkStability: 0,
      avgOverallSatisfaction: 0,
      avgDownloadSpeed: 0,
      avgUploadSpeed: 0,
      maxDownloadSpeed: 0,
      maxUploadSpeed: 0,
      minDownloadSpeed: 0,
      minUploadSpeed: 0,
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
