"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  Signal,
  Wifi,
  Phone,
  MessageSquare,
  Activity,
  Star,
  Users,
  RefreshCcw,
  Loader2,
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Clock,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Gauge,
} from "lucide-react";
import { translations, type Language } from "@/data/translations";

interface Stats {
  totalResponses: number;
  avgSignalStrength: number;
  avgDataSpeed: number;
  avgCallQuality: number;
  avgSmsReliability: number;
  avgNetworkStability: number;
  avgOverallSatisfaction: number;
  avgDownloadSpeed: number;
  avgUploadSpeed: number;
  maxDownloadSpeed: number;
  maxUploadSpeed: number;
  minDownloadSpeed: number;
  minUploadSpeed: number;
  avgTimDownloadSpeed: number;
  avgTimUploadSpeed: number;
  maxTimDownloadSpeed: number;
  maxTimUploadSpeed: number;
  minTimDownloadSpeed: number;
  minTimUploadSpeed: number;
  timReportsCount: number;
}

interface FeedbackItem {
  id: string;
  reporterName: string;
  reporterRole: string;
  region: string;
  city: string;
  address: string | null;
  postCode: string | null;
  signalStrength: number;
  dataSpeed: number;
  downloadSpeed: number;
  uploadSpeed: number;
  timDownloadSpeed: number | null;
  timUploadSpeed: number | null;
  timSpeedtestUrl: string | null;
  callQuality: number;
  smsReliability: number;
  networkStability: number;
  overallSatisfaction: number;
  comparedToBefore: string;
  primaryIssue: string | null;
  issueFrequency: string | null;
  affectedAreas: string | null;
  customerComplaints: boolean | null;
  additionalNotes: string | null;
  createdAt: string;
}

interface DashboardProps {
  language: Language;
}

function RatingBar({
  label,
  value,
  icon: Icon,
  accentColor,
}: {
  label: string;
  value: number;
  icon: typeof Signal;
  accentColor: string;
}) {
  const percentage = (value / 5) * 100;
  const barColor =
    value >= 4
      ? "bg-accent-green"
      : value >= 3
      ? "bg-accent-yellow"
      : value >= 2
      ? "bg-orange-400"
      : "bg-red-500";

  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className={`w-7 h-7 rounded-lg ${accentColor} flex items-center justify-center shrink-0`}>
        <Icon size={14} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-slate-600 truncate">{label}</span>
          <span className="text-xs font-bold text-primary">
            {value > 0 ? value.toFixed(1) : "—"}<span className="text-slate-300">/5</span>
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5">
          <div
            className={`${barColor} h-2.5 rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ language }: DashboardProps) {
  const t = translations[language];
  const td = t.dashboard;

  const [stats, setStats] = useState<Stats | null>(null);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  const comparisonLabels: Record<
    string,
    { label: string; color: string; bg: string; icon: typeof TrendingUp }
  > = {
    much_better: { label: td.comparisonLabels.muchBetter, color: "text-accent-green", bg: "bg-accent-green/10", icon: TrendingUp },
    better: { label: td.comparisonLabels.better, color: "text-accent-blue", bg: "bg-accent-blue/10", icon: TrendingUp },
    same: { label: td.comparisonLabels.same, color: "text-yellow-600", bg: "bg-accent-yellow/20", icon: Minus },
    worse: { label: td.comparisonLabels.worse, color: "text-orange-500", bg: "bg-orange-50", icon: TrendingDown },
    much_worse: { label: td.comparisonLabels.muchWorse, color: "text-red-600", bg: "bg-red-50", icon: TrendingDown },
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, feedbackRes] = await Promise.all([
        fetch("/api/feedback/stats"),
        fetch("/api/feedback"),
      ]);
      const statsData = await statsRes.json();
      const feedbackData = await feedbackRes.json();
      setStats(statsData.stats);
      setFeedbacks(feedbackData.feedbacks || []);
    } catch {
      console.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 size={36} className="animate-spin text-accent-blue mb-3" />
        <p className="text-sm text-slate-400">{td.loading}</p>
      </div>
    );
  }

  return (
    <div className="pb-6 animate-slide-up">
      {/* Refresh */}
      <div className="flex items-center justify-end px-4 mb-4">
        <button
          onClick={fetchData}
          className="flex items-center gap-1.5 text-xs text-accent-blue font-semibold hover:text-accent-blue/80 bg-accent-blue/5 px-3 py-1.5 rounded-full transition-all"
        >
          <RefreshCcw size={12} />
          {td.refresh}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="px-4 grid grid-cols-2 gap-3 mb-5">
        {/* Total */}
        <div className="bg-bg-card rounded-2xl p-4 shadow-sm border border-accent-peach/30 col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wide mb-0.5">
                {td.totalResponses}
              </p>
              <p className="text-4xl font-extrabold text-primary">
                {stats?.totalResponses ?? 0}
              </p>
              <p className="text-[10px] text-slate-300 mt-0.5">{td.totalResponsesSubtitle}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-accent-blue to-accent-purple rounded-2xl flex items-center justify-center shadow-lg shadow-accent-blue/20">
              <Users size={26} className="text-white" />
            </div>
          </div>
        </div>

        {/* Satisfaction */}
        <div className="bg-bg-card rounded-2xl p-4 shadow-sm border border-accent-peach/30">
          <div className="flex items-center gap-1.5 mb-2">
            <Star size={12} className="text-star-gold fill-star-gold" />
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">
              {td.satisfaction}
            </p>
          </div>
          <p className="text-3xl font-extrabold text-primary">
            {stats?.avgOverallSatisfaction ? Number(stats.avgOverallSatisfaction).toFixed(1) : "—"}
          </p>
          <p className="text-[10px] text-slate-300">{td.outOfFive}</p>
        </div>

        {/* Data Speed */}
        <div className="bg-bg-card rounded-2xl p-4 shadow-sm border border-accent-peach/30">
          <div className="flex items-center gap-1.5 mb-2">
            <Wifi size={12} className="text-accent-cyan" />
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">
              {td.dataSpeed}
            </p>
          </div>
          <p className="text-3xl font-extrabold text-primary">
            {stats?.avgDataSpeed ? Number(stats.avgDataSpeed).toFixed(1) : "—"}
          </p>
          <p className="text-[10px] text-slate-300">{td.outOfFive}</p>
        </div>
      </div>

      {/* Rating Bars */}
      {stats && stats.totalResponses > 0 && (
        <div className="px-4 mb-5">
          <div className="bg-bg-card rounded-2xl p-5 shadow-sm border border-accent-peach/30">
            <h3 className="font-bold text-primary mb-1 flex items-center gap-2 text-[15px]">
              <BarChart3 size={16} className="text-accent-blue" />
              {td.averageRatings}
            </h3>
            <p className="text-[10px] text-slate-400 mb-3 ml-6">
              {td.aggregatedFrom.replace("all responses", `all ${stats.totalResponses} ${td.totalResponses.toLowerCase()}`)}
            </p>
            <RatingBar label={td.avgSignalStrength} value={Number(stats.avgSignalStrength) || 0} icon={Signal} accentColor="bg-accent-blue" />
            <RatingBar label={td.avgDataSpeed} value={Number(stats.avgDataSpeed) || 0} icon={Wifi} accentColor="bg-accent-cyan" />
            <RatingBar label={td.avgCallQuality} value={Number(stats.avgCallQuality) || 0} icon={Phone} accentColor="bg-accent-green" />
            <RatingBar label={td.avgSmsReliability} value={Number(stats.avgSmsReliability) || 0} icon={MessageSquare} accentColor="bg-accent-purple" />
            <RatingBar label={td.avgNetworkStability} value={Number(stats.avgNetworkStability) || 0} icon={Activity} accentColor="bg-orange-400" />
          </div>
        </div>
      )}

      {/* Speed Analysis Chart */}
      {stats && stats.totalResponses > 0 && (
        <div className="px-4 mb-5">
          <div className="bg-bg-card rounded-2xl p-5 shadow-sm border border-accent-peach/30">
            <h3 className="font-bold text-primary mb-1 flex items-center gap-2 text-[15px]">
              <Gauge size={16} className="text-accent-cyan" />
              {td.speedAnalysis}
            </h3>
            <p className="text-[10px] text-slate-400 mb-4 ml-6">
              {td.speedAnalysisSubtitle}
            </p>

            {/* Bar Chart */}
            <div className="flex items-end justify-around gap-4 px-2 pt-2 pb-1 h-48">
              {/* Avg Download */}
              <div className="flex flex-col items-center flex-1">
                <span className="text-[11px] font-bold text-primary mb-1">
                  {Number(stats.avgDownloadSpeed).toFixed(1)}
                </span>
                <div className="w-full max-w-[70px] bg-accent-blue/10 rounded-t-xl flex items-end justify-center overflow-hidden" style={{ height: "120px" }}>
                  <div
                    className="w-full bg-gradient-to-t from-accent-blue to-accent-cyan rounded-t-xl transition-all duration-1000"
                    style={{ height: `${Math.min((Number(stats.avgDownloadSpeed) / Math.max(Number(stats.maxDownloadSpeed), 1)) * 100, 100)}%` }}
                  />
                </div>
                <span className="text-[9px] text-slate-400 mt-1.5 font-medium uppercase tracking-wide">
                  {td.avgDownloadSpeed}
                </span>
              </div>

              {/* Avg Upload */}
              <div className="flex flex-col items-center flex-1">
                <span className="text-[11px] font-bold text-primary mb-1">
                  {Number(stats.avgUploadSpeed).toFixed(1)}
                </span>
                <div className="w-full max-w-[70px] bg-accent-purple/10 rounded-t-xl flex items-end justify-center overflow-hidden" style={{ height: "120px" }}>
                  <div
                    className="w-full bg-gradient-to-t from-accent-purple to-accent-peach rounded-t-xl transition-all duration-1000"
                    style={{ height: `${Math.min((Number(stats.avgUploadSpeed) / Math.max(Number(stats.maxUploadSpeed), 1)) * 100, 100)}%` }}
                  />
                </div>
                <span className="text-[9px] text-slate-400 mt-1.5 font-medium uppercase tracking-wide">
                  {td.avgUploadSpeed}
                </span>
              </div>

              {/* Max Download */}
              <div className="flex flex-col items-center flex-1">
                <span className="text-[11px] font-bold text-primary mb-1">
                  {Number(stats.maxDownloadSpeed).toFixed(1)}
                </span>
                <div className="w-full max-w-[70px] bg-accent-blue/10 rounded-t-xl flex items-end justify-center overflow-hidden" style={{ height: "120px" }}>
                  <div
                    className="w-full bg-gradient-to-t from-accent-blue to-accent-cyan rounded-t-xl transition-all duration-1000"
                    style={{ height: `${Math.min((Number(stats.maxDownloadSpeed) / Math.max(Number(stats.maxDownloadSpeed), 1)) * 100, 100)}%` }}
                  />
                </div>
                <span className="text-[9px] text-slate-400 mt-1.5 font-medium uppercase tracking-wide">
                  {td.maxDownloadSpeed}
                </span>
              </div>

              {/* Max Upload */}
              <div className="flex flex-col items-center flex-1">
                <span className="text-[11px] font-bold text-primary mb-1">
                  {Number(stats.maxUploadSpeed).toFixed(1)}
                </span>
                <div className="w-full max-w-[70px] bg-accent-purple/10 rounded-t-xl flex items-end justify-center overflow-hidden" style={{ height: "120px" }}>
                  <div
                    className="w-full bg-gradient-to-t from-accent-purple to-accent-peach rounded-t-xl transition-all duration-1000"
                    style={{ height: `${Math.min((Number(stats.maxUploadSpeed) / Math.max(Number(stats.maxDownloadSpeed), 1)) * 100, 100)}%` }}
                  />
                </div>
                <span className="text-[9px] text-slate-400 mt-1.5 font-medium uppercase tracking-wide">
                  {td.maxUploadSpeed}
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-accent-blue to-accent-cyan" />
                <span className="text-[10px] text-slate-500 font-medium">{td.download}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-accent-purple to-accent-peach" />
                <span className="text-[10px] text-slate-500 font-medium">{td.upload}</span>
              </div>
              <span className="text-[10px] text-slate-300 font-medium">({td.mbps})</span>
            </div>

            {/* Min/Max summary */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-accent-blue/5 rounded-xl p-3">
                <p className="text-[9px] text-slate-400 uppercase tracking-wide font-medium mb-0.5">
                  {td.minDownloadSpeed}
                </p>
                <p className="text-sm font-bold text-primary">
                  {Number(stats.minDownloadSpeed).toFixed(1)} <span className="text-[9px] text-slate-300 font-medium">{td.mbps}</span>
                </p>
              </div>
              <div className="bg-accent-purple/5 rounded-xl p-3">
                <p className="text-[9px] text-slate-400 uppercase tracking-wide font-medium mb-0.5">
                  {td.minUploadSpeed}
                </p>
                <p className="text-sm font-bold text-primary">
                  {Number(stats.minUploadSpeed).toFixed(1)} <span className="text-[9px] text-slate-300 font-medium">{td.mbps}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lycamobile vs TIM Comparison */}
      {stats && stats.totalResponses > 0 && (
        <div className="px-4 mb-5">
          <div className="bg-bg-card rounded-2xl p-5 shadow-sm border border-accent-peach/30">
            <h3 className="font-bold text-primary mb-1 flex items-center gap-2 text-[15px]">
              <BarChart3 size={16} className="text-accent-green" />
              {td.networkComparison}
            </h3>
            <p className="text-[10px] text-slate-400 mb-4 ml-6">
              {td.networkComparisonSubtitle}
            </p>

            {/* Comparison Bars */}
            <div className="space-y-4">
              {/* Download Comparison */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                    {td.download}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {stats.timReportsCount > 0 ? `${stats.timReportsCount} ${td.timReports}` : td.noTimData}
                  </span>
                </div>
                <div className="space-y-2">
                  {/* Lycamobile Download */}
                  <div className="flex items-center gap-2">
                    <span className="w-16 text-[9px] font-semibold text-accent-blue uppercase tracking-wide shrink-0">
                      {td.lycamobileShort}
                    </span>
                    <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min((Number(stats.avgDownloadSpeed) / Math.max(Number(stats.maxDownloadSpeed), Number(stats.maxTimDownloadSpeed), 1)) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="w-14 text-right text-[11px] font-bold text-primary shrink-0">
                      {Number(stats.avgDownloadSpeed).toFixed(1)} <span className="text-[8px] text-slate-300 font-medium">{td.mbps}</span>
                    </span>
                  </div>
                  {/* TIM Download */}
                  <div className="flex items-center gap-2">
                    <span className="w-16 text-[9px] font-semibold text-accent-purple uppercase tracking-wide shrink-0">
                      {td.timShort}
                    </span>
                    <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent-purple to-accent-peach rounded-full transition-all duration-1000"
                        style={{ width: `${stats.timReportsCount > 0 ? Math.min((Number(stats.avgTimDownloadSpeed) / Math.max(Number(stats.maxDownloadSpeed), Number(stats.maxTimDownloadSpeed), 1)) * 100, 100) : 0}%` }}
                      />
                    </div>
                    <span className="w-14 text-right text-[11px] font-bold text-primary shrink-0">
                      {stats.timReportsCount > 0 ? `${Number(stats.avgTimDownloadSpeed).toFixed(1)}` : "—"} <span className="text-[8px] text-slate-300 font-medium">{td.mbps}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Upload Comparison */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                    {td.upload}
                  </span>
                </div>
                <div className="space-y-2">
                  {/* Lycamobile Upload */}
                  <div className="flex items-center gap-2">
                    <span className="w-16 text-[9px] font-semibold text-accent-blue uppercase tracking-wide shrink-0">
                      {td.lycamobileShort}
                    </span>
                    <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min((Number(stats.avgUploadSpeed) / Math.max(Number(stats.maxUploadSpeed), Number(stats.maxTimUploadSpeed), 1)) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="w-14 text-right text-[11px] font-bold text-primary shrink-0">
                      {Number(stats.avgUploadSpeed).toFixed(1)} <span className="text-[8px] text-slate-300 font-medium">{td.mbps}</span>
                    </span>
                  </div>
                  {/* TIM Upload */}
                  <div className="flex items-center gap-2">
                    <span className="w-16 text-[9px] font-semibold text-accent-purple uppercase tracking-wide shrink-0">
                      {td.timShort}
                    </span>
                    <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent-purple to-accent-peach rounded-full transition-all duration-1000"
                        style={{ width: `${stats.timReportsCount > 0 ? Math.min((Number(stats.avgTimUploadSpeed) / Math.max(Number(stats.maxUploadSpeed), Number(stats.maxTimUploadSpeed), 1)) * 100, 100) : 0}%` }}
                      />
                    </div>
                    <span className="w-14 text-right text-[11px] font-bold text-primary shrink-0">
                      {stats.timReportsCount > 0 ? `${Number(stats.avgTimUploadSpeed).toFixed(1)}` : "—"} <span className="text-[8px] text-slate-300 font-medium">{td.mbps}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-gradient-to-r from-accent-blue to-accent-cyan" />
                <span className="text-[10px] text-slate-500 font-medium">{td.lycamobile}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-gradient-to-r from-accent-purple to-accent-peach" />
                <span className="text-[10px] text-slate-500 font-medium">{td.tim}</span>
              </div>
              <span className="text-[10px] text-slate-300 font-medium">({td.mbps})</span>
            </div>
          </div>
        </div>
      )}

      {/* Recent Feedbacks */}
      <div className="px-4">
        <h3 className="font-bold text-primary mb-3 flex items-center gap-2 text-[15px]">
          <Clock size={16} className="text-accent-purple" />
          {td.recentFeedback}
          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold ml-auto">
            {feedbacks.length}
          </span>
        </h3>

        {feedbacks.length === 0 ? (
          <div className="bg-bg-card rounded-2xl p-10 shadow-sm border border-accent-peach/30 text-center">
            <div className="w-14 h-14 mx-auto mb-3 bg-accent-peach/30 rounded-2xl flex items-center justify-center">
              <MessageSquare size={24} className="text-accent-peach" />
            </div>
            <p className="text-sm text-slate-500 font-medium">{td.noFeedback}</p>
            <p className="text-xs text-slate-300 mt-1">
              {td.noFeedbackSubtitle}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {feedbacks.map((fb) => {
              const comp = comparisonLabels[fb.comparedToBefore];
              const CompIcon = comp?.icon || Minus;
              const primaryIssueDisplay = language === "it"
                ? (() => {
                    const idx = translations.en.form.issueTypes.indexOf(fb.primaryIssue ?? "");
                    return idx >= 0 ? translations.it.form.issueTypes[idx] : fb.primaryIssue;
                  })()
                : fb.primaryIssue;
              const issueFreqDisplay = language === "it"
                ? (() => {
                    const idx = translations.en.form.frequencies.indexOf(fb.issueFrequency ?? "");
                    return idx >= 0 ? translations.it.form.frequencies[idx] : fb.issueFrequency;
                  })()
                : fb.issueFrequency;
              return (
                <div
                  key={fb.id}
                  className="bg-bg-card rounded-2xl p-4 shadow-sm border border-accent-peach/20 hover:shadow-md transition-shadow"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent-blue rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        {fb.reporterName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary leading-tight">
                          {fb.reporterName}
                        </p>
                        <p className="text-[10px] text-slate-400">{fb.reporterRole}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-star-gold/15 px-2 py-1 rounded-lg">
                      <Star size={11} className="fill-star-gold text-star-gold" />
                      <span className="text-xs font-bold text-yellow-700">{fb.overallSatisfaction}</span>
                    </div>
                  </div>

                  {/* Location & time */}
                  <div className="ml-[46px] mb-3">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                      <MapPin size={10} className="shrink-0" />
                      {fb.city}{fb.postCode ? ` ${fb.postCode}` : ""}, {fb.region}
                      <span className="text-slate-200 mx-0.5">•</span>
                      {new Date(fb.createdAt).toLocaleDateString(language === "it" ? "it-IT" : "en-GB", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    {fb.address && (
                      <p className="text-[10px] text-slate-300 mt-0.5 ml-[14px]">
                        📍 {fb.address}
                      </p>
                    )}
                  </div>

                  {/* Mini ratings */}
                  <div className="grid grid-cols-5 gap-1.5 mb-3">
                    {[
                      { icon: Signal, val: fb.signalStrength, tip: td.signal, bg: "bg-accent-blue/8" },
                      { icon: Wifi, val: fb.dataSpeed, tip: td.data, bg: "bg-accent-cyan/8" },
                      { icon: Phone, val: fb.callQuality, tip: td.call, bg: "bg-accent-green/8" },
                      { icon: MessageSquare, val: fb.smsReliability, tip: td.sms, bg: "bg-accent-purple/8" },
                      { icon: Activity, val: fb.networkStability, tip: td.stability, bg: "bg-orange-50" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col items-center gap-0.5 ${item.bg} rounded-xl py-2`}
                      >
                        <item.icon size={11} className="text-slate-400" />
                        <span className="text-[12px] font-bold text-primary">{item.val}</span>
                        <span className="text-[7px] text-slate-400 uppercase tracking-wider font-medium">
                          {item.tip}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Speed details */}
                  <div className="grid grid-cols-2 gap-1.5 mb-3">
                    <div className="flex items-center gap-2 bg-accent-blue/5 rounded-xl px-3 py-2">
                      <ArrowDown size={12} className="text-accent-blue shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[8px] text-slate-400 uppercase tracking-wider font-medium">
                          {td.lycamobileShort} {td.download}
                        </p>
                        <p className="text-[13px] font-bold text-primary leading-tight">
                          {Number(fb.downloadSpeed).toFixed(1)} <span className="text-[9px] text-slate-300 font-medium">{td.mbps}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-accent-purple/5 rounded-xl px-3 py-2">
                      <ArrowUp size={12} className="text-accent-purple shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[8px] text-slate-400 uppercase tracking-wider font-medium">
                          {td.lycamobileShort} {td.upload}
                        </p>
                        <p className="text-[13px] font-bold text-primary leading-tight">
                          {Number(fb.uploadSpeed).toFixed(1)} <span className="text-[9px] text-slate-300 font-medium">{td.mbps}</span>
                        </p>
                      </div>
                    </div>
                    {fb.timDownloadSpeed !== null && fb.timDownloadSpeed !== undefined && (
                      <div className="flex items-center gap-2 bg-accent-purple/5 rounded-xl px-3 py-2">
                        <ArrowDown size={12} className="text-accent-purple shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[8px] text-slate-400 uppercase tracking-wider font-medium">
                            {td.timShort} {td.download}
                          </p>
                          <p className="text-[13px] font-bold text-primary leading-tight">
                            {Number(fb.timDownloadSpeed).toFixed(1)} <span className="text-[9px] text-slate-300 font-medium">{td.mbps}</span>
                          </p>
                        </div>
                      </div>
                    )}
                    {fb.timUploadSpeed !== null && fb.timUploadSpeed !== undefined && (
                      <div className="flex items-center gap-2 bg-accent-purple/5 rounded-xl px-3 py-2">
                        <ArrowUp size={12} className="text-accent-purple shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[8px] text-slate-400 uppercase tracking-wider font-medium">
                            {td.timShort} {td.upload}
                          </p>
                          <p className="text-[13px] font-bold text-primary leading-tight">
                            {Number(fb.timUploadSpeed).toFixed(1)} <span className="text-[9px] text-slate-300 font-medium">{td.mbps}</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Comparison badge */}
                  {comp && (
                    <div className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${comp.color} ${comp.bg} px-2.5 py-1 rounded-lg`}>
                      <CompIcon size={11} />
                      {td.vsBefore}: {comp.label}
                    </div>
                  )}

                  {/* Issue */}
                  {primaryIssueDisplay && primaryIssueDisplay !== (language === "it" ? translations.it.form.issueTypes[0] : translations.en.form.issueTypes[0]) && (
                    <div className="flex items-start gap-1.5 mt-2 text-[11px] text-red-600 bg-red-50 rounded-xl px-3 py-2">
                      <AlertTriangle size={12} className="shrink-0 mt-0.5" />
                      <span>
                        {primaryIssueDisplay}
                        {issueFreqDisplay ? ` — ${issueFreqDisplay}` : ""}
                      </span>
                    </div>
                  )}

                  {/* Notes */}
                  {fb.additionalNotes && (
                    <p className="text-[11px] text-slate-400 mt-2.5 italic border-l-2 border-accent-peach pl-2.5 leading-relaxed">
                      &ldquo;{fb.additionalNotes}&rdquo;
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
