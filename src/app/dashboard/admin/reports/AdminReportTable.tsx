"use client";

import React, { useState } from "react";
import { Table, Button, Chip } from "@heroui/react";
import { Trash2, ShieldAlert, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { dismissReportAction, removeReportedResourceAction, warnCreatorAction } from "@/lib/api/reports";
import { getIdString, MongoId } from "@/types";

interface Reporter {
  name: string;
  email: string;
  image?: string;
}

interface Report {
  _id: MongoId;
  promptTitle: string;
  promptId: MongoId;
  reason: string;
  description?: string;
  status: string;
  reporter: Reporter;
}

interface AdminReportTableProps {
  initialReports: Report[];
}

export default function AdminReportTable({ initialReports }: AdminReportTableProps) {
  const [reports, setReports] = useState<Report[]>(initialReports);

  const handleRemoveResource = async (reportId: string, resourceId: string) => {
    const promise = removeReportedResourceAction(reportId, resourceId).then((res) => {
      if (res.success) {
        setReports((prev) => prev.filter((r) => getIdString(r._id) !== reportId));
        return res.message || "Resource removed and report cleared!";
      } else {
        throw new Error(res.message || "Failed to remove resource");
      }
    });

    toast.promise(promise, {
      loading: "Removing resource from database...",
      success: (msg) => msg,
      error: (err) => err.message,
    });
  };

  const handleWarnCreator = async (creatorEmail: string, reportId: string) => {
    if (!creatorEmail) return toast.error("Creator email not found!");

    const promise = warnCreatorAction(creatorEmail, reportId).then((res) => {
      if (res.success) {
        return res.message || "Warning sent to creator successfully!";
      } else {
        throw new Error(res.message || "Failed to warn creator");
      }
    });

    toast.promise(promise, {
      loading: "Sending warning to creator...",
      success: (msg) => msg,
      error: (err) => err.message,
    });
  };

  const handleDismissReport = async (reportId: string) => {
    const promise = dismissReportAction(reportId).then((res) => {
      if (res.success) {
        setReports((prev) => prev.filter((r) => getIdString(r._id) !== reportId));
        return res.message || "Report dismissed successfully.";
      } else {
        throw new Error(res.message || "Failed to dismiss report");
      }
    });

    toast.promise(promise, {
      loading: "Dismissing report...",
      success: (msg) => msg,
      error: (err) => err.message,
    });
  };

  return (
    <div className="w-full bg-white rounded-xl border border-zinc-100 p-4">
      <Table aria-label="Reported Resources Table" className="bg-white text-zinc-800 shadow-none">
        <Table.ScrollContainer className="bg-white">
          <Table.Content className="min-w-[900px] bg-white">
            <Table.Header>
              <Table.Column isRowHeader className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">
                RESOURCE TITLE
              </Table.Column>
              <Table.Column className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">
                REPORTER INFO
              </Table.Column>
              <Table.Column className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">
                REASON / DETAILS
              </Table.Column>
              <Table.Column className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200 text-center">
                STATUS
              </Table.Column>
              <Table.Column className="text-right pr-6 text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">
                ACTIONS
              </Table.Column>
            </Table.Header>

            <Table.Body className="bg-white">
              {reports.map((report, index) => {
                const reportId = getIdString(report._id);
                const promptId = getIdString(report.promptId);

                const reporterName = report?.reporter?.name || "Anonymous";
                const reporterEmail = report?.reporter?.email || "No Email Provided";
                const reporterImage = report?.reporter?.image || "https://placehold.co/100";

                return (
                  <Table.Row key={reportId} className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors bg-white">
                    <Table.Cell className="bg-white">
                      <span className="font-semibold text-zinc-900 text-sm block max-w-[220px] truncate">
                        {report?.promptTitle || "Untitled Resource"}
                      </span>
                    </Table.Cell>

                    <Table.Cell className="bg-white">
                      <div className="flex items-center gap-3">
                        <img
                          src={reporterImage}
                          alt={reporterName}
                          className="w-8 h-8 rounded-full object-cover border border-zinc-200 bg-zinc-50"
                          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            e.currentTarget.src = "https://placehold.co/100";
                          }}
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-zinc-900 line-clamp-1">{reporterName}</span>
                          <span className="text-[11px] text-zinc-500 line-clamp-1">{reporterEmail}</span>
                        </div>
                      </div>
                    </Table.Cell>

                    <Table.Cell className="bg-white">
                      <div className="flex flex-col gap-0.5 max-w-[260px]">
                        <span className="text-sm font-semibold text-zinc-800 line-clamp-1">
                          {report?.reason || "No Reason Specified"}
                        </span>
                        {report?.description && (
                          <span className="text-xs text-zinc-400 line-clamp-1">
                            Details: {report.description}
                          </span>
                        )}
                      </div>
                    </Table.Cell>

                    <Table.Cell className="text-center bg-white">
                      <Chip
                        color="danger"
                        size="sm"
                        variant="soft"
                        className="font-bold uppercase tracking-wider text-[10px] bg-red-50 text-red-600 border border-red-100"
                      >
                        {report?.status || "Pending Review"}
                      </Chip>
                    </Table.Cell>

                    <Table.Cell className="text-right pr-6 bg-white">
                      <div className="flex items-center justify-end gap-2 bg-white">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg text-xs font-semibold px-2.5 h-8 border border-emerald-100"
                          onClick={() => handleDismissReport(reportId)}
                        >
                          <CheckCircle size={14} className="mr-1 inline" />
                          Dismiss
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          className="bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-lg text-xs font-semibold px-2.5 h-8 border border-amber-100"
                          onClick={() => handleWarnCreator(reporterEmail, reportId)}
                        >
                          <ShieldAlert size={14} className="mr-1 inline" />
                          Warn Creator
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          className="bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold px-2.5 h-8 border border-red-100"
                          onClick={() => handleRemoveResource(reportId, promptId)}
                        >
                          <Trash2 size={14} className="mr-1 inline" />
                          Remove
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}