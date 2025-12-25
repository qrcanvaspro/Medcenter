
import React, { useState } from 'react';
import { Medicine } from '../types';
import { Pill, Plus, Trash2, Search, Filter, Edit } from 'lucide-react';

interface MedicineCatalogProps {
  medicines: Medicine[];
  onAdd: (med: Medicine) => void;
  onDelete: (id: string) => void;
}

const MedicineCatalog: React.FC<MedicineCatalogProps> = ({ medicines, onAdd, onDelete }) => {
  const [showForm, setShowForm] = useState(false);
  const [newMed, setNewMed] = useState<Partial<Medicine>>({
    category: 'Tablets',
    stock: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMed.name && newMed.dosage && newMed.time) {
      onAdd({
        ...newMed as Medicine,
        id: Date.now().toString()
      });
      setShowForm(false);
      setNewMed({ category: 'Tablets', stock: 0 });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Medicine Cabinet</h2>
          <p className="text-slate-500">Manage all your medications here.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
        >
          <Plus size={20} />
          Add New Medicine
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">All Medicines</button>
        <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-50 transition-colors whitespace-nowrap">Tablets</button>
        <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-50 transition-colors whitespace-nowrap">Syrup</button>
        <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-50 transition-colors whitespace-nowrap">Refill Needed</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicines.map((med) => (
          <div key={med.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow relative group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Pill size={24} />
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Edit size={18} /></button>
                <button 
                  onClick={() => onDelete(med.id)}
                  className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <h4 className="text-xl font-bold text-slate-800">{med.name}</h4>
            <p className="text-sm font-medium text-slate-500 mt-1">{med.dosage} • {med.category}</p>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Schedule</span>
                <span className="font-semibold text-slate-800">{med.frequency}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Next Dose</span>
                <span className="font-semibold text-slate-800">{med.time}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">In Stock</span>
                <span className={`font-semibold ${med.stock < 5 ? 'text-red-500' : 'text-slate-800'}`}>{med.stock} units</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <button className="w-full bg-slate-50 text-slate-700 py-2 rounded-xl text-sm font-medium hover:bg-slate-100 transition-colors">
                View Full Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">Add New Medicine</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600"><Trash2 size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Medicine Name</label>
                  <input 
                    type="text" required
                    className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-2"
                    placeholder="e.g. Lipitor"
                    onChange={e => setNewMed({...newMed, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Dosage</label>
                  <input 
                    type="text" required
                    className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-2"
                    placeholder="e.g. 10mg"
                    onChange={e => setNewMed({...newMed, dosage: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Frequency</label>
                  <input 
                    type="text" required
                    className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-2"
                    placeholder="e.g. Twice Daily"
                    onChange={e => setNewMed({...newMed, frequency: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Dose Time</label>
                  <input 
                    type="time" required
                    className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-2"
                    onChange={e => setNewMed({...newMed, time: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Initial Stock</label>
                  <input 
                    type="number" required
                    className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-2"
                    onChange={e => setNewMed({...newMed, stock: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-slate-100 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                  Save Medicine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineCatalog;
