"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createSupportTicket(formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const question = formData.get("question");

  const { error } = await supabase.from("support_tickets").insert({
    student_id: user.id, // Assuming the user is a student
    question: question,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/support");
}

export async function resolveTicket(formData) {
  const supabase = await createClient();
  const ticketId = formData.get("ticketId");

  const { error } = await supabase.from("support_tickets").update({
    status: 'Resolved'
  }).eq('id', ticketId);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/support");
}