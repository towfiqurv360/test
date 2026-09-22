"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";

export default function CompleteProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Form State
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    role: "STUDENT",
    blood_group: "A+",
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      
      // গুগল থেকে সাইনআপ করলে গুগলের নামটা অটোমেটিক ফর্মে বসে যাবে
      if (user.user_metadata?.full_name) {
        setFormData((prev) => ({ ...prev, full_name: user.user_metadata.full_name }));
      }
      setLoading(false);
    };
    checkUser();
  }, [router, supabase]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // ডেটাবেসে প্রোফাইল সেভ করা হচ্ছে
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: formData.full_name,
      phone: formData.phone,
      role: formData.role,
      blood_group: formData.blood_group, // Note: Schema তে blood_group ফিল্ড অ্যাড করতে হবে
    });

    if (error) {
      alert("Error saving profile: " + error.message);
      setSubmitting(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Complete Your Profile</h2>
          <p className="text-gray-500 mt-2">We need a few more details to set up your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="STUDENT">Student</option>
                <option value="PARENT">Parent</option>
                <option value="TEACHER">Teacher</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Blood Group</label>
              <select
                value={formData.blood_group}
                onChange={(e) => setFormData({ ...formData, blood_group: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium mt-4"
          >
            {submitting ? "Saving..." : "Save and Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}