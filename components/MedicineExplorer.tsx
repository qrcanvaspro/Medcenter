
import React, { useState } from 'react';
import { Search, FlaskConical, Activity, AlertTriangle, BookOpen, Loader2, Info, Pill, ShieldAlert, HeartPulse, Stethoscope, ListRestart, Settings, ExternalLink, RefreshCcw } from 'lucide-react';
import { getMedicineDetails } from '../services/geminiService';
import { useLanguage } from '../context/LanguageContext';

const MedicineExplorer: React.FC = () => {
  const { lang, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isKeyMissing, setIsKeyMissing] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery || loading) return;

    setLoading(true);
    setError('');
    setIsKeyMissing(false);
    setDetails(null);
    
    try {
      const result = await getMedicineDetails(trimmedQuery, lang);
      if (result) {
        setDetails(result);
      }
    } catch (err: any) {
      console.error("Search Handler Error:", err);
      if (err.message === "API_KEY_MISSING") {
        setIsKeyMissing(true);
      } else {
        setError(lang === 'hi' 
          ? 'खोज विफल रही। कृपया दवाई का नाम चेक करें या दोबारा कोशिश करें।' 
          : 'Search failed. Please verify the medicine name or try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-700">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100">
          <BookOpen size={14} /> {lang === 'hi' ? 'मनीष यादव ज्ञान केंद्र' : 'Manish Yadav Knowledge Center'}
        </div>
        <h2 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none italic">{t('explorer')}</h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
          {lang === 'hi' 
            ? 'किसी भी दवाई के बारे में गहराई से जानें। मनीष यादव द्वारा सत्यापित AI डेटाबेस।' 
            : 'Get deep insights into any medication. AI-powered database verified by Manish Yadav.'}
        </p>
        
        <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto group">
          <div className="absolute inset-0 bg-emerald-500/10 rounded-[2.5rem] blur-3xl group-focus-within:bg-emerald-500/20 transition-all"></div>
          <div className="relative">
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-16 pr-44 py-8 bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-2xl focus:ring-8 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all outline-none text-2xl font-bold text-slate-800 placeholder:text-slate-300"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={28} />
            <button 
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-4 top-4 bottom-4 bg-slate-900 text-white px-10 rounded-[1.8rem] font-black text-lg hover:bg-slate-800 transition-all disabled:opacity-50 flex items-center gap-3 shadow-xl active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : t('exploreBtn')}
            </button>
          </div>
        </form>
      </div>

      {isKeyMissing && (
        <div className="max-w-2xl mx-auto bg-amber-50 border-2 border-amber-200 rounded-[2.5rem] p-10 space-y-6 shadow-sm animate-in zoom-in duration-300">
          <div className="flex items-center gap-5 text-amber-700">
            <Settings size={40} className="animate-spin-slow" />
            <h3 className="text-2xl font-black">{lang === 'hi' ? 'Netlify पर सेटअप आवश्यक है' : 'Netlify Setup Required'}</h3>
          </div>
          <div className="space-y-5 text-amber-800 font-bold">
            <p className="leading-relaxed">Manish ji, Netlify par search chalane ke liye aapko "API_KEY" set karni hogi:</p>
            <ul className="space-y-3 list-disc list-inside bg-white/50 p-6 rounded-2xl border border-amber-100">
              <li>Netlify Dashboard par jayein</li>
              <li>Site Settings > Environment variables mein jayein</li>
              <li>Ek naya variable banayein: <b>API_KEY</b></li>
              <li>Wahan apni Gemini key paste karein aur save karein</li>
            </ul>
            <div className="flex gap-4">
              <a 
                href="https://app.netlify.com/" 
                target="_blank" 
                className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-600 text-white px-6 py-4 rounded-2xl font-black hover:bg-amber-700 transition-all shadow-lg shadow-amber-200"
              >
                Open Netlify <ExternalLink size={18} />
              </a>
              <button onClick={() => window.location.reload()} className="bg-white border-2 border-amber-200 text-amber-600 px-6 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-amber-100 transition-all">
                <RefreshCcw size={18} /> Refresh App
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-24 space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-3xl animate-pulse"></div>
            <Loader2 className="animate-spin text-emerald-600 relative z-10" size={80} strokeWidth={3} />
          </div>
          <p className="text-slate-400 font-black text-2xl animate-pulse tracking-tight">{t('connectingAi')}</p>
        </div>
      )}

      {error && !isKeyMissing && (
        <div className="bg-rose-50 border-2 border-rose-100 p-10 rounded-[3rem] text-rose-700 text-center shadow-lg flex flex-col items-center gap-6 max-w-2xl mx-auto animate-in fade-in">
          <AlertTriangle size={64} className="text-rose-500" />
          <div className="space-y-2">
            <p className="font-black text-2xl">{lang === 'hi' ? 'क्षमा करें, एरर आ गया' : 'Oops, Something Went Wrong'}</p>
            <p className="text-rose-600/80 font-medium text-lg italic">"{error}"</p>
          </div>
          <button onClick={handleSearch} className="bg-rose-600 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-rose-700 transition-all">
            <RefreshCcw size={20} /> Try Searching Again
          </button>
        </div>
      )}

      {details && !loading && (
        <div className="space-y-12 animate-in slide-in-from-bottom-12 duration-700">
          <div className="bg-white rounded-[4rem] border border-slate-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden">
            <div className="bg-slate-900 p-12 lg:p-16 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full"></div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-emerald-500 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/30">Verified Medical Data</span>
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Portal by Manish Yadav</span>
                  </div>
                  <h3 className="text-6xl lg:text-7xl font-black tracking-tighter italic">{details.name}</h3>
                  <p className="text-slate-400 font-medium text-xl max-w-2xl leading-relaxed">{details.description}</p>
                </div>
                <div className="w-24 h-24 rounded-[2rem] bg-white/10 flex items-center justify-center backdrop-blur-2xl border border-white/20 shadow-2xl">
                  <Pill size={48} className="text-emerald-400" />
                </div>
              </div>
            </div>

            <div className="p-12 lg:p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <DetailBox icon={<HeartPulse className="text-emerald-600" />} title={lang === 'hi' ? 'मुख्य उपयोग' : 'Primary Purpose'} content={details.purpose} color="bg-emerald-50" />
              <DetailBox icon={<Activity className="text-blue-600" />} title={lang === 'hi' ? 'काम करने का तरीका' : 'Action Mechanism'} content={details.action} color="bg-blue-50" />
              <DetailBox icon={<Stethoscope className="text-amber-600" />} title={lang === 'hi' ? 'सामान्य खुराक' : 'Typical Dosage'} content={details.dosage} color="bg-amber-50" />
            </div>

            <div className="px-12 lg:px-16 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-16 border-t border-slate-50 pt-16">
              <ListSection title={lang === 'hi' ? 'दवाई की सामग्री' : 'Active Ingredients'} items={details.composition} icon={<FlaskConical size={20} className="text-indigo-600" />} />
              <ListSection title={lang === 'hi' ? 'संभावित दुष्प्रभाव' : 'Side Effects'} items={details.sideEffects} icon={<ListRestart size={20} className="text-amber-600" />} badgeColor="bg-amber-50 text-amber-800" />
              <ListSection title={lang === 'hi' ? 'जरूरी सावधानियां' : 'Safety Warnings'} items={details.warnings} icon={<ShieldAlert size={20} className="text-rose-600" />} badgeColor="bg-rose-50 text-rose-800" isWarning />
            </div>

            <div className="bg-slate-900 p-10 text-center border-t border-slate-800">
              <p className="text-slate-400 text-[10px] leading-relaxed font-black uppercase tracking-[0.3em] max-w-3xl mx-auto opacity-70">
                {t('medDisclaimer')} — Mananged by Mr. Manish Yadav
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailBox: React.FC<{ icon: React.ReactNode, title: string, content: string, color: string }> = ({ icon, title, content, color }) => (
  <div className={`p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-5 flex flex-col hover:shadow-xl transition-all hover:-translate-y-1 bg-white group`}>
    <div className={`w-16 h-16 ${color} rounded-[1.5rem] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>{icon}</div>
    <div className="space-y-2">
      <h5 className="font-black text-slate-900 text-xs mb-1 uppercase tracking-widest opacity-40">{title}</h5>
      <p className="text-slate-700 text-lg font-bold leading-snug">{content}</p>
    </div>
  </div>
);

const ListSection: React.FC<{ title: string, items: string[], icon: React.ReactNode, badgeColor?: string, isWarning?: boolean }> = ({ title, items, icon, badgeColor = "bg-slate-100 text-slate-700", isWarning }) => (
  <div className="space-y-6">
    <h4 className="flex items-center gap-3 font-black text-slate-900 uppercase tracking-widest text-xs">{icon} {title}</h4>
    <div className="space-y-3">
      {items && items.length > 0 ? items.map((item, i) => (
        <div key={i} className={`p-4 rounded-2xl font-bold text-sm border shadow-sm ${badgeColor} ${isWarning ? 'flex items-start gap-3 border-rose-100' : 'border-slate-50'}`}>
          {isWarning && <Info size={18} className="shrink-0 mt-0.5" />}
          {item}
        </div>
      )) : <p className="text-slate-400 text-xs italic">Data currently unavailable</p>}
    </div>
  </div>
);

export default MedicineExplorer;
