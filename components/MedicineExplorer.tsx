
import React, { useState } from 'react';
import { Search, FlaskConical, Activity, AlertTriangle, BookOpen, Loader2, Pill, ShieldAlert, HeartPulse, Stethoscope, ListRestart, Settings } from 'lucide-react';
import { getMedicineDetails } from '../services/geminiService';
import { useLanguage } from '../context/LanguageContext';

interface DetailCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  color?: string;
}

interface ListAreaProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
  color?: string;
  isWarning?: boolean;
}

const DetailCard: React.FC<DetailCardProps> = ({ icon, title, content, color = "bg-slate-50" }) => (
  <div className={`p-6 ${color} rounded-3xl border border-slate-100 hover:shadow-lg transition-all`}>
    <div className="mb-4">{icon}</div>
    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{title}</h5>
    <p className="text-slate-800 font-bold leading-snug">{content}</p>
  </div>
);

const ListArea: React.FC<ListAreaProps> = ({ title, items, icon, color = "text-indigo-600", isWarning = false }) => (
  <div className="space-y-4">
    <h6 className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${color}`}>
      {icon} {title}
    </h6>
    <div className="space-y-2">
      {items && items.length > 0 ? items.map((item, i) => (
        <div key={i} className={`p-3 bg-white border border-slate-100 rounded-xl text-sm font-bold text-slate-600 shadow-sm flex items-start gap-3 ${isWarning ? 'border-rose-100' : ''}`}>
          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isWarning ? 'bg-rose-400' : 'bg-slate-300'}`} />
          {item}
        </div>
      )) : <p className="text-slate-400 text-xs italic">No data available.</p>}
    </div>
  </div>
);

const MedicineExplorer: React.FC = () => {
  const { lang, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isTechnicalError, setIsTechnicalError] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    setError('');
    setIsTechnicalError(false);
    setDetails(null);
    
    try {
      const result = await getMedicineDetails(query.trim(), lang);
      setDetails(result);
    } catch (err: any) {
      console.error("Search error:", err);
      if (err.message === "API_KEY_MISSING") {
        setError(lang === 'hi' ? 'API Key सेट नहीं है' : 'API Key not configured');
        setIsTechnicalError(true);
      } else {
        setError(lang === 'hi' ? 'जानकारी नहीं मिली। कृपया पुनः प्रयास करें।' : 'Information not found. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-500">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm">
          <BookOpen size={14} /> {lang === 'hi' ? 'मनीष यादव ज्ञान केंद्र' : 'Manish Yadav Knowledge Center'}
        </div>
        <h2 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-none italic">{t('explorer')}</h2>
        
        <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto mt-8">
          <div className="relative">
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-16 pr-44 py-7 bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-2xl focus:border-emerald-500 transition-all outline-none text-xl font-bold text-slate-800"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={28} />
            <button 
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-3 top-3 bottom-3 bg-slate-900 text-white px-10 rounded-[1.8rem] font-black hover:bg-emerald-600 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : t('exploreBtn')}
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="animate-spin text-emerald-600" size={48} />
          <p className="text-slate-400 font-bold">{t('connectingAi')}</p>
        </div>
      )}

      {error && (
        <div className="bg-rose-50 border-2 border-rose-100 p-10 rounded-[3rem] text-rose-700 text-center max-w-xl mx-auto shadow-lg space-y-4">
          <AlertTriangle size={48} className="mx-auto text-rose-500" />
          <div>
            <p className="font-black text-xl mb-2">{error}</p>
            {isTechnicalError && (
              <div className="text-sm bg-white/50 p-4 rounded-2xl mt-4 border border-rose-200">
                <p className="flex items-center justify-center gap-2 mb-2 font-bold text-rose-800">
                  <Settings size={14} /> Manish Yadav Setup Guide:
                </p>
                <ol className="text-left list-decimal list-inside space-y-1 opacity-80 font-medium">
                  <li>Open Netlify Dashboard</li>
                  <li>Go to Site Settings > Environment Variables</li>
                  <li>Add <b>API_KEY</b> and paste your Gemini Key</li>
                  <li>Re-deploy the site</li>
                </ol>
              </div>
            )}
          </div>
        </div>
      )}

      {details && !loading && (
        <div className="space-y-10 animate-in slide-in-from-bottom-10">
          <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl overflow-hidden">
            <div className="bg-slate-900 p-12 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase">Verified</span>
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Portal by Manish Yadav</span>
                </div>
                <h3 className="text-6xl font-black italic tracking-tighter">{details.name}</h3>
                <p className="text-slate-400 text-lg max-w-xl leading-relaxed">{details.description}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl backdrop-blur-xl border border-white/10">
                <Pill size={48} className="text-emerald-400" />
              </div>
            </div>

            <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <DetailCard icon={<HeartPulse className="text-emerald-500" />} title="Purpose" content={details.purpose} color="bg-emerald-50/30" />
              <DetailCard icon={<Activity className="text-blue-500" />} title="Action" content={details.action} color="bg-blue-50/30" />
              <DetailCard icon={<Stethoscope className="text-amber-500" />} title="Dosage" content={details.dosage} color="bg-amber-50/30" />
            </div>

            <div className="px-10 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8 border-t border-slate-50">
              <ListArea title="Composition" items={details.composition} icon={<FlaskConical size={18} />} color="text-indigo-600" />
              <ListArea title="Side Effects" items={details.sideEffects} icon={<ListRestart size={18} />} color="text-amber-600" />
              <ListArea title="Warnings" items={details.warnings} icon={<ShieldAlert size={18} />} color="text-rose-600" isWarning />
            </div>

            <div className="bg-slate-900 p-8 text-center border-t border-slate-800">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] max-w-3xl mx-auto opacity-70">
                {t('medDisclaimer')} — Managed by Mr. Manish Yadav
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineExplorer;
