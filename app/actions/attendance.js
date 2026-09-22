"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function markAttendance(formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  const studentId = formData.get("studentId");
  const date = formData.get("date");
  const status = formData.get("status");

  // Upsert ব্যবহার করা হচ্ছে যাতে টিচার চাইলে পরে অ্যাটেনডেন্স আপডেট করতে পারে (যেমন Absent থেকে Late)
  const { error } = await supabase.from("attendance").upsert({
    student_id: studentId,
    date: date,
    status: status,
    marked_by: user.id
  }, { onConflict: 'student_id, date' });

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/attendance");
  return { success: true };
}