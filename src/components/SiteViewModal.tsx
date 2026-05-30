import React, { useState } from 'react';
import { X, Globe2, Eye, ShieldCheck, Mail, Phone, MapPin, CheckCircle, Menu, Smartphone, Laptop } from 'lucide-react';
import { Website } from '../types';

interface SiteViewModalProps {
  website: Website;
  onClose: () => void;
  onRecordClick: (id: string) => void;
}

export default function SiteViewModal({ website, onClose, onRecordClick }: SiteViewModalProps) {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [contactSent, setContactSent] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [msgValue, setMsgValue] = useState('');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');

  const { brandColors, sections, name, logoTheme } = website;

  const handleActionClick = () => {
    // Record click event in database
    onRecordClick(website.id);
    alert('✨ شكراً لتفاعلك! تم توثيق نقرتك وتحويلك بنجاح في نظام تحليلات ArabBuilder AI كزائر حقيقي!');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValue) return;
    onRecordClick(website.id);
    setContactSent(true);
    setEmailValue('');
    setMsgValue('');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4">
      {/* Control Navigation Header of Browser simulator */}
      <div className="w-full max-w-5xl bg-gray-900 text-white rounded-t-2xl px-6 py-4 border-b border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <Globe2 className="w-5 h-5 text-emerald-400" />
          <span className="font-sans font-bold text-sm text-gray-200">محاكي متصفح الويب الذكي للعملاء</span>
        </div>

        {/* Viewport switchers */}
        <div className="flex items-center gap-1.5 bg-gray-950 p-1.5 rounded-lg border border-gray-805">
          <button
            onClick={() => setViewportMode('desktop')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 cursor-pointer transition ${viewportMode === 'desktop' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Laptop className="w-4 h-4" />
            <span className="font-sans">كمبيوتر</span>
          </button>
          <button
            onClick={() => setViewportMode('mobile')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 cursor-pointer transition ${viewportMode === 'mobile' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Smartphone className="w-4 h-4" />
            <span className="font-sans">جوال</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[11px] text-gray-400 font-mono hidden md:inline" dir="ltr">Views recorded dynamically</span>
          <button
            onClick={onClose}
            className="p-1 px-3 bg-red-650 hover:bg-red-500 rounded-lg text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
          >
            <span>إغلاق المعاينة</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Frame Shell */}
      <div className={`w-full max-w-5xl bg-white text-right overflow-y-auto transition-all duration-300 ${viewportMode === 'mobile' ? 'max-w-md h-[700px] border-x-4 border-b-4 border-gray-800 rounded-b-3xl' : 'flex-1 rounded-b-2xl h-[80vh]'}`}>
        
        {/* Mock Chrome address bar inside browser */}
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center justify-between text-xs text-gray-500 font-mono select-none">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 bg-red-400 rounded-full"></span>
            <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></span>
            <span className="w-2.5 h-2.5 bg-green-400 rounded-full"></span>
          </div>
          <div className="flex-1 max-w-md mx-auto bg-white border border-gray-200 rounded-lg py-1 px-4 text-center text-[10px] text-gray-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>https://{website.domain || `${website.industry}.arabbuilder.ai`}</span>
          </div>
          <div className="w-12"></div>
        </div>

        {/* WEBSITE LIVE SURFACE USING DYNAMIC brandColors */}
        <div
          style={{
            backgroundColor: brandColors.bgBg || '#fcfbf7',
            color: brandColors.textPrimary || '#1f2937',
            fontFamily: '"Cairo", sans-serif'
          }}
          className="min-h-full pb-16 outline-none"
          dir="rtl"
        >
          {/* Header section */}
          <header className="sticky top-0 z-35 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 px-6 py-4 flex justify-between items-center">
            <span className="text-lg font-black tracking-tight" style={{ color: brandColors.primary }}>
              {logoTheme || name}
            </span>

            {/* Simulated Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-bold">
              <a href="#hero" className="hover:opacity-80 transition" style={{ color: brandColors.textPrimary }}>الرئيسية</a>
              {sections.some(s => s.type === 'about') && (
                <a href="#about" className="hover:opacity-80 transition" style={{ color: brandColors.textSecondary }}>قصتنا</a>
              )}
              {sections.some(s => s.type === 'services') && (
                <a href="#services" className="hover:opacity-80 transition" style={{ color: brandColors.textSecondary }}>خدماتنا</a>
              )}
              {sections.some(s => s.type === 'faq') && (
                <a href="#faq" className="hover:opacity-80 transition" style={{ color: brandColors.textSecondary }}>الأسئلة الأكثر شيوعاً</a>
              )}
              {sections.some(s => s.type === 'contact') && (
                <a href="#contact" className="hover:opacity-80 transition" style={{ color: brandColors.textSecondary }}>اتصل بنا</a>
              )}
            </nav>

            <button
              onClick={handleActionClick}
              style={{ backgroundColor: brandColors.primary }}
              className="px-4 py-2 rounded-lg text-white font-bold text-xs hover:opacity-90 transition hidden sm:block"
            >
              راسلنا الآن
            </button>
            <div className="md:hidden">
              <Menu className="w-5 h-5 text-gray-500" />
            </div>
          </header>

          {/* DYNAMIC SECTIONS LIST */}
          {sections.map((section) => {
            if (section.type === 'hero') {
              return (
                <section
                  id="hero"
                  key={section.id}
                  className="px-6 py-12 md:py-24 text-right grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto"
                >
                  <div className="space-y-6">
                    <h1 className="text-3xl md:text-5xl font-black leading-tight" style={{ color: brandColors.secondary }}>
                      {section.heading}
                    </h1>
                    <p className="text-base md:text-lg font-semibold" style={{ color: brandColors.primary }}>
                      {section.subheading}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: brandColors.textSecondary }}>
                      {section.body}
                    </p>
                    {section.buttonText && (
                      <button
                        onClick={handleActionClick}
                        style={{ backgroundColor: brandColors.accent }}
                        className="px-6 py-3 rounded-xl text-white font-extrabold text-sm hover:opacity-90 transition shadow-lg inline-block text-center cursor-pointer"
                      >
                        {section.buttonText}
                      </button>
                    )}
                  </div>
                  {section.image && (
                    <div className="rounded-2xl overflow-hidden shadow-2xl skew-y-1 relative group w-full h-[250px] md:h-[350px]">
                      <img
                        src={section.image}
                        alt={section.heading}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </section>
              );
            }

            if (section.type === 'about') {
              return (
                <section
                  id="about"
                  key={section.id}
                  className="px-6 py-12 md:py-20 max-w-6xl mx-auto"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {section.image && (
                      <div className="rounded-2xl overflow-hidden shadow-xl w-full h-[250px] md:h-[350px]">
                        <img
                          src={section.image}
                          alt={section.heading}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <div className="space-y-4">
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: brandColors.primary }}>
                        {section.subheading || 'تعرف أكثر عن تفاصيلنا'}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold" style={{ color: brandColors.secondary }}>
                        {section.heading}
                      </h2>
                      <p className="text-sm leading-relaxed font-sans" style={{ color: brandColors.textSecondary }}>
                        {section.body}
                      </p>
                    </div>
                  </div>
                </section>
              );
            }

            if (section.type === 'services') {
              return (
                <section
                  id="services"
                  key={section.id}
                  className="px-6 py-12 md:py-20 max-w-6xl mx-auto space-y-10"
                >
                  <div className="text-center max-w-2xl mx-auto space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold" style={{ color: brandColors.secondary }}>
                      {section.heading}
                    </h2>
                    <p className="text-xs" style={{ color: brandColors.textSecondary }}>
                      {section.subheading}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {section.items?.map((item) => (
                      <div
                        key={item.id}
                        style={{ backgroundColor: brandColors.bgCard }}
                        className="p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <span className="text-xs font-bold font-mono" style={{ color: brandColors.primary }}>★ الخدمة</span>
                          <h4 className="text-lg font-bold" style={{ color: brandColors.textPrimary }}>{item.title}</h4>
                          <p className="text-xs leading-relaxed" style={{ color: brandColors.textSecondary }}>{item.description}</p>
                        </div>
                        {item.price && (
                          <div className="pt-4 border-t border-gray-100 flex justify-between items-baseline">
                            <span className="text-xs text-gray-400">السعر يبدأ من:</span>
                            <span className="text-sm font-extrabold" style={{ color: brandColors.primary }}>{item.price}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            if (section.type === 'faq') {
              return (
                <section
                  id="faq"
                  key={section.id}
                  className="px-6 py-12 md:py-20 max-w-4xl mx-auto space-y-10"
                >
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold" style={{ color: brandColors.secondary }}>
                      {section.heading}
                    </h2>
                    <p className="text-xs" style={{ color: brandColors.textSecondary }}>
                      {section.subheading}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {section.items?.map((item) => {
                      const isOpen = activeFaq === item.id;
                      return (
                        <div
                          key={item.id}
                          style={{ backgroundColor: brandColors.bgCard }}
                          className="rounded-xl border border-gray-100 overflow-hidden"
                        >
                          <button
                            onClick={() => setActiveFaq(isOpen ? null : item.id)}
                            className="w-full text-right p-5 font-bold text-sm flex justify-between items-center bg-gray-50/50 hover:bg-gray-50 transition"
                            style={{ color: brandColors.textPrimary }}
                          >
                            <span>{item.title}</span>
                            <span className="text-xl leading-none text-emerald-500">{isOpen ? '−' : '+'}</span>
                          </button>
                          {isOpen && (
                            <div className="p-5 text-xs leading-relaxed border-t border-gray-100" style={{ color: brandColors.textSecondary }}>
                              {item.description || item.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            }

            if (section.type === 'contact') {
              return (
                <section
                  id="contact"
                  key={section.id}
                  className="px-6 py-12 md:py-20 max-w-5xl mx-auto"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Form block */}
                    <div style={{ backgroundColor: brandColors.bgCard }} className="p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg" style={{ color: brandColors.textPrimary }}>أرسل رسالة مباشرة</h3>
                        <p className="text-xs text-gray-400">سنقوم بالتواصل والرد عليك في أسرع وقت ممكن.</p>
                      </div>

                      {contactSent ? (
                        <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center space-y-2">
                          <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
                          <h4 className="font-bold text-sm text-emerald-600">تم إرسال رسالتك بنجاح!</h4>
                          <p className="text-xs text-emerald-700">شكرًا لتواصلك معنا. سنبقى على تواصل.</p>
                        </div>
                      ) : (
                        <form onSubmit={handleContactSubmit} className="space-y-4">
                          <input
                            type="email"
                            placeholder="البريد الإلكتروني الخاص بك *"
                            required
                            value={emailValue}
                            onChange={(e) => setEmailValue(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          />
                          <textarea
                            rows={4}
                            placeholder="اكتب هنا استفسارك أو تفاصيل الحجز..."
                            required
                            value={msgValue}
                            onChange={(e) => setMsgValue(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none resize-none"
                          ></textarea>
                          <button
                            type="submit"
                            style={{ backgroundColor: brandColors.primary }}
                            className="w-full py-3 rounded-lg text-white font-bold text-xs hover:opacity-90 transition shadow"
                          >
                            تأكيد الإرسال
                          </button>
                        </form>
                      )}
                    </div>

                    {/* Info Block */}
                    <div className="space-y-8 flex flex-col justify-center">
                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: brandColors.primary }}>
                          📍 معالم ووسائل الاتصال
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: brandColors.secondary }}>
                          {section.heading}
                        </h2>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: brandColors.textSecondary }}>
                        {section.body}
                      </p>

                      <div className="space-y-3.5 text-xs text-gray-600">
                        <div className="flex gap-2 items-center">
                          <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>المقر: {website.industry === 'restaurant' ? 'شارع التسعين، المنصورة، عدن، اليمن' : 'شارع الستين الشرقي، الرياض، السعودية'}</span>
                        </div>
                        <div className="flex gap-2 items-center font-mono">
                          <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span dir="ltr">+966 50 000 0000</span>
                        </div>
                        <div className="flex gap-2 items-center font-mono">
                          <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>support@{website.industry}.arabbuilder.ai</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              );
            }

            return null;
          })}

          {/* Fallback footer */}
          <footer className="mt-16 border-t border-gray-150 py-8 px-6 text-center text-xs text-gray-400 font-sans">
            <p className="font-bold">© {new Date().getFullYear()} {name}. جميع الحقوق محفوظة.</p>
            <p className="mt-1 text-[10px]">مبني ومستضاف بمساعدة منصة <span className="text-emerald-500 font-bold">ArabBuilder AI</span> السلسة.</p>
          </footer>
        </div>

      </div>
    </div>
  );
}
