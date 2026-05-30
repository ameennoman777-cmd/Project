import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Building2, Utensils, Laptop, Briefcase, ShoppingBag, Eye, HelpCircle, GraduationCap, HeartPulse } from 'lucide-react';

interface WizardProps {
  onCancel: () => void;
  onGenerate: (data: {
    name: string;
    industry: string;
    description: string;
    location: string;
    colorsTheme: string;
  }) => void;
  isGenerating: boolean;
}

const INDUSTRIES = [
  { key: 'restaurant', name: 'مطعم مأكولات شعبية', icon: Utensils, desc: 'منادي، مشاوي، ومأكولات أصيلة' },
  { key: 'cafe', name: 'مقهى وبن مختص', icon: Sparkles, desc: 'قهوة باردة، حارة وحلويات فريدة' },
  { key: 'company', name: 'شركة أعمال برمجية', icon: Laptop, desc: 'تصميم تطبيقات، حلول ويب وأنظمة' },
  { key: 'portfolio', name: 'معرض أعمال شخصي', icon: Briefcase, desc: 'للمصممين، المبرمجين والمهندسين' },
  { key: 'ecommerce', name: 'متجر تجارة إلكترونية', icon: ShoppingBag, desc: 'بيع منتجات، أزياء وإلكترونيات' },
  { key: 'education', name: 'مركز تعليمي وأكاديمي', icon: GraduationCap, desc: 'دورات تدريبية، مهارات لغات وذكاء' },
  { key: 'medical', name: 'عيادة أو مشفى طبي', icon: HeartPulse, desc: 'رعاية صحية، استشارات واستقبال' }
];

const COLOR_THEMES = [
  { key: 'orange', name: 'غروب الشمس الكلاسيكي', colors: ['#ea580c', '#431407', '#fffbf7'], desc: 'برتقالي دافئ وبني ترابي' },
  { key: 'teal', name: 'الربيع الأخضر المنعش', colors: ['#10b981', '#065f46', '#f0fdf4'], desc: 'زمردي مبهج وتفاحي هادئ' },
  { key: 'ocean', name: 'الشركات وعصر التكنولوجيا', colors: ['#2563eb', '#1e3a8a', '#f8fafc'], desc: 'أزرق ملكي ورمادي ناصع' },
  { key: 'obsidian', name: 'الفخامة والأناقة الداكنة', colors: ['#14b8a6', '#0f172a', '#fdfdfd'], desc: 'فحمي غامق مشع بالتركواز' }
];

export default function Wizard({ onCancel, onGenerate, isGenerating }: WizardProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('اليمن، عدن');
  const [colorsTheme, setColorsTheme] = useState('orange');

  const [errorNotice, setErrorNotice] = useState('');

  const nextStep = () => {
    if (step === 1) {
      if (!name.trim()) return setErrorNotice('يرجى إدخال اسم المشروع أولاً.');
      if (!industry) return setErrorNotice('يرجى اختيار طبيعة نشاط المشروع التجاري.');
    }
    setErrorNotice('');
    setStep(s => s + 1);
  };

  const prevStep = () => {
    setErrorNotice('');
    setStep(s => s - 1);
  };

  const autofillDescription = () => {
    if (industry === 'restaurant') {
      setDescription('مطعم يمني عريق يقدم أشهى الوجبات الشعبية من مندي ومظبي وذبيحة بلدي، بصالات عائلية مكيفة وضيافة فاخرة تناسب كرم أهل عدن.');
    } else if (industry === 'cafe') {
      setDescription('كافيه يقدم تشكيلة من البن اليمني المختص والمشروبات الباردة والساخنة مع إطلالة خلابة وجلسات مريحة للمذاكرة والأصدقاء.');
    } else if (industry === 'company') {
      setDescription('شركة برمجيات رائدة تقدم حلولاً برمجية ذكية وتطوير مواقع الويب وتطبيقات الهواتف بجودة عالمية وأسعار تنافسية.');
    } else if (industry === 'portfolio') {
      setDescription('معرض أعمال شخصي لمطور ومصمم ويب مهتم بتقديم تجارب مستخدم حيوية واحترافية مطابقة لأقوى معايرات الكود العالمي.');
    } else if (industry === 'ecommerce') {
      setDescription('أكبر متجر إلكتروني محلي لبيع الأزياء العصرية والحقائب ومستحضرات التجميل مع خدمة الشحن الفوري والتوصيل الآمن للمنازل في 24 ساعة.');
    } else if (industry === 'medical') {
      setDescription('عيادة الرعاية الطبية المتكاملة نعتني بصحتكم مع نخبة من الاستشاريين وأحدث الأجهزة التشخيصية وغرف طوارئ مجهزة طوال اليوم.');
    } else {
      setDescription('مشروع رائد يهدف لتقديم تجارب وحلول فريدة بأعلى درجات المصداقية والالتزام والسرعة.');
    }
  };

  const handleFinish = () => {
    if (!description.trim()) {
      return setErrorNotice('يرجى كتابة وصف بسيط لكي يستطيع الذكاء الاصطناعي توليد نصوص مخصصة.');
    }
    onGenerate({
      name,
      industry,
      description,
      location,
      colorsTheme
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-8 text-right font-sans" dir="rtl">
      {/* Progress Circles */}
      <div className="flex items-center justify-between max-w-md mx-auto mb-8 relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 -z-10"></div>
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
              step >= s
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                : 'bg-gray-150 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-400'
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-950 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-850 shadow-xl space-y-8">
        {/* Error Notice */}
        {errorNotice && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-xs font-semibold">
            ⚠️ {errorNotice}
          </div>
        )}

        {/* STEP 1: Name and Industry */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">الخطوة 1: أخبرنا عن اسم وهوية مشروعك التجاري</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">سنستخدم هذه البيانات كأساس لتوليد واجهة موقعك.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800 dark:text-gray-200 block">اسم المشروع التجاري / الشركة *</label>
              <input
                type="text"
                placeholder="مثال: مطعم مائدة اليمن السعيد"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrorNotice('');
                }}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-800 dark:text-gray-200 block">ما هو مجال وصنف العمل؟ *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {INDUSTRIES.map((indKey) => {
                  const Icon = indKey.icon;
                  const isSelected = industry === indKey.key;
                  return (
                    <button
                      key={indKey.key}
                      onClick={() => {
                        setIndustry(indKey.key);
                        setErrorNotice('');
                      }}
                      className={`p-4 rounded-xl border text-right transition cursor-pointer flex flex-col justify-between h-32 ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/2 ring-2 ring-emerald-500/20'
                          : 'border-gray-150 dark:border-gray-850 bg-gray-50/50 dark:bg-gray-900/10 hover:border-gray-300 dark:hover:border-gray-750'
                      }`}
                    >
                      <div className={`p-2 rounded-lg w-fit ${isSelected ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-sm block text-gray-900 dark:text-white">{indKey.name}</span>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 block">{indKey.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Location and Descriptions */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">الخطوة 2: أوصف طبيعة الخدمة والمنطقة التي تغطيها</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">الوصف التفصيلي يساعد الذكاء في صياغة مقالات مقنعة مخصصة.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800 dark:text-gray-200 block">موقع ومقر النشاط التجاري</label>
              <input
                type="text"
                placeholder="مثال: اليمن، عدن، المعلا"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-800 dark:text-gray-200 block">اكتب قصة ونصوص ترويجية قصيرة لمشروعك *</label>
                <button
                  type="button"
                  onClick={autofillDescription}
                  className="px-2 py-1 text-xs bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded transition font-bold"
                >
                  🪄 صياغة بالذكاء الاصطناعي بالنيابة عني
                </button>
              </div>

              <textarea
                rows={5}
                placeholder="تفاصيل تصف فيها شغفك، ماذا تبيع، وما هو ما يميزك عن المنافسين..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrorNotice('');
                }}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition leading-relaxed text-sm resize-none"
              ></textarea>
            </div>
          </div>
        )}

        {/* STEP 3: Brand Style/Colors */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">الخطوة 3: اختر تيمة الألوان المفضلة لهوية موقعك</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">ستتحكم هذه التيمة في ألوان الأزرار والخلفيات وحقول الإدخال.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COLOR_THEMES.map((theme) => {
                const isSelected = colorsTheme === theme.key;
                return (
                  <button
                    key={theme.key}
                    onClick={() => {
                      setColorsTheme(theme.key);
                      setErrorNotice('');
                    }}
                    className={`p-5 rounded-2xl border text-right transition cursor-pointer space-y-4 ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/2 ring-2 ring-emerald-500/20'
                        : 'border-gray-150 dark:border-gray-850 bg-gray-50/50 dark:bg-gray-900/10 hover:border-gray-300 dark:hover:border-gray-750'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-gray-900 dark:text-white">{theme.name}</span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">{theme.desc}</span>
                    </div>

                    <div className="flex gap-2">
                      {theme.colors.map((col, cIdx) => (
                        <span
                          key={cIdx}
                          style={{ backgroundColor: col }}
                          className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-700 shadow-sm"
                        ></span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions Button Footers */}
        <div className="flex justify-between items-center border-t border-gray-150 dark:border-gray-850 pt-6">
          <button
            onClick={onCancel}
            className="px-6 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-650 dark:text-gray-400 text-xs transition"
          >
            إلغاء العملية
          </button>

          <div className="flex gap-3">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-250 border border-gray-200 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 text-xs transition flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                <span>السابق</span>
              </button>
            )}

            {step < 3 ? (
              <button
                onClick={nextStep}
                className="px-6 py-3 rounded-xl bg-gradient-to-l from-emerald-500 to-teal-600 text-white font-bold text-xs hover:opacity-90 shadow-md shadow-emerald-500/10 transition flex items-center gap-2"
              >
                <span>التالي</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={isGenerating}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-l from-emerald-500 via-teal-500 to-cyan-500 text-white font-extrabold text-xs hover:opacity-90 shadow-lg shadow-emerald-500/15 transition flex items-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>توليد الموقع بالذكاء الاصطناعي الآن ✨</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
