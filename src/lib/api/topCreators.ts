"use server";

interface TopCreator {
  _id: string;
  authorName: string;
  authorEmail: string;
  authorImage: string;
  totalPrompts: number;
}

const baseURL = process.env.NEXT_PUBLIC_BASE_URL as string;

export async function getTopCreators(): Promise<TopCreator[]> {
  try {
    const res = await fetch(`${baseURL}/api/top-creators`);

    if (!res.ok) {
      throw new Error(`Server status: ${res.status}`);
    }

    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("❌ Action Error in getTopCreators:", error instanceof Error ? error.message : error);
    return [];
  }
}