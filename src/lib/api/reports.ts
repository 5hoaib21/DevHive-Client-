"use server";

import { getTokenServer } from "../getTokenServer";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getReportsAction() {
  const token = await getTokenServer();
  try {
    const url = `${baseURL}/admin/reports`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 }
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ Backend returned status ${res.status}:`, errorText.slice(0, 200));
      return [];
    }

    const data = await res.json();
    return data.data || [];

  } catch (error: any) {
    console.error("❌ Error in getReportsAction:", error.message);
    return [];
  }
}

export async function removeReportedResourceAction(reportId: string, resourceId: string) {
  try {
    const token = await getTokenServer();
    const res = await fetch(`${baseURL}/admin/reports/remove-resource`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reportId, resourceId }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Failed to remove resource." };
    }

    return { success: true, message: data.message || "Resource removed and report cleared!" };
  } catch (error: any) {
    console.error("Error in removeReportedResourceAction:", error);
    return { success: false, message: "Internal Server Error" };
  }
}

export async function warnCreatorAction(creatorEmail: string, reportId: string) {
  try {
    const token = await getTokenServer();
    const res = await fetch(`${baseURL}/admin/reports/warn-creator`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ creatorEmail, reportId }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Failed to send warning." };
    }

    return { success: true, message: data.message || "Warning sent to creator!" };
  } catch (error: any) {
    console.error("Error in warnCreatorAction:", error);
    return { success: false, message: "Internal Server Error" };
  }
}

export async function dismissReportAction(reportId: string) {
  const token = await getTokenServer();
  try {
    const res = await fetch(`${baseURL}/admin/reports/dismiss/${reportId}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if(!res.ok){
      return { success: false, message: data.message || "Failed to dismiss report." };
    }
    return { success: res.ok, message: data.message };
  } catch (error: any) {
    return { success: false, message: "Server Error" };
  }
}



