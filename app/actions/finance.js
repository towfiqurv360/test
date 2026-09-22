"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// ১. ফি জেনারেট করা (Admin/Accountant)
export async function generateFee(formData) {
  const supabase = await createClient();
  
  const studentId = formData.get("studentId");
  const feeType = formData.get("feeType");
  const amount = formData.get("amount");
  const dueDate = formData.get("dueDate");

  const { error } = await supabase.from("fees").insert({
    student_id: studentId,
    fee_type: feeType,
    amount: amount,
    due_date: dueDate
  });

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/fees");
}

// ২. পেমেন্ট রিসিভ করা (Online Webhook বা Manual)
export async function processPayment(formData) {
  const supabase = await createClient();
  
  const feeId = formData.get("feeId");
  const amountPaid = formData.get("amountPaid");
  const paymentMethod = formData.get("paymentMethod");
  const transactionId = formData.get("transactionId") || `TRX-${Date.now()}`; // ডেমো ট্রানজেকশন আইডি

  // পেমেন্ট রেকর্ড ইনসার্ট করা
  const { error: paymentError } = await supabase.from("payments").insert({
    fee_id: feeId,
    amount_paid: amountPaid,
    payment_method: paymentMethod,
    transaction_id: transactionId
  });

  if (paymentError) throw new Error(paymentError.message);

  // ফি স্ট্যাটাস আপডেট করা (Unpaid থেকে Paid)
  await supabase.from("fees").update({
    status: 'Paid'
  }).eq('id', feeId);

  revalidatePath("/dashboard/payments");
  revalidatePath("/dashboard/fees");
}