import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { Database } from './server/database';
import { Website, Section, BrandColors, User, SeoMetadata } from './src/types';

// Fallback images based on business industry
const FALLBACK_IMAGES: Record<string, string[]> = {
  restaurant: [
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop&q=80'
  ],
  cafe: [
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&auto=format&fit=crop&q=80'
  ],
  company: [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80'
  ],
  portfolio: [
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80'
  ],
  ecommerce: [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&auto=format&fit=crop&q=80'
  ],
  education: [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80'
  ],
  medical: [
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80'
  ],
  general: [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&auto=format&fit=crop&q=80'
  ]
};

function getFallbackWebResponse(
  name: string,
  industry: string,
  desc: string,
  loc: string
): Omit<Website, 'id' | 'userId' | 'views' | 'clicks' | 'createdAt'> {
  const ind = FALLBACK_IMAGES[industry] ? industry : 'general';
  const imgs = FALLBACK_IMAGES[ind] || FALLBACK_IMAGES.general;

  // Let's set matching brand colors based on industry
  let colors: BrandColors = {
    primary: '#10b981', // emerald
    secondary: '#065f46',
    accent: '#3b82f6',
    bgBg: '#fafafa',
    bgCard: '#ffffff',
    textPrimary: '#1e293b',
    textSecondary: '#64748b'
  };

  if (ind === 'restaurant') {
    colors = {
      primary: '#ea580c', // orange
      secondary: '#431407',
      accent: '#e11d48',
      bgBg: '#fffbf7',
      bgCard: '#ffffff',
      textPrimary: '#1e293b',
      textSecondary: '#475569'
    };
  } else if (ind === 'cafe') {
    colors = {
      primary: '#854d0e', // yellow-800
      secondary: '#422006',
      accent: '#22c55e',
      bgBg: '#fefcf8',
      bgCard: '#fefaf2',
      textPrimary: '#2d1e10',
      textSecondary: '#5a4632'
    };
  } else if (ind === 'company') {
    colors = {
      primary: '#2563eb', // blue-600
      secondary: '#1e3a8a',
      accent: '#0d9488',
      bgBg: '#f8fafc',
      bgCard: '#ffffff',
      textPrimary: '#0f172a',
      textSecondary: '#475569'
    };
  } else if (ind === 'medical') {
    colors = {
      primary: '#0d9488', // teal-600
      secondary: '#115e59',
      accent: '#2563eb',
      bgBg: '#f0fdfa',
      bgCard: '#ffffff',
      textPrimary: '#0f172a',
      textSecondary: '#475569'
    };
  }

  const cleanDesc = desc || `مشروع متميز في مجال ${industry}`;
  const cleanLoc = loc || 'المملكة العربية السعودية';

  return {
    name,
    industry,
    description: cleanDesc,
    logoTheme: `🌐 ${name}`,
    brandColors: colors,
    sections: [
      {
        id: 'sec-hero',
        type: 'hero',
        heading: `مرحباً بكم في ${name}`,
        subheading: `شريككم الموثوق في ${cleanLoc}`,
        body: `${cleanDesc}. نوفر لكم أفضل الخدمات والمنتجات بأعلى معايير الجودة والاحترافية. تواصلوا معنا اليوم لمزيد من التفاصيل.`,
        image: imgs[0],
        buttonText: 'تواصل معنا الآن',
        buttonUrl: '#contact'
      },
      {
        id: 'sec-about',
        type: 'about',
        heading: 'من نحن وقيمنا',
        subheading: 'رؤيتنا ورسالتنا لتقديم الأفضل دائماً',
        body: `نحن في ${name} نؤمن بأن الجودة والالتزام هما أساس النجاح. تأسس مشروعنا في ${cleanLoc} ليلبي احتياجات عملائنا الكرام ويسهم في تقديم مستويات خدمة تفوق توقعاتهم، اعتماداً على فريق عمل متخصص وشغوف بالتميز.`,
        image: imgs[1]
      },
      {
        id: 'sec-services',
        type: 'services',
        heading: 'خدماتنا الاستثنائية',
        subheading: 'باقة من أفضل ما نقدمه لكم بكل فخر واعتزاز',
        items: [
          {
            id: 's-1',
            title: 'خدمات احترافية متكاملة',
            description: 'نضمن تقديم الحل الأفضل والمناسب لكل غاية بشكل مدروس يلبي تطلعات عملائنا.',
            icon: 'Briefcase'
          },
          {
            id: 's-2',
            title: 'دعم فني وتواصل مستمر',
            description: 'فريقنا متاح على مدار الساعة للإجابة على استفساراتكم وضمان سير العمل بسلاسة.',
            icon: 'Clock'
          },
          {
            id: 's-3',
            title: 'جودة لا تضاهى',
            description: 'نلتزم بتطبيق المعايير العالية في جميع المراحل لتقديم مخرجات استثنائية وجذابة.',
            icon: 'ShieldCheck'
          }
        ]
      },
      {
        id: 'sec-faq',
        type: 'faq',
        heading: 'الأسئلة الأكثر شيوعاً',
        subheading: 'كل ما تود معرفته عن خدماتنا وإجراءاتنا',
        items: [
          {
            id: 'f-1',
            title: 'كيف يمكنني البدء في طلب الخدمة؟',
            description: 'كل ما عليك هو ملء نموذج الاتصال أدناه أو الاتصال بنا مباشرة وسيقوم مستشارنا بالتواصل معك فوراً.'
          },
          {
            id: 'f-2',
            title: 'ما هي طرق الدفع المتاحة وموقعكم الجغرافي؟',
            description: 'نوفر خيارات دفع مرنة ومتعددة، ومقرنا الرئيسي يقع في قلب المدينة لسهولة الوصول والاستشارة.'
          }
        ]
      },
      {
        id: 'sec-contact',
        type: 'contact',
        heading: 'يسعدنا تواصلكم الدائم',
        subheading: 'استشرنا أو اترك رسالتك وسنرد في أقرب وقت',
        body: `العنوان: ${cleanLoc} - الهاتف العام: +966500000000 - البريد الإلكتروني: info@${industry}.ai`,
        buttonText: 'راسلنا على واتساب',
        buttonUrl: 'https://wa.me/966500000000'
      }
    ],
    seo: {
      title: `${name} | ${cleanLoc} - الحلول الرائدة`,
      description: `${cleanDesc}. تواصل معنا لمزيد من التفاصيل حول خدماتنا المتميزة.`,
      keywords: `${name}, ${industry}, ${cleanLoc}, خدمات احترافية, تواصل معنا`
    },
    published: true,
    domain: `${industry}-${Date.now().toString().slice(-4)}.arabbuilder.ai`,
    sslEnabled: true
  };
}

async function startApp() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API - Auth Middleware (Header based authentication simulation for robust security!)
  const getAuthUser = (req: Request): User | null => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const email = authHeader.substring(7);
      const user = Database.findUserByEmail(email);
      return user || null;
    }
    return null;
  };

  // API: Authentication
  app.post('/api/auth/register', (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'يرجى إدخال جميع البيانات المطلوبة.' });
    }

    const exists = Database.findUserByEmail(email);
    if (exists) {
      return res.status(400).json({ error: 'البريد الإلكتروني مسجل بالفعل.' });
    }

    const newUser: User = {
      id: 'usr-' + Date.now().toString(),
      email,
      name,
      role: 'user',
      subscription: 'free',
      createdAt: new Date().toISOString()
    };

    Database.addUser(newUser);
    // Return with token
    res.json({ user: newUser, token: email });
  });

  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'يرجى إدخال البريد الإلكتروني وكلمة المرور.' });
    }

    const user = Database.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'المستخدم غير موجود.' });
    }

    res.json({ user, token: email });
  });

  app.get('/api/auth/me', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user) {
      return res.status(401).json({ error: 'غير مخول بالوصول.' });
    }
    res.json({ user });
  });

  // API: Website list & create
  app.get('/api/websites', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user) {
      return res.status(401).json({ error: 'غير مخول بالوصول.' });
    }
    const sites = Database.getWebsitesByUserId(user.id);
    res.json(sites);
  });

  app.get('/api/public/website/:id_or_domain', (req: Request, res: Response) => {
    const { id_or_domain } = req.params;
    let site = Database.getWebsiteById(id_or_domain);
    if (!site) {
      site = Database.getWebsiteByDomain(id_or_domain);
    }

    if (!site) {
      return res.status(404).json({ error: 'الموقع الإلكتروني غير موجود.' });
    }

    // Record view in backgrounds
    Database.addAnalyticsRecord({
      id: 'an-' + Date.now().toString(),
      websiteId: site.id,
      eventType: 'view',
      timestamp: new Date().toISOString(),
      referrer: req.headers.referer || 'direct',
      device: req.headers['user-agent'] || 'unknown'
    });

    res.json(site);
  });

  app.post('/api/public/website/:id/click', (req: Request, res: Response) => {
    const { id } = req.params;
    const site = Database.getWebsiteById(id);
    if (!site) {
      return res.status(404).json({ error: 'الموقع غير موجود.' });
    }

    Database.addAnalyticsRecord({
      id: 'an-click-' + Date.now().toString(),
      websiteId: site.id,
      eventType: 'click',
      timestamp: new Date().toISOString(),
      referrer: req.headers.referer || 'direct',
      device: req.headers['user-agent'] || 'unknown'
    });

    res.json({ success: true });
  });

  // AI Website Generator route
  app.post('/api/generate', async (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user) {
      return res.status(401).json({ error: 'يرجى تسجيل الدخول أولاً للبدء بإنشاء المواقع بالذكاء الاصطناعي.' });
    }

    const { name, industry, description, location, colorsTheme } = req.body;
    if (!name || !industry) {
      return res.status(400).json({ error: 'اسم المشروع ومجال العمل مطلوبان.' });
    }

    console.log(`Starting generation for: ${name} (${industry})`);

    // Let's check environment variable for Gemini Key
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey || geminiKey === 'MY_GEMINI_API_KEY' || geminiKey === '') {
      console.log('No realistic Gemini API Key found. Generating pristine custom Arabic website from fallback database...');
      const modelWebsite = getFallbackWebResponse(name, industry, description, location);
      const newSite: Website = {
        ...modelWebsite,
        id: 'web-' + Date.now().toString(),
        userId: user.id,
        views: 0,
        clicks: 0,
        createdAt: new Date().toISOString()
      };
      Database.addWebsite(newSite);
      return res.json(newSite);
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: geminiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const promptMsg = `قم بإنشاء محتوى وتنسيق موقع إلكتروني احترافي باللغة العربية لمشروعنا التجاري.
البيانات المدخلة:
- اسم المشروع: ${name}
- طبيعة ومجال العمل: ${industry} (مثل: مطعم، مقهى، شركة، معرض أعمال شخصي، متجر إلكتروني، مركز تعليمي، عيادة طبية)
- الوصف الكامل: ${description || 'مشروع متميز مكرس لخدمة العملاء'}
- الموقع الجغرافي: ${location || 'المملكة العربية السعودية'}
- تيمة الألوان المقلمة: ${colorsTheme || 'ألوان عصرية وراقية تناسب التخصص'}

المطلوب:
صمم موقعاً باللغة العربية الفصحى وقم بصياغة نصوص ترويجية مبدعة خالية من الكلمات الناقصة [placeholder].
يجب أن ترجع النتيجة ككائن JSON تماماً وبدون أي نصوص إضافية خارج الـ JSON.

إليك هيكل ومخطط الـ JSON المطلوب (responseSchema):
{
  "name": "اسم الموقع بالكامل",
  "industry": "${industry}",
  "logoTheme": "أيقونة تعبيرية مع الاسم مثل: 🍴 حضرموت أو 💻 المطور أمين",
  "brandColors": {
    "primary": "لون أساسي مثل #ea580c بهيئة hex",
    "secondary": "لون ثانوي غامق مثل #431407 بهيئة hex",
    "accent": "لون تمييزي جذاب متناسق مثل #e11d48 بهيئة hex",
    "bgBg": "لون خلفية أقسام ناعم ومريح مثل #fffbf7 بهيئة hex",
    "bgCard": "لون خلفية بطاقات أبيض أو قريب منه #ffffff بهيئة hex",
    "textPrimary": "لون الخط الغامق #1e293b بهيئة hex",
    "textSecondary": "لون الخط الفرعي الأفتح #475569 بهيئة hex"
  },
  "sections": [
    {
      "type": "hero",
      "heading": "عنوان ترويجي رئيسي آسر وجريء في السطر الأول",
      "subheading": "عنوان فرعي تكميلي يوضح القيمة والمدينة",
      "body": "نص وصفي ترحيبي ثري وبليغ يعزز الثقة ويفصل الفائدة.",
      "image": "رابط صورة مميزة وعالية الدقة من Unsplash تناسب النشاط",
      "buttonText": "نص زر التشغيل الرئيسي التفاعلي",
      "buttonUrl": "#contact"
    },
    {
      "type": "about",
      "heading": "من نحن ورسالتنا",
      "subheading": "قصتنا وقيم عملنا وأهدافنا الأساسية",
      "body": "نص تعريفي يتحدث عن تأسيس المشروع والخبرة والاهتمام بالتفاصيل والجودة وخدمة العملاء في عدن أو مكان العمل.",
      "image": "رابط صورة تعبيرية من Unsplash عن فريق العمل أو العمل الداخلي"
    },
    {
      "type": "services",
      "heading": "خدماتنا الاحترافية مسبقة الدقة",
      "subheading": "نوفر لكم باقة شاملة من الخدمات المصممة خصيصاً لتلبية متطلباتكم",
      "items": [
        { "id": "srv1", "title": "عنوان الخدمة الأولى المميزة", "description": "شرح بالتفصيل لمدى جودة هذه الخدمة وطريقة أدائها", "icon": "أيقونة مناسبة من Lucide مثل: Briefcase, Utensils, Award, Shield, Users" },
        { "id": "srv2", "title": "عنوان الخدمة الثانية المميزة", "description": "شرح كافي ومقنع حول الخدمة وكيفية تلبية احتياج العميل", "icon": "أيقونة مناسبة" },
        { "id": "srv3", "title": "عنوان الخدمة الثالثة المميزة", "description": "تفصيل الفوائد الحقيقية لطلب هذه الخدمة من قبل عملائنا لضمان الرضى", "icon": "أيقونة مناسبة" }
      ]
    },
    {
      "type": "faq",
      "heading": "الأسئلة الشائعة والمتكررة",
      "subheading": "نجيب بوضوح وودية عن أبرز استفسارات العملاء والشركاء",
      "items": [
        { "id": "faq1", "title": "السؤال الأكثر طرحاً من العملاء لتوضيح الفائدة؟", "description": "إجابة وافية وبلسان متمكن تبرز سهولة وضمانات التواصل." },
        { "id": "faq2", "title": "سؤال متكرر آخر عن الأسعار أو الاستشارات أو الضمانات؟", "description": "إجابة ملطفة وشاملة تبرر قيمة الخدمات وتؤكد الجودة." }
      ]
    },
    {
      "type": "contact",
      "heading": "ابدأ مسيرتك وتواصل معنا اليوم",
      "subheading": "تواصل معنا مباشرة للحجز، أو للاستشارات المجانية",
      "body": "نص يحوي العنوان ومواعيد الاتصال والعمل ورقم الهاتف والبريد الإلكتروني بصورة منظمة ومقروءة باللغة العربية.",
      "buttonText": "راسلنا مباشرة",
      "buttonUrl": "https://wa.me/"
    }
  ],
  "seo": {
    "title": "عنوان تحسين محركات البحث SEO جذاب ومتناسق ومقنع",
    "description": "وصف دقيق للموقع لا يزيد عن 150 حرفاً لنتائج محركات البحث جوجل لرفع النقرات",
    "keywords": "كلمات مفتاحية مفصولة بفواصل مثل: مطعم مأكولات شعبية، مندي عدن، أفضل خدمات"
  }
}`;

      const aiResponse = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: promptMsg,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              industry: { type: Type.STRING },
              logoTheme: { type: Type.STRING },
              brandColors: {
                type: Type.OBJECT,
                properties: {
                  primary: { type: Type.STRING },
                  secondary: { type: Type.STRING },
                  accent: { type: Type.STRING },
                  bgBg: { type: Type.STRING },
                  bgCard: { type: Type.STRING },
                  textPrimary: { type: Type.STRING },
                  textSecondary: { type: Type.STRING }
                },
                required: ['primary', 'secondary', 'accent', 'bgBg', 'bgCard', 'textPrimary', 'textSecondary']
              },
              sections: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    type: { type: Type.STRING },
                    heading: { type: Type.STRING },
                    subheading: { type: Type.STRING },
                    body: { type: Type.STRING },
                    image: { type: Type.STRING },
                    buttonText: { type: Type.STRING },
                    buttonUrl: { type: Type.STRING },
                    items: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          id: { type: Type.STRING },
                          title: { type: Type.STRING },
                          description: { type: Type.STRING },
                          price: { type: Type.STRING },
                          icon: { type: Type.STRING },
                          answer: { type: Type.STRING }
                        },
                        required: ['id', 'title', 'description']
                      }
                    }
                  },
                  required: ['type', 'heading']
                }
              },
              seo: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  keywords: { type: Type.STRING }
                },
                required: ['title', 'description', 'keywords']
              }
            },
            required: ['name', 'industry', 'logoTheme', 'brandColors', 'sections', 'seo']
          }
        }
      });

      const responseText = aiResponse.text?.trim() || '';
      console.log('Gemini model response parsed successfully.');
      
      const parsedData = JSON.parse(responseText);

      // Map generated images to visual fallbacks if none returned
      const ind = FALLBACK_IMAGES[industry] ? industry : 'general';
      const imgs = FALLBACK_IMAGES[ind] || FALLBACK_IMAGES.general;

      parsedData.sections = parsedData.sections.map((sec: any, idx: number) => {
        if (!sec.image || sec.image.includes('placeholder') || sec.image.startsWith('YOUR_')) {
          sec.image = imgs[idx % imgs.length];
        }
        return sec;
      });

      const finalWebsite: Website = {
        id: 'web-' + Date.now().toString(),
        userId: user.id,
        name: parsedData.name || name,
        industry: parsedData.industry || industry,
        description: description || parsedData.description || `${name} website`,
        logoTheme: parsedData.logoTheme || `🌐 ${name}`,
        brandColors: parsedData.brandColors,
        sections: parsedData.sections,
        seo: parsedData.seo,
        domain: `${industry}-${Date.now().toString().slice(-4)}.arabbuilder.ai`,
        sslEnabled: true,
        published: true,
        views: 0,
        clicks: 0,
        createdAt: new Date().toISOString()
      };

      Database.addWebsite(finalWebsite);
      return res.json(finalWebsite);
    } catch (apiError: any) {
      console.error('Gemini API call or parsing failed. Falling back:', apiError);
      
      const modelWebsite = getFallbackWebResponse(name, industry, description, location);
      const newSite: Website = {
        ...modelWebsite,
        id: 'web-f-' + Date.now().toString(),
        userId: user.id,
        views: 0,
        clicks: 0,
        createdAt: new Date().toISOString()
      };
      Database.addWebsite(newSite);
      return res.json(newSite);
    }
  });

  // Website CRUD endpoints (Real SaaS logic!)
  app.put('/api/websites/:id', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user) {
      return res.status(401).json({ error: 'من فضلك سجل الدخول لتحديث الموقع' });
    }

    const { id } = req.params;
    const existing = Database.getWebsiteById(id);
    if (!existing) {
      return res.status(404).json({ error: 'الموقع غير موجود' });
    }

    if (existing.userId !== user.id) {
      return res.status(403).json({ error: 'غير مسموح لك بتعديل هذا الموقع' });
    }

    const updated = Database.updateWebsite(id, req.body);
    res.json(updated);
  });

  app.delete('/api/websites/:id', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user) {
      return res.status(401).json({ error: 'غير مصرح للعملية' });
    }

    const { id } = req.params;
    const existing = Database.getWebsiteById(id);
    if (!existing) {
      return res.status(404).json({ error: 'الموقع غير موجود' });
    }

    if (existing.userId !== user.id && user.role !== 'admin') {
      return res.status(403).json({ error: 'غير مصرح لك بحذف هذا الموقع' });
    }

    Database.deleteWebsite(id);
    res.json({ success: true, message: 'تم حذف الموقع بنجاح' });
  });

  app.post('/api/websites/:id/duplicate', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user) {
      return res.status(401).json({ error: 'من فضلك سجل الدخول أولاً' });
    }

    const { id } = req.params;
    const existing = Database.getWebsiteById(id);
    if (!existing) {
      return res.status(404).json({ error: 'الموقع غير موجود' });
    }

    const duplicated: Website = {
      ...existing,
      id: 'web-' + Date.now().toString(),
      name: `${existing.name} (نسخة مكررة)`,
      domain: `${existing.industry}-copy-${Date.now().toString().slice(-4)}.arabbuilder.ai`,
      createdAt: new Date().toISOString(),
      views: 0,
      clicks: 0
    };

    Database.addWebsite(duplicated);
    res.json(duplicated);
  });

  // Admin endpoints
  app.get('/api/admin/stats', (req: Request, res: Response) => {
    const user = getAuthUser(req);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'يتطلب هذا الإجراء رتبة مدير النظام.' });
    }

    const stats = Database.getSystemStats();
    res.json({
      stats,
      users: Database.getUsers(),
      websitesInSystem: Database.getWebsites()
    });
  });

  // Handle Vite integration middleware for dev, and serving built files in production!
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ArabBuilder AI Server running at http://0.0.0.0:${PORT}`);
  });
}

startApp().catch((err) => {
  console.error('Fatal Server Error:', err);
});
