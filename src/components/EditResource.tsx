"use client";

import React, { useState, useRef, ChangeEvent, FormEvent, MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { Pencil, X, Upload, Image as ImageIcon } from "lucide-react";
import { updateResource } from "@/lib/actions/prompts";
import { imageUpload } from "@/lib/actions/imgUpload";
import { getIdString, MongoId } from "@/types";
import { useRouter } from "next/navigation";

interface PromptData {
  _id: string | MongoId;
  title: string;
  description?: string;
  prompt?: string;
  language: string;
  category?: string;
  tags?: string;
  visibility: string;
  image?: string;
  ogImage?: string;
  price?: string | number;
  content?: string;
}

interface EditResourceProps {
  promptId: string;
  promptData: PromptData;
}

export default function EditResource({ promptId, promptData }: EditResourceProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      const data: Record<string, string> = {};
      formData.forEach((value, key) => { data[key] = value.toString(); });

      let imageUrl = promptData?.image || "";
      let ogImageUrl = promptData?.ogImage || "";

      if (imageFile) {
        const uploadResult = await imageUpload(imageFile);
        if (uploadResult.success && uploadResult.data?.url) {
          imageUrl = uploadResult.data.url;
          ogImageUrl = uploadResult.data.url;
        } else {
          throw new Error(uploadResult.message || "Image upload failed");
        }
      }

      const updateData: Record<string, string> = {
        title: data.title || promptData.title,
        description: data.description || promptData.description || "",
        prompt: data.prompt || promptData.prompt || "",
        language: data.language || promptData.language,
        category: data.category || promptData.category || "",
        tags: data.tags || promptData.tags || "",
        visibility: data.visibility || promptData.visibility,
        image: imageUrl,
        ogImage: ogImageUrl,
        price: data.price || promptData.price?.toString() || "0",
        content: data.content || promptData.content || "",
      };

      const updatePromise = updateResource(promptId, updateData).then((res: any) => {
        if (res.success) {
          router.refresh();
          return "Resource updated!";
        } else throw new Error(res.message || "Update failed");
      });

      await toast.promise(updatePromise, {
        loading: "Updating...",
        success: (msg: string) => msg,
        error: (err: Error) => err.message,
      });

      closeModal();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button onClick={openModal} className="dh-btn dh-btn-ghost p-1.5 text-gray-400 hover:text-dh-teal">
        <Pencil size={14} />
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={closeModal}
            />
            <motion.div
              className="relative bg-white border border-dh-border rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between p-6 border-b border-dh-border">
                <h3 className="text-lg font-bold text-gray-900">Edit Resource</h3>
                <button onClick={closeModal} className="p-1 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">Title</label>
                    <input type="text" name="title" defaultValue={promptData?.title || ""} className="dh-input w-full" required />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">Language</label>
                    <select name="language" defaultValue={promptData?.language || "javascript"} className="dh-input w-full">
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option><option value="typescript">TypeScript</option>
                      <option value="html">HTML</option><option value="css">CSS</option>
                      <option value="sql">SQL</option><option value="java">Java</option>
                      <option value="cpp">C++</option><option value="csharp">C#</option>
                      <option value="rust">Rust</option><option value="go">Go</option>
                      <option value="ruby">Ruby</option><option value="php">PHP</option>
                      <option value="shell">Shell</option><option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">Description</label>
                    <textarea name="description" defaultValue={promptData?.description || ""} className="dh-input w-full min-h-[80px]" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">Prompt</label>
                    <textarea name="prompt" defaultValue={promptData?.prompt || promptData?.content || ""} className="dh-input w-full min-h-[120px]" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">Category</label>
                    <input type="text" name="category" defaultValue={promptData?.category || ""} className="dh-input w-full" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">Tags (comma separated)</label>
                    <input type="text" name="tags" defaultValue={promptData?.tags || ""} className="dh-input w-full" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">Visibility</label>
                    <select name="visibility" defaultValue={promptData?.visibility || "public"} className="dh-input w-full">
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">Cover Image</label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-dh-border rounded-lg p-4 text-center cursor-pointer hover:border-dh-teal transition-colors"
                    >
                      {imagePreview || promptData?.image || promptData?.ogImage ? (
                        <div className="relative w-full h-24">
                          <img src={imagePreview || promptData?.image || promptData?.ogImage || ""} alt="Preview" className="w-full h-full object-cover rounded" />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded">
                            <Upload size={20} className="text-white" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1 text-gray-400 py-2">
                          <ImageIcon size={24} />
                          <span className="text-xs">Click to upload</span>
                        </div>
                      )}
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-dh-border">
                  <button type="button" onClick={closeModal} className="dh-btn dh-btn-ghost">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="dh-btn dh-btn-primary">
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
