"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, Input, Label, Modal, TextField } from "@heroui/react";
import { Check, X, Trash2, Eye, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";
import { updateResourceStatusAction as updatePromptStatusAction, deleteResourceAction as deletePromptAction } from "@/lib/actions/prompts";
import { getIdString } from "@/types";

interface Prompt {
  _id: string | { $oid: string };
  title: string;
  language: string;
  visibility: string;
  status: "approved" | "pending" | "rejected";
}

interface AdminPromptTableProps {
  initialPrompts: Prompt[];
}

export default function AdminPromptTable({ initialPrompts }: AdminPromptTableProps) {
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");

  const handleApprove = async (id: string) => {
    const statusPromise = updatePromptStatusAction(id, "approved").then((res) => {
      if (res.success) {
        setPrompts((prev) => prev.map((p) => getIdString(p._id) === id ? { ...p, status: "approved" as const } : p));
        return res.message || "Resource approved!";
      } else throw new Error(res.message || "Failed to approve");
    });
    toast.promise(statusPromise, { loading: "Approving...", success: (msg) => msg, error: (err) => err.message });
  };

  const triggerRejectModal = (id: string) => {
    setSelectedPromptId(id);
    setFeedback("");
    setIsOpen(true);
  };

  const handleRejectSubmit = async () => {
    if (!selectedPromptId) return;
    const statusPromise = updatePromptStatusAction(selectedPromptId, "rejected").then((res) => {
      if (res.success) {
        setPrompts((prev) => prev.map((p) => getIdString(p._id) === selectedPromptId ? { ...p, status: "rejected" as const, feedback } : p));
        setIsOpen(false);
        return res.message || "Resource rejected.";
      } else throw new Error(res.message || "Failed to reject");
    });
    toast.promise(statusPromise, { loading: "Rejecting...", success: (msg) => msg, error: (err) => err.message });
  };

  const handleDelete = async (id: string) => {
    const deletePromise = deletePromptAction(id).then((res) => {
      if (res.success) {
        setPrompts((prev) => prev.filter((p) => getIdString(p._id) !== id));
        return res.message || "Deleted.";
      } else throw new Error(res.message || "Failed to delete");
    });
    toast.promise(deletePromise, { loading: "Deleting...", success: (msg) => msg, error: (err) => err.message });
  };

  const statusBadge: Record<string, string> = {
    approved: "dh-badge dh-badge-status-approved",
    pending: "dh-badge dh-badge-status-pending",
    rejected: "dh-badge dh-badge-status-rejected",
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F1F3F9] border-b border-dh-border">
              <th className="text-left py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">#</th>
              <th className="text-left py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Title</th>
              <th className="text-left py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Language</th>
              <th className="text-left py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Visibility</th>
              <th className="text-center py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-right py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {prompts.map((resource, index) => {
              const resourceId = getIdString(resource._id);
              return (
                <tr key={resourceId} className="border-b border-dh-border last:border-b-0 hover:bg-[#FAFBFF] transition-colors">
                  <td className="py-3 px-4 text-gray-400 text-xs font-mono">{index + 1}</td>
                  <td className="py-3 px-4 font-medium text-gray-900 max-w-[280px] truncate">{resource?.title}</td>
                  <td className="py-3 px-4"><span className="dh-badge dh-badge-language">{resource?.language || "N/A"}</span></td>
                  <td className="py-3 px-4 text-sm text-gray-600 capitalize">{resource?.visibility}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={statusBadge[resource?.status || "pending"]}>{resource?.status || "pending"}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="dh-btn dh-btn-ghost p-1.5 text-gray-400 hover:text-gray-600"><Eye size={14} /></button>
                      <button onClick={() => handleApprove(resourceId)} disabled={resource?.status === "approved"}
                        className="dh-btn dh-btn-ghost p-1.5 text-dh-success hover:bg-emerald-50"><Check size={14} /></button>
                      <button onClick={() => triggerRejectModal(resourceId)} disabled={resource?.status === "rejected"}
                        className="dh-btn dh-btn-ghost p-1.5 text-dh-danger hover:bg-red-50"><X size={14} /></button>
                      <button onClick={() => handleDelete(resourceId)}
                        className="dh-btn dh-btn-ghost p-1.5 text-gray-400 hover:text-dh-danger"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md bg-white border border-dh-border text-gray-800 rounded-lg shadow-lg">
              <Modal.CloseTrigger onClick={() => setIsOpen(false)} />
              <Modal.Header>
                <Modal.Icon className="bg-red-50 text-dh-danger border border-red-100"><ShieldAlert className="size-5" /></Modal.Icon>
                <Modal.Heading className="text-gray-900 text-lg font-bold">Rejection Feedback</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-gray-500">Provide constructive feedback explaining why this resource was rejected.</p>
              </Modal.Header>
              <Modal.Body className="p-6">
                <form className="flex flex-col gap-4" onSubmit={(e: FormEvent) => e.preventDefault()}>
                  <TextField className="w-full" name="feedback" variant="secondary">
                    <Label className="text-gray-700 text-xs font-semibold mb-1 block">Feedback Message</Label>
                    <Input placeholder="e.g., Missing documentation..." className="dh-input" value={feedback} onChange={(e: ChangeEvent<HTMLInputElement>) => setFeedback(e.target.value)} />
                  </TextField>
                </form>
              </Modal.Body>
              <Modal.Footer className="border-t border-dh-border pt-4 flex justify-end gap-2">
                <Button variant="secondary" className="dh-btn dh-btn-ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button className="dh-btn dh-btn-danger" onClick={handleRejectSubmit} isDisabled={!feedback.trim()}>Submit Rejection</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
