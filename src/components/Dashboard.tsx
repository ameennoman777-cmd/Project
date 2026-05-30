import React, { useState } from 'react';
import { Layout, Eye, ArrowUpRight, Copy, Trash2, Globe, Shield, RefreshCw, Layers, Sparkles, LogOut, Check, ToggleLeft, ToggleRight, BarChart, HardDriveDownload } from 'lucide-react';
import { Website, User } from '../types';

interface DashboardProps {
  user: User;
  websites: Website[];
  onStartGenerator: () => void;
  onEditWebsite: (id: string) => void;
  onDeleteWebsite: (id: string) => void;
  onDuplicateWebsite: (id: string) => void;
  onTogglePublish: (id: string, published: boolean) => void;
  onSaveDomain: (id: string, domain: string) => void;
  onSelectDocTab: () => void;
  onOpenLivePreview: (website: Website) => void;
  onLogout: () => void;
}

export default function Dashboard({
  user,
  websites,
  onStartGenerator,
  onEditWebsite,
  onDeleteWebsite,
  onDuplicateWebsite,
  onTogglePublish,
  onSaveDomain,
  onSelectDocTab,
  onOpenLivePreview,
  onLogout
}: DashboardProps) {
  const [editingDomainId, setEditingDomainId] = useState<string | null>(null);
  const [tempDomainValue, setTempDomainValue] = useState('');

  // Local calculations
  const totalViews = websites.reduce((acc, w) => acc + w.views, 0);
  const totalClicks = websites.reduce((acc, w) => acc + w.clicks, 0);
  const activePublished = websites.filter(w => w.published).length;

  const handleDomainEditStart = (id: string, current: string) => {
    setEditingDomainId(id);
    setTempDomainValue(current || '');
  };

  const handleDomainSave = (id: string) => {
    onSaveDomain(id, tempDomainValue);
    setEditingDomainId(null);
  };

  return (
    <div className="space-y-10 text-right font-sans" dir="rtl">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-l from-[#0f0f11] via-[#121214] to-indigo-950/45 p-6 md:p-8 rounded-3xl border border-[#27272a] text-white">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white text-[10px] font-bold">
              مرحبًا بك {user.subscription === 'business' ? 'رجل الأعمال' : user.subscription === 'premium' ? 'عضو مميز' : 'عضو مجاني'}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold font-sans">أهلاً بك، {user.name} 👋</h1>
          </div>
          <p className="text-xs text-gray-300">
            أنت مسجل في باقة <strong className="text-indigo-400 font-bold uppercase">{user.subscription}</strong>. ابنِ وعدل موقعك أو تابع الزيارات لعلامتك التجارية.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onStartGenerator}
            className="px-6 py-3 rounded-xl bg-gradient-to-l from-[#6366f1] to-[#a855f7] text-white font-extrabold text-xs hover:opacity-90 shadow-md shadow-indigo-500/10 transition flex items-center gap-2 cursor-pointer animate-pulse"
          >
            <Sparkles className="w-4 h-4" />
            <span>أنشئ موقعاً جديداً بالذكاء الاصطناعي</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'إجمالي المواقع الإلكترونية', value: websites.length, sub: 'المصممة والجاهزة', color: 'from-blue-500/5 to-indigo-500/5 hover:border-blue-500/30' },
          { label: 'إجمالي زيارات زوار مواقعك', value: totalViews, sub: 'بالمشاهدة المباشرة', color: 'from-purple-500/5 to-pink-500/5 hover:border-purple-500/30' },
          { label: 'إجمالي النقرات على الاتصال', value: totalClicks, sub: 'طلبات وواتساب ومكالمات', color: 'from-amber-500/5 to-rose-500/5 hover:border-amber-500/30' },
          { label: 'المواقع النشطة المعروضة', value: activePublished, sub: 'متصلة بالشبكة بالإنترنت', color: 'from-teal-500/5 to-emerald-500/5 hover:border-teal-500/30' }
        ].map((item, idx) => (
          <div
            key={idx}
            className={`p-6 bg-white dark:bg-[#18181b] rounded-2xl border border-gray-200 dark:border-[#27272a] shadow-sm flex flex-col justify-between h-32 bg-gradient-to-tr transition duration-300 bento-card-glow ${item.color}`}
          >
            <span className="text-xs font-semibold text-gray-400 dark:text-zinc-500">{item.label}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-gray-900 dark:text-white font-mono">{item.value}</span>
              <span className="text-[10px] text-gray-400">{item.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Websites Grid Console */}
      <div className="space-y-6">
        <div className="flex justify-between items-center pb-2 border-b border-gray-150 dark:border-[#27272a]">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Layout className="w-5 h-5 text-[#6366f1]" />
            <span>مواقعك الإلكترونية الذكية</span>
          </h2>
          {websites.length > 0 && (
            <span className="text-xs text-gray-500 font-sans">تم إنشاء {websites.length} مواقع</span>
          )}
        </div>

        {websites.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-[#18181b] rounded-2xl border border-dashed border-gray-250 dark:border-[#27272a] space-y-4">
            <div className="p-4 bg-indigo-500/10 dark:bg-indigo-500/5 text-[#6366f1] rounded-full w-fit mx-auto animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-905 dark:text-white">لم تقم بإنشاء أي موقع إلكتروني حتى الآن!</h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
              انقر على الزر بالأسفل وسيقوم مولد الذكاء الاصطناعي ببناء موقع متناسق متكيف لخدماتك وشركتك ومطعمك.
            </p>
            <button
              onClick={onStartGenerator}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] hover:opacity-90 text-white font-bold text-xs transition cursor-pointer"
            >
              ابدأ تشغيل معالج الإنشاء
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {websites.map((web) => (
              <div
                key={web.id}
                className="bg-white dark:bg-[#18181b] rounded-2xl border border-gray-200 dark:border-[#27272a] overflow-hidden flex flex-col justify-between hover:shadow-lg transition duration-300 bento-card-glow group"
              >
                {/* Visual Header card */}
                <div className="p-5 border-b border-gray-100 dark:border-[#27272a] space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="p-2 rounded-xl text-xs font-bold font-sans" style={{ backgroundColor: `${web.brandColors.primary}15`, color: web.brandColors.primary }}>
                      {web.industry.toUpperCase()}
                    </span>
                    <div className="flex gap-1.5 opacity-60 group-hover:opacity-100 transition">
                      <button
                        onClick={() => onDuplicateWebsite(web.id)}
                        title="تكرار ونسخ كلي للموقع"
                        className="p-1.5 bg-gray-50 hover:bg-gray-200 dark:bg-[#0f0f11] dark:hover:bg-[#27272a] rounded-lg text-gray-500 dark:text-gray-300 transition cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteWebsite(web.id)}
                        title="حذف هذا الموقع"
                        className="p-1.5 bg-red-50 hover:bg-red-500 dark:bg-red-950/20 dark:hover:bg-red-650 rounded-lg text-red-650 hover:text-white transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#6366f1] transition">{web.name}</h3>
                    <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1 line-clamp-1">{web.description}</p>
                  </div>
                </div>

                {/* Simulated Visits info */}
                <div className="px-5 py-3.5 bg-gray-50 dark:bg-[#0f0f11]/50 border-b border-gray-100 dark:border-[#27272a] flex items-center justify-between font-mono text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-[#6366f1]" />
                    <span className="font-bold text-gray-700 dark:text-gray-200">{web.views || 0}</span>
                    <span>مشاهدة</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart className="w-4 h-4 text-[#a855f7]" />
                    <span className="font-bold text-gray-700 dark:text-gray-200">{web.clicks || 0}</span>
                    <span>تحويل ونقر</span>
                  </div>
                </div>

                {/* Custom domain input */}
                <div className="p-4 bg-gray-50 dark:bg-[#0f0f11]/10 border-b border-gray-100 dark:border-[#27272a] space-y-2 text-xs">
                  <div className="flex justify-between items-center text-gray-400">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" />
                      <span>عنوان الموقع (Domain)</span>
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-indigo-500">
                      <Shield className="w-3 h-3 text-[#6366f1]" />
                      <span>SSL نشط</span>
                    </span>
                  </div>

                  {editingDomainId === web.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tempDomainValue}
                        onChange={(e) => setTempDomainValue(e.target.value)}
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-[#6366f1] bg-white dark:bg-[#09090b] text-xs text-left"
                        dir="ltr"
                      />
                      <button
                        onClick={() => handleDomainSave(web.id)}
                        className="p-1 px-2 bg-[#6366f1] text-white rounded-lg text-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-gray-650 dark:text-gray-300 font-semibold" dir="ltr">
                        {web.domain || 'بلا نطاق'}
                      </span>
                      <button
                        onClick={() => handleDomainEditStart(web.id, web.domain || '')}
                        className="text-[10px] text-[#6366f1] dark:text-[#a855f7] hover:underline font-bold"
                      >
                        تعديل النطاق
                      </button>
                    </div>
                  )}
                </div>

                {/* Actions bottom card */}
                <div className="p-4 bg-white dark:bg-[#18181b] flex justify-between items-center gap-4">
                  <div className="flex gap-2 items-center text-xs">
                    <span className="text-gray-400 text-[10px]">حالة العرض:</span>
                    <button
                      onClick={() => onTogglePublish(web.id, !web.published)}
                      className="flex items-center cursor-pointer"
                    >
                      {web.published ? (
                        <div className="flex items-center text-indigo-500 font-bold gap-1 text-[11px]">
                          <ToggleRight className="w-5 h-5 text-[#6366f1] shrink-0" />
                          <span>منشور</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-400 gap-1 text-[11px]">
                          <ToggleLeft className="w-5 h-5 text-gray-350 shrink-0" />
                          <span>مسودة</span>
                        </div>
                      )}
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onOpenLivePreview(web)}
                      className="px-3 py-2 rounded-xl bg-gray-50 hover:bg-gray-150 dark:bg-[#0f0f11] dark:hover:bg-[#27272a] border border-gray-200 dark:border-[#27272a] text-xs font-bold font-sans transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>زيارة الموقع</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                    <button
                      onClick={() => onEditWebsite(web.id)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white text-xs font-black transition cursor-pointer"
                    >
                      محرر الهوية
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Developers resources banner card */}
      <div className="p-6 md:p-8 bg-gray-50 dark:bg-[#18181b] rounded-2xl border border-gray-200 dark:border-[#27272a] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h3 className="font-bold text-gray-905 dark:text-[#fafafa] flex items-center gap-2">
            <span>⚙️ هندسة منصة ArabBuilder AI الكاملة</span>
          </h3>
          <p className="text-xs text-gray-500 dark:text-zinc-400">
            يمكنك العثور على سكربتات قاعدة البيانات PostgreSQL، والـ ERD، وملفات هيكل المليون مستخدم في مركز المطورين.
          </p>
        </div>

        <button
          onClick={onSelectDocTab}
          className="px-4 py-2 text-xs bg-indigo-500/10 hover:bg-indigo-500/20 text-[#6366f1] dark:text-[#a855f7] rounded-xl transition font-bold cursor-pointer"
        >
          تصفح مركز هندسة النظام دقة
        </button>
      </div>
    </div>
  );
}
