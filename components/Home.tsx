
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  ChevronRight, 
  Heart,
  Pill,
  Clock,
  Activity,
  CheckCircle,
  Search,
  BookOpen,
  MessageSquare,
  Sparkles
} from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700 bg-white">
      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Official Portal: Mr. Manish Yadav
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
              Genuine Care <br />
              <span className="text-emerald-600 italic">Trusted Advice</span> <br />
              At One Place.
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Experience the future of healthcare. Get medicine info with <span className="text-indigo-600 font-bold">AI Explorer</span> and order directly from Manish Yadav via WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/order" 
                className="bg-emerald-600 text-white px-10 py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-1 transition-all active:scale-95"
              >
                <ShoppingBag size={24} /> BUY MEDICINE
              </Link>
              <Link 
                to="/explore" 
                className="bg-indigo-600 text-white px-10 py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95"
              >
                <Search size={24} /> MEDICINE EXPLORER
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 relative group">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] transform rotate-1 group-hover:rotate-0 transition-transform duration-700 border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1631549916768-4119b295f926?auto=format&fit=crop&q=80&w=1200" 
                alt="Modern pharmacy delivery"
                className="w-full h-[550px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-600 p-3 rounded-2xl text-white">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-lg leading-tight">Authenticity Guaranteed</h4>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Verified by Mr. Manish Yadav</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Search Promo */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-50 rounded-[3rem] p-12 border border-indigo-100 space-y-6">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-indigo-50">
              <BookOpen size={32} className="text-indigo-600" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Medicine Explorer</h3>
            <p className="text-slate-600 font-medium">
              Dawai ka naam search karein aur turant uski dosage, use aur action ke bare mein Gemini AI se jaankari payein.
            </p>
            <Link to="/explore" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-lg active:scale-95 uppercase text-sm tracking-widest">
              Explore Now <ChevronRight size={18} />
            </Link>
          </div>

          <div className="bg-emerald-50 rounded-[3rem] p-12 border border-emerald-100 space-y-6">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-emerald-50">
              <MessageSquare size={32} className="text-emerald-600" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Smart AI Chatbot</h3>
            <p className="text-slate-600 font-medium">
              Health se jude sawal poochhein hamare smart assistant se. Manish Yadav's AI care is here 24/7.
            </p>
            <Link to="/chat" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3.5 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg active:scale-95 uppercase text-sm tracking-widest">
              Chat with AI <Sparkles size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Why Choose MedCenter?</h2>
            <p className="text-slate-500 font-medium">Quality healthcare managed by expert Mr. Manish Yadav.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={<Pill />} title="100% Genuine" desc="Direct sourcing from top brands." />
            <FeatureCard icon={<Clock />} title="Fast Delivery" desc="Quick dispatch to Sector 15 & Noida." />
            <FeatureCard icon={<Activity />} title="Expert Support" desc="Managed by pharmacy professionals." />
            <FeatureCard icon={<Heart />} title="Patient Care" desc="Personalized health reminders and info." />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 text-center space-y-4 hover:shadow-xl transition-all group">
    <div className="w-16 h-16 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500 shadow-inner">
      {icon}
    </div>
    <h4 className="font-black text-slate-800 tracking-tight">{title}</h4>
    <p className="text-xs text-slate-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default Home;
