import React, { useState } from 'react';
import { Sparkles, ArrowLeft, Layout, Globe, BarChart3, Edit3, ShieldAlert, CheckCircle, Smartphone, Award, Laptop } from 'lucide-react';
import { User } from '../types';

interface SassHomeProps {
  onStartSignUp: () => void;
  onStartLogin: () => void;
  user: User | null;
  onGoToConsole: () => void;
}

export default function SassHome({ onStartSignUp, onStartLogin, user, onGoToConsole }: SassHomeProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'الخطة الأساسية',
      key: 'free',
      price: '0',
      desc: 'مثالية لتجربة المنصة ونشر فكرة أولية سريعة.',
      features: [
        'توليد موقع واحد بالذكاء الاصطناعي',
        'نطاق فرعي (.arabbuilder.ai)',
        'تعديل نصوص وصور محدود',
        'استضافة سحابية مجانية أساسية'
      ],
      cta: 'ابدأ مجاناً الآن',
      popular: false
    },
    {
      name: 'الخطة الاحترافية',
      key: 'premium',
      price: billingPeriod === 'monthly' ? '29' : '19',
      desc: 'الأكثر اختياراً للشركات الصاعدة والمطاعم المتميزة.',
      features: [
        'توليد وتعديل 3 مواقع ذكية',
        'دعم ربط نطاق خاص كامل (Custom Domain)',
        'شهادة حماية SSL تلقائية ومؤمنة',
        'حجوزات واستلام استفسارات العملاء',
        'لوحة تعديل بصري متكاملة بلا حدود'
      ],
      cta: 'اشترك الآن',
      popular: true
    },
    {
      name: 'خطة الأعمال والشاملة',
      key: 'business',
      price: billingPeriod === 'monthly' ? '79' : '59',
      desc: 'المصممة للوكالات البرمجية وأصحاب المشاريع الكبيرة.',
      features: [
        'توليد غير محدود بالكامل للمواقع',
        'تحميل وتصدير الكود البرمجي الكامل (ZIP)',
        'لوحة إحصائيات متطورة وسريعة',
        'أولوية الدعم عبر الواتساب على مدار الساعة',
        'نقل مجاني للنطاقات والبيانات'
      ],
      cta: 'ابدأ بالتميز اليوم',
      popular: false
    }
  ];

  return (
    <div className="space-y-24 py-8 text-right font-sans" dir="rtl">
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 text-indigo-600 dark:text-[#a855f7] border border-indigo-500/20 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span>الجيل الجديد من تصميم المواقع بالذكاء الاصطناعي العربي</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-905 dark:text-[#fafafa] leading-tight">
          ابنِ موقعك الإلكتروني الاحترافي <br />
          <span className="bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
            في دقيقة واحدة بالذكاء الاصطناعي
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          صف كيف يعمل مشروعك أو مطعمك، وسيقوم المولد السحابي العربي بصياغة النصوص، اختيار الألوان المتناسقة، وبناء الأقسام الترويجية فوراً.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
          {user ? (
            <button
              onClick={onGoToConsole}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-bold hover:opacity-90 transition shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>الانتقال للوحة التحكم والإنشاء</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <>
              <button
                onClick={onStartSignUp}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-bold hover:opacity-90 transition shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>ابدأ توليد موقعك مجاناً</span>
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={onStartLogin}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gray-100 dark:bg-[#18181b] dark:hover:bg-[#27272a] text-gray-800 dark:text-[#fafafa] border border-gray-200 dark:border-[#27272a] transition font-semibold cursor-pointer"
              >
                تسجيل الدخول للشباب
              </button>
            </>
          )}
        </div>

        {/* Browser Mockup Preview */}
        <div className="pt-12 relative">
          <div className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-3xl filter blur-3xl -z-10 max-w-xl mx-auto"></div>
          <div className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-850 shadow-2xl overflow-hidden text-left" dir="ltr">
            {/* Window bar */}
            <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-b border-gray-100 dark:border-gray-850 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
              </div>
              <div className="bg-white dark:bg-gray-950 px-8 py-1 rounded-md text-xs text-gray-400 border border-gray-100 dark:border-gray-850 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-gray-400" />
                <span>hadramout-food.arabbuilder.ai</span>
              </div>
              <div className="w-12"></div>
            </div>
            {/* Visual Screen Sample */}
            <div className="p-8 space-y-4 text-right" dir="rtl">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-850 pb-4">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">🍴 مطعم مائدة اليمن</span>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>الرئيسية</span>
                  <span>من نحن</span>
                  <span>الخدمات</span>
                  <span>اتصل بنا</span>
                </div>
              </div>
              <div className="py-8 space-y-3 max-w-lg">
                <div className="h-6 bg-emerald-500/10 rounded w-1/3"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                <div className="h-4 bg-gray-150 dark:bg-gray-800 rounded w-5/6"></div>
                <div className="h-12 bg-emerald-500 text-white rounded-lg w-32 flex items-center justify-center text-xs font-bold pt-1 pb-1">احجز الآن</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-[#09090b] dark:text-[#fafafa] font-sans">
            كل ما تحتاجه لإطلاق حضورك الرقمي الفاخر
          </h2>
          <p className="text-gray-500 dark:text-zinc-400 text-sm">
            بوابة متكاملة تدعم تطلعاتك كصاحب عمل أو كأحد رواد برمجيات المواقع.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Layout,
              title: 'توليد مبني على القواعد والذكاء',
              desc: 'صياغة عناوين ومقالات ترويجية عربية حية خالية تماماً من الحشو والرموز الناقصة.',
              className: 'md:col-span-2 bento-card-glow'
            },
            {
              icon: Edit3,
              title: 'محرر بصري قوي وخفيف',
              desc: 'انقر على النصوص أو الصور لتعديل محتواها وتنسيق ألوانها وحجم الخطوط بحرية مطلقة.',
              className: 'md:col-span-1'
            },
            {
              icon: Globe,
              title: 'توصيل نطاق خاص فعال',
              desc: 'اربط اسم نطاقك المتميز (مثال: restaurant-aden.com) وسنقوم بتوفير تفعيل SSL على خوادمنا.',
              className: 'md:col-span-1'
            },
            {
              icon: BarChart3,
              title: 'لوحة تحليلات سريعة',
              desc: 'تابع معدلات تصفح وجلسات زوار موقعك والضغطات على زر الاتصال من هاتفهم مباشرة.',
              className: 'md:col-span-2 bg-[#1e1b4b]/30 dark:bg-gradient-to-l dark:from-[#1e1b4b] dark:to-[#09090b] border-indigo-500/40 relative overflow-hidden'
            },
            {
              icon: CheckCircle,
              title: 'صادرات برمجية حرة وعالية الجودة',
              desc: 'قم بتحميل ملفات موقعك البرمجية الكاملة (HTML, CSS, JavaScript) لتشغيلها على أي استضافة أخرى.',
              className: 'md:col-span-2 bento-card-glow'
            },
            {
              icon: Smartphone,
              title: 'تصاميم متكيفة بالكامل',
              desc: 'كل موقع يتم توليده يتوافق 100% مع شاشات الهواتف الذكية والأجهزة اللوحية دون مجهود إضافي.',
              className: 'md:col-span-1'
            }
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className={`p-6 bg-white dark:bg-[#18181b] rounded-2xl border border-gray-150 dark:border-[#27272a] hover:border-[#6366f1]/50 dark:hover:border-[#a855f7]/50 transition duration-300 bento-card-glow-hover space-y-4 ${feat.className || ''}`}
              >
                <div className="p-3 bg-indigo-500/10 dark:bg-indigo-500/5 text-[#6366f1] dark:text-[#a855f7] rounded-xl w-fit">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-[#fafafa] font-sans">{feat.title}</h3>
                <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed font-sans">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Real-time Showcase & Live Testimonial / Sample Industry Templates */}
      <section className="bg-emerald-500/5 dark:bg-emerald-500/2 border border-emerald-500/10 rounded-3xl p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-sans leading-tight">
              أنشئ موقعاً لأي مجال تجاري يخطر ببالك
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              تغطي قواعد النموذج الذكي والذكاء الاصطناعي الخاص بنا باقة واسعة من المجالات المهنية، المصممة بأعلى مستويات الجودة والألوان الموافقة لطبيعة العمل:
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {['مطعم للمأكولات الشعبية', 'مقهى لتقديم البن الفاخر', 'شركة برمجيات وتطبيقات', 'معرض أعمال شخصي للمصممين', 'متاجر تجارة إلكترونية متكاملة', 'مراكز وعيادات طبية واسعة'].map((ind, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{ind}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: '🍴 مطعم يمني أصيل', bg: 'bg-orange-500/10 border-orange-500/20' },
              { title: '☕ قهوة مختصة كافيه', bg: 'bg-amber-900/10 border-amber-900/20' },
              { title: '🎓 أكاديمية الذكاء الاصطناعي', bg: 'bg-cyan-500/10 border-cyan-500/20' },
              { title: '🩺 عيادة ومشفى متكامل', bg: 'bg-teal-500/10 border-teal-500/20' }
            ].map((card, i) => (
              <div key={i} className={`p-6 rounded-xl border ${card.bg} space-y-3`}>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400 uppercase font-mono">Template 0{i + 1}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500 text-white text-[10px] font-bold">جاهز للتعديل</span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">{card.title}</h4>
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  <span className="h-2 w-2 rounded-full bg-emerald-300"></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Module Plans */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-extrabold text-gray-905 dark:text-[#fafafa] font-sans">خطط أسعار واضحة وبسيطة تناسب حجم عملك</h2>
          <p className="text-gray-500 dark:text-zinc-400 text-sm">ابدأ التوليد والإنشاء معنا اليوم، وقم بالترقية عندما تحتاج ميزات متقدمة مثل ربط النطاق الخاص.</p>

          <div className="flex justify-center items-center gap-4 mt-6">
            <span className={`text-sm ${billingPeriod === 'monthly' ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-400'}`}>فاتورة شهرية</span>
            <button
              onClick={() => setBillingPeriod(b => b === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-12 h-6 bg-[#6366f1] rounded-full transition-colors duration-300 focus:outline-none cursor-pointer"
            >
              <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${billingPeriod === 'yearly' ? 'translate-x-6' : ''}`}></span>
            </button>
            <span className={`text-sm ${billingPeriod === 'yearly' ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-400'}`}>فاتورة سنوية (توفير 30%)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`p-8 rounded-3xl bg-white dark:bg-[#18181b] border relative flex flex-col justify-between transition duration-300 ${
                plan.popular
                  ? 'border-[#6366f1] dark:border-[#a855f7] shadow-xl shadow-indigo-500/5 ring-4 ring-indigo-500/10'
                  : 'border-gray-250 dark:border-[#27272a]'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-full text-xs font-bold font-sans">
                  الأكثر توفيراً
                </span>
              )}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-909 dark:text-[#fafafa]">{plan.name}</h3>
                  <p className="text-xs text-gray-400 dark:text-zinc-500 mt-2 min-h-[32px]">{plan.desc}</p>
                </div>

                <div className="flex items-baseline gap-1" dir="ltr">
                  <span className="text-4xl font-extrabold text-gray-909 dark:text-white">${plan.price}</span>
                  <span className="text-gray-400 text-sm">/{billingPeriod === 'monthly' ? 'شهرياً' : 'سنوياً'}</span>
                </div>

                <ul className="space-y-3.5 border-t border-gray-100 dark:border-[#27272a] pt-6">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex gap-2.5 items-start text-xs text-gray-650 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-[#6366f1] dark:text-[#a855f7] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={user ? onGoToConsole : onStartSignUp}
                className={`w-full mt-8 py-3.5 px-6 rounded-xl font-bold transition text-xs font-sans cursor-pointer ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#6366f1] to-[#a855f7] hover:opacity-90 text-white shadow-lg shadow-indigo-500/15'
                    : 'bg-gray-50 dark:bg-[#0f0f11] hover:bg-gray-100 dark:hover:bg-[#18181b] text-gray-800 dark:text-zinc-200 border border-gray-200 dark:border-[#27272a]'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
