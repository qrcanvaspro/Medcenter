
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, ShieldCheck, Info } from 'lucide-react';
import { askPharmacist } from '../services/geminiService';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

const AIAssistant: React.FC = () => {
  const { lang, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      parts: [{ text: lang === 'hi' ? "नमस्ते मनीष यादव! मैं आपका स्मार्ट AI सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?" : "Hello Manish Yadav! I'm your AI assistant. How can I help you today?" }]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, parts: m.parts }));
    const response = await askPharmacist(input, history, lang);
    
    setMessages(prev => [...prev, { role: 'model', parts: [{ text: response }] }]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-indigo-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">{t('assistant')}</h3>
            <span className="text-xs text-slate-500 font-medium">{lang === 'hi' ? 'ऑनलाइन' : 'Online'}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-4 rounded-2xl max-w-[85%] text-sm shadow-sm ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border text-slate-700'}`}>
              {m.parts[0].text}
            </div>
          </div>
        ))}
        {isLoading && <Loader2 className="animate-spin text-indigo-600 mx-auto" />}
      </div>

      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={lang === 'hi' ? 'यहाँ सवाल पूछें...' : 'Ask here...'}
            className="flex-1 bg-slate-100 rounded-xl px-4 py-3 outline-none"
          />
          <button onClick={handleSend} disabled={!input.trim() || isLoading} className="bg-indigo-600 text-white p-3 rounded-xl">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
