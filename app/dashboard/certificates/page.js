import { createClient } from "@/lib/supabase/server";
import { issueCertificate } from "@/app/actions/certificates";

export default async function CertificatesPage() {
  const supabase = await createClient();

  const { data: students } = await supabase.from("students").select("id, permanent_student_id, profiles(full_name)");
  
  const { data: certificates } = await supabase
    .from("certificates")
    .select("*, students(permanent_student_id, profiles(full_name))")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Certificate Generation</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h3 className="font-bold text-gray-800 mb-4">Issue Certificate</h3>
          <form action={issueCertificate} className="space-y-4">
            <select name="studentId" required className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-sm">
              <option value="">Select Student...</option>
              {students?.map(s => <option key={s.id} value={s.id}>{s.profiles?.full_name} ({s.permanent_student_id})</option>)}
            </select>
            <input type="text" name="title" placeholder="Certificate Title (e.g. Science Fair Winner)" required className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
            <textarea name="description" rows="3" placeholder="Achievement details..." required className="w-full px-4 py-2 border rounded-lg bg-gray-50"></textarea>
            <button type="submit" className="w-full bg-amber-500 text-white font-bold py-3 rounded-xl hover:bg-amber-600 transition">
              Generate Certificate
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates?.map((cert) => (
            <div key={cert.id} className="relative bg-white p-6 rounded-2xl shadow-sm border border-amber-100 overflow-hidden text-center group">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-300 to-yellow-500"></div>
              <h4 className="text-xs font-bold text-amber-600 uppercase tracking-widest mt-2">Genesis Vidyapeeth</h4>
              <h3 className="text-xl font-black text-gray-800 mt-4 mb-2">{cert.title}</h3>
              <p className="text-gray-900 font-medium">Awarded to</p>
              <p className="text-2xl font-bold text-blue-600 mb-4">{cert.students?.profiles?.full_name}</p>
              <div className="bg-gray-50 p-2 rounded-lg inline-block border border-gray-200">
                <p className="text-[10px] text-gray-500 uppercase">Verification ID</p>
                <p className="font-mono text-sm font-bold">{cert.certificate_number}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}