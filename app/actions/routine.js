"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addRoutineSlot(formData) {
  const supabase = await createClient();
  
  const classId = formData.get("classId");
  const sectionId = formData.get("sectionId");
  const subjectId = formData.get("subjectId");
  const teacherId = formData.get("teacherId");
  const dayOfWeek = formData.get("dayOfWeek");
  const startTime = formData.get("startTime");
  const endTime = formData.get("endTime");
  const roomNo = formData.get("roomNo");

  const { error } = await supabase.from("routines").insert({
    class_id: classId,
    section_id: sectionId,
    subject_id: subjectId,
    teacher_id: teacherId,
    day_of_week: dayOfWeek,
    start_time: startTime,
    end_time: endTime,
    room_no: roomNo
  });

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/routine");
  return { success: true };
}