import { createClient } from "@/lib/supabase/server";
import { publishNotice } from "@/app/actions/operations";

export default async function NoticesPage() {
  const supabase = await createClient();
  const { data: notices } = await supabase.from("notices").select("*, profiles(full_name)").order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Digital Notice Board</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h3 className="font-bold text-gray-800 mb-4">Publish Notice</h3>
          <form action={publishNotice} className="space-y-4">
            <input type="text" name="title" placeholder="Notice Title" required className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
            <select name="targetAudience" required className="w-full px-4 py-2 border rounded-lg bg-gray-50">
              <option value="Everyone">Everyone</option>
              <option value="Students">Students Only</option>
              <option value="Parents">Parents Only</option>
              <option value="Teachers">Teachers Only</option>
            </select>
            <textarea name="content" rows="4" placeholder="Notice Content..." required className="w-full px-4 py-2 border rounded-lg bg-gray-50"></textarea>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700">Publish</button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {notices?.map(notice => (
            <div key={notice.id} className="bg-white p-6 rounded-2xl shadow-sm border border-l-4 border-l-blue-500">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">For: {notice.target_audience}</span>
                <span className="text-xs text-gray-400">{new Date(notice.created_at).toLocaleDateString()}</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">{notice.title}</h4>
              <p className="text-gray-600 whitespace-pre-wrap">{notice.content}</p>
              <p className="text-xs text-gray-400 mt-4 text-right">Published by: {notice.profiles?.full_name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}