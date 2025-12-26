
import React, { useState } from 'react';
import { ShoppingBag, MapPin, Phone, MessageSquare, Package, CheckCircle2, User, Loader2, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const MedicineBooking: React.FC = () => {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    medicineName: '',
    units: '',
    address: 'Sector 15, H-Block, Noida, UP - 201301', 
    phone: '',
    notes: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      `✅ *Source:* MedCenter Portal (Manish Yadav)`;

    const whatsappUrl = `https://wa.me/${PHARMACY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      window.location.href = whatsappUrl;
      setIsSending(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="bg-white rounded-[3rem] border shadow-xl overflow-hidden">
        <div className="bg-slate-900 p-10 text-white">
          <h2 className="text-3xl font-black">{t('orderTitle')}</h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">Manage by Manish Yadav</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <FormField label={t('patientName')} icon={<User size={18} />} name="fullName" value={formData.fullName} onChange={handleInputChange} />
          <FormField label={t('contactNum')} icon={<Phone size={18} />} name="phone" value={formData.phone} onChange={handleInputChange} />
          <FormField label={t('medRequired')} icon={<Package size={18} />} name="medicineName" value={formData.medicineName} onChange={handleInputChange} />
          <FormField label={t('qty')} name="units" type="number" value={formData.units} onChange={handleInputChange} />
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('addr')}</label>
            <textarea name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-slate-50 border p-4 rounded-2xl outline-none focus:border-emerald-500 font-bold" rows={2} />
          </div>

          <button type="submit" disabled={isSending} className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-black text-xl shadow-lg hover:scale-[1.01] transition-all">
            {isSending ? <Loader2 className="animate-spin mx-auto" /> : t('whatsappBtn')}
          </button>
        </form>
      </div>
    </div>
  );
};

const FormField = ({ label, icon, ...props }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</label>
    <div className="relative">
      {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
      <input {...props} className={`w-full bg-slate-50 border ${icon ? 'pl-12' : 'px-4'} py-4 rounded-2xl outline-none focus:border-emerald-500 font-bold`} />
    </div>
  </div>
);

export default MedicineBooking;
