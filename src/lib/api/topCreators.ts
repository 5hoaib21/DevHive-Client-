"use server";

interface TopPublisher {
  _id: string;
  authorName: string;
  authorEmail: string;
  authorImage: string;
  totalResources: number;
}

const baseURL = process.env.NEXT_PUBLIC_BASE_URL as string;

export async function getTopPublishers(): Promise<TopPublisher[]> {
  try {
    const res = await fetch(`${baseURL}/api/top-publishers`);

    if (!res.ok) {
      throw new Error(`Server status: ${res.status}`);
    }

    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error in getTopPublishers:", error instanceof Error ? error.message : error);
    return [];
  }
}
