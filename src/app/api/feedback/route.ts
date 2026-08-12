import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db";
import { feedbacks } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "reporterName",
      "reporterRole",
      "region",
      "city",
      "address",
      "postCode",
      "signalStrength",
      "dataSpeed",
      "callQuality",
      "smsReliability",
      "networkStability",
      "downloadSpeed",
      "uploadSpeed",
      "speedtestUrl",
      "overallSatisfaction",
      "comparedToBefore",
    ];

    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null || body[field] === "") {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate rating fields are 1-5
    const ratingFields = [
      "signalStrength",
      "dataSpeed",
      "callQuality",
      "smsReliability",
      "networkStability",
      "overallSatisfaction",
    ];

    for (const field of ratingFields) {
      const val = Number(body[field]);
      if (isNaN(val) || val < 1 || val > 5) {
        return NextResponse.json(
          { error: `${field} must be a number between 1 and 5` },
          { status: 400 }
        );
      }
    }

    // Validate speed values are non-negative numbers (allow 0 and decimals)
    const speedFields = ["downloadSpeed", "uploadSpeed"];
    for (const field of speedFields) {
      const val = Number(body[field]);
      if (isNaN(val) || val < 0) {
        return NextResponse.json(
          { error: `${field} must be a valid non-negative number` },
          { status: 400 }
        );
      }
    }

    if (typeof body.speedtestUrl !== "string" || !body.speedtestUrl.trim()) {
      return NextResponse.json(
        { error: "speedtestUrl must be a valid URL string" },
        { status: 400 }
      );
    }

    const newFeedback = await db
      .insert(feedbacks)
      .values({
        reporterName: body.reporterName,
        reporterRole: body.reporterRole,
        region: body.region,
        city: body.city,
        address: body.address,
        postCode: body.postCode,
        signalStrength: Number(body.signalStrength),
        dataSpeed: Number(body.dataSpeed),
        callQuality: Number(body.callQuality),
        smsReliability: Number(body.smsReliability),
        networkStability: Number(body.networkStability),
        downloadSpeed: Number(body.downloadSpeed),
        uploadSpeed: Number(body.uploadSpeed),
        speedtestUrl: body.speedtestUrl.trim(),
        overallSatisfaction: Number(body.overallSatisfaction),
        comparedToBefore: body.comparedToBefore,
        primaryIssue: body.primaryIssue || null,
        issueFrequency: body.issueFrequency || null,
        affectedAreas: body.affectedAreas || null,
        customerComplaints: body.customerComplaints || false,
        additionalNotes: body.additionalNotes || null,
      })
      .returning();

    return NextResponse.json(
      { success: true, feedback: newFeedback[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating feedback:", error);
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = getDb();
    const allFeedbacks = await db
      .select()
      .from(feedbacks)
      .orderBy(desc(feedbacks.createdAt))
      .limit(100);

    return NextResponse.json({ feedbacks: allFeedbacks });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedbacks" },
      { status: 500 }
    );
  }
}
