"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addTeacher(formData) {
  const supabase = await createClient();
  const fullName = formData.get("fullName");
  const employeeId = formData.get("employeeId");
  const designation = formData.get("designation");

  const dummyUserId = crypto.randomUUID(); 

  // ১. Profile তৈরি
  const { error: profileError } = await supabase.from("profiles").insert({
    id: dummyUserId,
    full_name: fullName,
    role: "TEACHER",
  });
  if (profileError) throw new Error("Profile creation failed");

  // ২. Teacher রেকর্ড তৈরি
  const { error: teacherError } = await supabase.from("teachers").insert({
    id: dummyUserId,
    employee_id: employeeId,
    designation: designation,
  });
  if (teacherError) throw new Error("Teacher creation failed");

  revalidatePath("/dashboard/teachers");
  return { success: true };
}