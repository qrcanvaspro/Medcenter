
import React, { useState } from 'react';
import { Search, FlaskConical, Activity, AlertTriangle, BookOpen, Loader2, Info } from 'lucide-react';
import { getMedicineDetails } from '../services/geminiService';

const MedicineExplorer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    try {
      const result = await getMedicineDetails(query);
      setDetails(result);
    } catch (err) {
      setError('Medicine details not found or error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-extrabold text-slate-900">Medicine Composition Finder</h2>
        <p className="text-slate-500 max-w-lg mx-auto">Search any medicine to understand its chemical composition, uses, and side effects.</p>
        
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Combiflam, Amoxicillin, Paracetamol..."
            className="w-full pl-12 pr-32 py-4 bg-white border-2 border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none text-lg"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 bg-indigo-600 text-white px-6 rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Search'}
          </button>
        </form>
      </div>

      {!details && !loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
          <FeatureCard icon={<FlaskConical />} title="Composition" desc="Know exactly what chemicals are in your medicine." />
          <FeatureCard icon={<Activity />} title="How it Works" desc="Understand the mechanism of action." />
          <FeatureCard icon={<AlertTriangle />} title="Safety Info" desc="Be aware of side effects and warnings." />
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="animate-spin text-indigo-600" size={48} />
          <p className="text-slate-500 font-medium animate-pulse">Researching composition and medical data...</p>
        </div>
      )}

      {error && (
        <div className="bg-rose-50 border border-rose-200 p-6 rounded-2xl text-rose-700 text-center">
          {error}
        </div>
      )}

      {details && !loading && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-indigo-600 p-8 text-white">
            <h3 className="text-4xl font-black">{details.name}</h3>
            <p className="text-indigo-100 mt-2 font-medium">{details.description}</p>
          </div>

          <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Composition Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-indigo-600">
                <FlaskConical size={24} />
                <h4 className="text-xl font-bold">Chemical Composition</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {details.composition.map((item: string, i: number) => (
                  <span key={i} className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl font-bold text-sm border border-indigo-100">
                    {item}
                  </span>
                ))}
              </div>
            </section>

            {/* Uses Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-emerald-600">
                <Activity size={24} />
                <h4 className="text-xl font-bold">Primary Uses</h4>
              </div>
              <ul className="space-y-2">
                {details.uses.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Side Effects */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-amber-600">
                <AlertTriangle size={24} />
                <h4 className="text-xl font-bold">Common Side Effects</h4>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {details.sideEffects.map((item: string, i: number) => (
                  <div key={i} className="bg-amber-50 p-2 rounded-lg text-amber-800 text-xs font-semibold text-center border border-amber-100">
                    {item}
                  </div>
                ))}
              </div>
            </section>

            {/* Warnings */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-rose-600">
                <ShieldAlert size={24} />
                <h4 className="text-xl font-bold">Critical Warnings</h4>
              </div>
              <ul className="space-y-2">
                {details.warnings.map((item: string, i: number) => (
                  <li key={i} className="bg-rose-50 p-3 rounded-xl text-rose-700 text-xs font-bold flex items-start gap-3 border border-rose-100">
                    <Info size={16} className="shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="bg-slate-50 p-4 border-t border-slate-100 text-[10px] text-slate-400 text-center italic">
            Disclaimer: This information is AI-generated and should not replace professional medical advice.
          </div>
        </div>
      )}
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3">
    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
      {icon}
    </div>
    <h4 className="font-bold text-slate-800">{title}</h4>
    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

const ShieldAlert = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
);

export default MedicineExplorer;
