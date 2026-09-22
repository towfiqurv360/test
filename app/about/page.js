import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Simple Header */}
      <header className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="font-black text-2xl text-slate-900">Genesis Vidyapeeth</Link>
          <Link href="/login" className="text-blue-600 font-bold hover:underline">Portal Login &rarr;</Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">Redefining Education for the <span className="text-blue-600">Digital Age</span></h1>
          <p className="text-lg text-gray-600">We blend traditional moral values with cutting-edge technology to prepare our students for the future.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop" alt="Campus" className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission & Vision</h2>
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h3 className="text-xl font-bold text-blue-900 mb-2">🎯 The Mission</h3>
                <p className="text-blue-800/80">To provide a secure, engaging, and highly technological learning environment where students develop critical thinking and problem-solving skills.</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                <h3 className="text-xl font-bold text-purple-900 mb-2">👁️ The Vision</h3>
                <p className="text-purple-800/80">To become a globally recognized digital campus that sets the benchmark for modern education, AI integration, and holistic student development.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-slate-900 text-white rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-black mb-12">Our Academic Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <ValueCard num="01" title="Interactive Learning" desc="Moving beyond rote memorization to practical understanding." />
            <ValueCard num="02" title="Gamification" desc="XP, Ranks, and Rewards to keep students motivated." />
            <ValueCard num="03" title="AI Assistance" desc="Personalized tutors available 24/7 for every student." />
            <ValueCard num="04" title="Human Touch" desc="Live teacher support and active club participation." />
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueCard({ num, title, desc }) {
  return (
    <div className="text-left">
      <span className="text-blue-500 font-black text-4xl opacity-50 block mb-4">{num}</span>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-slate-400 text-sm">{desc}</p>
    </div>
  );
}