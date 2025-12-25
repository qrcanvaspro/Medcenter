
import React from 'react';
import { Medicine, Reminder } from '../types';
import { Bell, Check, Clock, Calendar } from 'lucide-react';

interface RemindersProps {
  medicines: Medicine[];
  reminders: Reminder[];
  onUpdate: (reminders: Reminder[]) => void;
}

const Reminders: React.FC<RemindersProps> = ({ medicines, reminders, onUpdate }) => {
  const toggleReminder = (id: string) => {
    const updated = reminders.map(r => r.id === id ? { ...r, completed: !r.completed } : r);
    onUpdate(updated);
    localStorage.setItem('reminders', JSON.stringify(updated));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Reminders</h2>
          <p className="text-slate-500">Stay on track with your medication schedule.</p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm font-semibold">
          <Calendar size={18} />
          <span>October 24, 2023</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <Clock size={18} className="text-indigo-600" />
            Today's Schedule
          </h3>
          <span className="text-xs font-medium text-slate-400">4 Doses Total</span>
        </div>

        <div className="divide-y divide-slate-100">
          {medicines.map((med, index) => (
            <div key={med.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="text-center min-w-[60px]">
                  <p className="text-lg font-bold text-indigo-600 leading-none">{med.time}</p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-1">
                    {parseInt(med.time) >= 12 ? 'PM' : 'AM'}
                  </p>
                </div>
                <div className="w-px h-10 bg-slate-200 hidden sm:block"></div>
                <div>
                  <p className="font-bold text-slate-800 text-lg">{med.name}</p>
                  <p className="text-sm text-slate-500 font-medium">{med.dosage} • {med.frequency}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className={`hidden md:block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${index % 2 === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  {index % 2 === 0 ? 'Taken' : 'Upcoming'}
                </div>
                <button 
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm ${index % 2 === 0 ? 'bg-emerald-600 text-white' : 'bg-white border-2 border-slate-200 text-slate-400 hover:border-indigo-600 hover:text-indigo-600'}`}
                >
                  <Check size={24} />
                </button>
              </div>
            </div>
          ))}
          {medicines.length === 0 && (
            <div className="p-12 text-center text-slate-400 italic">
              No reminders scheduled. Add medicines to get started.
            </div>
          )}
        </div>
      </div>

      {/* History Log */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-lg font-bold mb-4">Weekly Adherence</h3>
          <div className="flex items-end justify-between h-32 gap-2 mt-8">
            {[65, 80, 45, 90, 100, 85, 95].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center group cursor-pointer">
                <div 
                  style={{ height: `${val}%` }} 
                  className="w-full bg-indigo-500 rounded-t-lg group-hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-500/20"
                ></div>
                <span className="text-[10px] mt-2 font-bold opacity-60 uppercase">Day {i+1}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Bell size={120} />
        </div>
      </div>
    </div>
  );
};

export default Reminders;
