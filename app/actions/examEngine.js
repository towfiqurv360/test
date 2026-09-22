"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// ১. পরীক্ষা তৈরি করার লজিক
export async function createExam(formData) {
  const supabase = await createClient();

  const title = formData.get("title");
  const classId = formData.get("classId");
  const subjectId = formData.get("subjectId");
  const examDate = formData.get("examDate");
  const totalMarks = formData.get("totalMarks");
  const examType = formData.get("examType");

  const { error } = await supabase.from("exams").insert({
    title,
    class_id: classId,
    subject_id: subjectId,
    exam_date: examDate,
    total_marks: parseInt(totalMarks),
    exam_type: examType,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/exams");
}

// ২. রেজাল্ট পাবলিশ এবং অটো-গ্রেডিং লজিক
export async function publishResult(formData) {
  const supabase = await createClient();
  
  const examId = formData.get("examId");
  const studentId = formData.get("studentId");
  const marksObtained = parseInt(formData.get("marksObtained"));
  const totalMarks = parseInt(formData.get("totalMarks")); // Hidden field থেকে আসবে

  // Auto Grade Calculation (Percentage অনুযায়ী)
  const percentage = (marksObtained / totalMarks) * 100;
  let grade = "F";
  if (percentage >= 80) grade = "A+";
  else if (percentage >= 70) grade = "A";
  else if (percentage >= 60) grade = "A-";
  else if (percentage >= 50) grade = "B";
  else if (percentage >= 40) grade = "C";
  else if (percentage >= 33) grade = "D";

  const { error } = await supabase.from("exam_results").upsert({
    exam_id: examId,
    student_id: studentId,
    marks_obtained: marksObtained,
    grade: grade,
  }, { onConflict: 'exam_id, student_id' });

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/results");
}