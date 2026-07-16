export async function uploadImage(imageFile: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_KEY;

  if (!apiKey) {
    throw new Error("ImgBB API key is missing.");
  }

  if (!(imageFile instanceof File)) {
    throw new Error("A valid image file was not selected.");
  }

  if (!imageFile.type.startsWith("image/")) {
    throw new Error("Please select a valid image file.");
  }

  if (imageFile.size === 0) {
    throw new Error("The selected image file is empty.");
  }

  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    {
      method: "POST",
      body: formData,
    },
  );

  const result = await response.json();

  if (!response.ok || !result.success || !result?.data?.url) {
    throw new Error(
      result?.data?.error?.message ||
        result?.error?.message ||
        "ImgBB image upload failed.",
    );
  }

  return result.data.url;
}