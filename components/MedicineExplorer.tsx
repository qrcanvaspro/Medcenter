
import React, { useState } from 'react';
import { Search, FlaskConical, Activity, AlertTriangle, BookOpen, Loader2, Info, Pill, ShieldAlert, HeartPulse, Stethoscope } from 'lucide-react';
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
      setError('Medicine details not found. Please check the spelling and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-10 animate-in fade-in duration-700">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest border border-indigo-100">
          <BookOpen size={14} /> Smart Knowledge Base
        </div>
        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Medicine Explorer</h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg">
          Search for any medicine to understand its purpose, how it works, and recommended dosage.
        </p>
        
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
          <div className="absolute inset-0 bg-indigo-500/10 rounded-3xl blur-2xl group-focus-within:bg-indigo-500/20 transition-all"></div>
          <div className="relative">
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter medicine name (e.g. Paracetamol, Metformin)..."
              className="w-full pl-14 pr-40 py-6 bg-white border-2 border-slate-100 rounded-[2rem] shadow-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all outline-none text-xl font-bold text-slate-800"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-3 top-3 bottom-3 bg-indigo-600 text-white px-8 rounded-2xl font-black hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-indigo-200 active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'SEARCH'}
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-6">
          <div className="relative">
            <Loader2 className="animate-spin text-indigo-600" size={64} strokeWidth={3} />
            <Activity className="absolute inset-0 m-auto text-indigo-400 animate-pulse" size={24} />
          </div>
          <p className="text-slate-500 font-black text-xl animate-pulse tracking-tight">Analyzing medical database...</p>
        </div>
      )}

      {error && (
        <div className="bg-rose-50 border-2 border-rose-100 p-8 rounded-[2rem] text-rose-700 text-center shadow-sm flex flex-col items-center gap-4">
          <AlertTriangle size={48} className="text-rose-500" />
          <p className="font-bold text-lg">{error}</p>
          <button onClick={() => setError('')} className="text-sm font-black text-rose-500 underline uppercase tracking-widest">Try Again</button>
        </div>
      )}

      {details && !loading && (
        <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-500">
          {/* Main Info Card */}
          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden">
            <div className="bg-slate-900 p-10 lg:p-12 text-white relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <span className="bg-indigo-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Verified Info</span>
                  <h3 className="text-5xl font-black tracking-tighter">{details.name}</h3>
                  <p className="text-slate-400 font-medium text-lg max-w-xl">{details.description}</p>
                </div>
                <div className="shrink-0 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                    <Pill size={32} className="text-emerald-400" />
                  </div>
                </div>
              </div>
              <Activity className="absolute -right-20 -bottom-20 text-white/5 rotate-12" size={350} />
            </div>

            <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Purpose Section */}
              <DetailBox 
                icon={<HeartPulse className="text-emerald-600" />} 
                title="Purpose / Primary Use" 
                content={details.purpose} 
                color="bg-emerald-50"
              />
              
              {/* Action Section */}
              <DetailBox 
                icon={<Activity className="text-blue-600" />} 
                title="How it Works (Action)" 
                content={details.action} 
                color="bg-blue-50"
              />

              {/* Dosage Section */}
              <DetailBox 
                icon={<Stethoscope className="text-amber-600" />} 
                title="General Dosage" 
                content={details.dosage} 
                color="bg-amber-50"
              />
            </div>

            <div className="px-8 lg:px-12 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Composition */}
              <div className="space-y-4">
                <h4 className="flex items-center gap-2 font-black text-slate-800 uppercase tracking-widest text-xs">
                  <FlaskConical size={16} className="text-indigo-600" /> Composition
                </h4>
                <div className="flex flex-wrap gap-2">
                  {details.composition.map((item: string, i: number) => (
                    <span key={i} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm border border-slate-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Warnings */}
              <div className="space-y-4">
                <h4 className="flex items-center gap-2 font-black text-slate-800 uppercase tracking-widest text-xs text-rose-600">
                  <ShieldAlert size={16} /> Critical Warnings
                </h4>
                <div className="space-y-3">
                  {details.warnings.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 bg-rose-50 p-4 rounded-2xl border border-rose-100 text-rose-800 text-xs font-bold">
                      <Info size={16} className="shrink-0 mt-0.5" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Strict Disclaimer */}
            <div className="bg-slate-900 p-8 text-center border-t border-slate-800">
              <div className="max-w-3xl mx-auto space-y-3">
                <div className="flex items-center justify-center gap-2 text-amber-500 font-black text-xs uppercase tracking-[0.2em]">
                  <AlertTriangle size={16} /> Medical Disclaimer
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed font-medium">
                  This information is generated by AI and intended for educational purposes only. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Dosage varies significantly by patient age, weight, and condition. <br />
                  <span className="text-white font-bold">ZAROORI: Kisi bhi dawai ka sevan karne se pehle apne doctor se zaroor salah lein. Manish Yadav's MedCenter supports safe and verified medical practice.</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={() => { setDetails(null); setQuery(''); }}
              className="text-slate-400 font-black text-xs uppercase tracking-widest hover:text-indigo-600 transition-colors"
            >
              ← Search Another Medicine
            </button>
          </div>
        </div>
      )}

      {!details && !loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          <InfoCard icon={<Pill />} title="Detailed Dosage" desc="Learn common adult dosage guidelines for medications." />
          <InfoCard icon={<Activity />} title="Body Action" desc="Understand how the medicine interacts with your system." />
          <InfoCard icon={<HeartPulse />} title="Treats What?" desc="Find out the primary purpose and conditions treated." />
        </div>
      )}
    </div>
  );
};

const DetailBox: React.FC<{ icon: React.ReactNode, title: string, content: string, color: string }> = ({ icon, title, content, color }) => (
  <div className={`p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4 flex flex-col`}>
    <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center shadow-sm`}>
      {icon}
    </div>
    <div>
      <h5 className="font-black text-slate-800 text-sm mb-2 uppercase tracking-tight">{title}</h5>
      <p className="text-slate-600 text-sm font-medium leading-relaxed">{content}</p>
    </div>
  </div>
);

const InfoCard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 text-center space-y-4 hover:-translate-y-1 transition-transform">
    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
      {icon}
    </div>
    <h4 className="font-black text-slate-800 tracking-tight">{title}</h4>
    <p className="text-xs text-slate-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default MedicineExplorer;
