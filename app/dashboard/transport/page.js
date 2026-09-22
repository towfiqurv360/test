import { createClient } from "@/lib/supabase/server";
import { addTransport } from "@/app/actions/operations";

export default async function TransportPage() {
  const supabase = await createClient();
  const { data: transports } = await supabase.from("transports").select("*").order("route_name");

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Transport & Routes</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h3 className="font-bold text-gray-800 mb-4">Add Route & Vehicle</h3>
          <form action={addTransport} className="space-y-4">
            <input type="text" name="routeName" placeholder="Route Name (e.g. Uttara to Campus)" required className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
            <input type="text" name="vehicleNumber" placeholder="Vehicle Number (e.g. Dhaka Metro-123)" required className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
            <input type="text" name="driverName" placeholder="Driver Name" required className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
            <input type="text" name="driverPhone" placeholder="Driver Phone" required className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
            <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700">Add Transport</button>
          </form>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {transports?.map((bus) => (
            <div key={bus.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3 border-b pb-3">
                <div className="bg-emerald-100 p-2 rounded-lg text-2xl">🚌</div>
                <div>
                  <h4 className="font-bold text-gray-800">{bus.route_name}</h4>
                  <p className="text-xs text-gray-500 font-mono">{bus.vehicle_number}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600"><span className="font-semibold">Driver:</span> {bus.driver_name}</p>
              <p className="text-sm text-gray-600"><span className="font-semibold">Phone:</span> {bus.driver_phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}