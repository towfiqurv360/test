import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">G</div>
              <span className="font-black text-2xl text-slate-900 tracking-tight">Genesis Vidyapeeth</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <Link href="/" className="text-blue-600 font-semibold">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium transition">About</Link>
              <Link href="/admission" className="text-gray-600 hover:text-blue-600 font-medium transition">Admission</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 font-medium transition">Contact</Link>
              <Link href="/login" className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-slate-800 transition shadow-lg shadow-slate-200">Portal Login</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-5"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm bg-blue-50 px-4 py-2 rounded-full inline-block mb-6">Welcome to the Future of Education</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-8">
            Empowering Minds With <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Modern Learning</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Genesis Vidyapeeth is not just a school; it's a digital campus equipped with AI Study Companions, Quest Engines, and Gamified Learning to bring out the best in every student.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/admission" className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition shadow-xl shadow-blue-200 transform hover:-translate-y-1">
              Apply for Admission
            </Link>
            <Link href="/about" className="bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:border-slate-300 transition">
              Explore Campus
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900">Why Genesis Vidyapeeth?</h2>
            <p className="text-gray-500 mt-4">Discover our revolutionary educational ecosystem.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon="🤖" title="AI Study Companion" desc="24/7 personalized AI support for solving math problems and clearing doubts instantly." />
            <FeatureCard icon="🎮" title="Gamified Learning" desc="Complete quests, earn XP, and climb the leaderboard. Learning is now an adventure." />
            <FeatureCard icon="👨‍👩‍👧" title="Parent Portal" desc="Track your child's progress, attendance, and results in real-time through our dedicated app." />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 text-center">
        <h3 className="text-2xl font-black tracking-tight mb-4">Genesis Vidyapeeth</h3>
        <p className="text-slate-400">© 2026 Genesis Vidyapeeth. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}