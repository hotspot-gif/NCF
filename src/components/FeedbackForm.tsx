"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Send,
  MapPin,
  Signal,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  ChevronDown,
  UserCircle,
  Zap,
  Search,
  X,
} from "lucide-react";
import StarRating from "./StarRating";
import { teamUsers, getUsersByOffice } from "@/data/users";
import { translations, type Language } from "@/data/translations";

interface FormData {
  reporterName: string;
  reporterRole: string;
  region: string;
  city: string;
  address: string;
  postCode: string;
  signalStrength: number;
  dataSpeed: number;
  downloadSpeed: string;
  uploadSpeed: string;
  speedtestUrl: string;
  callQuality: number;
  smsReliability: number;
  networkStability: number;
  overallSatisfaction: number;
  comparedToBefore: string;
  primaryIssue: string;
  issueFrequency: string;
  affectedAreas: string;
  customerComplaints: boolean;
  additionalNotes: string;
}

const initialFormData: FormData = {
  reporterName: "",
  reporterRole: "",
  region: "",
  city: "",
  address: "",
  postCode: "",
  signalStrength: 0,
  dataSpeed: 0,
  downloadSpeed: "",
  uploadSpeed: "",
  speedtestUrl: "",
  callQuality: 0,
  smsReliability: 0,
  networkStability: 0,
  overallSatisfaction: 0,
  comparedToBefore: "",
  primaryIssue: "",
  issueFrequency: "",
  affectedAreas: "",
  customerComplaints: false,
  additionalNotes: "",
};

const italianRegions = [
  "Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna",
  "Friuli-Venezia Giulia", "Lazio", "Liguria", "Lombardia", "Marche",
  "Molise", "Piemonte", "Puglia", "Sardegna", "Sicilia", "Toscana",
  "Trentino-Alto Adige", "Umbria", "Valle d'Aosta", "Veneto",
];

interface FeedbackFormProps {
  language: Language;
}

export default function FeedbackForm({ language }: FeedbackFormProps) {
  const t = translations[language];
  const tf = t.form;

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [showUserPicker, setShowUserPicker] = useState(false);

  const usersByOffice = useMemo(() => getUsersByOffice(), []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, submitted]);

  const filteredUsers = useMemo(() => {
    if (!userSearch.trim()) return null;
    const q = userSearch.toLowerCase();
    return teamUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.designation.toLowerCase().includes(q) ||
        (u.office && u.office.toLowerCase().includes(q))
    );
  }, [userSearch]);

  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectUser = (name: string, designation: string) => {
    updateField("reporterName", name);
    updateField("reporterRole", designation);
    setShowUserPicker(false);
    setUserSearch("");
  };

  const canProceedStep1 =
    formData.reporterName.trim() !== "" &&
    formData.reporterRole !== "" &&
    formData.region !== "" &&
    formData.city.trim() !== "" &&
    formData.address.trim() !== "" &&
    formData.postCode.trim() !== "";

  const canProceedStep2 =
    formData.signalStrength > 0 &&
    formData.dataSpeed > 0 &&
    formData.downloadSpeed !== "" &&
    Number(formData.downloadSpeed) >= 0 &&
    formData.uploadSpeed !== "" &&
    Number(formData.uploadSpeed) >= 0 &&
    formData.callQuality > 0 &&
    formData.smsReliability > 0 &&
    formData.networkStability > 0;

  const canSubmit =
    formData.overallSatisfaction > 0 && formData.comparedToBefore !== "";

  const comparisonOptions = [
    { value: "much_better", label: tf.muchBetter, emoji: "🟢", color: "border-accent-green bg-accent-green/5 text-accent-green" },
    { value: "better", label: tf.better, emoji: "🔵", color: "border-accent-blue bg-accent-blue/5 text-accent-blue" },
    { value: "same", label: tf.aboutSame, emoji: "🟡", color: "border-accent-yellow bg-accent-yellow/10 text-yellow-700" },
    { value: "worse", label: tf.worse, emoji: "🟠", color: "border-orange-400 bg-orange-50 text-orange-600" },
    { value: "much_worse", label: tf.muchWorse, emoji: "🔴", color: "border-red-400 bg-red-50 text-red-600" },
  ];

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const payload = {
        ...formData,
        downloadSpeed: Number(formData.downloadSpeed),
        uploadSpeed: Number(formData.uploadSpeed),
      };
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || tf.errors.submissionFailed);
      }
      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : tf.errors.somethingWentWrong;
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setStep(1);
    setSubmitted(false);
    setError("");
  };

  // ---------- SUCCESS ----------
  if (submitted) {
    return (
      <div className="animate-fade-in-scale flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-24 h-24 bg-accent-green/10 rounded-full flex items-center justify-center mb-6 animate-success-pulse">
          <CheckCircle2 size={52} className="text-accent-green" />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-2">
          {tf.successTitle}
        </h2>
        <p className="text-slate-600 mb-1">
          {tf.successMessage1}
        </p>
        <p className="text-sm text-slate-400 mb-8">
          {tf.successMessage2}
        </p>
        <button
          onClick={resetForm}
          className="bg-primary text-white px-8 py-3.5 rounded-2xl font-semibold shadow-lg shadow-primary/20 hover:bg-primary-light active:scale-95 transition-all"
        >
          {tf.submitAnother}
        </button>
      </div>
    );
  }

  // ---------- STEP LABELS ----------
  const stepLabels = tf.stepLabels;

  return (
    <div className="pb-6">
      {/* Progress Steps */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between relative">
          {/* Line behind */}
          <div className="absolute top-[18px] left-[24px] right-[24px] h-[3px] bg-slate-200 rounded-full" />
          <div
            className="absolute top-[18px] left-[24px] h-[3px] rounded-full transition-all duration-500 shimmer-bar"
            style={{ width: step === 1 ? "0%" : step === 2 ? "calc(50% - 12px)" : "calc(100% - 48px)" }}
          />

          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center z-10">
              <button
                onClick={() => { if (s < step) setStep(s); }}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  s === step
                    ? "bg-primary text-white shadow-lg shadow-primary/30 scale-110 ring-4 ring-primary/10"
                    : s < step
                    ? "bg-accent-green text-white shadow-md"
                    : "bg-white text-slate-300 border-2 border-slate-200"
                }`}
              >
                {s < step ? "✓" : s}
              </button>
              <span className={`text-[10px] mt-1.5 font-medium ${
                s === step ? "text-primary" : s < step ? "text-accent-green" : "text-slate-300"
              }`}>
                {stepLabels[s - 1]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ========== STEP 1: USER INFO ========== */}
      {step === 1 && (
        <div className="animate-slide-up px-4 space-y-4">
          {/* User Picker Card */}
          <div className="bg-bg-card rounded-2xl p-5 shadow-sm border border-accent-peach/30">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-accent-blue/10 flex items-center justify-center">
                <UserCircle size={18} className="text-accent-blue" />
              </div>
              <h3 className="font-bold text-primary text-[15px]">{tf.selectYourName}</h3>
            </div>

            {/* Selected User Display */}
            {formData.reporterName && !showUserPicker ? (
              <div className="flex items-center justify-between bg-accent-green/5 border border-accent-green/20 rounded-xl px-4 py-3 mb-1">
                <div>
                  <p className="text-sm font-semibold text-primary">{formData.reporterName}</p>
                  <p className="text-[11px] text-slate-500">{formData.reporterRole}</p>
                </div>
                <button
                  onClick={() => {
                    setShowUserPicker(true);
                    updateField("reporterName", "");
                    updateField("reporterRole", "");
                  }}
                  className="text-xs text-accent-blue font-semibold hover:underline"
                >
                  {tf.change}
                </button>
              </div>
            ) : (
              <div>
                {/* Search Bar */}
                <div className="relative mb-3">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => {
                      setUserSearch(e.target.value);
                      setShowUserPicker(true);
                    }}
                    onFocus={() => setShowUserPicker(true)}
                    placeholder={tf.searchNamePlaceholder}
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all"
                  />
                  {userSearch && (
                    <button
                      onClick={() => setUserSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* User List */}
                <div className="max-h-64 overflow-y-auto rounded-xl border border-slate-100 hide-scrollbar">
                  {filteredUsers && filteredUsers.length > 0 ? (
                    <div>
                      {filteredUsers.map((u) => (
                        <button
                          key={u.name}
                          onClick={() => selectUser(u.name, u.designation)}
                          className="w-full text-left px-4 py-2.5 hover:bg-accent-peach/20 border-b border-slate-50 last:border-0 transition-colors"
                        >
                          <p className="text-sm font-medium text-primary">{u.name}</p>
                          <p className="text-[11px] text-slate-400">
                            {u.designation}{u.office ? ` · ${u.office}` : ""}
                          </p>
                        </button>
                      ))}
                    </div>
                  ) : filteredUsers && filteredUsers.length === 0 ? (
                    <div className="py-6 text-center text-sm text-slate-400">
                      {tf.noUsersFound}
                    </div>
                  ) : (
                    // Default grouped list
                    <div>
                      {Object.entries(usersByOffice).map(([office, users]) => (
                        <div key={office}>
                          <div className="sticky top-0 bg-slate-50 px-4 py-1.5 text-[10px] font-bold text-accent-purple uppercase tracking-wider border-b border-slate-100">
                            {office === "Management" ? tf.management : `📍 ${office}`}
                          </div>
                          {users.map((u) => (
                            <button
                              key={u.name}
                              onClick={() => selectUser(u.name, u.designation)}
                              className="w-full text-left px-4 py-2.5 hover:bg-accent-peach/20 border-b border-slate-50 last:border-0 transition-colors"
                            >
                              <p className="text-sm font-medium text-primary">{u.name}</p>
                              <p className="text-[11px] text-slate-400">{u.designation}</p>
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Location Card */}
          <div className="bg-bg-card rounded-2xl p-5 shadow-sm border border-accent-peach/30">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-accent-green/10 flex items-center justify-center">
                <MapPin size={18} className="text-accent-green" />
              </div>
              <h3 className="font-bold text-primary text-[15px]">{tf.coverageLocation}</h3>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <label className="block text-xs font-semibold text-primary/70 mb-1.5 uppercase tracking-wide">
                  {tf.region} <span className="text-danger">{t.common.required}</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.region}
                    onChange={(e) => updateField("region", e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all appearance-none pr-10"
                  >
                    <option value="">{tf.selectRegion}</option>
                    {italianRegions.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary/70 mb-1.5 uppercase tracking-wide">
                  {tf.cityArea} <span className="text-danger">{t.common.required}</span>
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  placeholder={tf.cityPlaceholder}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary/70 mb-1.5 uppercase tracking-wide">
                  {tf.addressStreet} <span className="text-danger">{t.common.required}</span>
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  placeholder={tf.addressPlaceholder}
                  rows={2}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all resize-none"
                />
                <p className="text-[10px] text-slate-300 mt-1">
                  {tf.addressHint}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary/70 mb-1.5 uppercase tracking-wide">
                  {tf.postCode} <span className="text-danger">{t.common.required}</span>
                </label>
                <input
                  type="text"
                  value={formData.postCode}
                  onChange={(e) => updateField("postCode", e.target.value)}
                  placeholder={tf.postCodePlaceholder}
                  maxLength={10}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all"
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!canProceedStep1}
            className={`w-full py-3.5 rounded-2xl font-semibold text-white transition-all text-sm ${
              canProceedStep1
                ? "bg-primary shadow-lg shadow-primary/20 hover:bg-primary-light active:scale-[0.98]"
                : "bg-slate-300 cursor-not-allowed"
            }`}
          >
            {tf.continueToRatings}
          </button>
        </div>
      )}

      {/* ========== STEP 2: RATINGS ========== */}
      {step === 2 && (
        <div className="animate-slide-up px-4 space-y-4">
          <div className="bg-bg-card rounded-2xl p-5 shadow-sm border border-accent-peach/30">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-8 h-8 rounded-xl bg-accent-cyan/10 flex items-center justify-center">
                <Signal size={18} className="text-accent-cyan" />
              </div>
              <h3 className="font-bold text-primary text-[15px]">{tf.networkPerformance}</h3>
            </div>
            <p className="text-[11px] text-slate-400 mb-5 ml-[42px]">
              {tf.rateEachHint}
            </p>

            <StarRating
              label={tf.signalStrength}
              description={tf.signalStrengthDesc}
              value={formData.signalStrength}
              onChange={(v) => updateField("signalStrength", v)}
              ratingLabels={tf.ratingLabels}
            />
            <StarRating
              label={tf.dataSpeed}
              description={tf.dataSpeedDesc}
              value={formData.dataSpeed}
              onChange={(v) => updateField("dataSpeed", v)}
              ratingLabels={tf.ratingLabels}
            />
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-primary mb-0.5">
                  {tf.downloadSpeed}
                </label>
                <input
                  type="number"
                  value={formData.downloadSpeed}
                  onChange={(e) => updateField("downloadSpeed", e.target.value)}
                  step="0.1"
                  min="0"
                  inputMode="decimal"
                  placeholder={tf.downloadSpeedPlaceholder}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all"
                />
                <p className="text-[11px] text-slate-400 mt-2">
                  {tf.downloadSpeedDesc}
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-0.5">
                  {tf.uploadSpeed}
                </label>
                <input
                  type="number"
                  value={formData.uploadSpeed}
                  onChange={(e) => updateField("uploadSpeed", e.target.value)}
                  step="0.1"
                  min="0"
                  inputMode="decimal"
                  placeholder={tf.uploadSpeedPlaceholder}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all"
                />
                <p className="text-[11px] text-slate-400 mt-2">
                  {tf.uploadSpeedDesc}
                </p>
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-primary mb-0.5">
                {tf.speedtestUrl}
              </label>
              <input
                type="url"
                value={formData.speedtestUrl}
                onChange={(e) => updateField("speedtestUrl", e.target.value)}
                placeholder={tf.speedtestUrlPlaceholder}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all"
              />
            </div>
            <StarRating
              label={tf.callQuality}
              description={tf.callQualityDesc}
              value={formData.callQuality}
              onChange={(v) => updateField("callQuality", v)}
              ratingLabels={tf.ratingLabels}
            />
            <StarRating
              label={tf.smsReliability}
              description={tf.smsReliabilityDesc}
              value={formData.smsReliability}
              onChange={(v) => updateField("smsReliability", v)}
              ratingLabels={tf.ratingLabels}
            />
            <StarRating
              label={tf.networkStability}
              description={tf.networkStabilityDesc}
              value={formData.networkStability}
              onChange={(v) => updateField("networkStability", v)}
              ratingLabels={tf.ratingLabels}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3.5 rounded-2xl font-semibold text-primary bg-white border-2 border-slate-200 hover:border-primary/20 active:scale-[0.98] transition-all text-sm"
            >
              {tf.back}
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!canProceedStep2}
              className={`flex-[2] py-3.5 rounded-2xl font-semibold text-white transition-all text-sm ${
                canProceedStep2
                  ? "bg-primary shadow-lg shadow-primary/20 hover:bg-primary-light active:scale-[0.98]"
                  : "bg-slate-300 cursor-not-allowed"
              }`}
            >
              {tf.continue}
            </button>
          </div>
        </div>
      )}

      {/* ========== STEP 3: DETAILS + SUBMIT ========== */}
      {step === 3 && (
        <div className="animate-slide-up px-4 space-y-4">
          {/* Overall Assessment */}
          <div className="bg-bg-card rounded-2xl p-5 shadow-sm border border-accent-peach/30">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-accent-yellow/20 flex items-center justify-center">
                <Zap size={18} className="text-yellow-600" />
              </div>
              <h3 className="font-bold text-primary text-[15px]">{tf.overallAssessment}</h3>
            </div>

            <StarRating
              label={tf.overallSatisfaction}
              description={tf.overallSatisfactionDesc}
              value={formData.overallSatisfaction}
              onChange={(v) => updateField("overallSatisfaction", v)}
              ratingLabels={tf.ratingLabels}
            />

            <div className="mt-5">
              <label className="block text-xs font-semibold text-primary/70 mb-2.5 uppercase tracking-wide">
                {tf.comparedToBefore} <span className="text-danger">{t.common.required}</span>
              </label>
              <div className="grid grid-cols-1 gap-2">
                {comparisonOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => updateField("comparedToBefore", opt.value)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left text-sm font-medium transition-all ${
                      formData.comparedToBefore === opt.value
                        ? opt.color + " shadow-sm"
                        : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                    }`}
                  >
                    <span className="text-base">{opt.emoji}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Issue Details */}
          <div className="bg-bg-card rounded-2xl p-5 shadow-sm border border-accent-peach/30">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-accent-purple/10 flex items-center justify-center">
                <AlertTriangle size={18} className="text-accent-purple" />
              </div>
              <h3 className="font-bold text-primary text-[15px]">{tf.issueDetails}</h3>
              <span className="text-[10px] text-slate-300 ml-auto bg-slate-100 px-2 py-0.5 rounded-full font-medium">{t.common.optional}</span>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <label className="block text-xs font-semibold text-primary/70 mb-1.5 uppercase tracking-wide">
                  {tf.primaryIssue}
                </label>
                <div className="relative">
                  <select
                    value={formData.primaryIssue}
                    onChange={(e) => updateField("primaryIssue", e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all appearance-none pr-10"
                  >
                    <option value="">{tf.selectIssue}</option>
                    {tf.issueTypes.map((i, idx) => (
                      <option key={idx} value={translations.en.form.issueTypes[idx]}>{i}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs font-semibold text-primary/70 mb-1.5 uppercase tracking-wide">
                  {tf.howOften}
                </label>
                <div className="relative">
                  <select
                    value={formData.issueFrequency}
                    onChange={(e) => updateField("issueFrequency", e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all appearance-none pr-10"
                  >
                    <option value="">{tf.selectFrequency}</option>
                    {tf.frequencies.map((f, idx) => (
                      <option key={idx} value={translations.en.form.frequencies[idx]}>{f}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary/70 mb-1.5 uppercase tracking-wide">
                  {tf.affectedLocations}
                </label>
                <input
                  type="text"
                  value={formData.affectedAreas}
                  onChange={(e) => updateField("affectedAreas", e.target.value)}
                  placeholder={tf.affectedLocationsPlaceholder}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all"
                />
              </div>

              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-accent-peach/10 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.customerComplaints}
                  onChange={(e) => updateField("customerComplaints", e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 accent-accent-blue"
                />
                <span className="text-sm text-slate-700">
                  {tf.customerComplaints}
                </span>
              </label>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-bg-card rounded-2xl p-5 shadow-sm border border-accent-peach/30">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-accent-peach/30 flex items-center justify-center">
                <Activity size={18} className="text-orange-500" />
              </div>
              <h3 className="font-bold text-primary text-[15px]">{tf.additionalNotes}</h3>
              <span className="text-[10px] text-slate-300 ml-auto bg-slate-100 px-2 py-0.5 rounded-full font-medium">{t.common.optional}</span>
            </div>
            <textarea
              value={formData.additionalNotes}
              onChange={(e) => updateField("additionalNotes", e.target.value)}
              placeholder={tf.additionalNotesPlaceholder}
              rows={4}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all resize-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4 flex items-center gap-2">
              <AlertTriangle size={16} />
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="flex-1 py-3.5 rounded-2xl font-semibold text-primary bg-white border-2 border-slate-200 hover:border-primary/20 active:scale-[0.98] transition-all text-sm"
            >
              {tf.back}
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit || submitting}
              className={`flex-[2] py-3.5 rounded-2xl font-semibold text-white transition-all flex items-center justify-center gap-2 text-sm ${
                canSubmit && !submitting
                  ? "bg-accent-green shadow-lg shadow-accent-green/20 hover:brightness-110 active:scale-[0.98]"
                  : "bg-slate-300 cursor-not-allowed"
              }`}
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {tf.submitting}
                </>
              ) : (
                <>
                  <Send size={16} />
                  {tf.submitFeedback}
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
