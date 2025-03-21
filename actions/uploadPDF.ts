import { auth } from "@clerk/nextjs/server";

export default async function uploadPDF(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  console.log("Uploading PDF...", userId, "with form data:", formData);

  return;
}
