"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  TextArea,
  Select,
  ListBox,
  Button,
  Card,
} from "@heroui/react";
import { Code, Upload, ChevronDown } from "lucide-react";
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
  const [mounted, setMounted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    setTimeout(() => {
      const url = URL.createObjectURL(file);
      setThumbnailUrl(url);
      setIsUploading(false);
      toast.success("Image uploaded successfully!");
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, any> = Object.fromEntries(formData.entries());

    const image = await imageUpload(data.image);

    const newErrors: Record<string, string> = {};
    if (!data.title) newErrors.title = "Title is required";
    if (!data.description) newErrors.description = "Description is required";
    if (!data.content) newErrors.content = "Content is required";
    if (!data.language) newErrors.language = "Language is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const resourcePayload = {
      ...data,
      image: image?.url || "",
      usageCount: 0,
      rating: 0,
      ratingCount: 0,
      status: "pending",
    };

    const result: any = await addResource(resourcePayload);

    if (result && result.insertedId) {
      toast.success("Resource submitted for review successfully!");
      (e.target as HTMLFormElement).reset();
      router.push('/resources');
    } else {
      toast.error(result?.error || "Failed to submit resource.");
    }
  };

  const inputClass =
    "w-full text-zinc-800 bg-zinc-50 border border-zinc-200 focus:border-indigo-500 rounded-xl h-11 px-3.5 text-sm placeholder:text-zinc-400 outline-none transition-all duration-200 shadow-2xs";
  const textAreaClass =
    "w-full text-zinc-800 bg-zinc-50 border border-zinc-200 focus:border-indigo-500 rounded-xl p-3.5 text-sm placeholder:text-zinc-400 outline-none transition-all duration-200 shadow-2xs resize-none";
  const triggerClasses =
    "w-full flex items-center justify-between bg-zinc-50 border border-zinc-200 focus:border-indigo-500 h-11 rounded-xl px-3.5 text-zinc-700 text-sm transition-all duration-200 shadow-2xs";
  const popoverClasses =
    "bg-white border border-zinc-200 text-zinc-800 rounded-xl shadow-xl p-1.5 backdrop-blur-md z-50";
  const listItemClasses =
    "p-2.5 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer text-sm font-medium text-zinc-600";

  if (!mounted) return <div className="min-h-screen bg-slate-50" />;

  return (
    <div className="w-full min-h-screen bg-slate-50 text-zinc-800 pt-5 pb-24 px-4 overflow-hidden relative">
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 animate-fade-in">
        <Card className="w-full bg-white border border-zinc-200 p-8 sm:p-10 rounded-[24px] shadow-xl shadow-indigo-500/5 flex flex-col">
          <div className="border-b border-zinc-100 pb-6 mb-8 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 shadow-2xs">
              <Code width={24} height={24} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
                {role === "publisher" ? "Publish New Resource" : "Submit New Resource"}
              </h1>
              <p className="text-zinc-500 text-xs sm:text-sm mt-0.5">
                Share a code snippet, template, or tool with the DevHive community for moderator review.
              </p>
            </div>
          </div>

          <Form
            onSubmit={handleSubmit}
            className="space-y-6"
            validationErrors={errors}
            validationBehavior="aria"
          >
            <Fieldset className="space-y-6 p-0 m-0 border-none">
              <TextField
                name="title"
                isInvalid={!!errors.title}
                className="flex flex-col gap-1.5 w-full"
              >
                <Label className="text-zinc-700 text-xs font-semibold uppercase tracking-wider">
                  Resource Title
                </Label>
                <Input
                  name="title"
                  placeholder="e.g., React Hook Form Validation Utility"
                  className={inputClass}
                />
                {errors.title && (
                  <span className="text-xs text-red-500 font-medium pl-1">
                    {errors.title}
                  </span>
                )}
              </TextField>

              <TextField
                name="description"
                isInvalid={!!errors.description}
                className="flex flex-col gap-1.5 w-full"
              >
                <Label className="text-zinc-700 text-xs font-semibold uppercase tracking-wider">
                  Short Description
                </Label>
                <TextArea
                  name="description"
                  placeholder="Briefly describe what this resource does and why it's useful..."
                  rows={2}
                  className={textAreaClass}
                />
                {errors.description && (
                  <span className="text-xs text-red-500 font-medium pl-1">
                    {errors.description}
                  </span>
                )}
              </TextField>

              <TextField
                name="content"
                isInvalid={!!errors.content}
                className="flex flex-col gap-1.5 w-full"
              >
                <Label className="text-zinc-700 text-xs font-semibold uppercase tracking-wider">
                  Resource Content / Code
                </Label>
                <TextArea
                  name="content"
                  placeholder="Paste your code, configuration, or resource content here..."
                  rows={5}
                  className={textAreaClass}
                />
                {errors.content && (
                  <span className="text-xs text-red-500 font-medium pl-1">
                    {errors.content}
                  </span>
                )}
              </TextField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                <Select name="category" className="flex flex-col gap-1.5">
                  <Label className="text-zinc-700 text-xs font-semibold uppercase tracking-wider">
                    Category
                  </Label>
                  <Select.Trigger className={triggerClasses}>
                    <Select.Value />
                    <ChevronDown size={14} className="text-zinc-400" />
                  </Select.Trigger>
                  <Select.Popover className={popoverClasses}>
                    <ListBox>
                      {CATEGORIES.map((item) => (
                        <ListBox.Item
                          key={item}
                          id={item}
                          className={listItemClasses}
                        >
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

                <Select
                  name="language"
                  isInvalid={!!errors.language}
                  className="flex flex-col gap-1.5"
                >
                  <Label className="text-zinc-700 text-xs font-semibold uppercase tracking-wider">
                    Language
                  </Label>
                  <Select.Trigger className={triggerClasses}>
                    <Select.Value />
                    <ChevronDown size={14} className="text-zinc-400" />
                  </Select.Trigger>
                  <Select.Popover className={popoverClasses}>
                    <ListBox>
                      {LANGUAGES.map((item) => (
                        <ListBox.Item
                          key={item}
                          id={item.toLowerCase()}
                          className={listItemClasses}
                        >
                          {item}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                  {errors.language && (
                    <span className="text-xs text-red-500 font-medium pl-1">
                      {errors.language}
                    </span>
                  )}
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
                <Select name="difficulty" className="flex flex-col gap-1.5">
                  <Label className="text-zinc-700 text-xs font-semibold uppercase tracking-wider">
                    Difficulty
                  </Label>
                  <Select.Trigger className={triggerClasses}>
                    <Select.Value />
                    <ChevronDown size={14} className="text-zinc-400" />
                  </Select.Trigger>
                  <Select.Popover className={popoverClasses}>
                    <ListBox>
                      {DIFFICULTIES.map((d) => (
                        <ListBox.Item key={d} id={d} className={listItemClasses}>
                          {d.charAt(0).toUpperCase() + d.slice(1)}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

                <Select
                  name="estimatedTime"
                  className="flex flex-col gap-1.5"
                >
                  <Label className="text-zinc-700 text-xs font-semibold uppercase tracking-wider">
                    Estimated Time
                  </Label>
                  <Select.Trigger className={triggerClasses}>
                    <Select.Value />
                    <ChevronDown size={14} className="text-zinc-400" />
                  </Select.Trigger>
                  <Select.Popover className={popoverClasses}>
                    <ListBox>
                      {ESTIMATED_TIMES.map((t) => (
                        <ListBox.Item key={t} id={t} className={listItemClasses}>
                          {t}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

                <Select
                  name="visibility"
                  defaultSelectedKey="public"
                  className="flex flex-col gap-1.5"
                >
                  <Label className="text-zinc-700 text-xs font-semibold uppercase tracking-wider">
                    Visibility
                  </Label>
                  <Select.Trigger className={triggerClasses}>
                    <Select.Value />
                    <ChevronDown size={14} className="text-zinc-400" />
                  </Select.Trigger>
                  <Select.Popover className={popoverClasses}>
                    <ListBox>
                      <ListBox.Item id="public" className={listItemClasses}>
                        Public
                      </ListBox.Item>
                      <ListBox.Item id="private" className={listItemClasses}>
                        Private
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <TextField name="tags" className="flex flex-col gap-1.5 w-full">
                <Label className="text-zinc-700 text-xs font-semibold uppercase tracking-wider">
                  Tags (Comma-separated)
                </Label>
                <Input
                  name="tags"
                  placeholder="e.g., react, hooks, validation, form"
                  className={inputClass}
                />
              </TextField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                <TextField name="framework" className="flex flex-col gap-1.5 w-full">
                  <Label className="text-zinc-700 text-xs font-semibold uppercase tracking-wider">
                    Framework (optional)
                  </Label>
                  <Input
                    name="framework"
                    placeholder="e.g., React, Vue, Django, Express"
                    className={inputClass}
                  />
                </TextField>

                <TextField name="documentationUrl" className="flex flex-col gap-1.5 w-full">
                  <Label className="text-zinc-700 text-xs font-semibold uppercase tracking-wider">
                    Documentation URL (optional)
                  </Label>
                  <Input
                    name="documentationUrl"
                    placeholder="https://docs.example.com"
                    className={inputClass}
                  />
                </TextField>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label className="text-zinc-700 text-xs font-semibold uppercase tracking-wider">
                  Resource Image
                </label>

                <div className="flex flex-col md:flex-row items-center gap-6 p-6 border-2 border-dashed border-zinc-200 hover:border-indigo-400 bg-zinc-50/50 rounded-2xl group transition-all duration-200 cursor-pointer relative overflow-hidden">
                  <input
                    type="file"
                    name="image"
                    accept="image/png, image/jpeg"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                    id="thumbnail-upload"
                  />

                  <label
                    htmlFor="thumbnail-upload"
                    className="absolute inset-0 w-full h-full cursor-pointer z-20"
                  />

                  <div className="w-full md:w-44 h-28 bg-white border border-zinc-200/80 rounded-xl flex items-center justify-center overflow-hidden shrink-0 relative shadow-2xs z-10">
                    {thumbnailUrl ? (
                      <img
                        src={thumbnailUrl}
                        alt="Preview"
                        className="w-full h-full object-cover animate-fade-in"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-indigo-50/60 flex items-center justify-center text-zinc-400 group-hover:text-indigo-600 transition-colors">
                        <Upload size={22} />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col text-center md:text-left space-y-1 relative z-10">
                    <span className="text-sm font-bold text-zinc-700 group-hover:text-indigo-600 transition-colors">
                      {isUploading ? "Uploading..." : "Upload Resource Image"}
                    </span>
                    <span className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                      Upload a screenshot or preview image. Supports PNG, JPG up to 4MB.
                    </span>
                  </div>
                </div>
              </div>
            </Fieldset>

            <div className="flex justify-end pt-5 mt-4 border-t border-zinc-100">
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl px-6 h-11 tracking-wide shadow-lg shadow-indigo-500/10 flex items-center gap-1.5 transition-all"
              >
                <Upload size={16} />
                Submit Resource
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}