"use client";

import React, { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { deleteResource } from "@/lib/actions/prompts";
import { useRouter } from "next/navigation";

interface DeleteResourceProps {
  promptId: string;
}

export default function DeleteResource({ promptId }: DeleteResourceProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    if (!isDeleting) setIsModalOpen(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const deletePromise = deleteResource(promptId).then((res: any) => {
      if (res.success) {
        router.refresh();
        return res.message || "Resource deleted.";
      } else throw new Error(res.message || "Delete failed");
    });

    toast.promise(deletePromise, {
      loading: "Deleting...",
      success: (msg) => {
        setIsDeleting(false);
        setIsModalOpen(false);
        return msg;
      },
      error: (err) => {
        setIsDeleting(false);
        return err.message;
      },
    });
  };

  return (
    <>
      <button onClick={openModal} className="dh-btn dh-btn-ghost p-1.5 text-gray-400 hover:text-dh-danger">
        <Trash2 size={14} />
      </button>

      {isModalOpen && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal} />
            <div className="relative bg-white border border-dh-border rounded-lg shadow-xl w-full max-w-md p-6 z-10">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-dh-danger">
                  <AlertTriangle size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Delete Resource</h3>
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this resource? This action cannot be undone.
                </p>
                <div className="flex gap-2 mt-2 w-full justify-center">
                  <button onClick={closeModal} disabled={isDeleting} className="dh-btn dh-btn-ghost">Cancel</button>
                  <button onClick={handleDelete} disabled={isDeleting} className="dh-btn dh-btn-danger">
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
