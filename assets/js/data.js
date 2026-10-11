/* =========================================================
   Dina Caftan by Basma: settings, catalogue, stories, translations.
   Edit this file to change contact details, products or texts.
   ========================================================= */

window.DC = {};

DC.config = {
  whatsapp: "212717006105",          // from the Google Maps listing
  phoneDisplay: "07 17 00 61 05",
  phoneTel: "+212717006105",
  hours: { open: 9, close: 23 },     // Google Maps shows 09:00–23:00 (confirm other days with the boutique)
  timeZone: "Africa/Casablanca",
  mapsPlace: "https://maps.google.com/?cid=18354249122765347192",
  mapsDirections: "https://www.google.com/maps/dir/?api=1&destination=33.2285448,-8.5242871",
  mapEmbed: "https://maps.google.com/maps?q=33.2285448,-8.5242871&z=17&output=embed",
  social: { instagram: "", facebook: "", tiktok: "" } // add the boutique's links when available
};

DC.categories = {
  caftan:   { fr: "Caftans", ar: "قفاطن", one: { fr: "Caftan", ar: "قفطان" } },
  takchita: { fr: "Takchitas", ar: "تكشيطات", one: { fr: "Takchita", ar: "تكشيطة" } },
  jellaba:  { fr: "Jellabas & Abayas", ar: "جلابات وعبايات", one: { fr: "Jellaba", ar: "جلابة" } },
  enfant:   { fr: "Enfants", ar: "أطفال", one: { fr: "Enfant", ar: "أطفال" } }
};

DC.sizes = {
  adult: ["S", "M", "L", "XL", "XXL", "custom"],
  kids: ["4", "6", "8", "10", "12"]
};

// Demo catalogue: placeholder photos (Pexels, free licence) until the boutique's own photos arrive.
// Prices are "à partir de" (starting from). badge: bestseller | new | bride | winter
DC.products = [
  {
    id: "velours-royal", cat: "caftan", price: 2450, badge: "bestseller", isNew: true, order: 1,
    name: { fr: "Caftan Velours Royal", ar: "قفطان المخمل الملكي" },
    fabric: { fr: "Velours bleu roi · broderie fil d’or", ar: "مخمل أزرق ملكي · طرز بخيط ذهبي" },
    desc: {
      fr: "Un velours profond rehaussé de broderies dorées faites main. Une pièce noble pour vos soirées, l’Aïd et les grandes occasions.",
      ar: "مخمل فاخر مزين بطرز ذهبي يدوي. قطعة راقية لسهراتك وللعيد وللمناسبات الكبيرة."
    }
  },
  {
    id: "takchita-emeraude", cat: "takchita", price: 3900, badge: "bride", isNew: true, order: 2,
    name: { fr: "Takchita Émeraude", ar: "تكشيطة الزمرد" },
    fabric: { fr: "Mousseline & perlage doré · mdamma assortie", ar: "موسلين وترصيع ذهبي · مضمة متناسقة" },
    desc: {
      fr: "Deux pièces brodées et perlées à la main, avec sa ceinture mdamma. Le choix idéal pour la mariée et ses proches.",
      ar: "تكشيطة من قطعتين مطرزة ومرصعة باليد مع المضمة ديالها. الاختيار المثالي للعروس وللعائلة."
    }
  },
  {
    id: "lalla-violette", cat: "caftan", price: 2200, badge: "new", isNew: true, order: 3,
    name: { fr: "Caftan Lalla Violette", ar: "قفطان لالة البنفسجي" },
    fabric: { fr: "Velours prune · broderie dorée main", ar: "مخمل بنفسجي · طرز ذهبي يدوي" },
    desc: {
      fr: "Coupe fluide, velours prune et arabesques dorées : l’élégance intemporelle du caftan fassi.",
      ar: "قصة انسيابية، مخمل بنفسجي ونقوش ذهبية: أناقة القفطان الفاسي اللي ما كتبلاش."
    }
  },
  {
    id: "caftan-perle", cat: "caftan", price: 2650, badge: "new", isNew: true, order: 4,
    name: { fr: "Caftan Perle", ar: "قفطان اللؤلؤة" },
    fabric: { fr: "Crêpe blanc cassé · broderie dorée", ar: "كريب أبيض · طرز ذهبي" },
    desc: {
      fr: "Tout en douceur : un blanc perle et des broderies dorées délicates, parfait pour les fiançailles.",
      ar: "نعومة ورقة: أبيض لؤلؤي وطرز ذهبي رقيق، مثالي للخطوبة."
    }
  },
  {
    id: "sabra-ivoire", cat: "caftan", price: 2800, badge: "", isNew: false, order: 5,
    name: { fr: "Caftan Sabra Ivoire", ar: "قفطان الصبرة العاجي" },
    fabric: { fr: "Crêpe ivoire · broderie sabra multicolore", ar: "كريب عاجي · طرز بالصبرة متعدد الألوان" },
    desc: {
      fr: "Motifs géométriques brodés en fil de sabra et ceinture dorée : une pièce lumineuse et festive.",
      ar: "زخارف هندسية مطرزة بخيط الصبرة مع حزام ذهبي: قطعة مشرقة وكلها فرحة."
    }
  },
  {
    id: "sauge-brode", cat: "caftan", price: 1950, badge: "new", isNew: true, order: 6,
    name: { fr: "Caftan Sauge Brodé", ar: "قفطان أخضر مطرز" },
    fabric: { fr: "Crêpe vert sauge · ceinture brodée", ar: "كريب أخضر هادئ · حزام مطرز" },
    desc: {
      fr: "Un vert doux et moderne, des broderies florales et une ceinture assortie pour une allure raffinée.",
      ar: "لون أخضر هادئ وعصري، طرز بالورود وحزام متناسق لإطلالة راقية."
    }
  },
  {
    id: "rouge-fes", cat: "takchita", price: 3200, badge: "", isNew: false, order: 7,
    name: { fr: "Takchita Rouge Fès", ar: "تكشيطة فاس الحمراء" },
    fabric: { fr: "Brocart bordeaux · finitions sfifa", ar: "بروكار عنابي · تشطيب بالسفيفة" },
    desc: {
      fr: "Le rouge de Fès dans un brocart somptueux, finitions sfifa et aakad faites main.",
      ar: "الأحمر الفاسي فبروكار فاخر، مع سفيفة وعقاد بالخدمة اليدوية."
    }
  },
  {
    id: "satin-majorelle", cat: "jellaba", price: 1150, badge: "", isNew: false, order: 8,
    name: { fr: "Jellaba Satin Majorelle", ar: "جلابة ساتان ماجوريل" },
    fabric: { fr: "Satin bleu · sfifa & aakad dorés", ar: "ساتان أزرق · سفيفة وعقاد ذهبية" },
    desc: {
      fr: "Le bleu Majorelle sur un satin fluide : une jellaba chic pour le quotidien comme pour les fêtes.",
      ar: "أزرق ماجوريل على ساتان ناعم: جلابة أنيقة للنهار وللمناسبات."
    }
  },
  {
    id: "jellaba-nuit", cat: "jellaba", price: 1350, badge: "winter", isNew: false, order: 9,
    name: { fr: "Jellaba Velours Nuit", ar: "جلابة المخمل الليلي" },
    fabric: { fr: "Velours bleu nuit · finitions main", ar: "مخمل أزرق ليلي · تشطيب يدوي" },
    desc: {
      fr: "Chaude et élégante, en velours bleu nuit avec capuche et finitions faites main.",
      ar: "دافئة وأنيقة، من المخمل الأزرق الليلي بالقب وتشطيب يدوي."
    }
  },
  {
    id: "abaya-sable", cat: "jellaba", price: 990, badge: "", isNew: false, order: 10,
    name: { fr: "Abaya Sable Brodée", ar: "عباية رملية مطرزة" },
    fabric: { fr: "Crêpe sable · manches brodées", ar: "كريب رملي · أكمام مطرزة" },
    desc: {
      fr: "Une coupe ample et pudique, sublimée par des broderies florales sur les manches.",
      ar: "قصة واسعة ومحتشمة، كتزينها ورود مطرزة على الأكمام."
    }
  },
  {
    id: "mini-lalla", cat: "enfant", price: 890, badge: "new", isNew: true, order: 11, kids: true,
    name: { fr: "Caftan Mini Lalla", ar: "قفطان لالة الصغيرة" },
    fabric: { fr: "Satin blanc · broderie dorée · 4 à 12 ans", ar: "ساتان أبيض · طرز ذهبي · من 4 إلى 12 سنة" },
    desc: {
      fr: "Pour les petites princesses : un caftan blanc et or, confortable et brodé avec soin.",
      ar: "للأميرات الصغيرات: قفطان أبيض وذهبي، مريح ومطرز بعناية."
    }
  }
];

// Story circles at the top of the page (Instagram-style)
DC.stories = [
  { id: "boutique", title: { fr: "Boutique", ar: "المحل" }, thumb: "assets/img/store/thumb.webp",
    items: [
      { img: "assets/img/store/facade-hd.webp", cap: { fr: "Dina Caftan by Basma", ar: "دينا قفطان" }, sub: { fr: "Centre El Khalil, Av. Khalil Jabran · El Jadida", ar: "مركز الخليل، شارع خليل جبران · الجديدة" }, cta: "maps" },
      { img: "assets/img/store/vitrine-hd.webp", cap: { fr: "Notre vitrine", ar: "الفيترينة ديالنا" }, sub: { fr: "Velours, brocart et broderies : venez essayer", ar: "مخمل، بروكار وطرز: مرحبا بيك تجربي" }, cta: "wa" },
      { img: "assets/img/store/interieur.webp", cap: { fr: "Bienvenue chez nous", ar: "مرحبا بيك عندنا" }, sub: { fr: "Ouvert tous les jours · 09h – 23h", ar: "مفتوح كل يوم · من 09:00 حتى 23:00" }, cta: "maps" },
      { img: "assets/img/store/facade-2.webp", cap: { fr: "Av. Khalil Jabran", ar: "شارع خليل جبران" }, sub: { fr: "À côté du Centre dentaire Al Khalil", ar: "حدا مركز طب الأسنان الخليل" }, cta: "maps" }
    ] },
  { id: "new", title: { fr: "Nouveautés", ar: "جديد" }, thumb: "assets/img/p/velours-royal-400.webp",
    products: ["velours-royal", "takchita-emeraude", "lalla-violette", "caftan-perle", "mini-lalla"] },
  { id: "caftan", title: { fr: "Caftans", ar: "قفاطن" }, thumb: "assets/img/p/lalla-violette-400.webp",
    products: ["lalla-violette", "sabra-ivoire", "sauge-brode", "caftan-perle", "velours-royal"] },
  { id: "takchita", title: { fr: "Mariée", ar: "العروس" }, thumb: "assets/img/p/takchita-emeraude-400.webp",
    products: ["takchita-emeraude", "rouge-fes"], details: true },
  { id: "jellaba", title: { fr: "Jellabas", ar: "جلابات" }, thumb: "assets/img/p/satin-majorelle-400.webp",
    products: ["satin-majorelle", "jellaba-nuit", "abaya-sable"] },
  { id: "enfant", title: { fr: "Enfants", ar: "أطفال" }, thumb: "assets/img/p/mini-lalla-400.webp",
    products: ["mini-lalla"], details: true },
  { id: "surmesure", title: { fr: "Sur mesure", ar: "حسب الطلب" }, thumb: "assets/img/cat/surmesure.webp",
    items: [
      { img: "assets/img/p/sabra-ivoire-d.webp", cap: { fr: "Votre caftan, à vos mesures", ar: "القفطان ديالك، على قدك" }, sub: { fr: "Modèle, tissu et finitions au choix", ar: "اختاري الموديل، الثوب والتشطيب" }, cta: "rdv" },
      { img: "assets/img/p/abaya-sable-d.webp", cap: { fr: "Broderies faites main", ar: "طرز يدوي" }, sub: { fr: "Prise de mesures en boutique", ar: "أخذ القياسات فالمحل" }, cta: "rdv" }
    ] }
];

// Interface texts (fr / ar)
DC.t = {
  // meta & header
  docTitle: { fr: "Dina Caftan by Basma · Caftans & Takchitas à El Jadida", ar: "دينا قفطان · قفاطن وتكشيطات فالجديدة" },
  skip: { fr: "Aller au contenu", ar: "انتقل إلى المحتوى" },
  catCaftan: { fr: "Caftans", ar: "قفاطن" },
  catTakchita: { fr: "Takchitas", ar: "تكشيطات" },
  catJellaba: { fr: "Jellabas", ar: "جلابات" },
  catEnfant: { fr: "Enfants", ar: "أطفال" },
  ann0: { fr: "Centre El Khalil, Av. Khalil Jabran · El Jadida", ar: "مركز الخليل، شارع خليل جبران · الجديدة" },
  heroLoc: { fr: "Av. Khalil Jabran, El Jadida", ar: "شارع خليل جبران، الجديدة" },
  heroStoreText: { fr: "Caftans, takchitas et jellabas brodés main. Venez essayer en boutique, tous les jours de 9h à 23h.", ar: "قفاطن، تكشيطات وجلابات مطرزة باليد. مرحبا بيك تجربي فالمحل، كل يوم من 9 الصباح حتى 11 الليل." },
  storeInside: { fr: "L’intérieur", ar: "من الداخل" },
  ann1: { fr: "Livraison partout au Maroc", ar: "التوصيل لجميع مدن المغرب" },
  ann2: { fr: "Commande simple sur WhatsApp", ar: "الطلب ساهل عبر واتساب" },
  ann3: { fr: "Essayage & sur mesure en boutique", ar: "التجربة والخياطة حسب الطلب فالمحل" },
  menu: { fr: "Menu", ar: "القائمة" },
  openMenu: { fr: "Ouvrir le menu", ar: "فتح القائمة" },
  langSwitch: { fr: "Passer en arabe", ar: "Passer en français" },
  home: { fr: "Accueil", ar: "الرئيسية" },
  navCollection: { fr: "Collection", ar: "المجموعة" },
  navUniverse: { fr: "Univers", ar: "الأقسام" },
  navBespoke: { fr: "Sur mesure", ar: "حسب الطلب" },
  navStore: { fr: "Boutique", ar: "المحل" },
  navFaq: { fr: "Questions", ar: "أسئلة" },
  favorites: { fr: "Favoris", ar: "المفضلة" },
  cart: { fr: "Panier", ar: "السلة" },
  order: { fr: "Commander", ar: "اطلبي" },
  close: { fr: "Fermer", ar: "إغلاق" },

  // hero
  h1Eyebrow: { fr: "Collection 2026", ar: "مجموعة 2026" },
  h1Title: { fr: "L’élégance du caftan <em>marocain</em>", ar: "أناقة القفطان <em>المغربي</em>" },
  h1Text: { fr: "Broderies faites main et tissus nobles, signés Basma à El Jadida.", ar: "طرز يدوي وأثواب راقية، بلمسة بسمة فالجديدة." },
  h1Cta: { fr: "Découvrir", ar: "اكتشفي" },
  h2Eyebrow: { fr: "Spécial mariée", ar: "خاص بالعروس" },
  h2Title: { fr: "Des takchitas <em>de rêve</em>", ar: "تكشيطات <em>الأحلام</em>" },
  h2Text: { fr: "Perlage, sfifa et mdamma assortie pour votre grand jour.", ar: "ترصيع، سفيفة ومضمة متناسقة لنهارك الكبير." },
  h2Cta: { fr: "Voir les takchitas", ar: "شوفي التكشيطات" },
  h3Eyebrow: { fr: "El Jadida", ar: "الجديدة" },
  h3Title: { fr: "Venez <em>essayer</em> en boutique", ar: "زوري المحل <em>وجربي</em>" },
  h3Text: { fr: "Centre El Khalil, Av. Khalil Jabran. Ouvert tous les jours.", ar: "مركز الخليل، شارع خليل جبران. مفتوح كل يوم." },
  h3Cta: { fr: "Itinéraire", ar: "الطريق" },
  slide: { fr: "Diapositive", ar: "الشريحة" },

  // perks
  perk1: { fr: "Broderie faite main", ar: "طرز يدوي" },
  perk2: { fr: "Sur mesure", ar: "خياطة حسب الطلب" },
  perk3: { fr: "Livraison au Maroc", ar: "توصيل لكل المغرب" },
  perk4: { fr: "Commande WhatsApp", ar: "الطلب بواتساب" },
  perk5: { fr: "Essayage en boutique", ar: "التجربة فالمحل" },

  // sections
  newEyebrow: { fr: "Fraîchement arrivés", ar: "وصل حديثا" },
  newTitle: { fr: "Nouveautés", ar: "الجديد" },
  seeAll: { fr: "Tout voir", ar: "شوفي الكل" },
  uniEyebrow: { fr: "Nos univers", ar: "الأقسام ديالنا" },
  uniTitle: { fr: "Une pièce pour chaque occasion", ar: "لكل مناسبة لبستها" },
  catCaftanSub: { fr: "Velours, crêpe & broderie", ar: "مخمل، كريب وطرز" },
  catTakchitaSub: { fr: "Perlage & mdamma", ar: "ترصيع ومضمة" },
  catJellabaSub: { fr: "Chic au quotidien", ar: "أناقة كل يوم" },
  catEnfantSub: { fr: "Pour les petites princesses", ar: "للأميرات الصغيرات" },
  bespokeBanner: { fr: "Créez votre caftan <em>sur mesure</em>", ar: "صممي قفطانك <em>على قدك</em>" },
  bespokeBannerSub: { fr: "Modèle, tissu, finitions : on s’occupe de tout.", ar: "الموديل، الثوب والتشطيب: كلشي علينا." },
  colEyebrow: { fr: "La collection", ar: "المجموعة" },
  colTitle: { fr: "Toutes nos pièces", ar: "جميع القطع" },
  all: { fr: "Tout", ar: "الكل" },
  sortLabel: { fr: "Trier", ar: "ترتيب" },
  sortFeatured: { fr: "Sélection", ar: "مختارات" },
  sortAsc: { fr: "Prix croissant", ar: "الثمن: من الأقل" },
  sortDesc: { fr: "Prix décroissant", ar: "الثمن: من الأعلى" },
  countOne: { fr: "1 pièce", ar: "قطعة واحدة" },
  countMany: { fr: "{n} pièces", ar: "{n} قطع" },
  catalogQ: { fr: "Une couleur ou une taille en particulier ?", ar: "كتقلبي على لون ولا مقاس معين؟" },
  catalogCta: { fr: "Demander le catalogue", ar: "طلبي الكاتالوغ" },

  promoEyebrow: { fr: "Saison des mariages 2026", ar: "موسم الأعراس 2026" },
  promoTitle: { fr: "Réservez votre tenue <em>dès maintenant</em>", ar: "حجزي لبستك <em>من دابا</em>" },
  promoText: { fr: "Essayage privé en boutique, conseils personnalisés et retouches.", ar: "تجربة خاصة فالمحل، نصائح شخصية وتعديلات." },
  bookCta: { fr: "Prendre rendez-vous", ar: "حجزي موعد" },

  bespEyebrow: { fr: "Sur mesure", ar: "حسب الطلب" },
  bespTitle: { fr: "Le caftan de vos rêves, <em>à vos mesures</em>", ar: "قفطان أحلامك، <em>على قدك</em>" },
  bespText: { fr: "Choisissez le modèle, le tissu et les finitions : nous créons une pièce unique, ajustée à votre silhouette.", ar: "اختاري الموديل والثوب والتشطيب: نخدمو ليك قطعة فريدة، مفصلة على قدك." },
  step1: { fr: "Choix du modèle", ar: "اختيار الموديل" },
  step1t: { fr: "Inspirez-vous de nos créations ou apportez votre idée.", ar: "استلهمي من موديلاتنا ولا جيبي فكرتك." },
  step2: { fr: "Tissu & finitions", ar: "الثوب والتشطيب" },
  step2t: { fr: "Velours, crêpe, satin, brocart ; sfifa, aakad ou perlage.", ar: "مخمل، كريب، ساتان، بروكار؛ سفيفة، عقاد ولا ترصيع." },
  step3: { fr: "Prise de mesures", ar: "أخذ القياسات" },
  step3t: { fr: "En boutique, pour une coupe impeccable.", ar: "فالمحل، باش تجي القصة مضبوطة." },
  step4: { fr: "Essayage & retouches", ar: "التجربة والتعديلات" },
  step4t: { fr: "Un dernier essayage pour un tombé parfait.", ar: "تجربة أخيرة باش يجي اللبس مزيان." },

  storeEyebrow: { fr: "La boutique", ar: "المحل" },
  storeTitle: { fr: "Notre boutique à El Jadida", ar: "المحل ديالنا فالجديدة" },
  storeText: { fr: "Essayez nos pièces et laissez-vous conseiller dans notre boutique d’El Jadida.", ar: "جربي القطع ديالنا وخدي النصيحة فالمحل ديالنا فالجديدة." },
  storeFacade: { fr: "La façade", ar: "الواجهة" },
  storeWindow: { fr: "La vitrine", ar: "الفيترينة" },
  storeNew: { fr: "En vitrine", ar: "فالفيترينة" },
  address: { fr: "Adresse", ar: "العنوان" },
  addressText: { fr: "Centre El Khalil, Av. Khalil Jabran<br>El Jadida, Maroc", ar: "مركز الخليل، شارع خليل جبران<br>الجديدة، المغرب" },
  hoursLabel: { fr: "Horaires", ar: "أوقات العمل" },
  hoursText: { fr: "Tous les jours · 09h00 – 23h00", ar: "كل يوم · من 09:00 حتى 23:00" },
  phone: { fr: "Téléphone", ar: "الهاتف" },
  directions: { fr: "Itinéraire", ar: "الطريق" },
  call: { fr: "Appeler", ar: "اتصلي" },
  openNow: { fr: "Ouvert maintenant · ferme à {h}", ar: "مفتوح الآن · كيسد على {h}" },
  closedNow: { fr: "Fermé · ouvre à {h}", ar: "مسدود · كيحل على {h}" },
  mapTitle: { fr: "Centre El Khalil, El Jadida", ar: "مركز الخليل، الجديدة" },
  mapLoad: { fr: "Afficher la carte", ar: "بيني الخريطة" },
  mapFrame: { fr: "Carte : Dina Caftan à El Jadida", ar: "خريطة: دينا قفطان فالجديدة" },

  faqEyebrow: { fr: "Questions fréquentes", ar: "أسئلة متكررة" },
  faqTitle: { fr: "On vous répond", ar: "كنجاوبوك" },
  q1: { fr: "Comment passer commande ?", ar: "كيفاش ندير الطلب؟" },
  a1: { fr: "Ajoutez vos pièces au panier puis appuyez sur « Commander via WhatsApp » : votre commande nous arrive directement et nous confirmons avec vous la taille, la disponibilité et la livraison.", ar: "زيدي القطع للسلة ومن بعد ضغطي على «اطلبي عبر واتساب»: الطلب كيوصلنا مباشرة وكنأكدو معاك المقاس والتوفر والتوصيل." },
  q2: { fr: "Livrez-vous partout au Maroc ?", ar: "واش كتوصلو لكل المغرب؟" },
  a2: { fr: "Oui. Les délais et frais de livraison vous sont confirmés sur WhatsApp selon votre ville.", ar: "إيه. كنأكدو معاك مدة وثمن التوصيل فواتساب على حساب المدينة ديالك." },
  q3: { fr: "Puis-je essayer avant d’acheter ?", ar: "واش نقدر نجرب قبل ما نشري؟" },
  a3: { fr: "Bien sûr ! Passez en boutique, Centre El Khalil, Av. Khalil Jabran à El Jadida, tous les jours de 9h à 23h.", ar: "أكيد! دوزي للمحل فمركز الخليل، شارع خليل جبران فالجديدة، كل يوم من 9 الصباح حتى 11 الليل." },
  q4: { fr: "Proposez-vous le sur mesure ?", ar: "واش كتخدمو حسب الطلب؟" },
  a4: { fr: "Oui : choisissez votre modèle, votre tissu et vos finitions, nous prenons vos mesures en boutique. Le délai dépend du modèle et vous est précisé lors du rendez-vous.", ar: "إيه: اختاري الموديل والثوب والتشطيب، وكناخدو القياسات فالمحل. المدة كتختالف على حساب الموديل وكنقولوها ليك فالموعد." },
  q5: { fr: "Les prix affichés sont-ils définitifs ?", ar: "واش الأثمنة نهائية؟" },
  a5: { fr: "Les prix sont indiqués « à partir de » : ils peuvent varier selon la taille, le tissu et les finitions.", ar: "الأثمنة مكتوبة «ابتداءً من»: يمكن تتبدل على حساب المقاس والثوب والتشطيب." },

  ctaAr: { fr: "مناسبة قريبة؟", ar: "Une occasion approche ?" },
  ctaTitle: { fr: "Une occasion approche ?", ar: "عندك مناسبة قريبة؟" },
  ctaText: { fr: "Mariage, fiançailles, Aïd… Écrivez-nous : nous vous aidons à trouver la pièce parfaite.", ar: "عرس، خطوبة، عيد… كتبي لينا ونعاونوك تلقاي اللبسة اللي تليق بيك." },
  ctaBtn: { fr: "Discuter sur WhatsApp", ar: "تواصلي معانا فواتساب" },

  footTag: { fr: "Caftans, takchitas et jellabas à El Jadida. Tradition marocaine, élégance contemporaine.", ar: "قفاطن، تكشيطات وجلابات فالجديدة. أصالة مغربية بأناقة عصرية." },
  footCol: { fr: "Collection", ar: "المجموعة" },
  footStore: { fr: "Boutique", ar: "المحل" },
  footFind: { fr: "Nous trouver", ar: "فين كاينين" },
  rights: { fr: "Tous droits réservés.", ar: "جميع الحقوق محفوظة." },
  madeIn: { fr: "صنع بحب في الجديدة", ar: "Fait avec amour à El Jadida" },

  // product & cart
  from: { fr: "À partir de", ar: "ابتداءً من" },
  addToCart: { fr: "Ajouter au panier", ar: "زيدي للسلة" },
  quickAdd: { fr: "Ajouter {name} au panier", ar: "زيدي {name} للسلة" },
  addFav: { fr: "Ajouter aux favoris", ar: "زيدي للمفضلة" },
  removeFav: { fr: "Retirer des favoris", ar: "حيدي من المفضلة" },
  view: { fr: "Voir {name}", ar: "شوفي {name}" },
  share: { fr: "Partager", ar: "شاركي" },
  size: { fr: "Taille", ar: "المقاس" },
  sizeCustom: { fr: "Sur mesure", ar: "على القد" },
  sizeTbd: { fr: "À confirmer", ar: "غادي نحددو" },
  years: { fr: "ans", ar: "سنوات" },
  qty: { fr: "Quantité", ar: "الكمية" },
  less: { fr: "Diminuer", ar: "نقصي" },
  more: { fr: "Augmenter", ar: "زيدي" },
  remove: { fr: "Retirer", ar: "حيدي" },
  pInfo1: { fr: "Livraison partout au Maroc", ar: "توصيل لجميع مدن المغرب" },
  pInfo2: { fr: "Essayage possible en boutique", ar: "التجربة ممكنة فالمحل" },
  pInfo3: { fr: "Retouches & ajustements", ar: "تعديلات على قدك" },
  orderWa: { fr: "Commander", ar: "اطلبي" },
  cartTitle: { fr: "Votre panier", ar: "السلة ديالك" },
  cartEmpty: { fr: "Votre panier est vide", ar: "السلة خاوية" },
  cartEmptyText: { fr: "Ajoutez vos coups de cœur pour commander en un message.", ar: "زيدي القطع اللي عجباتك وطلبي برسالة وحدة." },
  favTitle: { fr: "Vos favoris", ar: "المفضلة ديالك" },
  favEmpty: { fr: "Aucun favori pour l’instant", ar: "ما كاين حتى قطعة فالمفضلة" },
  favEmptyText: { fr: "Touchez le cœur sur une pièce pour la retrouver ici.", ar: "ضغطي على القلب فشي قطعة باش تلقايها هنا." },
  browse: { fr: "Voir la collection", ar: "شوفي المجموعة" },
  total: { fr: "Total estimé", ar: "المجموع التقريبي" },
  yourName: { fr: "Prénom", ar: "الاسم" },
  yourCity: { fr: "Ville", ar: "المدينة" },
  optional: { fr: "facultatif", ar: "اختياري" },
  cartNote: { fr: "Nous confirmons taille, disponibilité et livraison avec vous sur WhatsApp.", ar: "كنأكدو معاك المقاس والتوفر والتوصيل فواتساب." },
  checkout: { fr: "Commander via WhatsApp", ar: "اطلبي عبر واتساب" },
  added: { fr: "{name} ajouté au panier", ar: "تزادت {name} للسلة" },
  favAdded: { fr: "Ajouté aux favoris", ar: "تزادت للمفضلة" },
  favRemoved: { fr: "Retiré des favoris", ar: "تحيدات من المفضلة" },
  linkCopied: { fr: "Lien copié", ar: "تنسخ الرابط" },

  // appointment
  rdvTitle: { fr: "Prendre rendez-vous", ar: "حجز موعد" },
  rdvText: { fr: "Remplissez ces infos : votre demande nous arrive sur WhatsApp.", ar: "عمري هاد المعلومات: الطلب ديالك كيوصلنا فواتساب." },
  rdvType: { fr: "Je souhaite", ar: "بغيت" },
  rdvTry: { fr: "Un essayage", ar: "نجرب" },
  rdvBespoke: { fr: "Du sur mesure", ar: "نفصل حسب الطلب" },
  rdvOccasion: { fr: "Occasion", ar: "المناسبة" },
  occWedding: { fr: "Mariage", ar: "عرس" },
  occEngagement: { fr: "Fiançailles", ar: "خطوبة" },
  occEid: { fr: "Aïd", ar: "عيد" },
  occHenna: { fr: "Henné", ar: "حناء" },
  occParty: { fr: "Soirée", ar: "سهرة" },
  occOther: { fr: "Autre", ar: "أخرى" },
  rdvDate: { fr: "Date souhaitée", ar: "التاريخ اللي بغيتي" },
  rdvMsg: { fr: "Message", ar: "رسالة" },
  rdvMsgPh: { fr: "Couleur, modèle, budget…", ar: "اللون، الموديل، الميزانية…" },
  rdvSend: { fr: "Envoyer sur WhatsApp", ar: "صيفطي فواتساب" },
  rdvNameErr: { fr: "Indiquez votre prénom.", ar: "كتبي الاسم ديالك." },

  // story viewer
  storyPrev: { fr: "Précédent", ar: "السابق" },
  storyNext: { fr: "Suivant", ar: "التالي" },
  storySee: { fr: "Voir la pièce", ar: "شوفي القطعة" },
  storyRdv: { fr: "Prendre rendez-vous", ar: "حجزي موعد" },
  stories: { fr: "Stories", ar: "القصص" },

  // badges
  badge_bestseller: { fr: "Best-seller", ar: "الأكثر طلبا" },
  badge_new: { fr: "Nouveau", ar: "جديد" },
  badge_bride: { fr: "Mariée", ar: "للعروس" },
  badge_winter: { fr: "Hiver", ar: "شتوي" },

  // WhatsApp messages
  waDefault: { fr: "Bonjour Dina Caftan, je souhaite avoir plus d’informations sur vos modèles.", ar: "السلام عليكم دينا قفطان، بغيت نعرف معلومات أكثر على الموديلات ديالكم." },
  waCatalog: { fr: "Bonjour Dina Caftan, je souhaite recevoir le catalogue complet de vos modèles.", ar: "السلام عليكم دينا قفطان، بغيت الكاتالوغ الكامل ديال الموديلات ديالكم." },
  waBook: { fr: "Bonjour Dina Caftan, je souhaite prendre rendez-vous en boutique.", ar: "السلام عليكم دينا قفطان، بغيت ناخد موعد فالمحل." },
  waProduct: { fr: "Bonjour Dina Caftan, je suis intéressée par « {name} » ({size}, {price}). Est-il disponible ?", ar: "السلام عليكم دينا قفطان، عجبني «{name}» ({size}، {price}). واش متوفر؟" },
  waOrderHead: { fr: "Bonjour Dina Caftan, je souhaite commander :", ar: "السلام عليكم دينا قفطان، بغيت نطلب:" },
  waOrderTotal: { fr: "Total estimé : {total}", ar: "المجموع التقريبي: {total}" },
  waOrderName: { fr: "Prénom : {v}", ar: "الاسم: {v}" },
  waOrderCity: { fr: "Ville : {v}", ar: "المدينة: {v}" },
  waOrderEnd: { fr: "Merci de me confirmer la disponibilité.", ar: "عافاكم أكدو ليا التوفر." },
  waRdvHead: { fr: "Bonjour Dina Caftan, je souhaite prendre rendez-vous.", ar: "السلام عليكم دينا قفطان، بغيت ناخد موعد." },
  waRdvName: { fr: "Prénom : {v}", ar: "الاسم: {v}" },
  waRdvType: { fr: "Objet : {v}", ar: "الغرض: {v}" },
  waRdvOcc: { fr: "Occasion : {v}", ar: "المناسبة: {v}" },
  waRdvDate: { fr: "Date souhaitée : {v}", ar: "التاريخ: {v}" },
  waRdvMsg: { fr: "Message : {v}", ar: "رسالة: {v}" },
  sizeLine: { fr: "taille {v}", ar: "المقاس {v}" },
  currency: { fr: "DH", ar: "درهم" }
};
