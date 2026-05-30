import React, { useState, useEffect } from 'react';
import { Sparkles, Layout, ShieldCheck, Sun, Moon, LogOut, CheckCircle, Smartphone, Award, GraduationCap, X, HelpCircle, HardDriveDownload, Eye, Globe2 } from 'lucide-react';
import { User, Website } from './types';

// Import modular components
import SassHome from './components/SassHome';
import Dashboard from './components/Dashboard';
import Wizard from './components/Wizard';
import WorkspaceEditor from './components/WorkspaceEditor';
import AdminPanel from './components/AdminPanel';
import SiteViewModal from './components/SiteViewModal';
import DevDocs from './components/DevDocs';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Session state
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  // Authentication Overlays
  const [authMode, setAuthMode] = useState<'none' | 'login' | 'register'>('none');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authError, setAuthError] = useState('');

  // SASS platform view controllers
  const [activeView, setActiveView] = useState<'home' | 'console' | 'docs' | 'admin'>('home');
  const [websites, setWebsites] = useState<Website[]>([]);
  const [activeEditorId, setActiveEditorId] = useState<string | null>(null);

  // Onboarding Wizard triggers
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressIdx, setProgressIdx] = useState(0);

  // Visitor simulator browser overlay
  const [previewWebsite, setPreviewWebsite] = useState<Website | null>(null);

  // Custom alert notifications state
  const [successMsg, setSuccessMsg] = useState('');

  const progressSteps = [
    '🔍 جاري تحليل بيانات مشروعك وصناعة الفكرة الهندسية...',
    '🎨 اختيار تيمات الألوان والخطوط المتناسقة بالذكاء الاصطناعي...',
    '✍️ صياغة نصوص وعناوين ترويجية احترافية بدون placeholders...',
    '🚀 تنسيق صفحة الهبوط والبطاقات وعمل محاكاة الزيارات التجريبية...',
    '✨ تم بناء ورفع موقعك بنجاح! جاري تحويلك للمحرر...'
  ];

  // Auto session checker on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('arabbuilder_token');
    const savedUser = localStorage.getItem('arabbuilder_user');
    if (savedToken && savedUser) {
      setAuthToken(savedToken);
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setActiveView(parsedUser.role === 'admin' ? 'admin' : 'console');
      fetchUserWebsites(savedToken);
    }
  }, []);

  const fetchUserWebsites = async (tokenValue: string) => {
    try {
      const res = await fetch('/api/websites', {
        headers: {
          'Authorization': `Bearer ${tokenValue}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setWebsites(data);
      }
    } catch (e) {
      console.error('Failure fetching websites:', e);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, password: authPassword, name: authName })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'حدث خطأ في التسجيل.');
      }
      localStorage.setItem('arabbuilder_token', data.token);
      localStorage.setItem('arabbuilder_user', JSON.stringify(data.user));
      setAuthToken(data.token);
      setUser(data.user);
      setAuthMode('none');
      setAuthEmail('');
      setAuthPassword('');
      setAuthName('');
      setActiveView('console');
      fetchUserWebsites(data.token);
      triggerSuccess('مبارك! تم تسجيل حسابك وبدء جولتك بنجاح.');
    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, password: authPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'فشل تسجيل الدخول.');
      }
      localStorage.setItem('arabbuilder_token', data.token);
      localStorage.setItem('arabbuilder_user', JSON.stringify(data.user));
      setAuthToken(data.token);
      setUser(data.user);
      setAuthMode('none');
      setAuthEmail('');
      setAuthPassword('');
      setActiveView(data.user.role === 'admin' ? 'admin' : 'console');
      fetchUserWebsites(data.token);
      triggerSuccess('تم تسجيل دخولك لـ ArabBuilder AI بنجاح.');
    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('arabbuilder_token');
    localStorage.removeItem('arabbuilder_user');
    setAuthToken(null);
    setUser(null);
    setWebsites([]);
    setActiveView('home');
    triggerSuccess('تم تسجيل الخروج بنجاح. سنشتاق لك!');
  };

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  // AI Website Generator Onboarding process
  const triggerAiGenerator = async (details: {
    name: string;
    industry: string;
    description: string;
    location: string;
    colorsTheme: string;
  }) => {
    if (!authToken) return;
    setIsWizardOpen(false);
    setIsGenerating(true);
    setProgressIdx(0);

    // Simulated intervals for interactive progress loops during generation
    const interval = setInterval(() => {
      setProgressIdx((p) => {
        if (p < progressSteps.length - 2) {
          return p + 1;
        }
        return p;
      });
    }, 2500);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(details)
      });
      const generatedWebsite = await res.json();
      clearInterval(interval);

      if (!res.ok) {
        throw new Error(generatedWebsite.error || 'فشل توليد الموقع.');
      }

      setProgressIdx(progressSteps.length - 1);
      setTimeout(() => {
        setIsGenerating(false);
        fetchUserWebsites(authToken);
        setActiveEditorId(generatedWebsite.id);
        triggerSuccess('مبارك! تم توليد موقعك بنجاح بالذكاء الاصطناعي وجاهز للمساتك البصرية!');
      }, 1500);

    } catch (err: any) {
      clearInterval(interval);
      setIsGenerating(false);
      alert('إشعار: تم استخدام محرك المواقع الجاهزة لنقص مفتاح Gemini API أو لخطأ في الفيد؛ تم تصميم صفحة هبوط عربية مذهلة بالنيابة عنك!');
      fetchUserWebsites(authToken);
    }
  };

  // Website Save
  const saveWebsiteUpdate = async (updated: Website) => {
    if (!authToken) return;
    try {
      const res = await fetch(`/api/websites/${updated.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        fetchUserWebsites(authToken);
        setActiveEditorId(null);
        triggerSuccess('تم حفظ تعديلات هوية موقعك السحابية بنجاح.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Website Delete
  const deleteWebsite = async (id: string) => {
    if (!authToken) return;
    if (!confirm('هل أنت متأكد من رغبتك في حذف هذا الموقع نهائياً؟ لا يمكن التراجع عن هذا الإجراء.')) return;
    try {
      const res = await fetch(`/api/websites/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (res.ok) {
        fetchUserWebsites(authToken);
        triggerSuccess('تم حذف الموقع وتصفير النطاق سحابياً بنجاح.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Website Duplicate
  const duplicateWebsite = async (id: string) => {
    if (!authToken) return;
    try {
      const res = await fetch(`/api/websites/${id}/duplicate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (res.ok) {
        fetchUserWebsites(authToken);
        triggerSuccess('تم استنساخ وتكرار الموقع وكامل تفاصيله بنجاح.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const togglePublishStatus = async (id: string, published: boolean) => {
    if (!authToken) return;
    try {
      const res = await fetch(`/api/websites/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ published })
      });
      if (res.ok) {
        fetchUserWebsites(authToken);
        triggerSuccess(published ? 'تم نشر وتفعيل الموقع المباشر.' : 'تم تعليق ونقل الموقع إلى المسودات.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateCustomDomain = async (id: string, domain: string) => {
    if (!authToken) return;
    try {
      const res = await fetch(`/api/websites/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ domain })
      });
      if (res.ok) {
        fetchUserWebsites(authToken);
        triggerSuccess('تم تجديد وتخصيص رابط موقعك بنجاح.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Record simulated view/clicks via client visiting modal
  const handleRecordClick = async (id: string) => {
    try {
      await fetch(`/api/public/website/${id}/click`, { method: 'POST' });
      if (authToken) {
        fetchUserWebsites(authToken);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'dark bg-[#09090b] text-[#fafafa]' : 'bg-[#f4f4f5] text-gray-900'} min-h-screen transition-colors duration-300 font-sans text-right`} dir="rtl">
      {/* GLOBAL NAVBAR */}
      <header className="sticky top-4 z-40 bg-white/90 dark:bg-[#0f0f11]/90 backdrop-blur-md border border-gray-150 dark:border-[#27272a] rounded-2xl px-6 py-4 flex justify-between items-center max-w-7xl mx-auto my-4 transition-all duration-300 shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-l from-[#6366f1] to-[#a855f7] text-white p-2.5 rounded-xl shadow-md cursor-pointer" onClick={() => setActiveView('home')}>
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xl font-black font-sans bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent hover:opacity-85 transition cursor-pointer" onClick={() => setActiveView('home')}>
            ArabBuilder AI
          </span>
        </div>

        {/* Console Navigations */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold font-sans">
          <button onClick={() => setActiveView('home')} className={`transition hover:text-[#6366f1] ${activeView === 'home' ? 'text-[#6366f1] font-extrabold' : 'text-gray-500'}`}>الرئيسية</button>
          
          {user && (
            <>
              <button onClick={() => setActiveView('console')} className={`transition hover:text-[#6366f1] ${activeView === 'console' ? 'text-[#6366f1] font-extrabold' : 'text-gray-500'}`}>لوحتي السحابية</button>
              {user.role === 'admin' && (
                <button onClick={() => setActiveView('admin')} className={`transition hover:text-[#6366f1] ${activeView === 'admin' ? 'text-[#6366f1] font-extrabold' : 'text-gray-500'}`}>بوابة المسؤول</button>
              )}
            </>
          )}

          <button onClick={() => setActiveView('docs')} className={`transition hover:text-[#6366f1] ${activeView === 'docs' ? 'text-[#6366f1] font-extrabold' : 'text-gray-500'}`}>مركز التطوير والمليون مستخدم</button>
        </nav>

        {/* Right Nav controls buttons */}
        <div className="flex items-center gap-3">
          {/* Light/Dark Mode Switcher */}
          <button
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-[#18181b] dark:hover:bg-[#27272a] dark:border dark:border-[#27272a]/80 transition text-gray-500 cursor-pointer"
            title="تبديل مظهر الإضاءة"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {user ? (
            <div className="flex items-center gap-3 border-r border-gray-150 dark:border-[#27272a] pr-3">
              <span className="text-xs text-gray-500 font-medium hidden sm:inline">{user.name}</span>
              <button
                onClick={handleLogout}
                className="p-2 bg-red-50 hover:bg-red-500 hover:text-white dark:bg-red-950/20 text-red-500 rounded-xl transition cursor-pointer"
                title="تسجيل الخروج"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setAuthMode('login')}
                className="px-4 py-2 text-xs font-bold text-gray-650 dark:text-gray-300 hover:text-[#6366f1] transition cursor-pointer"
              >
                دخول
              </button>
              <button
                onClick={() => setAuthMode('register')}
                className="px-4 py-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] hover:opacity-90 text-white text-xs font-bold rounded-xl transition shadow shadow-indigo-500/10 cursor-pointer"
              >
                انضمام مجاني
              </button>
            </div>
          )}
        </div>
      </header>

      {/* SUCCESS POPUP ALERTS */}
      {successMsg && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white p-4 rounded-xl border border-emerald-500/20 shadow-2xl z-50 flex items-center gap-3 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-500" />
          <span className="text-xs font-bold font-sans">{successMsg}</span>
        </div>
      )}

      {/* GENERATING AI WORKPLACE SPINNER ELEMENT */}
      {isGenerating && (
        <div className="fixed inset-0 bg-slate-950/90 z-50 flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full space-y-8 text-center bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>

            <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-full w-fit mx-auto animate-spin">
              <Sparkles className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">جاري نحت وتوليد موقعك بالذكاء الاصطناعي...</h2>
              <p className="text-xs text-gray-400">نحن نتولى عنك صياغة المحتوى والهوية لتوفير 100% حضور مذهل.</p>
            </div>

            {/* Timed progress list */}
            <div className="space-y-3 pt-4 border-t border-gray-805 text-right flex flex-col items-end">
              {progressSteps.map((stepStr, idx) => (
                <div key={idx} className={`flex items-center gap-2 text-xs transition-opacity duration-300 ${idx === progressIdx ? 'text-emerald-400 font-bold' : idx < progressIdx ? 'text-gray-500' : 'text-gray-700'}`}>
                  {idx < progressIdx ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> : <div className={`w-3.5 h-3.5 rounded-full border border-gray-700 shrink-0 ${idx === progressIdx ? 'border-emerald-500 animate-ping' : ''}`}></div>}
                  <span>{stepStr}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PRIMARY CONSOLE CONTENT WRAPPERS */}
      <main className="max-w-7xl mx-auto px-6 py-10 min-h-[75vh]">
        {/* Workspace state editor takes absolute visual presence over screens if active website id and logged-in user is set */}
        {activeEditorId && user ? (
          (() => {
            const activeWebsite = websites.find(w => w.id === activeEditorId);
            if (activeWebsite) {
              return (
                <WorkspaceEditor
                  website={activeWebsite}
                  onCancel={() => setActiveEditorId(null)}
                  onSave={saveWebsiteUpdate}
                  onOpenLivePreview={setPreviewWebsite}
                />
              );
            }
            return null;
          })()
        ) : (
          <>
            {/* VIEW RENDER STATE BLOCK */}
            {activeView === 'home' && (
              <SassHome
                onStartSignUp={() => setAuthMode('register')}
                onStartLogin={() => setAuthMode('login')}
                user={user}
                onGoToConsole={() => setActiveView(user?.role === 'admin' ? 'admin' : 'console')}
              />
            )}

            {activeView === 'console' && user && (
              <Dashboard
                user={user}
                websites={websites}
                onStartGenerator={() => {
                  if (user.subscription === 'free' && websites.length >= 1) {
                    alert('عذرًا! لقد بلغت الحد الأقصى للمواقع المتاحة في الباقة المجانية (موقع واحد بقيمة مسودة). يرجى تغيير باقتك في حسابك التجريبي.');
                    return;
                  }
                  setIsWizardOpen(true);
                }}
                onEditWebsite={(id) => setActiveEditorId(id)}
                onDeleteWebsite={deleteWebsite}
                onDuplicateWebsite={duplicateWebsite}
                onTogglePublish={togglePublishStatus}
                onSaveDomain={updateCustomDomain}
                onSelectDocTab={() => setActiveView('docs')}
                onOpenLivePreview={setPreviewWebsite}
                onLogout={handleLogout}
              />
            )}

            {activeView === 'docs' && <DevDocs />}

            {activeView === 'admin' && user?.role === 'admin' && <AdminPanel />}
          </>
        )}
      </main>

      {/* FOOTER GENERAL FOR SASS */}
      <footer className="bg-white dark:bg-gray-950 border-t border-gray-150 dark:border-gray-850 py-12 px-6 text-center text-xs text-gray-400 select-none max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-100 dark:border-gray-850 pb-6 mb-6">
          <span className="font-extrabold text-sm text-emerald-500">ArabBuilder AI • باني المواقع العربي بالسحاب</span>
          <div className="flex gap-4 text-gray-500">
            <span className="hover:underline cursor-pointer" onClick={() => setActiveView('home')}>الرئيسية</span>
            <span className="hover:underline cursor-pointer" onClick={() => setActiveView('docs')}>معمارية المليون مستخدم</span>
          </div>
        </div>
        <p>© {new Date().getFullYear()} ArabBuilder AI SaaS Platform. جميع الحقوق مع الحفاوة والتقدير لشبكة رواد الأعمال العرب.</p>
      </footer>

      {/* AUTHENTICATION FORM OVERLAYS MODALS */}
      {authMode !== 'none' && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-gray-950 border border-gray-250 dark:border-gray-850 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 relative text-right">
            <button
              onClick={() => {
                setAuthMode('none');
                setAuthError('');
              }}
              className="absolute top-4 left-4 p-1 rounded-full hover:bg-gray-150 dark:hover:bg-gray-900 transition text-gray-500 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {authMode === 'login' ? 'مرحبًا بعودتك من جديد' : 'افتح حسابك السحابي مجانًا'}
              </h2>
              <p className="text-xs text-gray-500">
                {authMode === 'login' ? 'سجل دخولك لبدء تعديل ونشر مواقعك' : 'ابدأ التوليد بالذكاء الاصطناعي في دقائق'}
              </p>
            </div>

            {authError && (
              <div className="p-3 bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-semibold rounded-lg">
                ⚠️ {authError}
              </div>
            )}

            <form onSubmit={authMode === 'login' ? handleLogin : handleRegister} className="space-y-4 text-xs font-medium">
              {authMode === 'register' && (
                <div className="space-y-1.5">
                  <label className="text-gray-400">الاسم والكنية كاملين *</label>
                  <input
                    type="text"
                    placeholder="مثل: المطور المبدع"
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-55/30 dark:bg-gray-900/40 text-gray-900 dark:text-white"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-gray-400">البريد الإلكتروني التجاري *</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-55/30 dark:bg-gray-900/40 text-gray-900 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-400">كلمة المرور الحصينة *</label>
                <input
                  type="password"
                  placeholder="كلمة مرور الدخول الخاصة بك"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-55/30 dark:bg-gray-900/40 text-gray-900 dark:text-white"
                />
              </div>

              {authMode === 'register' && (
                <div className="p-3 bg-emerald-500/5 rounded-lg text-[10px] text-gray-500 leading-relaxed border border-emerald-500/10">
                  ℹ️ بالتسجيل فإنك تقر وتفهم بأن هذه بيئة SaaS تجريبية متكاملة لـ <strong>ArabBuilder AI</strong>، لحفظ المواقع محلياً على الخادم الآمن.
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-500/10 transition active:scale-95 cursor-pointer"
              >
                {authMode === 'login' ? 'تأكيد تسجيل الدخول' : 'تأكيد التسجيل وإنشاء هويتي'}
              </button>
            </form>

            <div className="text-xs text-center text-gray-500">
              {authMode === 'login' ? (
                <p>
                  ليس لديك حساب بعد؟{' '}
                  <button onClick={() => setAuthMode('register')} className="text-emerald-500 hover:underline font-bold">
                    سجل حساباً مجانياً الآن
                  </button>
                </p>
              ) : (
                <p>
                  لديك حساب بالفعل؟{' '}
                  <button onClick={() => setAuthMode('login')} className="text-emerald-500 hover:underline font-bold">
                    سجل دخولك مباشرة
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* WIZARD POPUP MODAL */}
      {isWizardOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-3xl overflow-y-auto max-h-[90vh]">
            <Wizard
              onCancel={() => setIsWizardOpen(false)}
              onGenerate={triggerAiGenerator}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      )}

      {/* DYNAMIC SITE VIEW VISITOR SIMULATOR OVERLAY */}
      {previewWebsite && (
        <SiteViewModal
          website={previewWebsite}
          onClose={() => setPreviewWebsite(null)}
          onRecordClick={handleRecordClick}
        />
      )}
    </div>
  );
}
