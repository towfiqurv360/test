"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// ১. হোমওয়ার্ক তৈরি (Teacher)
export async function createHomework(formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const classId = formData.get("classId");
  const subjectId = formData.get("subjectId");
  const title = formData.get("title");
  const description = formData.get("description");
  const xpReward = formData.get("xpReward");
  const deadline = formData.get("deadline");

  const { error } = await supabase.from("homeworks").insert({
    class_id: classId,
    subject_id: subjectId,
    teacher_id: user.id,
    title,
    description,
    xp_reward: xpReward,
    deadline,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/homework");
}

// ২. হোমওয়ার্ক গ্রেড করা এবং XP দেওয়া (Quest Engine Core)
export async function gradeAndAwardXP(submissionId, studentId, marks, xpReward, feedback) {
  const supabase = await createClient();

  // Submission আপডেট
  await supabase.from("homework_submissions").update({
    status: 'Graded',
    marks_obtained: marks,
    teacher_feedback: feedback
  }).eq("id", submissionId);

  if (marks > 0) {
    // XP Log এন্ট্রি
    await supabase.from("xp_logs").insert({
      student_id: studentId,
      xp_amount: xpReward,
      reason: "Homework Graded & Passed"
    });

    // Student-এর টোটাল XP এবং Rank আপডেট
    const { data: student } = await supabase.from("students").select("xp").eq("id", studentId).single();
    const newXP = (student?.xp || 0) + parseInt(xpReward);
    
    // Rank Calculation Logic
    let newRank = "Novice";
    if (newXP >= 500) newRank = "Apprentice";
    if (newXP >= 1500) newRank = "Scholar";
    if (newXP >= 3000) newRank = "Elite Wizard";
    if (newXP >= 5000) newRank = "Grandmaster";

    await supabase.from("students").update({ 
      xp: newXP, 
      rank: newRank 
    }).eq("id", studentId);
  }

  revalidatePath("/dashboard/homework");
  revalidatePath("/dashboard/quests");
}