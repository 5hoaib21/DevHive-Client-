"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, Input, Label, Modal, Table, TextField } from "@heroui/react";
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
        setPrompts((prev) =>
          prev.map((p) =>
            getIdString(p._id) === id ? { ...p, status: "approved" as const } : p
          )
        );
        return res.message || "Resource approved successfully!";
      } else {
        throw new Error(res.message || "Failed to approve resource");
      }
    });

    toast.promise(statusPromise, {
      loading: "Approving resource...",
      success: (msg) => msg,
      error: (err) => err.message,
    });
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
        setPrompts((prev) =>
          prev.map((p) =>
            getIdString(p._id) === selectedPromptId
              ? { ...p, status: "rejected" as const, feedback }
              : p
          )
        );
        setIsOpen(false);
        return res.message || "Resource rejected successfully!";
      } else {
        throw new Error(res.message || "Failed to reject resource");
      }
    });

    toast.promise(statusPromise, {
      loading: "Rejecting resource...",
      success: (msg) => msg,
      error: (err) => err.message,
    });
  };

  const handleDelete = async (id: string) => {
    const deletePromise = deletePromptAction(id).then((res) => {
      if (res.success) {
        setPrompts((prev) => prev.filter((p) => getIdString(p._id) !== id));
        return res.message || "Resource deleted permanently.";
      } else {
        throw new Error(res.message || "Failed to delete resource");
      }
    });

    toast.promise(deletePromise, {
      loading: "Deleting resource...",
      success: (msg) => msg,
      error: (err) => err.message,
    });
  };

  const statusStyleMap: Record<string, string> = {
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    rejected: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <>
      <Table aria-label="Resource Submission Table" className="bg-white text-zinc-800 shadow-none">
        <Table.ScrollContainer>
          <Table.Content className="min-w-[800px]">
            <Table.Header>
              <Table.Column isRowHeader className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">
                #
              </Table.Column>
              <Table.Column className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">
                TEMPLATE TITLE
              </Table.Column>
              <Table.Column className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">
                LANGUAGE
              </Table.Column>
              <Table.Column className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">
                VISIBILITY
              </Table.Column>
              <Table.Column className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200 text-center">
                STATUS
              </Table.Column>
              <Table.Column className="text-right pr-6 text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">
                ACTIONS
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {prompts.map((resource, index) => {
                const resourceId = getIdString(resource._id);

                return (
                  <Table.Row key={resourceId} className="border-b border-zinc-100 hover:bg-zinc-50/80 transition-colors">
                    <Table.Cell className="text-zinc-400 font-mono text-xs">
                      {index + 1}
                    </Table.Cell>

                    <Table.Cell>
                      <span className="font-semibold text-zinc-900 text-sm block max-w-[280px] truncate">
                        {resource?.title}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider rounded-lg bg-teal-50 text-teal-600 uppercase border border-teal-100 inline-block">
                        {resource?.language || "N/A"}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="text-zinc-600 text-sm capitalize">
                      {resource?.visibility}
                    </Table.Cell>

                    <Table.Cell className="text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-[11px] font-bold tracking-wider rounded-full border uppercase ${
                          statusStyleMap[resource?.status || "pending"]
                        }`}
                      >
                        {resource?.status || "pending"}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="flex items-center justify-end gap-1.5 h-full py-2 pr-6">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="ghost"
                        className="bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-md w-7 h-7"
                      >
                        <Eye size={14} />
                      </Button>

                      <Button
                        isIconOnly
                        size="sm"
                        variant="ghost"
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-100 rounded-md w-7 h-7"
                        onClick={() => handleApprove(resourceId)}
                        isDisabled={resource?.status === "approved"}
                      >
                        <Check size={14} />
                      </Button>

                      <Button
                        isIconOnly
                        size="sm"
                        variant="ghost"
                        className="bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 rounded-md w-7 h-7"
                        onClick={() => triggerRejectModal(resourceId)}
                        isDisabled={resource?.status === "rejected"}
                      >
                        <X size={14} />
                      </Button>

                      <Button
                        isIconOnly
                        size="sm"
                        variant="ghost"
                        className="bg-zinc-100 hover:bg-red-50 hover:text-red-600 text-zinc-400 border border-transparent rounded-md w-7 h-7 transition-all"
                        onClick={() => handleDelete(resourceId)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md bg-white border border-zinc-200 text-zinc-800 rounded-2xl shadow-xl">
              <Modal.CloseTrigger
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-zinc-600"
              />

              <Modal.Header>
                <Modal.Icon className="bg-rose-50 text-rose-600 border border-rose-100">
                  <ShieldAlert className="size-5" />
                </Modal.Icon>
                <Modal.Heading className="text-zinc-900 text-lg font-bold">
                  Rejection Feedback
                </Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-zinc-500">
                   Please provide constructive feedback explaining why this resource structure or metadata
                  was rejected.
                </p>
              </Modal.Header>

              <Modal.Body className="p-6">
                <form
                  className="flex flex-col gap-4"
                  onSubmit={(e: FormEvent) => e.preventDefault()}
                >
                  <TextField className="w-full" name="feedback" variant="secondary">
                    <Label className="text-zinc-700 text-xs font-semibold mb-1 block">
                      Feedback Message
                    </Label>
                    <Input
                      placeholder="e.g., Missing explicit variable parameter maps..."
                      className="bg-zinc-50 border-zinc-200 text-zinc-900 rounded-xl placeholder:text-zinc-400"
                      value={feedback}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setFeedback(e.target.value)}
                    />
                  </TextField>
                </form>
              </Modal.Body>

              <Modal.Footer className="border-t border-zinc-100 pt-4">
                <Button
                  variant="secondary"
                  className="bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-rose-600 hover:bg-rose-500 text-white font-semibold shadow-sm"
                  onClick={handleRejectSubmit}
                  isDisabled={!feedback.trim()}
                >
                  Submit Rejection
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}