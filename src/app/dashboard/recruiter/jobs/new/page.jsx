"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form, Button } from "@heroui/react";
import { Briefcase, Building, AlertCircle, CheckCircle2 } from "lucide-react";

const PLAN_LIMITS = {
  free: 3,
  growth: 10,
  enterprise: 50,
};

export default function PostJobPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isRemote, setIsRemote] = useState(false);
  const [errors, setErrors] = useState({});

  const [companyInfo, setCompanyInfo] = useState({
    id: "",
    name: "",
    isApproved: false,
    plan: "free",
    activeJobsCount: 0,
  });

  useEffect(() => {
    async function fetchCompanyProfile() {
      try {
        const data = {
          id: "comp_123",
          name: "Acme Corporation",
          isApproved: true,
          plan: "growth",
          activeJobsCount: 4,
        };
        setCompanyInfo(data);
      } catch (err) {
        console.error("Failed to load company profile", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCompanyProfile();
  }, []);

  const maxAllowedJobs = PLAN_LIMITS[companyInfo.plan?.toLowerCase()] || 3;
  const isLimitReached = companyInfo.activeJobsCount >= maxAllowedJobs;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!companyInfo.isApproved) {
      alert("Your company account must be approved before posting jobs.");
      return;
    }

    if (isLimitReached) {
      alert(
        `You have reached your active job posting limit (${maxAllowedJobs} jobs) for the ${companyInfo.plan} plan.`
      );
      return;
    }

    const formData = new FormData(e.currentTarget);
    const jobData = {
      title: formData.get("title"),
      category: formData.get("category"),
      type: formData.get("type"),
      minSalary: formData.get("minSalary"),
      maxSalary: formData.get("maxSalary"),
      currency: formData.get("currency"),
      location: isRemote ? "Remote" : formData.get("location"),
      isRemote: isRemote,
      deadline: formData.get("deadline"),
      responsibilities: formData.get("responsibilities"),
      requirements: formData.get("requirements"),
      benefits: formData.get("benefits"),
      companyId: companyInfo.id,
      status: "active",
    };

    try {
      setSubmitting(true);
      console.log("Job Submitted Successfully:", jobData);
      alert("Job posted successfully!");
      router.push("/dashboard/recruiter/jobs");
    } catch (err) {
      console.error("Error posting job:", err);
      setErrors({ form: "Failed to post job. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-zinc-400">
        Loading company details...
      </div>
    );
  }

  const inputStyles =
    "w-full h-10 px-3 rounded-lg bg-[#27272a] border border-[#3f3f46] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors";
  const labelStyles = "block text-xs font-medium text-zinc-300 mb-1.5";

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Post a New Job</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Create a job listing to find the best talent for your team.
        </p>
      </div>

      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#27272a] flex items-center justify-center text-zinc-300 shrink-0">
            <Building size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">
                {companyInfo.name}
              </span>
              {companyInfo.isApproved ? (
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 size={12} /> Approved
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <AlertCircle size={12} /> Pending Approval
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400 mt-0.5 capitalize">
              Current Plan: <strong className="text-zinc-200">{companyInfo.plan}</strong>
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-zinc-400">Active Job Limit</div>
          <div className="text-sm font-medium text-zinc-200">
            <span className={isLimitReached ? "text-rose-400 font-bold" : "text-emerald-400"}>
              {companyInfo.activeJobsCount}
            </span>{" "}
            / {maxAllowedJobs} Jobs Posted
          </div>
        </div>
      </div>

      {(!companyInfo.isApproved || isLimitReached) && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-start gap-3">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <div>
            {!companyInfo.isApproved
              ? "Your company account is pending approval. You cannot post new jobs until approved by an administrator."
              : `You have reached the maximum active job posting limit (${maxAllowedJobs}) for your ${companyInfo.plan} plan. Please upgrade your plan to post more jobs.`}
          </div>
        </div>
      )}

      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 shadow-sm">
        <Form onSubmit={handleSubmit} className="space-y-8">
          
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold text-white flex items-center gap-2 pb-2 border-b border-[#27272a] w-full">
              <Briefcase size={18} className="text-zinc-400" /> Job Information
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className={labelStyles}>
                  Job Title <span className="text-rose-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  placeholder="e.g. Senior Frontend Developer"
                  className={inputStyles}
                />
              </div>

              <div>
                <label className={labelStyles}>
                  Job Category <span className="text-rose-500">*</span>
                </label>
                <select required name="category" defaultValue="" className={inputStyles}>
                  <option value="" disabled>Select category</option>
                  <option value="engineering">Software Engineering</option>
                  <option value="design">UI/UX Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales & Business</option>
                  <option value="product">Product Management</option>
                </select>
              </div>

              <div>
                <label className={labelStyles}>
                  Job Type <span className="text-rose-500">*</span>
                </label>
                <select required name="type" defaultValue="" className={inputStyles}>
                  <option value="" disabled>Select job type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div>
                <label className={labelStyles}>
                  Application Deadline <span className="text-rose-500">*</span>
                </label>
                <input
                  required
                  type="date"
                  name="deadline"
                  className={inputStyles}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className={labelStyles}>
                  Minimum Salary <span className="text-rose-500">*</span>
                </label>
                <input
                  required
                  type="number"
                  name="minSalary"
                  placeholder="e.g. 50000"
                  className={inputStyles}
                />
              </div>

              <div>
                <label className={labelStyles}>
                  Maximum Salary <span className="text-rose-500">*</span>
                </label>
                <input
                  required
                  type="number"
                  name="maxSalary"
                  placeholder="e.g. 80000"
                  className={inputStyles}
                />
              </div>

              <div>
                <label className={labelStyles}>
                  Currency <span className="text-rose-500">*</span>
                </label>
                <select required name="currency" defaultValue="USD" className={inputStyles}>
                  <option value="USD">USD ($)</option>
                  <option value="BDT">BDT (৳)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-zinc-300 block">Remote Position</span>
                  <span className="text-xs text-zinc-500 block">
                    {isRemote ? "Work from anywhere in the world" : "On-site / Office location required"}
                  </span>
                </div>

                {/* Pure HTML/Tailwind Bulletproof Custom Switch */}
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isRemote}
                    onChange={(e) => setIsRemote(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-300 after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white peer-checked:after:bg-black peer-checked:after:border-black"></div>
                </label>
              </div>

              {!isRemote && (
                <div>
                  <label className={labelStyles}>
                    Location <span className="text-rose-500">*</span>
                  </label>
                  <input
                    required={!isRemote}
                    type="text"
                    name="location"
                    placeholder="e.g. New York, USA or Dhaka, Bangladesh"
                    className={inputStyles}
                  />
                </div>
              )}
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold text-white flex items-center gap-2 pb-2 border-b border-[#27272a] w-full">
              <FileTextIcon /> Job Details & Requirements
            </legend>

            <div>
              <label className={labelStyles}>
                Responsibilities <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                name="responsibilities"
                placeholder="Outline the key responsibilities and day-to-day tasks for this role..."
                className="w-full p-3 rounded-lg bg-[#27272a] border border-[#3f3f46] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors resize-y"
              />
            </div>

            <div>
              <label className={labelStyles}>
                Requirements & Qualifications <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                name="requirements"
                placeholder="List required skills, experience, education, or tools..."
                className="w-full p-3 rounded-lg bg-[#27272a] border border-[#3f3f46] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors resize-y"
              />
            </div>

            <div>
              <label className={labelStyles}>
                Perks & Benefits (Optional)
              </label>
              <textarea
                rows={3}
                name="benefits"
                placeholder="e.g. Health insurance, flexible hours, annual bonuses..."
                className="w-full p-3 rounded-lg bg-[#27272a] border border-[#3f3f46] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors resize-y"
              />
            </div>
          </fieldset>

          {errors.form && (
            <p className="text-rose-400 text-sm">
              {errors.form}
            </p>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#27272a]">
            <Button
              type="button"
              variant="flat"
              onClick={() => router.back()}
              isDisabled={submitting}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              isLoading={submitting}
              isDisabled={!companyInfo.isApproved || isLimitReached || submitting}
              className="bg-white text-black font-medium hover:bg-zinc-200"
            >
              Publish Job Post
            </Button>
          </div>

        </Form>
      </div>
    </div>
  );
}

function FileTextIcon() {
  return (
    <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 2 2 0 01-2-2V5a2 2 2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 2 2 0 01-2 2z" />
    </svg>
  );
}