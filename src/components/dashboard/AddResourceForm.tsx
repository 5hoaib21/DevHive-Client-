"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Code, Upload } from "lucide-react";
import { imageUpload } from "@/lib/actions/imgUpload";
import { addResource } from "@/lib/actions/prompts";
import { useRouter } from "next/navigation";

const DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;
const CATEGORIES = ["snippet", "template", "config", "tool", "library"] as const;
const LANGUAGES = ["JavaScript", "TypeScript", "Python", "Go", "Rust", "Java", "C#", "Shell"] as const;
const ESTIMATED_TIMES = ["5 min", "15 min", "30 min", "1 hour", "2+ hours"] as const;

interface Props {
  role?: string;
}

export default function AddResourceForm({ role = "explorer" }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const url = URL.createObjectURL(file);
    // Store the blob URL for later upload
    const dt = new DataTransfer();
    dt.items.add(file);
    const input = e.target;
    if (input) input.files = dt.files;
    setIsUploading(false);
    toast.success("Image selected");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data: Record<string, any> = Object.fromEntries(formData.entries());

    const newErrors: Record<string, string> = {};
    if (!data.title) newErrors.title = "Title is required";
    if (!data.description) newErrors.description = "Description is required";
    if (!data.content) newErrors.content = "Content is required";
    if (!data.language) newErrors.language = "Language is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitting(false);
      return;
    }

    let imageUrl = "";
    try {
      const image = await imageUpload(data.image);
      imageUrl = image?.url || "";
    } catch {}

    const resourcePayload = {
      ...data,
      image: imageUrl,
      usageCount: 0,
      rating: 0,
      ratingCount: 0,
      status: "pending",
    };

    const result: any = await addResource(resourcePayload);

    if (result && result.insertedId) {
      toast.success("Resource submitted for review!");
      (e.target as HTMLFormElement).reset();
      router.push('/resources');
    } else {
      toast.error(result?.error || "Failed to submit resource.");
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-start gap-4 pb-6 border-b border-dh-border">
        <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-dh-teal shrink-0">
          <Code width={20} height={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">{role === "publisher" ? "Publish New Resource" : "Submit New Resource"}</h2>
          <p className="text-sm text-gray-500">Share a code snippet, template, or tool with the DevHive community</p>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Resource Title *</label>
        <input name="title" placeholder="e.g., React Hook Form Validation Utility" className="dh-input" />
        {errors.title && <span className="text-xs text-dh-danger mt-1 block">{errors.title}</span>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Short Description *</label>
        <textarea name="description" placeholder="Briefly describe what this resource does..." rows={2} className="dh-input resize-none" />
        {errors.description && <span className="text-xs text-dh-danger mt-1 block">{errors.description}</span>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Resource Content / Code *</label>
        <textarea name="content" placeholder="Paste your code, configuration, or resource content here..." rows={6} className="dh-input resize-none font-mono text-xs" />
        {errors.content && <span className="text-xs text-dh-danger mt-1 block">{errors.content}</span>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Category</label>
          <select name="category" className="dh-input">
            <option value="">Select category</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Language *</label>
          <select name="language" className="dh-input">
            <option value="">Select language</option>
            {LANGUAGES.map((l) => <option key={l} value={l.toLowerCase()}>{l}</option>)}
          </select>
          {errors.language && <span className="text-xs text-dh-danger mt-1 block">{errors.language}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Difficulty</label>
          <select name="difficulty" className="dh-input">
            <option value="">Select difficulty</option>
            {DIFFICULTIES.map((d) => <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Estimated Time</label>
          <select name="estimatedTime" className="dh-input">
            <option value="">Select time</option>
            {ESTIMATED_TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Visibility</label>
          <select name="visibility" defaultValue="public" className="dh-input">
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Tags (comma-separated)</label>
        <input name="tags" placeholder="e.g., react, hooks, validation, form" className="dh-input" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Framework (optional)</label>
          <input name="framework" placeholder="e.g., React, Vue, Django" className="dh-input" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Documentation URL (optional)</label>
          <input name="documentationUrl" placeholder="https://docs.example.com" className="dh-input" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Resource Image</label>
        <div className="flex items-center gap-4 p-4 border-2 border-dashed border-dh-border rounded-lg">
          <input type="file" name="image" accept="image/png, image/jpeg" onChange={handleThumbnailUpload} className="text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-dh-teal hover:file:bg-teal-100" />
          {isUploading && <span className="text-xs text-gray-400">Uploading...</span>}
        </div>
      </div>

      <button type="submit" disabled={submitting} className="dh-btn dh-btn-primary">
        {submitting ? "Submitting..." : "Submit Resource"}
      </button>
    </form>
  );
}
