
import React, { useState } from 'react';
import { Phone, Package, User, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FormFieldProps {
  label: string;
  icon?: React.ReactNode;
  name: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, icon, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</label>
    <div className="relative">
      {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
      <input {...props} className={`w-full bg-slate-50 border border-slate-100 ${icon ? 'pl-12' : 'px-4'} py-5 rounded-2xl outline-none focus:border-emerald-500 font-bold shadow-sm transition-all focus:bg-white`} />
    </div>
  </div>
);

const MedicineBooking: React.FC = () => {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    medicineName: '',
    units: '',
    address: 'Sector 15, Noida, UP - 201301', 
    phone: '',
    notes: ''
  });
  const [isSending, setIsSending] = useState(false);

  const PHARMACY_WHATSAPP_NUMBER = "919616921617"; 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    const message = 
      `🏥 *MEDCENTER OFFICIAL ORDER* 🏥\n` +
      `👤 *PATIENT:* ${formData.fullName.toUpperCase()}\n` +
      `💊 *MEDICINE:* ${formData.medicineName}\n` +
      `📦 *QUANTITY:* ${formData.units} Units\n` +
      `📍 *ADDRESS:* ${formData.address}\n` +
      `📞 *CONTACT:* ${formData.phone}\n` +
      `✅ *Portal:* Manish Yadav MedCenter`;

    const whatsappUrl = `https://wa.me/${PHARMACY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      window.location.href = whatsappUrl;
      setIsSending(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in slide-in-from-bottom-8 duration-700">
      <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl overflow-hidden">
        <div className="bg-slate-900 p-12 text-white flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-4xl font-black italic tracking-tighter">{t('orderTitle')}</h2>
            <p className="text-emerald-400 font-black uppercase tracking-[0.2em] text-[10px] mt-2">Verified Portal by Manish Yadav</p>
          </div>
          <div className="bg-emerald-500 p-4 rounded-3xl shadow-lg shadow-emerald-500/30">
            <Package size={32} className="text-white" />
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-12 space-y-8 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField label={t('patientName')} icon={<User size={18} />} name="fullName" value={formData.fullName} onChange={handleInputChange} />
            <FormField label={t('contactNum')} icon={<Phone size={18} />} name="phone" value={formData.phone} onChange={handleInputChange} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField label={t('medRequired')} icon={<Package size={18} />} name="medicineName" value={formData.medicineName} onChange={handleInputChange} />
            <FormField label={t('qty')} name="units" type="number" value={formData.units} onChange={handleInputChange} />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('addr')}</label>
            <textarea 
              name="address" 
              value={formData.address} 
              onChange={handleInputChange} 
              className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl outline-none focus:border-emerald-500 font-bold focus:bg-white transition-all shadow-sm" 
              rows={3} 
            />
          </div>

          <button 
            type="submit" 
            disabled={isSending || !formData.fullName} 
            className="w-full bg-[#25D366] text-white py-6 rounded-3xl font-black text-2xl shadow-xl shadow-emerald-100 hover:scale-[1.02] transition-all flex items-center justify-center gap-4 disabled:opacity-50"
          >
            {isSending ? <Loader2 className="animate-spin" /> : t('whatsappBtn')}
          </button>
          
          <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            Order directly sent to 9616921617
          </p>
        </form>
      </div>
    </div>
  );
};

export default MedicineBooking;
