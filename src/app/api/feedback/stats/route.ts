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
        avgDownloadSpeed: sql<number>`round(avg(${feedbacks.downloadSpeed})::numeric, 1)`,
        avgUploadSpeed: sql<number>`round(avg(${feedbacks.uploadSpeed})::numeric, 1)`,
        maxDownloadSpeed: sql<number>`max(${feedbacks.downloadSpeed})`,
        maxUploadSpeed: sql<number>`max(${feedbacks.uploadSpeed})`,
        minDownloadSpeed: sql<number>`min(${feedbacks.downloadSpeed})`,
        minUploadSpeed: sql<number>`min(${feedbacks.uploadSpeed})`,
        avgTimDownloadSpeed: sql<number>`round(avg(${feedbacks.timDownloadSpeed})::numeric, 1)`,
        avgTimUploadSpeed: sql<number>`round(avg(${feedbacks.timUploadSpeed})::numeric, 1)`,
        maxTimDownloadSpeed: sql<number>`max(${feedbacks.timDownloadSpeed})`,
        maxTimUploadSpeed: sql<number>`max(${feedbacks.timUploadSpeed})`,
        minTimDownloadSpeed: sql<number>`min(${feedbacks.timDownloadSpeed})`,
        minTimUploadSpeed: sql<number>`min(${feedbacks.timUploadSpeed})`,
        timReportsCount: sql<number>`count(${feedbacks.timDownloadSpeed})`,
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
      avgTimDownloadSpeed: 0,
      avgTimUploadSpeed: 0,
      maxTimDownloadSpeed: 0,
      maxTimUploadSpeed: 0,
      minTimDownloadSpeed: 0,
      minTimUploadSpeed: 0,
      timReportsCount: 0,
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
