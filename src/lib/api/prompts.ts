import "server-only";
import { getTokenServer } from "../getTokenServer";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getMyResources = async (page: number = 1) => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURL}/api/resources?page=${page}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch resources");
  }
  const data = await res.json();
  return data;
};

export const getAllResources = async ({search = "", status = "approved", category = "", language = "", difficulty = "", sort = "latest", page = "1", limit = "12"} = {}) => {
   const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (status) params.append("status", status);
  if (category) params.append("category", category);
  if (language) params.append("language", language);
  if (difficulty) params.append("difficulty", difficulty);
  if (sort) params.append("sort", sort);
  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);

  const url = `${baseURL}/resources?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch all resources");
  }

  const data = await res.json();
  return data;
};

export const getResourceById = async (id: string) => {
  const res = await fetch(`${baseURL}/resources/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch resource by ID");
  }
  const data = await res.json();
  return data;
};

export const getRelatedResources = async (id: string) => {
  try {
    const res = await fetch(`${baseURL}/resources/related/${id}`, { cache: 'no-store' });
    if (!res.ok) return { success: true, data: [] };
    const data = await res.json();
    return data;
  } catch {
    return { success: true, data: [] };
  }
};

export const getMySavedResources = async () => {
  try {
    const token = await getTokenServer();
    const res = await fetch(`${baseURL}/api/my-bookmarks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
};

export const getMyReviews = async () => {
  try {
    const token = await getTokenServer();
    const res = await fetch(`${baseURL}/api/my-reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
};

export const getMyProfile = async () => {
  try {
    const token = await getTokenServer();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"}/api/my-profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        next: { revalidate: 0 },
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.error || "Failed to fetch profile",
      };
    }

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("Error in getMyProfile action:", error);
    return {
      success: false,
      error: "Something went wrong connection to server.",
    };
  }
};

export const getPublisherAnalytics = async () => {
  try {
    const token = await getTokenServer();

    if (!token) {
      return { success: false, error: "Token not found. Please login again." };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"}/api/publisher-analytics`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        next: { revalidate: 0 },
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.error || "Failed to fetch analytics",
      };
    }

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("Error in getPublisherAnalytics action:", error);
    return {
      success: false,
      error: "Something went wrong connecting to server.",
    };
  }
};

export const getExplorerAnalytics = async () => {
  try {
    const token = await getTokenServer();

    if (!token) {
      return { success: false, error: "Token not found. Please login again." };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"}/api/explorer-analytics`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        next: { revalidate: 0 },
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.error || "Failed to fetch explorer analytics",
      };
    }

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("Error in getExplorerAnalytics action:", error);
    return {
      success: false,
      error: "Something went wrong connecting to server.",
    };
  }
};

export const resourceManagementByAdmin = async () => {
  try {
    const token = await getTokenServer()

    const res = await fetch(`${baseURL}/admin/resources`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`
      }

    })
    if(!res.ok){
      throw new Error("Failed to fetch all resources");
    }
    const data = await res.json()
    return data;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const usersManagementByAdmin = async () => {
  try {
    const token = await getTokenServer()

    const res = await fetch(`${baseURL}/admin/users`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`
      }

    })
    if(!res.ok){
      throw new Error("Failed to fetch all users");
    }
    const data = await res.json()
    return data;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export async function getFeaturedResources() {
    try {
        const res = await fetch(`${baseURL}/resources/featured`, {
            cache: 'no-store'
        });
        
        if (!res.ok) {
            throw new Error(`Server status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (Array.isArray(data)) {
            return data;
        } else if (data?.resources && Array.isArray(data.resources)) {
            return data.resources;
        } else if (data?.data && Array.isArray(data.data)) {
            return data.data;
        } else {
            return [];
        }
        
    } catch (error: any) {
        console.error("Error fetching featured resources:", error);
        return [];
    }
}
