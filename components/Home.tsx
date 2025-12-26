
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Activity, Search, BookOpen, MessageSquare, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="animate-in fade-in duration-700 bg-white">
      <section className="pt-12 pb-24 px-6 overflow-hidden max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest border border-emerald-100">
              {lang === 'hi' ? 'ऑफिशियल पोर्टल: मनीष यादव' : 'Official Portal: Mr. Manish Yadav'}
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
              {t('heroTitle1')} <br />
              <span className="text-emerald-600 italic">{t('heroTitle2')}</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-medium">
              {t('heroSub')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/order" className="bg-emerald-600 text-white px-10 py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-xl">
                <ShoppingBag size={24} /> {lang === 'hi' ? 'दवाई ऑर्डर करें' : 'BUY MEDICINE'}
              </Link>
              <Link to="/explore" className="bg-indigo-600 text-white px-10 py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-xl">
                <Search size={24} /> {t('explorer')}
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 rounded-[3rem] overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1631549916768-4119b295f926?auto=format&fit=crop&q=80&w=1200" alt="MedCenter" className="w-full h-[500px] object-cover" />
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <PromoCard icon={<BookOpen size={32} />} title={t('explorer')} desc={lang === 'hi' ? 'Gemini AI से दवाओं की जानकारी लें।' : 'Get info about drugs from Gemini AI.'} to="/explore" color="bg-indigo-600" />
          <PromoCard icon={<MessageSquare size={32} />} title={t('assistant')} desc={lang === 'hi' ? 'AI सहायक से हेल्थ टिप्स लें।' : 'Get health tips from our AI bot.'} to="/chat" color="bg-emerald-600" />
        </div>
      </section>
    </div>
  );
};

const PromoCard = ({ icon, title, desc, to, color }: any) => (
  <div className="bg-white p-10 rounded-[3rem] border space-y-4 hover:shadow-lg transition-shadow">
    <div className={`w-16 h-16 ${color} text-white rounded-2xl flex items-center justify-center`}>{icon}</div>
    <h3 className="text-3xl font-black text-slate-900">{title}</h3>
    <p className="text-slate-500 font-medium">{desc}</p>
    <Link to={to} className={`inline-flex items-center gap-2 ${color} text-white px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest`}>
      Open <ChevronRight size={14} />
    </Link>
  </div>
);

export default Home;
