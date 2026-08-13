"use client";

import React, { useState } from "react";
import { Form, Button } from "@heroui/react";
import {
  Building2,
  Globe,
  MapPin,
  Users,
  Briefcase,
  Upload,
  FileText,
  CheckCircle2,
} from "lucide-react";

// Reusable Label and Input Styles matching your design system
const labelStyles = "block text-xs font-medium text-zinc-300 mb-1.5";
const inputStyles =
  "w-full px-3 py-2.5 rounded-lg bg-[#27272a] border border-[#3f3f46] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors";

export default function CompanyForm({ initialData = null, onSuccess }) {
  const [submitting, setSubmitting] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [formError, setFormError] = useState("");

  // Form Fields State
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    industry: initialData?.industry || "",
    website: initialData?.website || "",
    location: initialData?.location || "",
    employeeCount: initialData?.employeeCount || "1-10 employees",
    logo: initialData?.logo || "",
    description: initialData?.description || "",
  });

  // ImgBB Image Upload Handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // File validation
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }

    setUploadingLogo(true);
    const body = new FormData();
    body.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "YOUR_IMGBB_API_KEY";
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body,
      });

      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, logo: data.data.url }));
      } else {
        alert("Image upload failed! Please check your ImgBB API Key.");
      }
    } catch (error) {
      console.error("ImgBB Upload error:", error);
      alert("An error occurred while uploading the image.");
    } finally {
      setUploadingLogo(false);
    }
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    try {
      // API call to save company in database
      // const res = await fetch("/api/company", { method: "POST", body: JSON.stringify(formData) });
      
      console.log("Company Data Submitted:", formData);

      if (onSuccess) {
        onSuccess(formData);
      }
    } catch (error) {
      console.error(error);
      setFormError("Failed to save company information. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#121215] border border-[#27272a] rounded-2xl text-white">
      <Form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Basic Company Information */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-white flex items-center gap-2 pb-2 border-b border-[#27272a] w-full">
            <Building2 size={18} className="text-zinc-400" /> Company Information
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
                onChange={handleChange}
                className={inputStyles}
              />
            </div>

            {/* Industry / Category */}
            <div>
              <label className={labelStyles}>
                Industry / Category <span className="text-rose-500">*</span>
              </label>
              <select
                required
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className={inputStyles}
              >
                <option value="" disabled>Select industry</option>
                <option value="Technology">Technology & Software</option>
                <option value="Finance">Finance & Banking</option>
                <option value="Healthcare">Healthcare & Pharma</option>
                <option value="E-commerce">E-commerce & Retail</option>
                <option value="Education">Education & EdTech</option>
                <option value="Design">Design & Creative</option>
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
                  onChange={handleChange}
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
                placeholder="e.g. San Francisco, USA or Dhaka, BD"
                value={formData.location}
                onChange={handleChange}
                className={inputStyles}
              />
            </div>

            {/* Employee Count Range */}
            <div>
              <label className={labelStyles}>
                Employee Count Range <span className="text-rose-500">*</span>
              </label>
              <select
                required
                name="employeeCount"
                value={formData.employeeCount}
                onChange={handleChange}
                className={inputStyles}
              >
                <option value="1-10 employees">1-10 employees</option>
                <option value="11-50 employees">11-50 employees</option>
                <option value="51-200 employees">51-200 employees</option>
                <option value="201-500 employees">201-500 employees</option>
                <option value="500+ employees">500+ employees</option>
              </select>
            </div>

            {/* Logo Upload (ImgBB Integration) */}
            <div>
              <label className={labelStyles}>
                Company Logo <span className="text-rose-500">*</span>
              </label>
              <label className="flex items-center justify-center gap-3 p-2 bg-[#27272a] border border-dashed border-[#3f3f46] rounded-lg cursor-pointer hover:border-zinc-400 transition-colors min-h-[42px]">
                {uploadingLogo ? (
                  <span className="text-xs text-zinc-400">Uploading logo to ImgBB...</span>
                ) : formData.logo ? (
                  <div className="flex items-center gap-2">
                    <img src={formData.logo} alt="Uploaded Logo" className="w-7 h-7 rounded object-cover" />
                    <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 size={14} /> Logo Uploaded
                    </span>
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

        {/* Section 2: Detailed Description */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-white flex items-center gap-2 pb-2 border-b border-[#27272a] w-full">
            <FileText size={18} className="text-zinc-400" /> Brief Description
          </legend>

          <div>
            <label className={labelStyles}>
              About Company <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              name="description"
              placeholder="Tell us about your company's mission, culture, and products..."
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#27272a] border border-[#3f3f46] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors resize-y"
            />
          </div>
        </fieldset>

        {/* Error Message */}
        {formError && (
          <p className="text-rose-400 text-sm">{formError}</p>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#27272a]">
          <Button
            type="button"
            variant="flat"
            onClick={() => window.history.back()}
            isDisabled={submitting}
            className="text-zinc-300 hover:bg-zinc-800"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            isLoading={submitting || uploadingLogo}
            isDisabled={!formData.logo || submitting || uploadingLogo}
            className="bg-white text-black font-medium hover:bg-zinc-200"
          >
            {initialData ? "Update Company Info" : "Register Company"}
          </Button>
        </div>

      </Form>
    </div>
  );
}