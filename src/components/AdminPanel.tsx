import React, { useEffect, useState } from 'react';
import { BarChart3, Users, Globe2, ShieldCheck, BadgeAlert, Layers, RefreshCw } from 'lucide-react';

interface AdminStats {
  stats: {
    totalUsers: number;
    totalWebsites: number;
    totalPremium: number;
    totalViews: number;
  };
  users: Array<{
    id: string;
    email: string;
    name: string;
    role: string;
    subscription: string;
    createdAt: string;
  }>;
  websitesInSystem: Array<{
    id: string;
    name: string;
    industry: string;
    views: number;
    clicks: number;
    domain: string;
  }>;
}

export default function AdminPanel() {
  const [data, setData] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': 'Bearer admin@arabbuilder.ai' // Bypass simulate authentication as default admin role in frontend!
        }
      });
      if (!response.ok) {
        throw new Error('فشل توفير بيانات المسؤول.');
      }
      const resData = await response.json();
      setData(resData);
    } catch (e: any) {
      setErrorMsg(e.message || 'حدث خطأ في الجلسة أو ليس لديك الصلاحيات.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center space-y-4 font-sans" dir="rtl">
        <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin mx-auto" />
        <p className="text-xs text-gray-500">جاري قراءة إحصائيات لوحة المسؤول العالمية من خادم ArabBuilder AI...</p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="py-12 text-center max-w-md mx-auto space-y-4 font-sans" dir="rtl">
        <BadgeAlert className="w-12 h-12 text-red-500 mx-auto" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">فشل الاتصال بلوحة التحكم</h3>
        <p className="text-xs text-gray-500 leading-relaxed">{errorMsg}</p>
        <button
          onClick={fetchStats}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-xs"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10 text-right font-sans" dir="rtl">
      {/* Header */}
      <div className="border-b border-gray-250 dark:border-gray-850 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
          <span>بوابة إدارة النظام والتحليلات العالمية (Global SaaS Admin Console)</span>
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          بصفتك مديراً للنظام، تتيح لك هذه اللوحة مراقبة العمليات والحمل السحابي والاشتراكات.
        </p>
      </div>

      {/* Grid boxes */}
      {data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-850 shadow-sm space-y-2">
              <span className="text-xs text-gray-400 block font-semibold">إجمالي مستخدمي المنصة</span>
              <div className="flex justify-between items-baseline">
                <span className="text-3xl font-black text-gray-900 dark:text-white font-mono">{data.stats.totalUsers}</span>
                <Users className="w-5 h-5 text-emerald-500 opacity-60" />
              </div>
            </div>

            <div className="p-5 bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-850 shadow-sm space-y-2">
              <span className="text-xs text-gray-400 block font-semibold">المواقع المنشأة سحابياً</span>
              <div className="flex justify-between items-baseline">
                <span className="text-3xl font-black text-gray-900 dark:text-white font-mono">{data.stats.totalWebsites}</span>
                <Layers className="w-5 h-5 text-emerald-500 opacity-60" />
              </div>
            </div>

            <div className="p-5 bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-850 shadow-sm space-y-2">
              <span className="text-xs text-gray-400 block font-semibold">المشتركون المتميزون</span>
              <div className="flex justify-between items-baseline">
                <span className="text-3xl font-black text-gray-900 dark:text-white font-mono">{data.stats.totalPremium}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500 text-[10px] font-bold">باقات مدفوعة</span>
              </div>
            </div>

            <div className="p-5 bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-850 shadow-sm space-y-2">
              <span className="text-xs text-gray-400 block font-semibold">إجمالي تصفح الزوار</span>
              <div className="flex justify-between items-baseline">
                <span className="text-3xl font-black text-gray-900 dark:text-white font-mono">{data.stats.totalViews}</span>
                <BarChart3 className="w-5 h-5 text-emerald-500 opacity-60" />
              </div>
            </div>
          </div>

          {/* Tables layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Users listing */}
            <div className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-850 shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 dark:bg-gray-900 px-5 border-b border-gray-150 dark:border-gray-850">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">قائمة حسابات المستخدمين</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right text-gray-500 dark:text-gray-400 font-sans">
                  <thead className="text-[10px] text-gray-400 uppercase bg-gray-50 dark:bg-gray-900 border-b border-gray-150 dark:border-gray-850">
                    <tr>
                      <th className="px-5 py-3">الاسم كامل</th>
                      <th className="px-5 py-3">البريد الإلكتروني</th>
                      <th className="px-5 py-3">الباقة الفعالة</th>
                      <th className="px-5 py-3">تاريخ التسجيل</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-850 font-sans">
                    {data.users.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-55/20 dark:hover:bg-gray-900/40 text-gray-900 dark:text-gray-200 transition">
                        <td className="px-5 py-3.5 font-bold">{u.name}</td>
                        <td className="px-5 py-3.5 font-mono">{u.email}</td>
                        <td className="px-5 py-3.5 uppercase font-bold text-emerald-500">{u.subscription}</td>
                        <td className="px-5 py-3.5 text-gray-400 text-[10px]">{new Date(u.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Websites listing */}
            <div className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-850 shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 dark:bg-gray-900 px-5 border-b border-gray-150 dark:border-gray-850">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">أداء المواقع السحابية الفعالة</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right text-gray-500 dark:text-gray-400 font-sans">
                  <thead className="text-[10px] text-gray-400 uppercase bg-gray-50 dark:bg-gray-900 border-b border-gray-150 dark:border-gray-850">
                    <tr>
                      <th className="px-5 py-3">اسم الموقع والمشروع</th>
                      <th className="px-5 py-3">الصنف</th>
                      <th className="px-5 py-3 text-center">المشاهدات</th>
                      <th className="px-5 py-3 text-center">النقرات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                    {data.websitesInSystem.map((w) => (
                      <tr key={w.id} className="hover:bg-gray-55/20 dark:hover:bg-gray-900/40 text-gray-900 dark:text-gray-250 transition">
                        <td className="px-5 py-3.5">
                          <span className="font-bold block">{w.name}</span>
                          <span className="text-[10px] font-mono text-gray-400" dir="ltr">{w.domain}</span>
                        </td>
                        <td className="px-5 py-3.5 uppercase text-gray-400 text-[10px]">{w.industry}</td>
                        <td className="px-5 py-3.5 text-center font-bold font-mono text-emerald-500">{w.views}</td>
                        <td className="px-5 py-3.5 text-center font-bold font-mono text-cyan-500">{w.clicks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
