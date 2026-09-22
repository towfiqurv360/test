import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <header className="bg-white border-b border-gray-100 py-6 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="font-black text-2xl text-slate-900">Genesis Vidyapeeth</Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Get in <span className="text-blue-600">Touch</span></h1>
            <p className="text-lg text-gray-600 mb-12">Have questions about admissions, our curriculum, or campus facilities? Our team is here to help.</p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl shrink-0">📍</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Visit Us</h4>
                  <p className="text-gray-600 mt-1">Genesis Campus, Tech City Road<br/>Dhaka 1230, Bangladesh</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl shrink-0">📞</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Call Us</h4>
                  <p className="text-gray-600 mt-1">+880 1234 567 890<br/>+880 9876 543 210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl shrink-0">✉️</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Email Us</h4>
                  <p className="text-gray-600 mt-1">info@genesisvidyapeeth.edu<br/>admission@genesisvidyapeeth.edu</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-900 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <h3 className="text-2xl font-bold text-white mb-8 relative z-10">Send us a message</h3>
            
            <form className="relative z-10 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-white focus:bg-slate-700 focus:ring-2 focus:ring-blue-500 transition placeholder-slate-500" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-white focus:bg-slate-700 focus:ring-2 focus:ring-blue-500 transition placeholder-slate-500" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-white focus:bg-slate-700 focus:ring-2 focus:ring-blue-500 transition placeholder-slate-500" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)] transition">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}