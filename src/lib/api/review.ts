"use server";

import { getAllResources } from "./prompts";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getResourcesWithReviews() {
  try {
    const result = await getAllResources({ limit: '100' });
    const resources = result?.data || result || [];
    
    const resourcesWithReviews = resources.filter((resource: any) => 
      resource.reviews && 
      resource.reviews.length > 0
    );
    
    return resourcesWithReviews;
    
  } catch (error: any) {
    console.error("Error fetching resources with reviews:", error);
    return [];
  }
}

export async function getResourceReviews(resourceId: string) {
  try {
    const res = await fetch(`${baseURL}/resources/${resourceId}/reviews`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error(`Server status: ${res.status}`);
    }
    
    const data = await res.json();
    return data;
    
  } catch (error: any) {
    console.error("Error fetching reviews:", error);
    return {
      success: false,
      error: error.message,
      reviews: [],
      totalReviews: 0,
      rating: 0
    };
  }
}
