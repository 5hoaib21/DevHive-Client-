"use server";

import { serverDelete, serverMutation } from "../core/server";
import { getTokenServer } from "../getTokenServer";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const addResource = async (data: any) => {
  return serverMutation(`/api/resources`, data);
};

export const deleteResource = async (id: string) => {
  return serverDelete(`/api/resources/${id}`);
};

export const updateResource = async (id: string, data: any) => {
  try {
    const token = await getTokenServer();
    const res = await fetch(`${baseURL}/api/resources/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const incrementUsageCount = async (id: string) => {
  try {
    const token = await getTokenServer();
    const res = await fetch(`${baseURL}/api/resources/${id}/copy`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const submitResourceReview = async (id: string, reviewData: any) => {
  try {
    const token = await getTokenServer();
    const res = await fetch(`${baseURL}/api/resources/${id}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const toggleResourceBookmark = async (id: string) => {
  try {
    const token = await getTokenServer();
    const res = await fetch(`${baseURL}/api/resources/${id}/bookmark`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const submitResourceReport = async (id: string, reportData: any) => {
  try {
    const token = await getTokenServer();
    const res = await fetch(`${baseURL}/api/resources/${id}/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reportData),
    });

    const result = await res.json();
    
    if (!res.ok) {
      return { success: false, error: result.message || "Failed to submit report" };
    }
    
    return result;
  } catch (error: any) {
    console.error("Error in submitResourceReport action:", error);
    return { success: false, error: error.message };
  }
};

export async function updateResourceStatusAction(resourceId: string, newStatus: string) {
  const token = await getTokenServer();
  try {
    const res = await fetch(`${baseURL}/admin/resources/status/${resourceId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to update resource status",
      };
    }

    return {
      success: true,
      message: data.message || `Resource ${newStatus} successfully!`,
    };
  } catch (error: any) {
    console.error("Error in updateResourceStatusAction:", error);
    return { success: false, message: "Internal Server Error" };
  }
}

export async function deleteResourceAction(resourceId: string) {
  const token = await getTokenServer();
  try {
    const res = await fetch(`${baseURL}/admin/resources/${resourceId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to delete resource from server",
      };
    }

    return {
      success: true,
      message: data.message || "Resource deleted successfully!",
    };
  } catch (error: any) {
    console.error("Error in deleteResourceAction:", error);
    return { success: false, message: "Internal Server Error" };
  }
}
