"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function assignChildToParent(formData) {
  const supabase = await createClient();
  const parentId = formData.get("parentId");
  const studentId = formData.get("studentId");
  const relationship = formData.get("relationship");

  const { error } = await supabase.from("parent_student").insert({
    parent_id: parentId,
    student_id: studentId,
    relationship: relationship,
  });

  if (error) throw new Error("Failed to assign child");

  revalidatePath("/dashboard/parents");
  return { success: true };
}