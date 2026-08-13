"use client";

import React, { useState, useEffect } from "react";
import { Form, Button, Chip } from "@heroui/react";
import {
  Building2,
  Globe,
  MapPin,
  Users,
  Briefcase,
  Edit,
  Upload,
  Plus,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
} from "lucide-react";

// Input Styling strictly matching your provided style format
const labelStyles = "block text-xs font-medium text-zinc-300 mb-1.5";
const inputStyles =
  "w-full px-3 py-2.5 rounded-lg bg-[#27272a] border border-[#3f3f46] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors";

export default function CompanyPage() {
  // 1. Initial State dynamic/null রাখা হয়েছে (নতুন ইউজারের কোনো কোম্পানি থাকবে না)
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false); // Backend থেকে ডাটা লোড হওয়ার স্টেট

  // 2. Form & View Control States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 3. Form Data State
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    logo: "",
    industry: "Technology",
    location: "",
    employeeCount: "1-10 employees",
    description: "",
  });

  // ডাটাবেজ থেকে ইউজারের কোম্পানি ডাটা আনার জায়গা (Backend Integration)
  /*
  useEffect(() => {
    async function fetchUserCompany() {
      setLoading(true);
      try {
        const res = await fetch("/api/company/me");
        const data = await res.json();
        if (data && data.company) {
          setCompany(data.company);
        } else {
          setCompany(null); // কোম্পানি না থাকলে null থাকবে
        }
      } catch (err) {
        console.error("Failed to fetch company", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUserCompany();
  }, []);
  */

  // ফর্ম ওপেন করার হ্যান্ডলার (নতুন রেজিস্টার নাকি এডিট)
  const handleOpenForm = (editMode = false) => {
    setIsEditing(editMode);
    if (editMode && company) {
      setFormData({ ...company });
    } else {
      setFormData({
        name: "",
        website: "",
        logo: "",
        industry: "Technology",
        location: "",
        employeeCount: "1-10 employees",
        description: "",
      });
    }
    setIsFormOpen(true);
  };

  // ImageBB Upload Handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingLogo(true);
    const body = new FormData();
    body.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body,
      });

      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, logo: data.data.url }));
      } else {
        alert("Image upload failed! Check ImgBB API key.");
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploadingLogo(false);
    }
  };

  // Submit Handler (Company Save or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // API call to save in DB:
      // await fetch("/api/company", { method: isEditing ? "PUT" : "POST", body: JSON.stringify(formData) });

      // নতুন কোম্পানি সেভ হলে State-এ সেট হবে
      const savedCompany = {
        ...formData,
        status: isEditing ? company?.status || "Pending" : "Pending",
      };

      setCompany(savedCompany);
      setIsFormOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-white space-y-6">

      {/* ------------------- 1. CONDITION: কোনো কোম্পানি না থাকলে ------------------- */}
      {!company && !isFormOpen && (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-[#121215] border border-[#27272a] space-y-4">
          <div className="p-4 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-300">
            <Building2 size={36} />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">No Company Registered</h2>
            <p className="text-zinc-400 text-sm max-w-sm">
              You haven't registered a company yet. Register your company to start posting jobs.
            </p>
          </div>
          <Button
            onClick={() => handleOpenForm(false)}
            className="bg-white text-black font-semibold hover:bg-zinc-200 mt-2"
          >
            <Plus size={18} /> Register Company
          </Button>
        </div>
      )}

      {/* ------------------- 2. CONDITION: কোম্পানি আগে থেকে থাকলে (DETAILS VIEW) ------------------- */}
      {company && !isFormOpen && (
        <div className="rounded-2xl bg-[#121215] border border-[#27272a] p-6 space-y-6">

          {/* Header Section */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#27272a]">
            <div className="flex items-center gap-4">

              {/* Logo Container */}
              <div className="w-16 h-16 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden shrink-0">
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <Building2 size={28} className="text-zinc-400" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold">{company.name}</h1>

                  {/* Status Badge */}
                  {company.status === "Approved" && (
                    <Chip color="success" variant="flat" size="sm">
                      <span className="flex items-center gap-1"><CheckCircle2 size={12} /> Approved</span>
                    </Chip>
                  )}
                  {company.status === "Rejected" && (
                    <Chip color="danger" variant="flat" size="sm">
                      <span className="flex items-center gap-1"><XCircle size={12} /> Rejected</span>
                    </Chip>
                  )}
                  {company.status === "Pending" && (
                    <Chip color="warning" variant="flat" size="sm">
                      <span className="flex items-center gap-1"><Clock size={12} /> Pending</span>
                    </Chip>
                  )}
                </div>

                <a
                  href={`https://${company.website.replace(/^https?:\/\//, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-zinc-400 hover:underline flex items-center gap-1 mt-1"
                >
                  <Globe size={12} /> {company.website}
                </a>
              </div>
            </div>

            {/* Edit Button */}
            <Button
              onClick={() => handleOpenForm(true)}
              variant="flat"
              className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
            >
              <Edit size={16} /> Edit Details
            </Button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#18181b] border border-[#27272a]">
              <span className="text-xs text-zinc-400 flex items-center gap-1.5 mb-1">
                <Briefcase size={14} /> Industry
              </span>
              <p className="text-sm font-medium text-white">{company.industry}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#18181b] border border-[#27272a]">
              <span className="text-xs text-zinc-400 flex items-center gap-1.5 mb-1">
                <MapPin size={14} /> Location
              </span>
              <p className="text-sm font-medium text-white">{company.location}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#18181b] border border-[#27272a]">
              <span className="text-xs text-zinc-400 flex items-center gap-1.5 mb-1">
                <Users size={14} /> Employee Count
              </span>
              <p className="text-sm font-medium text-white">{company.employeeCount}</p>
            </div>
          </div>

          {/* About Company */}
          <div className="space-y-2 pt-2">
            <h3 className="text-sm font-semibold text-zinc-300">About Company</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{company.description}</p>
          </div>
        </div>
      )}

      {/* ------------------- 3. CONDITION: কোম্পানি ফর্ম (CREATE OR EDIT FORM) ------------------- */}
      {isFormOpen && (
        <div className="rounded-2xl bg-[#121215] border border-[#27272a] p-6">
          <Form onSubmit={handleSubmit} className="space-y-8">

            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold text-white flex items-center gap-2 pb-2 border-b border-[#27272a] w-full">
                <Building2 size={18} className="text-zinc-400" />
                {isEditing ? "Edit Company Information" : "Register Company Profile"}
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">

                {/* Company Name */}
                <div>
                  <label className={labelStyles}>
                    Company Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="e.g. Acme Corp"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputStyles}
                  />
                </div>

                {/* Industry */}
                <div>
                  <label className={labelStyles}>
                    Industry / Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    required
                    name="industry"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className={inputStyles}
                  >
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Education">Education</option>
                  </select>
                </div>

                {/* Website URL */}
                <div>
                  <label className={labelStyles}>
                    Website URL <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex rounded-lg overflow-hidden border border-[#3f3f46] focus-within:border-zinc-400">
                    <span className="bg-[#27272a] text-zinc-400 text-sm px-3 flex items-center border-r border-[#3f3f46]">
                      https://
                    </span>
                    <input
                      required
                      type="text"
                      name="website"
                      placeholder="www.company.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#27272a] text-sm text-white placeholder-zinc-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className={labelStyles}>
                    Location <span className="text-rose-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="location"
                    placeholder="e.g. San Francisco, USA"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className={inputStyles}
                  />
                </div>

                {/* Employee Count */}
                <div>
                  <label className={labelStyles}>
                    Employee Count Range <span className="text-rose-500">*</span>
                  </label>
                  <select
                    required
                    name="employeeCount"
                    value={formData.employeeCount}
                    onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                    className={inputStyles}
                  >
                    <option value="1-10 employees">1-10 employees</option>
                    <option value="11-50 employees">11-50 employees</option>
                    <option value="51-200 employees">51-200 employees</option>
                    <option value="201-500 employees">201-500 employees</option>
                    <option value="500+ employees">500+ employees</option>
                  </select>
                </div>

                {/* ImgBB Logo Upload */}
                <div>
                  <label className={labelStyles}>
                    Company Logo <span className="text-zinc-500">(Optional)</span>
                  </label>
                  <label className="flex items-center justify-center gap-3 p-2 bg-[#27272a] border border-dashed border-[#3f3f46] rounded-lg cursor-pointer hover:border-zinc-400 transition-colors min-h-[42px]">
                    {uploadingLogo ? (
                      <span className="text-xs text-zinc-400">Uploading to ImgBB...</span>
                    ) : formData.logo ? (
                      <div className="flex items-center gap-2">
                        <img src={formData.logo} alt="Uploaded Logo" className="w-7 h-7 rounded object-cover" />
                        <span className="text-xs text-emerald-400 font-medium">Uploaded</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Upload size={16} className="text-zinc-400" />
                        <span className="text-xs text-zinc-300">Upload PNG/JPG (Max 5MB)</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

              </div>
            </fieldset>

            {/* Description Fieldset */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold text-white flex items-center gap-2 pb-2 border-b border-[#27272a] w-full">
                <FileText size={18} className="text-zinc-400" /> Brief Description
              </legend>

              <div>
                <textarea
                  required
                  rows={4}
                  name="description"
                  placeholder="Tell us about your company's mission and culture..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 rounded-lg bg-[#27272a] border border-[#3f3f46] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors resize-y"
                />
              </div>
            </fieldset>

            {/* Form Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#27272a]">
              {company && (
                <Button
                  type="button"
                  variant="flat"
                  onClick={() => setIsFormOpen(false)}
                  isDisabled={submitting}
                  className="text-zinc-300 hover:bg-zinc-800"
                >
                  Cancel
                </Button>
              )}

              {/* Submit Button - !formData.logo লজিক সরিয়ে দেওয়া হয়েছে */}
              <Button
                type="submit"
                isLoading={submitting || uploadingLogo}
                isDisabled={submitting || uploadingLogo} // এখন শুধু সাবমিট হওয়ার সময় বা ছবি আপলোড চলাকালীন ডিজেবল থাকবে
                className="bg-white text-black font-medium hover:bg-zinc-200"
              >
                {isEditing ? "Update Company Info" : "Register Company"}
              </Button>
            </div>

          </Form>
        </div>
      )}

    </div>
  );
}