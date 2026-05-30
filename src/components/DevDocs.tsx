import React from 'react';

export default function DevDocs() {
  return (
    <div className="space-y-12 pb-16 text-right" dir="rtl">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white font-sans">
          مركز التطوير وهندسة النظام (Steps 1 - 12)
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-mono">
          Startup CTO Documentation • Scale Architecture for 1,000,000+ Users
        </p>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 lg:sticky lg:top-4 h-fit space-y-2">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 font-mono">
              فهرس الهندسة واللوثيرة
            </h3>
            <nav className="space-y-1">
              {[
                { n: '1', t: 'Business Analysis' },
                { n: '2', t: 'System Architecture' },
                { n: '3', t: 'Database Design (ERD / SQL)' },
                { n: '4', t: 'User Flow' },
                { n: '5', t: 'Wireframes' },
                { n: '6', t: 'UI Design Specs' },
                { n: '7', t: 'Folder Structure' },
                { n: '8-9', t: 'Implementation Review' },
                { n: '10', t: 'Testing Plan' },
                { n: '11', t: 'Deployment Plan' },
                { n: '12', t: 'Scaling to 1M Users' },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={`#step-${item.n}`}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 px-2 py-1.5 rounded transition font-sans"
                >
                  <span className="flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 w-5 h-5 rounded-full text-xs font-mono">
                    {item.n}
                  </span>
                  <span>{item.t}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-9 space-y-16">
          {/* Step 1 */}
          <section id="step-1" className="scroll-mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500 text-white font-mono text-sm px-2.5 py-0.5 rounded-full">
                Step 1
              </span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-sans">
                تحليل الأعمال (Business Analysis)
              </h2>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4 leading-relaxed font-sans text-gray-700 dark:text-gray-300">
              <p>
                <strong>نموذج العمل والخدمة (SaaS Business Model):</strong> يتموضع منصة 
                <span className="text-emerald-500 font-semibold font-mono"> ArabBuilder AI </span> 
                كحل سحابي ذكي مخصص للشركات الناشئة، رواد الأعمال، وأصحاب المشاريع الصغيرة في العالم العربي، والذين يسعون للحصول على حضور رقمي متكامل في دقائق معدودة، متوافق كلياً مع معايير اللغة العربية وتحسين محركات البحث المحلية.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">الخطة المجانية (Free)</h4>
                  <ul className="text-xs space-y-1 text-gray-500 dark:text-gray-400">
                    <li>• موقع إلكتروني فرعي واحد</li>
                    <li>• استضافة بنطاق مشترط</li>
                    <li>• استيراد قوالب أساسية</li>
                  </ul>
                </div>
                <div className="p-4 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                  <h4 className="font-bold text-emerald-600 dark:text-emerald-400 mb-1">الخطة الاحترافية (Premium)</h4>
                  <ul className="text-xs space-y-1 text-emerald-700 dark:text-emerald-300">
                    <li>• 3 مواقع إلكترونية متطورة</li>
                    <li>• دعم ربط النطاق الخاص (Custom Domain)</li>
                    <li>• شهادة حماية SSL مجانية</li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">الخطة الشاملة (Business)</h4>
                  <ul className="text-xs space-y-1 text-gray-500 dark:text-gray-400">
                    <li>• عدد لا نهائي من المواقع</li>
                    <li>• توليد غير محدود بالذكاء الاصطناعي</li>
                    <li>• إحصائيات زوار متطورة وصادرات الكود الكاملة</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Step 2 */}
          <section id="step-2" className="scroll-mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500 text-white font-mono text-sm px-2.5 py-0.5 rounded-full">
                Step 2
              </span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-sans">
                هيكل النظام الشامل (System Architecture)
              </h2>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4 font-sans text-gray-700 dark:text-gray-300">
              <p className="leading-relaxed">
                يتكون النظام من بنية خدمات مصغّرة أو معمارية مترابطة الطبقات تضمن مستويات عالية من الجهوزية وسرعة المعالجة:
              </p>
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden font-mono text-xs">
                <div className="bg-gray-100 dark:bg-gray-900 px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                  🌐 Architectural Stack Flow
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-950 space-y-2 leading-6 text-left" dir="ltr">
                  [ Client Web Browser ] -- (HTTPS / RTL) --&gt; [ Cloud Storage Edge Caches ] <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp; <br />
                  [ Express Server API Gateways ] &lt;--- (JWT Sessions Auth) <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+---&gt; [ Google Gemini Generative AI Platform (gemini-3.5-flash) ]<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+---&gt; [ PostgreSQL Primary Database / SQLite Embedded Database Room ]<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+---&gt; [ Custom Domain SSL Proxy Router (Nginx) ]
                </div>
              </div>
            </div>
          </section>

          {/* Step 3 */}
          <section id="step-3" className="scroll-mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500 text-white font-mono text-sm px-2.5 py-0.5 rounded-full">
                Step 3
              </span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-sans">
                تصميم قاعدة البيانات ومخطط العلاقات (Database Schema & SQL Script)
              </h2>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-6 text-gray-700 dark:text-gray-300">
              
              {/* ERD Visualization */}
              <div className="space-y-2">
                <span className="text-sm font-semibold text-emerald-500 block">⭐ مخطط علاقات الكيانات (ERD Diagram):</span>
                <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 bg-gray-50 dark:bg-gray-900 font-mono text-xs overflow-x-auto text-left" dir="ltr">
                  <pre>{`  +------------------+         +------------------+         +----------------+
  |      USERS       |         |     PROJECTS     |         |  SUBMISSIONS   |
  +------------------+         +------------------+         +----------------+
  | id (PK)          |&lt;--------| userId (FK)      |         | id (PK)        |
  | email            |         | id (PK)          |&lt;--------| projectId (FK)|
  | password_hash    |         | name             |         | name           |
  | role             |         | domain           |         | email          |
  | subscription     |         | brandColors      |         | message        |
  | createdAt        |         | sections (JSON)  |         | createdAt      |
  +------------------+         | seo              |         +----------------+
           |                   | sslEnabled       |
           |                   | createdAt        |
           |                   +------------------+
           |                            |
           v                            v
  +------------------+         +------------------+
  |  SUBSCRIPTIONS   |         |    ANALYTICS     |
  +------------------+         +------------------+
  | id (PK)          |         | id (PK)          |
  | userId (FK)      |&lt;--------| websiteId (FK)   |
  | plan             |         | eventType        |
  | status           |         | timestamp        |
  | expiresAt        |         | device           |
  +------------------+         +------------------+`}</pre>
                </div>
              </div>

              {/* PostgreSQL SQL Schema */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-emerald-500 block">⭐ سكربت إنشاء الجداول (PostgreSQL SQL Script):</span>
                  <button 
                    onClick={() => {
                      const code = document.getElementById('sql-code-block')?.textContent || '';
                      navigator.clipboard.writeText(code);
                    }}
                    className="text-xs bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white px-2 py-1 rounded transition"
                  >
                    نسخ السكربت دقة
                  </button>
                </div>
                <div className="border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-900 text-emerald-400 p-4 font-mono text-xs overflow-x-auto text-left" dir="ltr">
                  <pre id="sql-code-block" className="leading-5">{`-- PostgreSQL Production DDL for ArabBuilder AI SaaS Platform

CREATE TYPE user_role AS ENUM ('admin', 'user');
CREATE TYPE subscription_tier AS ENUM ('free', 'premium', 'business');

CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'user',
    subscription subscription_tier DEFAULT 'free',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    description TEXT,
    logo_theme VARCHAR(100),
    brand_colors JSONB NOT NULL,
    sections JSONB NOT NULL,
    seo JSONB NOT NULL,
    domain VARCHAR(255) UNIQUE,
    ssl_enabled BOOLEAN DEFAULT TRUE,
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subscriptions (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
    plan subscription_tier NOT NULL,
    status VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE analytics (
    id VARCHAR(255) PRIMARY KEY,
    website_id VARCHAR(255) REFERENCES projects(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL, -- 'view', 'click'
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    referrer VARCHAR(255),
    device VARCHAR(255)
);

-- Index optimization for scale
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_domain ON projects(domain);
CREATE INDEX idx_analytics_website_id ON analytics(website_id);
`}</pre>
                </div>
              </div>
            </div>
          </section>

          {/* Steps 4 - 7 Summary */}
          <section id="step-4" className="scroll-mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500 text-white font-mono text-sm px-2.5 py-0.5 rounded-full">
                Steps 4-7
              </span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-sans">
                هندسة واجهة المستخدم وهيكل الملفات (User Flow & Directory Setup)
              </h2>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4 text-gray-700 dark:text-gray-300 text-right">
              <div className="space-y-2 leading-relaxed">
                <p>
                  <strong>مسار المستخدم المثالي (User Flow):</strong>
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 text-sm">
                  1️⃣ الهبوط والتسجيل في البوابة &gt; 2️⃣ الدخول إلى لوحة التحكم الشخصية &gt; 3️⃣ النقر على "إنشاء موقع ذكي" والبدء بالمعالج &gt; 4️⃣ إدخال التفاصيل والمجال &gt; 5️⃣ التوليد الفوري ومراجعة الموقع في لوحة التعديل التفاعلية &gt; 6️⃣ التعديل البصري الفوري وحفظ التغييرات ومزامنتها &gt; 7️⃣ تفعيل النطاق والربط بالانترنت!
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <p>
                  <strong>مسارات هيكل ملفات التطبيق (Directory Structure):</strong>
                </p>
                <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl font-mono text-xs text-left" dir="ltr">
                  /server.ts             # Express & Vite custom dev server entrypoint<br />
                  /server/database.ts    # Client data transactional read/write modules<br />
                  /src/types.ts          # Central SaaS models definitions<br />
                  /src/App.tsx           # Primary routing and view administrator<br />
                  /src/components/<br />
                  &nbsp;&nbsp;├── SassHome.tsx        # High fidelity branding and pitch page<br />
                  &nbsp;&nbsp;├── Dashboard.tsx       # Developer and user statistics workspace<br />
                  &nbsp;&nbsp;├── Wizard.tsx          # Multi-step AI Generator and loaders<br />
                  &nbsp;&nbsp;├── WorkspaceEditor.tsx  # Dynamic inline builder, preview panel & HTML exporter<br />
                  &nbsp;&nbsp;├── SiteViewModal.tsx   # Simulated browser shell client visits tracker<br />
                  &nbsp;&nbsp;└── DevDocs.tsx         # The elite CTO manuals (this view)<br />
                </div>
              </div>
            </div>
          </section>

          {/* Steps 10-12 */}
          <section id="step-10" className="scroll-mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500 text-white font-mono text-sm px-2.5 py-0.5 rounded-full">
                Steps 10-12
              </span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-sans">
                خطة الإطلاق والرفع لمليون مستخدم (Deployment & Scale Guide-1M)
              </h2>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-6 text-gray-700 dark:text-gray-300">
              <div className="space-y-2">
                <h4 className="font-bold text-gray-900 dark:text-white">🚀 خطة الاختبار التجاري والتشغيلي (Testing Plan):</h4>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  - إجراء اختبارات نهاية لنهاية (E2E) باستخدام Playwright للتحقق من سلامة كافة خدمات معالج الذكاء الاصطناعي وبوابة المدفوعات.<br />
                  - اختبار تحمل استثنائي (Load Testing) عبر K6 يحاكي تدفق 10,000 مستخدم في وقت واحد لضمان ثبات معدل استجابة الخادم عن 150ms.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-gray-900 dark:text-white">🏢 الاستضافة والنشر المستطرد (Deployment Plan):</h4>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  - يتم استضافة الخادم السحابي بالدمج مع شبكة توزيع محتوى Cloudflare لتأمين هجمات حجب الخدمة (DDoS).<br />
                  - استخدام حاويات Docker منشورة بمساعدة Cloud Run لتمكين الرفع والتحجيم الذاتي التلقائي حسب الطلب.
                </p>
              </div>

              <div className="space-y-2 font-sans">
                <h4 className="font-bold text-gray-900 dark:text-white text-emerald-500">📈 معمارية المليون مستخدم نشط (Scale Guide 1M+ Users):</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-2">
                  <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                    <span className="font-bold text-gray-900 dark:text-white block mb-1">Caching Layer</span>
                    استخدام Redis cluster لتخزين كائنات نصوص المواقع الجاهزة وجلسات المستخدمين لتجنب تكرار قراءة قاعدة البيانات.
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                    <span className="font-bold text-gray-900 dark:text-white block mb-1">Read Replicas Database</span>
                    تطبيق مصفوفة PostgreSQL Primary/Secondary Cluster وتوزيع حركة القراءة والكتابة والبحث ومؤشرات محرك البحث.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
