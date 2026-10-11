# Dina Caftan by Basma · دليل التبديل

السيت: **https://dina-caftan.netlify.app**

هاد الدليل كيشرح كيفاش تبدل أي حاجة فالسيت بلا Claude، من البيسي ولا من التيليفون.

---

## 1. شنو كاين فين

| الملف | شنو فيه |
|---|---|
| `assets/js/data.js` | **كلشي كيتبدل من هنا:** النمرة، الساعات، المنتجات، الأثمنة، النصوص بالفرنسية والعربية، روابط إنستغرام |
| `assets/img/p/` | تصاور المنتجات |
| `assets/img/store/` | تصاور المحل الحقيقية |
| `index.html` | الهيكل ديال الصفحة (نادرا ما غادي تحتاجو) |
| `assets/css/style.css` | الألوان والشكل |
| `assets/js/app.js` | البرمجة (ما تقيسوش) |

> **قاعدة ذهبية:** فـ `data.js` بدل غير اللي بين `" "` ولا الأرقام. ما تمسحش `"` ولا `,` ولا `{ }`. إلا مسحتي وحدة بالغلط، السيت كيولي خاوي (شوف رقم 7 باش ترجعو).

---

## 2. كيفاش تبدل من التيليفون

> هادي كتخدم غير إلا كان Netlify مربوط مع GitHub (شوف رقم 8).

1. حل `github.com/kaddarahamza0/dina-caftan` فـ Chrome.
2. دخل للملف اللي بغيتي، مثلا `assets` ← `js` ← `data.js`.
3. ضغط على القلم ✏️. إلا ما بانش: ⋮ ← **Site pour ordinateur**.
4. بدل، ومن بعد **Commit changes** ← **Commit changes**.
5. تسنى دقيقة وحل السيت.

---

## 3. النمرة، الساعات، الروابط

فالفوق ديال `data.js`:

```js
whatsapp: "212717006105",        // النمرة بلا 0 وبلا +، كتبدا بـ 212
phoneDisplay: "07 17 00 61 05",  // كيفاش كتبان فالسيت
phoneTel: "+212717006105",       // للاتصال
hours: { open: 9, close: 23 },   // كيتحسب بيها "مفتوح الآن / مسدود"
social: { instagram: "", facebook: "", tiktok: "" }
```

- **النمرة:** إلا بدلتيها، بدلها فالتلاتة بجوج.
- **الساعات:** إلا بدلتيها، بدل حتى النص `hoursText` (قلب عليه فنفس الملف).
- **الروابط:** حط الرابط بين `" "`، مثلا `instagram: "https://instagram.com/dinacaftan"`، والأيقونة كتبان بوحدها فالفوتر.

---

## 4. ثمن ولا سمية ديال منتج

قلب على المنتج فـ `data.js`، مثلا:

```js
id: "velours-royal", cat: "caftan", price: 2450, badge: "bestseller", isNew: true, order: 1,
name: { fr: "Caftan Velours Royal", ar: "قفطان المخمل الملكي" },
```

| الحقل | المعنى |
|---|---|
| `price` | الثمن بالدرهم، رقم بلا فراغ: `2450` |
| `name` / `fabric` / `desc` | السمية، الثوب، والوصف (فرنسية `fr` وعربية `ar`) |
| `badge` | `"bestseller"`، `"new"`، `"bride"`، `"winter"`، ولا `""` بلا شارة |
| `isNew` | `true` كيبان فـ "Nouveautés"، `false` لا |
| `cat` | `"caftan"`، `"takchita"`، `"jellaba"`، `"enfant"` |
| `order` | الترتيب فالمجموعة (1 هو الأول) |

---

## 5. تصويرة جديدة لمنتج (من التيليفون)

1. صيفط التصويرة لراسك فواتساب وحمّلها من تما. واتساب كيصغرها والسيت كيبقى سريع.
2. فـ GitHub: `assets` ← `img` ← `p` ← **Add file** ← **Upload files**.
3. سمّي التصويرة بلا فراغات وبلا حروف عربية، مثلا `caftan-rouge.jpg`. ومن بعد **Commit**.
4. فـ `data.js` زيد هاد السطر فالمنتج تحت `id: ...`:

```js
photo: "assets/img/p/caftan-rouge.jpg",
photo2: "assets/img/p/caftan-rouge-zoom.jpg",   // اختياري: تصويرة زوم على الطرز
```

> الأحسن تكون التصويرة طولية (عمودية)، والقفطان فالوسط.

---

## 6. زيد منتج جديد ولا حيد واحد

**تزيد:**
1. نسخ بلوك منتج كامل، من `{` حتى `},`.
2. لصقو تحت آخر منتج، ومن بعد بدل:
   - `id`: سمية جديدة بالحروف الصغار، بلا فراغ. مثلا `"caftan-rouge"`.
   - الثمن والسميات والوصف.
   - زيد `photo:` (شوف رقم 5).

**تحيد:** امسح البلوك ديالو كامل من `{` حتى `},`.

> المنتج اللي حيدتي، إلا كان فالستوريز (`DC.stories`)، حيد حتى الـ id ديالو من تما.

---

## 7. إلا تخسر السيت (رجوع فثواني)

1. app.netlify.com ← **dina-caftan** ← **Deploys**.
2. ضغط على النسخة اللي قبل (اللي كانت خدامة).
3. **Publish deploy**.

السيت كيرجع كيف كان. ومن بعد صلح الغلطة فـ GitHub (الملف ← **History** كيورّيك شنو تبدل).

---

## 8. الربط بين Netlify و GitHub (مرة وحدة)

> ✅ **الربط مدار.** أي تبديل فـ GitHub كيتنشر فالسيت بوحدو فدقيقة.

1. app.netlify.com ← **dina-caftan** ← **Project configuration** ← **Build & deploy** ← **Link repository**.
2. **GitHub** ← **Authorize** ← اختار `dina-caftan`.
3. Branch: `main`. خلي **Build command** و **Publish directory** خاويين.
4. **Deploy**.

من بعد هادشي، كل تبديل فـ GitHub كيتنشر بوحدو.

**بلا الربط:** بدل فالبيسي، ومن بعد فـ Netlify ← **Deploys** جر الدوسي `dina-caftan` كامل ولوحو فالخانة ديال drag & drop.

---

## 9. ملي توافق صاحبة المحل

- **باش يبان فـ Google:** فـ `index.html` امسح هاد السطر:
  `<meta name="robots" content="noindex, nofollow">`
- **الدومين:** سجّل دومين (`dinacaftan.ma` ولا `.com`) وربطو من Netlify ← **Domain management**.
- **التصاور:** بدل تصاور المنتجات (ستوك من Pexels) بالتصاور الحقيقية ديال السلعة ديالها.

---

## 10. الحسابات (حافظ عليهم)

- **GitHub `kaddarahamza0`:** فيه الكود. شعل Two-factor authentication وخزّن recovery codes برا البيسي.
- **Netlify:** الدخول ليه بـ GitHub. إلا ضاع GitHub، ضاع Netlify معاه.
