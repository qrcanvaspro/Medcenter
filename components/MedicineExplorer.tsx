
import React, { useState } from 'react';
import { Search, FlaskConical, Activity, AlertTriangle, BookOpen, Loader2, Info, Pill, ShieldAlert, HeartPulse, Stethoscope, ListRestart } from 'lucide-react';
import { getMedicineDetails } from '../services/geminiService';
import { useLanguage } from '../context/LanguageContext';

const MedicineExplorer: React.FC = () => {
  const { lang, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery || loading) return;

    setLoading(true);
    setError('');
    setDetails(null);
    
    try {
      const result = await getMedicineDetails(trimmedQuery, lang);
      if (result) {
        setDetails(result);
      } else {
        throw new Error("No data returned");
      }
    } catch (err: any) {
      console.error("Search Handler Error:", err);
      setError(err.message || (lang === 'hi' ? 'कुछ गलत हो गया। कृपया दोबारा कोशिश करें।' : 'Search failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-10 animate-in fade-in duration-700">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest border border-indigo-100">
          <BookOpen size={14} /> {lang === 'hi' ? 'ज्ञान केंद्र' : 'Knowledge Center'}
        </div>
        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">{t('explorer')}</h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg">
          {lang === 'hi' ? 'मनीष यादव द्वारा सत्यापित। Gemini AI से दवा की जानकारी लें।' : 'Verified by Mr. Manish Yadav. Get medical info via Gemini AI.'}
        </p>
        
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
          <div className="absolute inset-0 bg-indigo-500/10 rounded-3xl blur-2xl group-focus-within:bg-indigo-500/20 transition-all"></div>
          <div className="relative">
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-14 pr-40 py-6 bg-white border-2 border-slate-100 rounded-[2rem] shadow-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all outline-none text-xl font-bold text-slate-800"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
            <button 
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-3 top-3 bottom-3 bg-indigo-600 text-white px-8 rounded-2xl font-black hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-indigo-200 active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : t('exploreBtn')}
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-6">
          <Loader2 className="animate-spin text-indigo-600" size={64} strokeWidth={3} />
          <p className="text-slate-500 font-black text-xl animate-pulse tracking-tight">{t('connectingAi')}</p>
        </div>
      )}

      {error && (
        <div className="bg-rose-50 border-2 border-rose-100 p-8 rounded-[2rem] text-rose-700 text-center shadow-sm flex flex-col items-center gap-4 max-w-2xl mx-auto">
          <AlertTriangle size={48} className="text-rose-500" />
          <div className="space-y-1">
            <p className="font-bold text-lg">{lang === 'hi' ? 'खोज विफल रही' : 'Search Failed'}</p>
            <p className="text-sm opacity-80">{error}</p>
          </div>
          <button onClick={() => setError('')} className="text-xs font-black text-rose-500 underline uppercase tracking-widest">Try with a different name</button>
        </div>
      )}

      {details && !loading && (
        <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-500">
          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden">
            <div className="bg-slate-900 p-10 lg:p-12 text-white relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{lang === 'hi' ? 'सत्यापित जानकारी' : 'Verified Info'}</span>
                  <h3 className="text-5xl font-black tracking-tighter">{details.name}</h3>
                  <p className="text-slate-400 font-medium text-lg max-w-xl">{details.description}</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
                  <Pill size={32} className="text-emerald-400" />
                </div>
              </div>
            </div>

            <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <DetailBox icon={<HeartPulse className="text-emerald-600" />} title={lang === 'hi' ? 'उपयोग' : 'Purpose'} content={details.purpose} color="bg-emerald-50" />
              <DetailBox icon={<Activity className="text-blue-600" />} title={lang === 'hi' ? 'कार्यविधि' : 'Action'} content={details.action} color="bg-blue-50" />
              <DetailBox icon={<Stethoscope className="text-amber-600" />} title={lang === 'hi' ? 'खुराक' : 'Dosage'} content={details.dosage} color="bg-amber-50" />
            </div>

            <div className="px-8 lg:px-12 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
              <ListSection title={lang === 'hi' ? 'संरचना' : 'Composition'} items={details.composition} icon={<FlaskConical size={16} className="text-indigo-600" />} />
              <ListSection title={lang === 'hi' ? 'दुष्प्रभाव' : 'Side Effects'} items={details.sideEffects} icon={<ListRestart size={16} className="text-amber-600" />} badgeColor="bg-amber-50 text-amber-800" />
              <ListSection title={lang === 'hi' ? 'चेतावनियाँ' : 'Warnings'} items={details.warnings} icon={<ShieldAlert size={16} className="text-rose-600" />} badgeColor="bg-rose-50 text-rose-800" isWarning />
            </div>

            <div className="bg-slate-900 p-8 text-center border-t border-slate-800">
              <p className="text-slate-400 text-[11px] leading-relaxed font-bold uppercase tracking-widest">
                {t('medDisclaimer')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailBox: React.FC<{ icon: React.ReactNode, title: string, content: string, color: string }> = ({ icon, title, content, color }) => (
  <div className={`p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4 flex flex-col hover:shadow-md transition-shadow`}>
    <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center shadow-sm`}>{icon}</div>
    <h5 className="font-black text-slate-800 text-sm mb-2 uppercase tracking-tight">{title}</h5>
    <p className="text-slate-600 text-sm font-medium leading-relaxed">{content}</p>
  </div>
);

const ListSection: React.FC<{ title: string, items: string[], icon: React.ReactNode, badgeColor?: string, isWarning?: boolean }> = ({ title, items, icon, badgeColor = "bg-slate-100 text-slate-700", isWarning }) => (
  <div className="space-y-4">
    <h4 className="flex items-center gap-2 font-black text-slate-800 uppercase tracking-widest text-xs">{icon} {title}</h4>
    <div className="space-y-2">
      {items && items.length > 0 ? items.map((item, i) => (
        <div key={i} className={`p-3 rounded-xl font-bold text-xs border ${badgeColor} ${isWarning ? 'flex items-start gap-2' : ''}`}>
          {isWarning && <Info size={14} className="shrink-0 mt-0.5" />}
          {item}
        </div>
      )) : <p className="text-slate-400 text-xs italic">No information available</p>}
    </div>
  </div>
);

export default MedicineExplorer;
