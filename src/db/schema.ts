import {
  pgTable,
  uuid,
  text,
  integer,
  doublePrecision,
  timestamp,
  boolean,
  varchar,
} from "drizzle-orm/pg-core";

export const feedbacks = pgTable("feedbacks", {
  id: uuid("id").defaultRandom().primaryKey(),
  // Reporter info
  reporterName: varchar("reporter_name", { length: 255 }).notNull(),
  reporterRole: varchar("reporter_role", { length: 100 }).notNull(),
  region: varchar("region", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  address: text("address").notNull(),
  postCode: varchar("post_code", { length: 20 }).notNull(),
  // Ratings (1-5)
  signalStrength: integer("signal_strength").notNull(),
  dataSpeed: integer("data_speed").notNull(),
  callQuality: integer("call_quality").notNull(),
  smsReliability: integer("sms_reliability").notNull(),
  networkStability: integer("network_stability").notNull(),
  // Speedtest results (optional)
  downloadSpeed: doublePrecision("download_speed"),
  uploadSpeed: doublePrecision("upload_speed"),
  speedtestUrl: varchar("speedtest_url", { length: 2048 }),
  // Comparison
  overallSatisfaction: integer("overall_satisfaction").notNull(),
  comparedToBefore: varchar("compared_to_before", { length: 50 }).notNull(),
  // Details
  primaryIssue: varchar("primary_issue", { length: 255 }),
  issueFrequency: varchar("issue_frequency", { length: 50 }),
  affectedAreas: text("affected_areas"),
  customerComplaints: boolean("customer_complaints").default(false),
  additionalNotes: text("additional_notes"),
  // Meta
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Feedback = typeof feedbacks.$inferSelect;
export type NewFeedback = typeof feedbacks.$inferInsert;
