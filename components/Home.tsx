
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Activity, Search, BookOpen, MessageSquare, Sparkles, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="animate-in fade-in duration-700 bg-white">
      {/* Hero Section */}
      <section className="relative pt-8 lg:pt-16 pb-24 px-6 overflow-hidden max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Content Side */}
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100 shadow-sm">
              <Sparkles size={14} className="animate-pulse" />
              {lang === 'hi' ? 'मनीष यादव का आधिकारिक पोर्टल' : 'Official Portal: Mr. Manish Yadav'}
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.95] tracking-tighter">
              {t('heroTitle1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 italic">
                {t('heroTitle2')}
              </span>
            </h1>
            
            <p className="text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              {t('heroSub')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
              <Link to="/order" className="group bg-emerald-600 text-white px-10 py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 shadow-2xl shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-1 transition-all active:scale-95">
                <ShoppingBag size={24} className="group-hover:rotate-12 transition-transform" /> 
                {t('buyNow')}
              </Link>
              <Link to="/explore" className="bg-slate-900 text-white px-10 py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 shadow-2xl shadow-slate-200 hover:bg-slate-800 hover:-translate-y-1 transition-all active:scale-95 border-b-4 border-slate-700">
                <Search size={24} /> {t('explorer')}
              </Link>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 opacity-60">
              <div className="text-center lg:text-left">
                <p className="text-2xl font-black text-slate-900">100%</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Genuine</p>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div className="text-center lg:text-left">
                <p className="text-2xl font-black text-slate-900">FAST</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Delivery</p>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div className="text-center lg:text-left">
                <p className="text-2xl font-black text-slate-900">24/7</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Support</p>
              </div>
            </div>
          </div>

          {/* Image Side - High Quality Brand Showcase */}
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full -z-10 animate-pulse"></div>
            <div className="relative rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] border-[12px] border-white transform lg:rotate-2 hover:rotate-0 transition-all duration-700">
              <div className="aspect-[3/4] bg-slate-100 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1631549916768-4119b295f926?auto=format&fit=crop&q=80&w=1200" 
                  alt="MedCenter Branding Poster" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl border border-emerald-400/50">
                      <Activity size={28} className="text-white" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-70">MedCenter</p>
                      <p className="text-2xl font-black leading-none tracking-tight">Manish Yadav</p>
                   </div>
                </div>
                <h4 className="text-4xl font-black italic tracking-tighter leading-tight mb-2">Delivering Health & Trust.</h4>
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                   <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                   Trusted Care in Your Hands
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-[2.5rem] shadow-2xl border border-slate-50 hidden lg:block animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <Heart size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="text-slate-900 font-black leading-tight text-lg">Trusted By</p>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">1000+ Families</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Cards */}
      <section className="py-24 px-6 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Our Core Services</h2>
            <div className="w-20 h-1.5 bg-emerald-500 mx-auto rounded-full shadow-sm shadow-emerald-200"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <PromoCard 
              icon={<BookOpen size={40} />} 
              title={t('explorer')} 
              desc={lang === 'hi' ? 'दवाओं की पूरी जानकारी प्राप्त करें - उपयोग, खुराक और साइड इफेक्ट्स।' : 'Get deep insights into medications - usage, dosage, and side effects.'} 
              to="/explore" 
              color="bg-slate-900" 
              label="AI SEARCH"
            />
            <PromoCard 
              icon={<MessageSquare size={40} />} 
              title={t('assistant')} 
              desc={lang === 'hi' ? '24/7 AI सहायक के साथ अपनी सेहत की समस्याओं पर चर्चा करें।' : 'Discuss your health concerns 24/7 with our specialized AI assistant.'} 
              to="/chat" 
              color="bg-emerald-600" 
              label="AI CHAT"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const PromoCard = ({ icon, title, desc, to, color, label }: any) => (
  <div className="group bg-white p-12 rounded-[4rem] border border-slate-100 space-y-6 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-2 relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-[0.03] rounded-bl-[100px] group-hover:w-full group-hover:h-full group-hover:rounded-none transition-all duration-500`}></div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-8">
        <div className={`w-20 h-20 ${color} text-white rounded-3xl flex items-center justify-center shadow-lg shadow-slate-200`}>{icon}</div>
        <span className="text-[10px] font-black tracking-widest text-slate-300 uppercase">{label}</span>
      </div>
      <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">{title}</h3>
      <p className="text-slate-500 font-medium text-lg leading-relaxed mb-8">{desc}</p>
      <Link to={to} className={`inline-flex items-center gap-3 ${color} text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-lg active:scale-95 transition-all`}>
        Explore Now <ChevronRight size={16} />
      </Link>
    </div>
  </div>
);

export default Home;
