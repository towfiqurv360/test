import Link from "next/link";

export default function AdmissionPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b border-gray-100 py-6 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="font-black text-2xl text-slate-900">Genesis Vidyapeeth</Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide">Admissions Open 2026-2027</span>
          <h1 className="text-4xl font-black text-slate-900 mt-6">Online Admission Form</h1>
          <p className="text-gray-500 mt-3">Fill out the form below to begin the application process.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header of Form */}
          <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
            <h3 className="font-bold text-lg">Student Application</h3>
            <span className="text-sm text-slate-400">Step 1 of 2</span>
          </div>
          
          <form className="p-8 space-y-8">
            {/* Student Info */}
            <div>
              <h4 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Student Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name of Student *</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition" placeholder="e.g. Md Towfiqur Rahman" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Class Applying For *</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition" required>
                    <option value="">Select Class</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 9">Class 9</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Date of Birth *</label>
                  <input type="date" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Gender *</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition" required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Parent Info */}
            <div>
              <h4 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Guardian Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Father/Guardian Name *</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition" placeholder="+880" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Present Address *</label>
                  <textarea rows="3" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition" required></textarea>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-blue-200 transition transform hover:-translate-y-1">
                Submit Application
              </button>
              <p className="text-center text-xs text-gray-400 mt-4">By submitting this form, you agree to the rules and regulations of Genesis Vidyapeeth.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}