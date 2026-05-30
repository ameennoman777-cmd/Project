import React, { useState } from 'react';
import { Layout, Save, Globe, Eye, Code, Smartphone, Laptop, Check, HelpCircle, ArrowRight, Paintbrush, FileText, ChevronRight, Download } from 'lucide-react';
import { Website, Section, BrandColors } from '../types';

interface WorkspaceEditorProps {
  website: Website;
  onCancel: () => void;
  onSave: (updatedWebsite: Website) => void;
  onOpenLivePreview: (website: Website) => void;
}

export default function WorkspaceEditor({ website, onCancel, onSave, onOpenLivePreview }: WorkspaceEditorProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'theme' | 'seo' | 'export'>('content');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  
  // State cloned from active website
  const [name, setName] = useState(website.name);
  const [logoTheme, setLogoTheme] = useState(website.logoTheme);
  const [brandColors, setBrandColors] = useState<BrandColors>({ ...website.brandColors });
  const [sections, setSections] = useState<Section[]>([...website.sections]);
  const [seo, setSeo] = useState({ ...website.seo });
  const [domain, setDomain] = useState(website.domain || '');

  // Track active section index being edited
  const [activeSecIdx, setActiveSecIdx] = useState<number>(0);

  const saveChanges = () => {
    const updated: Website = {
      ...website,
      name,
      logoTheme,
      brandColors,
      sections,
      seo,
      domain
    };
    onSave(updated);
  };

  const handleSectionTextChange = (idx: number, field: 'heading' | 'subheading' | 'body' | 'buttonText', value: string) => {
    const updatedSect = [...sections];
    updatedSect[idx] = {
      ...updatedSect[idx],
      [field]: value
    };
    setSections(updatedSect);
  };

  const handleColorChange = (key: keyof BrandColors, value: string) => {
    setBrandColors(prev => ({ ...prev, [key]: value }));
  };

  // Standalone offline HTML code exporter generator
  const exportFullCode = (): string => {
    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${seo.title || name}</title>
    <meta name="description" content="${seo.description}">
    <meta name="keywords" content="${seo.keywords}">
    
    <!-- Tailwind CSS Script CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Cairo Font -->
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        body {
            font-family: 'Cairo', sans-serif;
            background-color: ${brandColors.bgBg};
            color: ${brandColors.textPrimary};
        }
    </style>
</head>
<body class="min-h-screen">

    <!-- Header navigation -->
    <header class="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-150 px-6 py-4 flex justify-between items-center">
        <span class="text-xl font-black tracking-tight" style="color: ${brandColors.primary}">
            ${logoTheme || name}
        </span>
        <nav class="hidden md:flex items-center gap-6 text-sm font-bold">
            <a href="#hero" class="hover:opacity-80 transition" style="color: ${brandColors.textPrimary}">الرئيسية</a>
            <a href="#about" class="hover:opacity-80 transition" style="color: ${brandColors.textSecondary}">قصتنا</a>
            <a href="#services" class="hover:opacity-80 transition" style="color: ${brandColors.textSecondary}">خدماتنا</a>
            <a href="#faq" class="hover:opacity-80 transition" style="color: ${brandColors.textSecondary}">الأسئلة الأكثر شيوعاً</a>
            <a href="#contact" class="hover:opacity-80 transition" style="color: ${brandColors.textSecondary}">اتصل بنا</a>
        </nav>
        <button onclick="triggerCTA()" class="px-4 py-2 rounded-lg text-white font-bold text-xs hover:opacity-90 transition" style="background-color: ${brandColors.primary}">
            راسلنا الآن
        </button>
    </header>

    <!-- CONTENT SECTIONS -->
    <main>
        ${sections.map(sec => {
          if (sec.type === 'hero') {
            return `<!-- Hero Section -->
            <section id="hero" class="px-6 py-12 md:py-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div class="space-y-6">
                    <h1 class="text-3xl md:text-5xl font-black leading-tight" style="color: ${brandColors.secondary}">${sec.heading}</h1>
                    <p class="text-base md:text-lg font-semibold" style="color: ${brandColors.primary}">${sec.subheading || ''}</p>
                    <p class="text-sm leading-relaxed" style="color: ${brandColors.textSecondary}">${sec.body || ''}</p>
                    ${sec.buttonText ? `<button onclick="triggerCTA()" class="px-6 py-3 rounded-xl text-white font-extrabold text-sm hover:opacity-90 transition shadow-lg" style="background-color: ${brandColors.accent}">${sec.buttonText}</button>` : ''}
                </div>
                ${sec.image ? `<div class="rounded-2xl overflow-hidden shadow-2xl skew-y-1 h-[300px]"><img src="${sec.image}" class="w-full h-full object-cover"></div>` : ''}
            </section>`;
          }

          if (sec.type === 'about') {
            return `<!-- About Section -->
            <section id="about" class="px-6 py-12 md:py-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                ${sec.image ? `<div class="rounded-2xl overflow-hidden shadow-xl h-[300px]"><img src="${sec.image}" class="w-full h-full object-cover"></div>` : ''}
                <div class="space-y-4">
                    <span class="text-xs font-bold" style="color: ${brandColors.primary}">${sec.subheading || 'قصتنا متميزة'}</span>
                    <h2 class="text-2xl md:text-3xl font-bold" style="color: ${brandColors.secondary}">${sec.heading}</h2>
                    <p class="text-sm leading-relaxed" style="color: ${brandColors.textSecondary}">${sec.body || ''}</p>
                </div>
            </section>`;
          }

          if (sec.type === 'services') {
            return `<!-- Services Section -->
            <section id="services" class="px-6 py-12 md:py-20 max-w-6xl mx-auto space-y-10">
                <div class="text-center max-w-2xl mx-auto space-y-2">
                    <h2 class="text-2xl md:text-3xl font-bold" style="color: ${brandColors.secondary}">${sec.heading}</h2>
                    <p class="text-xs" style="color: ${brandColors.textSecondary}">${sec.subheading || ''}</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    ${sec.items?.map(item => `
                    <div class="p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between" style="background-color: ${brandColors.bgCard}">
                        <div class="space-y-2">
                            <h4 class="text-lg font-bold" style="color: ${brandColors.textPrimary}">${item.title}</h4>
                            <p class="text-xs leading-relaxed" style="color: ${brandColors.textSecondary}">${item.description}</p>
                        </div>
                    </div>`).join('')}
                </div>
            </section>`;
          }

          if (sec.type === 'faq') {
            return `<!-- FAQ Section -->
            <section id="faq" class="px-6 py-12 md:py-20 max-w-4xl mx-auto space-y-10">
                <div class="text-center space-y-2">
                    <h2 class="text-2xl md:text-3xl font-bold" style="color: ${brandColors.secondary}">${sec.heading}</h2>
                    <p class="text-xs" style="color: ${brandColors.textSecondary}">${sec.subheading || ''}</p>
                </div>
                <div class="space-y-4">
                    ${sec.items?.map(item => `
                    <div class="rounded-xl border border-gray-100 overflow-hidden" style="background-color: ${brandColors.bgCard}">
                        <div class="w-full text-right p-5 font-bold text-sm bg-gray-50 flex justify-between items-center" style="color: ${brandColors.textPrimary}">
                            <span>${item.title}</span>
                        </div>
                        <div class="p-5 text-xs leading-relaxed border-t border-gray-100" style="color: ${brandColors.textSecondary}">
                            ${item.description}
                        </div>
                    </div>`).join('')}
                </div>
            </section>`;
          }

          if (sec.type === 'contact') {
            return `<!-- Contact Section -->
            <section id="contact" class="px-6 py-12 md:py-20 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                <div class="p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm" style="background-color: ${brandColors.bgCard}">
                    <h3 class="font-bold text-lg mb-4" style="color: ${brandColors.textPrimary}">راسلنا مباشرة</h3>
                    <form onsubmit="sendForm(event)" class="space-y-4">
                        <input type="email" placeholder="بريدك الإلكتروني" required class="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-xs">
                        <textarea rows="4" placeholder="تفاصيل رسالتك أو الحجز" required class="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-xs"></textarea>
                        <button type="submit" class="w-full py-3 rounded-lg text-white font-bold text-xs hover:opacity-90 active:scale-95 transition" style="background-color: ${brandColors.primary}">إرسال الرسالة</button>
                    </form>
                </div>
                <div class="flex flex-col justify-center space-y-4">
                    <h2 class="text-2xl font-bold" style="color: ${brandColors.secondary}">${sec.heading}</h2>
                    <p class="text-sm leading-relaxed" style="color: ${brandColors.textSecondary}">${sec.body || ''}</p>
                </div>
            </section>`;
          }

          return '';
        }).join('')}
    </main>

    <footer class="mt-16 border-t border-gray-100 py-8 text-center text-xs text-gray-400">
        <p>© 2026 ${name}. جميع الحقوق محفوظة.</p>
    </footer>

    <script>
        function triggerCTA() {
            alert('شكراً لتواصلك مع ${name}! سيتم توجيهك الآن للمراسلة المباشرة.');
        }
        function sendForm(e) {
            e.preventDefault();
            alert('تم إرسال استفسارك بنجاح إلى فريق عمل ${name}! سنبقى على تواصل مع المراسلة.');
        }
    </script>
</body>
</html>`;
  };

  const handleDownloadCode = () => {
    const code = exportFullCode();
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${website.industry}-website.html`;
    a.click();
  };

  return (
    <div className="space-y-6 text-right font-sans" dir="rtl">
      {/* Editor top control header panel */}
      <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-200 dark:border-gray-850 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl transition text-gray-500"
            title="الرجوع للوحة التحكم"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span>محرر العلامات التجارية البصري: {name}</span>
            </h1>
            <p className="text-[10px] text-gray-400">انقر للتعديل المباشر، غير الألوان، ثم احفظ تغييراتك السحابية.</p>
          </div>
        </div>

        {/* Viewport switch wrapper */}
        <div className="flex gap-1.5 items-center bg-gray-50 dark:bg-gray-900 p-1 rounded-xl">
          <button
            onClick={() => setViewport('desktop')}
            className={`p-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${viewport === 'desktop' ? 'bg-white dark:bg-gray-800 text-emerald-500 shadow' : 'text-gray-400 hover:text-white'}`}
          >
            <Laptop className="w-4 h-4" />
            <span>كمبيوتر</span>
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`p-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${viewport === 'mobile' ? 'bg-white dark:bg-gray-800 text-emerald-500 shadow' : 'text-gray-400 hover:text-white'}`}
          >
            <Smartphone className="w-4 h-4" />
            <span>جوال</span>
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onOpenLivePreview({ ...website, name, logoTheme, brandColors, sections, seo, domain })}
            className="px-4 py-2 bg-gray-50 hover:bg-gray-150 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-250 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-emerald-500" />
            <span>معاينة للزوار</span>
          </button>
          <button
            onClick={saveChanges}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>حفظ الموقع</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SIDE BAR / DRAWER OF CONTROLS (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-850 overflow-hidden shadow-sm">
          {/* Tabs header */}
          <div className="flex border-b border-gray-150 dark:border-gray-850 text-xs text-center select-none font-bold">
            {[
              { key: 'content', name: 'أقسام الموقع', icon: Layout },
              { key: 'theme', name: 'هوية الألوان', icon: Paintbrush },
              { key: 'seo', name: 'محركات البحث', icon: FileText },
              { key: 'export', name: 'تصدير الكود', icon: Code }
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key as any)}
                className={`flex-1 py-3 border-b-2 text-[10px] md:text-xs flex flex-col items-center gap-1.5 transition ${activeTab === t.key ? 'border-emerald-500 text-emerald-500 bg-emerald-50/10 dark:bg-emerald-500/2' : 'border-transparent text-gray-400 hover:text-gray-950 dark:hover:text-white'}`}
              >
                <t.icon className="w-4 h-4" />
                <span>{t.name}</span>
              </button>
            ))}
          </div>

          <div className="p-5 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* TAB 1: Content Editor elements */}
            {activeTab === 'content' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase">اسم الموقع والتيمة العامة:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-lg text-xs"
                  />
                </div>
                <div className="space-y-1.5 pb-4 border-b border-gray-100 dark:border-gray-850">
                  <label className="text-xs font-bold text-gray-400 uppercase">مظهر شعار الموقع المعروض:</label>
                  <input
                    type="text"
                    value={logoTheme}
                    onChange={(e) => setLogoTheme(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-lg text-xs"
                  />
                </div>

                {/* Sections Dropdown/List to select edit targeting */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-400 block mb-2">اختر القسم للتعديل الكلي:</span>
                  <div className="space-y-2">
                    {sections.map((sec, sIdx) => (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => setActiveSecIdx(sIdx)}
                        className={`w-full text-right p-3 rounded-xl border text-xs transition cursor-pointer flex justify-between items-center ${activeSecIdx === sIdx ? 'border-emerald-500 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 font-bold' : 'border-gray-150 dark:border-gray-850 bg-gray-50 dark:bg-gray-900/50 text-gray-600'}`}
                      >
                        <span className="capitalize">{sec.type} - {sec.heading.slice(0, 18)}...</span>
                        <ChevronRight className={`w-4 h-4 transform transition-transform ${activeSecIdx === sIdx ? 'rotate-90' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub-inputs of currently selected Section */}
                {sections[activeSecIdx] && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl space-y-4 border border-gray-150 dark:border-gray-850">
                    <span className="text-[10px] bg-emerald-500 text-white font-bold p-1 rounded font-mono uppercase">
                      جاري تصفح وتعديل: {sections[activeSecIdx].type}
                    </span>

                    <div className="space-y-2">
                      <label className="text-[11px] text-gray-400 font-bold block">العنوان العريض الرئيسي:</label>
                      <input
                        type="text"
                        value={sections[activeSecIdx].heading}
                        onChange={(e) => handleSectionTextChange(activeSecIdx, 'heading', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-250 dark:border-gray-800 bg-white dark:bg-gray-950 text-xs text-gray-800 dark:text-white rounded-lg font-sans"
                      />
                    </div>

                    {sections[activeSecIdx].subheading !== undefined && (
                      <div className="space-y-2">
                        <label className="text-[11px] text-gray-400 font-bold block">العنوان الفرعي المساعد:</label>
                        <input
                          type="text"
                          value={sections[activeSecIdx].subheading || ''}
                          onChange={(e) => handleSectionTextChange(activeSecIdx, 'subheading', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-250 dark:border-gray-800 bg-white dark:bg-gray-950 text-xs text-gray-800 dark:text-white rounded-lg font-sans"
                        />
                      </div>
                    )}

                    {sections[activeSecIdx].body !== undefined && (
                      <div className="space-y-2">
                        <label className="text-[11px] text-gray-400 font-bold block">المقال أو النص التفصيلي:</label>
                        <textarea
                          rows={4}
                          value={sections[activeSecIdx].body || ''}
                          onChange={(e) => handleSectionTextChange(activeSecIdx, 'body', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-250 dark:border-gray-800 bg-white dark:bg-gray-950 text-xs text-gray-850 dark:text-white rounded-lg font-sans resize-none leading-relaxed"
                        ></textarea>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Themes & Colors selection */}
            {activeTab === 'theme' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">منظومة الألوان الأساسية لحساب السحاب</h4>
                  <p className="text-[10.5px] text-gray-400">تحكم بمدخلات الألوان بدقة من خلال لوحة الانتقاء.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'primary', name: 'اللون الرئيسي للأيقونات وهامش العرض', col: brandColors.primary },
                    { key: 'secondary', name: 'اللون الغامق للعناوين والخطوط الكبيرة', col: brandColors.secondary },
                    { key: 'accent', name: 'اللون المضيء لأزرار الأكشن والتفاعل', col: brandColors.accent },
                    { key: 'bgBg', name: 'اللون التلقائي لخلفيات الأقسام العامة', col: brandColors.bgBg },
                    { key: 'bgCard', name: 'اللون الخاص بالبطاقات والقوائم الفرعية', col: brandColors.bgCard }
                  ].map((colorObj) => (
                    <div key={colorObj.key} className="flex justify-between items-center gap-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                      <div className="text-right">
                        <span className="font-bold text-xs text-gray-800 dark:text-white block">{colorObj.name}</span>
                        <span className="text-[10px] text-gray-400 font-mono tracking-wide" dir="ltr">{colorObj.col}</span>
                      </div>
                      <input
                        type="color"
                        value={colorObj.col}
                        onChange={(e) => handleColorChange(colorObj.key as any, e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border-none p-0 bg-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: SEO details */}
            {activeTab === 'seo' && (
              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">تهيئة الموقع لمحركات البحث جوجل (SEO)</h4>
                  <p className="text-[10px] text-gray-400">أدخل صياغات دقيقة لتصدر نتائج البحث وجلب المزيد من العملاء الكرام.</p>
                </div>

                <div className="space-y-3 pt-3">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-gray-400">عنوان محرك البحث (Page Title) :</label>
                    <input
                      type="text"
                      value={seo.title}
                      onChange={(e) => setSeo(p => ({ ...p, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-gray-400">وصف الصفحة المصغر (Meta Description) :</label>
                    <textarea
                      rows={3}
                      value={seo.description}
                      onChange={(e) => setSeo(p => ({ ...p, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-lg resize-none"
                    ></textarea>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-gray-400">الكلمات الدلالية الـ Keywords (مفصولة بفواصل) :</label>
                    <input
                      type="text"
                      value={seo.keywords}
                      onChange={(e) => setSeo(p => ({ ...p, keywords: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Source code exports */}
            {activeTab === 'export' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">تصدير كامل الكود البرمجي البرمجي المستقل (HTML & CSS)</h4>
                  <p className="text-[10.5px] text-gray-400">قم بتحميل ملفات موقعك ككود برمجي مستقل لتشغيله على أي استضافة خارجية من اختيارك بكفاءة.</p>
                </div>

                <div className="p-4 bg-gray-55/40 dark:bg-gray-900/40 rounded-xl space-y-4 border border-dashed border-gray-200 dark:border-gray-800">
                  <div className="text-xs text-center space-y-2">
                    <Code className="w-10 h-10 text-emerald-500 animate-pulse mx-auto" />
                    <p className="font-bold">كود نظيف متوافق مع كافة المتصفحات</p>
                    <p className="text-[10px] text-gray-400">يستخدم الكود المحمل إطار عمل Tailwind CSS وخط Cairo المكتوب بكل دقة.</p>
                  </div>

                  <button
                    onClick={handleDownloadCode}
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl transition flex justify-center items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>تحميل الكود التفاعلي (.html)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* WORKSPACE PREVIEW AREA (8 cols) */}
        <div className="lg:col-span-8 flex flex-col items-center">
          {/* Viewport frame container */}
          <div className={`w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-850 shadow-2xl transition-all duration-300 overflow-y-auto ${viewport === 'mobile' ? 'max-w-md h-[550px] border-x-4 border-b-4 border-gray-800 rounded-b-3xl' : 'w-full h-[65vh] rounded-2xl'}`}>
            
            {/* Website preview simulator body inside workspace */}
            <div
              style={{
                backgroundColor: brandColors.bgBg,
                color: brandColors.textPrimary,
                fontFamily: '"Cairo", sans-serif'
              }}
              className="p-6 space-y-12 text-right pointer-events-none"
              dir="rtl"
            >
              {/* Micro logo */}
              <div className="flex justify-between items-center border-b border-gray-150 dark:border-gray-800 pb-3">
                <span className="font-bold text-sm" style={{ color: brandColors.primary }}>{logoTheme || name}</span>
                <span className="text-[10px] text-gray-400">معاينة مباشرة أثناء التعديل</span>
              </div>

              {/* Loop and draw all editable preview sections */}
              {sections.map((sec, idx) => (
                <div key={sec.id} className={`space-y-3 relative p-4 rounded-xl transition-all ${activeSecIdx === idx ? 'ring-2 ring-emerald-500 bg-emerald-50/10 dark:bg-emerald-500/2' : ''}`}>
                  {activeSecIdx === idx && (
                    <span className="absolute -top-3 right-4 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                      القسم النشط للتعديل
                    </span>
                  )}

                  <h3 className="text-xl font-bold leading-tight" style={{ color: brandColors.secondary }}>{sec.heading}</h3>
                  {sec.subheading && (
                    <p className="text-xs font-semibold" style={{ color: brandColors.primary }}>{sec.subheading}</p>
                  )}
                  {sec.body && (
                    <p className="text-xs leading-relaxed" style={{ color: brandColors.textSecondary }}>{sec.body}</p>
                  )}
                  {sec.items && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {sec.items.map((it) => (
                        <div key={it.id} className="p-3 border border-gray-150 dark:border-emerald-500/10 rounded-lg text-[11px] space-y-1 bg-white dark:bg-gray-900 shadow-sm pointer-events-none">
                          <strong className="block text-gray-800 dark:text-gray-200">{it.title}</strong>
                          <span className="text-gray-400 block text-[10.5px]">{it.description}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {sec.buttonText && (
                    <span
                      style={{ backgroundColor: brandColors.accent }}
                      className="px-4 py-1.5 rounded-lg text-white font-bold text-[11px] inline-block text-center shadow-sm"
                    >
                      {sec.buttonText}
                    </span>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
