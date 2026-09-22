import { createClient } from "@/lib/supabase/server";
import { addClub } from "@/app/actions/operations";

export default async function ClubsPage() {
  const supabase = await createClient();
  const { data: clubs } = await supabase.from("clubs").select("*").order("name");

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Clubs & Activities</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h3 className="font-bold text-gray-800 mb-4">Create New Club</h3>
          <form action={addClub} className="space-y-4">
            <input type="text" name="name" placeholder="Club Name (e.g. Science Club)" required className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
            <textarea name="description" rows="3" placeholder="Club Description..." required className="w-full px-4 py-2 border rounded-lg bg-gray-50"></textarea>
            <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700">Create Club</button>
          </form>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {clubs?.map((club) => (
            <div key={club.id} className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl shadow-sm border border-purple-100">
              <h4 className="text-xl font-bold text-purple-900 mb-2">{club.name}</h4>
              <p className="text-sm text-gray-600 mb-4">{club.description}</p>
              <button className="text-purple-600 font-semibold text-sm hover:underline">Manage Members &rarr;</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}