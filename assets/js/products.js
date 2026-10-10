/* =========================================================
   Store settings + product catalogue.
   Edit this file to change contact details or products.
   ========================================================= */

window.DC_CONFIG = {
  // WhatsApp number in international format, digits only (from the Google Maps listing)
  whatsapp: "212717006105",
  phoneDisplay: "07 17 00 61 05",
  hours: "Tous les jours · 09h00 – 23h00", // Google Maps shows Sat 09:00–23:00; other days to confirm
  mapsPlace: "https://maps.google.com/?cid=18354249122765347192",
  mapsDirections: "https://www.google.com/maps/dir/?api=1&destination=33.2285448,-8.5242871",
  social: {
    instagram: "#",
    facebook: "#",
    tiktok: "#"
  },
  currency: "DH"
};

// Demo catalogue: placeholder photos (Pexels, free licence) until the boutique's own photos arrive.
// cat: "caftan" | "takchita" | "jellaba"   ·   badgeStyle: "" | "dark" | "burgundy"
window.DC_PRODUCTS = [
  {
    id: "velours-royal",
    name: "Caftan Velours Royal",
    cat: "caftan",
    fabric: "Velours bleu roi, broderie fil d’or",
    price: 2450,
    badge: "Best-seller", badgeStyle: "dark",
    img: "assets/img/products/velours-royal.webp"
  },
  {
    id: "takchita-emeraude",
    name: "Takchita Émeraude",
    cat: "takchita",
    fabric: "Mousseline & perlage doré, mdamma assortie",
    price: 3900,
    badge: "Mariée", badgeStyle: "burgundy",
    img: "assets/img/products/takchita-emeraude.webp"
  },
  {
    id: "lalla-violette",
    name: "Caftan Lalla Violette",
    cat: "caftan",
    fabric: "Velours prune, broderie dorée faite main",
    price: 2200,
    badge: "Nouveau", badgeStyle: "",
    img: "assets/img/products/lalla-violette.webp"
  },
  {
    id: "sabra-ivoire",
    name: "Caftan Sabra Ivoire",
    cat: "caftan",
    fabric: "Crêpe ivoire, broderie sabra multicolore",
    price: 2800,
    badge: "", badgeStyle: "",
    img: "assets/img/products/sabra-blanc.webp"
  },
  {
    id: "sauge-brode",
    name: "Caftan Sauge Brodé",
    cat: "caftan",
    fabric: "Crêpe vert sauge, ceinture brodée",
    price: 1950,
    badge: "Nouveau", badgeStyle: "",
    img: "assets/img/products/sauge-brode.webp"
  },
  {
    id: "rouge-fes",
    name: "Takchita Rouge Fès",
    cat: "takchita",
    fabric: "Brocart bordeaux, finitions sfifa",
    price: 3200,
    badge: "", badgeStyle: "",
    img: "assets/img/products/rouge-fes.webp"
  },
  {
    id: "satin-majorelle",
    name: "Jellaba Satin Majorelle",
    cat: "jellaba",
    fabric: "Satin bleu, sfifa & aakad dorés",
    price: 1150,
    badge: "", badgeStyle: "",
    img: "assets/img/products/satin-majorelle.webp"
  },
  {
    id: "jellaba-nuit",
    name: "Jellaba Velours Nuit",
    cat: "jellaba",
    fabric: "Velours bleu nuit, finitions main",
    price: 1350,
    badge: "Hiver", badgeStyle: "dark",
    img: "assets/img/products/jellaba-nuit.webp"
  }
];
