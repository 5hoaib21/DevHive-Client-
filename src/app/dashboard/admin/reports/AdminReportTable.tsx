"use client";

import React, { useState } from "react";
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
      if (res.success) { setReports((prev) => prev.filter((r) => getIdString(r._id) !== reportId)); return res.message || "Removed."; }
      else throw new Error(res.message || "Failed");
    });
    toast.promise(promise, { loading: "Removing...", success: (msg) => msg, error: (err) => err.message });
  };

  const handleWarnCreator = async (creatorEmail: string, reportId: string) => {
    if (!creatorEmail) return toast.error("Creator email not found!");
    const promise = warnCreatorAction(creatorEmail, reportId).then((res) => {
      if (res.success) return res.message || "Warning sent.";
      else throw new Error(res.message || "Failed");
    });
    toast.promise(promise, { loading: "Sending warning...", success: (msg) => msg, error: (err) => err.message });
  };

  const handleDismissReport = async (reportId: string) => {
    const promise = dismissReportAction(reportId).then((res) => {
      if (res.success) { setReports((prev) => prev.filter((r) => getIdString(r._id) !== reportId)); return res.message || "Dismissed."; }
      else throw new Error(res.message || "Failed");
    });
    toast.promise(promise, { loading: "Dismissing...", success: (msg) => msg, error: (err) => err.message });
  };

  return (
    <div className="bg-white border border-dh-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F1F3F9] border-b border-dh-border">
              <th className="text-left py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Resource</th>
              <th className="text-left py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Reporter</th>
              <th className="text-left py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Reason</th>
              <th className="text-center py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-right py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => {
              const reportId = getIdString(report._id);
              const promptId = getIdString(report.promptId);
              const reporterName = report?.reporter?.name || "Anonymous";
              const reporterEmail = report?.reporter?.email || "";
              const defaultAvatar = "https://placehold.co/100";

              return (
                <tr key={reportId} className="border-b border-dh-border last:border-b-0 hover:bg-[#FAFBFF] transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-900 max-w-[200px] truncate">{report?.promptTitle || "Untitled"}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <img src={report?.reporter?.image || defaultAvatar} alt={reporterName} className="w-7 h-7 rounded-full object-cover border border-dh-border"
                        onError={(e) => { (e.target as HTMLImageElement).src = defaultAvatar; }} />
                      <div><p className="text-xs font-medium text-gray-900">{reporterName}</p><p className="text-[10px] text-gray-400">{reporterEmail}</p></div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-gray-800">{report?.reason || "N/A"}</p>
                    {report?.description && <p className="text-xs text-gray-400 line-clamp-1">{report.description}</p>}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="dh-badge dh-badge-status-pending">{report?.status || "Pending"}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleDismissReport(reportId)} className="dh-btn dh-btn-ghost p-1.5 text-dh-success hover:bg-emerald-50" title="Dismiss"><CheckCircle size={14} /></button>
                      <button onClick={() => handleWarnCreator(reporterEmail, reportId)} className="dh-btn dh-btn-ghost p-1.5 text-dh-warning hover:bg-amber-50" title="Warn Creator"><ShieldAlert size={14} /></button>
                      <button onClick={() => handleRemoveResource(reportId, promptId)} className="dh-btn dh-btn-ghost p-1.5 text-dh-danger hover:bg-red-50" title="Remove"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
