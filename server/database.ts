import fs from 'fs';
import path from 'path';
import { User, Website, Subscription, AnalyticsRecord, SystemStats } from '../src/types';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

interface DatabaseSchema {
  users: User[];
  websites: Website[];
  subscriptions: Subscription[];
  analytics: AnalyticsRecord[];
}

// Ensure database file exists
function initDb(): DatabaseSchema {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (e) {
      console.error('Error reading database, creating fresh one:', e);
    }
  }

  // Seed data
  const defaultDb: DatabaseSchema = {
    users: [
      {
        id: 'admin-id',
        email: 'admin@arabbuilder.ai',
        name: 'أمين نعمان',
        role: 'admin',
        subscription: 'business',
        createdAt: new Date().toISOString()
      },
      {
        id: 'user-id-1',
        email: 'demo@arabbuilder.ai',
        name: 'عميل تجريبي',
        role: 'user',
        subscription: 'premium',
        createdAt: new Date().toISOString()
      }
    ],
    websites: [
      {
        id: 'web-demo-1',
        userId: 'user-id-1',
        name: 'مطعم حضرموت للمأكولات الشعبية',
        industry: 'restaurant',
        description: 'مطعم يمني شعبي يقدم ألذ وجبات المندي والمظبي والمضغوط في قلب عدن.',
        logoTheme: '🍴 حضرموت',
        brandColors: {
          primary: '#d97706', // Amber-600
          secondary: '#78350f', // Amber-900
          accent: '#ef4444', // Red-500
          bgBg: '#fffdfa', // Creamy white
          bgCard: '#ffffff',
          textPrimary: '#1e293b',
          textSecondary: '#475569'
        },
        sections: [
          {
            id: 'demo-hero',
            type: 'hero',
            heading: 'أصالة المذاق اليمني العريق',
            subheading: 'أشهى المأكولات الشعبية المحضرة بأرقى التوابل في عدن',
            body: 'نرحب بكم في مطعم وبيت الخبرة اليمني الأصيل حضرموت. نقدم لكم تشكيلة واسعة من وجبات الغداء والعشاء الفاخرة التي تدفئ القلوب وتسعد العائلات.',
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80',
            buttonText: 'تصفح قائمة الطعام',
            buttonUrl: '#menu'
          },
          {
            id: 'demo-about',
            type: 'about',
            heading: 'قصة نجاحنا وشغفنا',
            subheading: 'من نحن وما نقدمه لعملائنا',
            body: 'تأسس مطعم حضرموت بهدف تقديم تجربة طعام استثنائية تجمع بين التقاليد اليمنية الأصيلة والخدمة الحديثة المتميزة. نستخدم أفضل الخامات والتوابل الطبيعية التي تضفي نكهة فريدة لا تُنسى على كل تفاصيل طبقك اليومي.',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80'
          },
          {
            id: 'demo-services',
            type: 'services',
            heading: 'خدماتنا المتميزة',
            subheading: 'ما نقدمه لضيوفنا الأعزاء',
            items: [
              {
                id: 'srv-1',
                title: 'تجهيز الحفلات والمناسبات',
                description: 'نقدم قوائم بوفيه متكاملة مخصصة للأفراح والحفلات والمؤتمرات الكبيرة مع طاقم تقديم محترف.',
                icon: 'UtensilsCrossed'
              },
              {
                id: 'srv-2',
                title: 'توصيل سريع للمنازل',
                description: 'نوفر أسرع شبكة توصيل طعام دافع في جميع مناطق عدن وضواحيها للحفاظ على سخونة طعامك.',
                icon: 'Truck'
              },
              {
                id: 'srv-3',
                title: 'صالة طعام عائلية خاصة',
                description: 'صالة طعام واسعة ومريحة مخصصة كلياً للعائلات لتجربة طعام تسودها الخصوصية التامة.',
                icon: 'Users'
              }
            ]
          },
          {
            id: 'demo-faq',
            type: 'faq',
            heading: 'الأسئلة الشائعة',
            subheading: 'إجابات على أسئلتكم المتكررة',
            items: [
              {
                id: 'faq-1',
                title: 'ما هي مواعيد العمل الرسمية؟',
                description: 'نستقبلكم يومياً من الساعة 12:00 ظهراً وحتى الساعة 11:30 مساءً على مدار الأسبوع.'
              },
              {
                id: 'faq-2',
                title: 'هل تتوفر لديكم لحوم بلدي طازجة؟',
                description: 'نعم، جميع اللحوم المستخدمة في مطعمنا هي لحوم ذبائح بلدي طازجة يتم ذبحها وفحصها يومياً لضمان أعلى جودة.'
              }
            ]
          },
          {
            id: 'demo-contact',
            type: 'contact',
            heading: 'تواصل معنا واحجز طاولتك',
            subheading: 'يمكنك الاتصال بنا أو زيارة موقعنا مباشرة',
            body: 'الموقع: شارع التسعين، المنصورة، عدن، اليمن. هاتف: 02-345678 - بريد إلكتروني: support@hadramout-yemen.com',
            buttonText: 'موقعنا على الخريطة',
            buttonUrl: 'https://maps.google.com'
          }
        ],
        seo: {
          title: 'مطعم حضرموت للمأكولات الشعبية | أفضل مندي ومظبي في عدن',
          description: 'تذوق أشهى المأكولات اليمنية التقليدية من المندي والمظبي في صالات عائلية مريحة أو اطلب خدمة التوصيل السريع لكافة مديريات عدن.',
          keywords: 'مطعم حضرموت, مطعم عدن, مندي عدن, اكل يمني, حجز حفلات عدن'
        },
        domain: 'hadramout-aden.arabbuilder.ai',
        sslEnabled: true,
        published: true,
        views: 1420,
        clicks: 345,
        createdAt: new Date().toISOString()
      }
    ],
    subscriptions: [
      {
        id: 'sub-demo-1',
        userId: 'user-id-1',
        plan: 'premium',
        status: 'active',
        amount: 29,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    analytics: []
  };

  fs.writeFileSync(DB_FILE, JSON.stringify(defaultDb, null, 2), 'utf-8');
  return defaultDb;
}

const db = initDb();

function saveDb() {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
}

export const Database = {
  getUsers: () => db.users,
  addUser: (user: User) => {
    db.users.push(user);
    saveDb();
    return user;
  },
  findUserByEmail: (email: string) => db.users.find(u => u.email.toLowerCase() === email.toLowerCase()),
  findUserById: (id: string) => db.users.find(u => u.id === id),
  updateUserSubscription: (userId: string, plan: 'free' | 'premium' | 'business') => {
    const user = db.users.find(u => u.id === userId);
    if (user) {
      user.subscription = plan;
      saveDb();
    }
  },

  getWebsites: () => db.websites,
  getWebsitesByUserId: (userId: string) => db.websites.filter(w => w.userId === userId),
  getWebsiteById: (id: string) => db.websites.find(w => w.id === id),
  getWebsiteByDomain: (domain: string) => db.websites.find(w => w.domain === domain),
  addWebsite: (website: Website) => {
    db.websites.push(website);
    saveDb();
    return website;
  },
  updateWebsite: (id: string, updated: Partial<Website>) => {
    const idx = db.websites.findIndex(w => w.id === id);
    if (idx !== -1) {
      db.websites[idx] = { ...db.websites[idx], ...updated };
      saveDb();
      return db.websites[idx];
    }
    return null;
  },
  deleteWebsite: (id: string) => {
    const idx = db.websites.findIndex(w => w.id === id);
    if (idx !== -1) {
      db.websites.splice(idx, 1);
      saveDb();
      return true;
    }
    return false;
  },
  incrementStats: (id: string, type: 'view' | 'click') => {
    const web = db.websites.find(w => w.id === id);
    if (web) {
      if (type === 'view') web.views += 1;
      if (type === 'click') web.clicks += 1;
      saveDb();
    }
  },

  getSubscriptions: () => db.subscriptions,
  addSubscription: (sub: Subscription) => {
    db.subscriptions.push(sub);
    saveDb();
    return sub;
  },

  getAnalytics: () => db.analytics,
  addAnalyticsRecord: (record: AnalyticsRecord) => {
    db.analytics.push(record);
    saveDb();
    // Also update website totals
    const web = db.websites.find(w => w.id === record.websiteId);
    if (web) {
      if (record.eventType === 'view') web.views += 1;
      if (record.eventType === 'click') web.clicks += 1;
      saveDb();
    }
  },

  getSystemStats: (): SystemStats => {
    const totalUsers = db.users.length;
    const totalWebsites = db.websites.length;
    const totalPremium = db.users.filter(u => u.subscription !== 'free').length;
    const totalViews = db.websites.reduce((acc, w) => acc + w.views, 0);

    return {
      totalUsers,
      totalWebsites,
      totalPremium,
      totalViews
    };
  }
};
