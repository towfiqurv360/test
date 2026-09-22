"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function issueCertificate(formData) {
  const supabase = await createClient();
  
  const studentId = formData.get("studentId");
  const title = formData.get("title");
  const description = formData.get("description");
  
  // ইউনিক সার্টিফিকেট নাম্বার জেনারেট (যেমন: GV-CERT-2026-4589)
  const certificateNumber = `GV-CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const { error } = await supabase.from("certificates").insert({
    student_id: studentId,
    title,
    description,
    certificate_number: certificateNumber
  });

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/certificates");
}