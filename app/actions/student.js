"use server";

import { createClient } from "@/lib/supabase/server";
import { generateStudentID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function addStudent(formData) {
  const supabase = await createClient();
  const fullName = formData.get("fullName");
  const currentClass = formData.get("class");
  const currentRoll = formData.get("roll");

  // ১. ডামি Auth User তৈরি (বাস্তব প্রোজেক্টে অ্যাডমিন ইনভাইট পাঠাবে)
  // এখানে শুধু Database Structure দেখানোর জন্য Profile ও Student টেবিলে ডেটা ইনসার্ট করা হচ্ছে
  const dummyUserId = crypto.randomUUID(); 

  const { error: profileError } = await supabase.from("profiles").insert({
    id: dummyUserId, // বাস্তবে এটি auth.users এর ID হবে
    full_name: fullName,
    role: "STUDENT",
  });

  if (profileError) throw new Error("Failed to create profile");

  const permanentId = generateStudentID();

  const { error: studentError } = await supabase.from("students").insert({
    id: dummyUserId,
    permanent_student_id: permanentId,
    current_class: currentClass,
    current_roll: currentRoll,
    xp: 0,
    rank: "Beginner",
  });

  if (studentError) throw new Error("Failed to add student");

  revalidatePath("/dashboard/students");
  return { success: true, permanentId };
}