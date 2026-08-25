# دعوة زفاف — Wedding Invitation Website

موقع دعوة زفاف تفاعلي بطابع عربي إسلامي أنيق.

## كيف تُشغّل المشروع

افتح ملف `index.html` مباشرة في المتصفح، أو شغّل سيرفر ثابت على مجلد المشروع.

**ملاحظة:** الموقع يعمل على جميع الأجهزة (iPhone, Android, Windows, Mac) وأي حجم شاشة.

## تعديل البيانات

### اسم العروسة
في `index.html`، ابحث عن `data-bride-name`:
```html
<h1 class="hero__name" data-bride-name="العروسة">العروسة</h1>
```

### تاريخ الزفاف
في `js/countdown.js`، عدّل:
```javascript
var EVENT_DATE = new Date('2026-09-14T19:00:00+02:00');
```

### مكان الزفاف
في `index.html`، ابحث عن "نادي الهيئة العربية للتصنيع" وعدّل النص ورابط خرائط جوجل.

## تعديل الألوان
في `css/variables.css`:
```css
--ivory: #FFF8F0;       /* خلفية الصفحة */
--cream: #F5EDE0;       /* خلفية الكروت */
--gold: #C9A84C;        /* اللون الأساسي */
--burgundy: #6B2D3E;    /* لون داكن ثانوي */
--charcoal: #2C1810;    /* النصوص */
```

## تعديل الخطوط
في `index.html`، عدّل رابط Google Fonts ثم المتغيرات في `variables.css`.

## هيكل الملفات

```
wedding-invitation/
├── index.html
├── README.md
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── gate.css
│   ├── sections.css
│   └── animations.css
├── js/
│   ├── gate.js
│   ├── countdown.js
│   └── reveal-on-scroll.js
└── assets/
    ├── patterns/
    │   ├── islamic-pattern.svg
    │   ├── corner-ornament.svg
    │   └── divider.svg
    └── images/
```
