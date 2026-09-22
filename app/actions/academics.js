"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addClass(formData) {
  const supabase = await createClient();
  const name = formData.get("className");

  const { error } = await supabase.from("classes").insert({ name });
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/academics");
  return { success: true };
}

export async function addSection(formData) {
  const supabase = await createClient();
  const classId = formData.get("classId");
  const name = formData.get("sectionName");

  const { error } = await supabase.from("sections").insert({ class_id: classId, name });
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/academics");
  return { success: true };
}

export async function addSubject(formData) {
  const supabase = await createClient();
  const classId = formData.get("classId");
  const name = formData.get("subjectName");
  const code = formData.get("subjectCode");

  const { error } = await supabase.from("subjects").insert({
    class_id: classId,
    name,
    code,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/academics");
  return { success: true };
}