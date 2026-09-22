"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function publishNotice(formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const title = formData.get("title");
  const content = formData.get("content");
  const targetAudience = formData.get("targetAudience");

  const { error } = await supabase.from("notices").insert({
    title, content, target_audience: targetAudience, created_by: user.id
  });

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/notices");
}

export async function addTransport(formData) {
  const supabase = await createClient();
  const { error } = await supabase.from("transports").insert({
    route_name: formData.get("routeName"),
    vehicle_number: formData.get("vehicleNumber"),
    driver_name: formData.get("driverName"),
    driver_phone: formData.get("driverPhone")
  });
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/transport");
}

export async function addClub(formData) {
  const supabase = await createClient();
  const { error } = await supabase.from("clubs").insert({
    name: formData.get("name"),
    description: formData.get("description")
  });
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/clubs");
}