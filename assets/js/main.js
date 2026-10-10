(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  var CONFIG = window.DC_CONFIG;
  var PRODUCTS = window.DC_PRODUCTS;
  var CAT_LABELS = { caftan: "Caftan", takchita: "Takchita", jellaba: "Jellaba" };
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var priceFmt = new Intl.NumberFormat("fr-FR");
  function formatPrice(n) { return priceFmt.format(n) + " " + CONFIG.currency; }
  function waLink(msg) {
    return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg || "Bonjour Dina Caftan, je souhaite avoir plus d’informations sur vos modèles.");
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Storage helpers (may be unavailable in private mode / file://)
  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
  }

  /* ---------- Contact links from config ---------- */
  $$("[data-wa]").forEach(function (a) { a.href = waLink(a.getAttribute("data-wa-msg")); });
  $$("[data-phone]").forEach(function (a) {
    a.href = "tel:+" + CONFIG.whatsapp;
    a.textContent = CONFIG.phoneDisplay;
  });
  $$("[data-hours]").forEach(function (el) { el.textContent = CONFIG.hours; });
  $$("[data-maps-dir]").forEach(function (a) { a.href = CONFIG.mapsDirections; });
  $$("[data-maps-place]").forEach(function (a) { a.href = CONFIG.mapsPlace; });
  $$("[data-social]").forEach(function (a) { a.href = CONFIG.social[a.getAttribute("data-social")] || "#"; });
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Header on scroll ---------- */
  var header = $(".header");
  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var menu = $("#mobile-menu");
  var menuBtn = $("[data-menu-open]");
  function openMenu() {
    menu.hidden = false;
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    $("[data-menu-close]").focus();
  }
  function closeMenu() {
    if (menu.hidden) return;
    menu.hidden = true;
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    menuBtn.focus();
  }
  menuBtn.addEventListener("click", openMenu);
  $("[data-menu-close]").addEventListener("click", closeMenu);
  $$("a", menu).forEach(function (a) { a.addEventListener("click", closeMenu); });

  /* ---------- Products ---------- */
  var grid = $("[data-products]");
  var wishlist = load("dc_wish", []);
  var currentFilter = "all";

  function productCard(p) {
    var wished = wishlist.indexOf(p.id) !== -1;
    var badge = p.badge
      ? '<span class="product__badge' + (p.badgeStyle ? " product__badge--" + p.badgeStyle : "") + '">' + escapeHtml(p.badge) + "</span>"
      : "";
    return (
      '<article class="product" data-cat="' + p.cat + '">' +
        '<div class="product__media">' +
          badge +
          '<button class="product__wish" type="button" data-wish="' + p.id + '" aria-pressed="' + wished + '" aria-label="Ajouter ' + escapeHtml(p.name) + ' aux favoris">' +
            '<span><svg class="ic"><use href="#i-heart"/></svg></span>' +
          "</button>" +
          '<img src="' + p.img + '" width="800" height="1000" alt="' + escapeHtml(p.name + ", " + p.fabric) + '" loading="lazy">' +
          '<button class="product__add" type="button" data-add="' + p.id + '">' +
            '<svg class="ic"><use href="#i-bag"/></svg><span class="product__add-label">Ajouter au panier</span>' +
          "</button>" +
        "</div>" +
        '<div class="product__info">' +
          '<span class="product__cat">' + CAT_LABELS[p.cat] + "</span>" +
          '<h3 class="product__name">' + escapeHtml(p.name) + "</h3>" +
          '<p class="product__fabric">' + escapeHtml(p.fabric) + "</p>" +
          '<p class="product__price"><small>À partir de</small>' + formatPrice(p.price) + "</p>" +
        "</div>" +
      "</article>"
    );
  }

  function renderProducts() {
    var list = PRODUCTS.filter(function (p) { return currentFilter === "all" || p.cat === currentFilter; });
    grid.innerHTML = list.map(productCard).join("");
  }

  function setFilter(filter) {
    currentFilter = filter;
    $$("[data-filter]").forEach(function (chip) {
      var active = chip.getAttribute("data-filter") === filter;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-selected", String(active));
    });
    renderProducts();
  }

  $$("[data-filter]").forEach(function (chip) {
    chip.addEventListener("click", function () { setFilter(chip.getAttribute("data-filter")); });
  });
  $$("[data-filter-link]").forEach(function (link) {
    link.addEventListener("click", function () { setFilter(link.getAttribute("data-filter-link")); });
  });

  grid.addEventListener("click", function (e) {
    var wishBtn = e.target.closest("[data-wish]");
    if (wishBtn) {
      var id = wishBtn.getAttribute("data-wish");
      var i = wishlist.indexOf(id);
      if (i === -1) { wishlist.push(id); toast("Ajouté à vos favoris"); } else { wishlist.splice(i, 1); toast("Retiré de vos favoris"); }
      wishBtn.setAttribute("aria-pressed", String(i === -1));
      save("dc_wish", wishlist);
      return;
    }
    var addBtn = e.target.closest("[data-add]");
    if (addBtn) {
      addToCart(addBtn.getAttribute("data-add"));
      addBtn.classList.add("is-added");
      setTimeout(function () { addBtn.classList.remove("is-added"); }, 1200);
    }
  });

  renderProducts();

  /* ---------- Cart ---------- */
  var cart = load("dc_cart", {}); // { productId: qty }
  var drawer = $("#cart");
  var overlay = $("[data-overlay]");
  var lastFocus = null;

  function byId(id) {
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i];
    return null;
  }
  function cartEntries() {
    return Object.keys(cart).map(function (id) { return { product: byId(id), qty: cart[id] }; })
      .filter(function (e) { return e.product && e.qty > 0; });
  }
  function cartCount() { return cartEntries().reduce(function (n, e) { return n + e.qty; }, 0); }
  function cartTotal() { return cartEntries().reduce(function (n, e) { return n + e.qty * e.product.price; }, 0); }

  function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    save("dc_cart", cart);
    renderCart(true);
    var p = byId(id);
    toast(p ? p.name + " ajouté au panier" : "Ajouté au panier");
  }
  function setQty(id, qty) {
    if (qty <= 0) delete cart[id]; else cart[id] = qty;
    save("dc_cart", cart);
    renderCart(false);
  }

  function renderCart(bump) {
    var entries = cartEntries();
    var count = cartCount();
    var countEl = $("[data-cart-count]");
    countEl.textContent = count;
    countEl.classList.toggle("has-items", count > 0);
    if (bump) { countEl.classList.remove("bump"); void countEl.offsetWidth; countEl.classList.add("bump"); }
    $("[data-cart-count-label]").textContent = count ? "(" + count + ")" : "";
    $("[data-cart-total]").textContent = formatPrice(cartTotal());

    var body = $("[data-cart-items]");
    if (!entries.length) {
      body.innerHTML =
        '<div class="cart-empty">' +
          '<svg class="ic"><use href="#i-bag"/></svg>' +
          "<strong>Votre panier est vide</strong>" +
          "<p>Découvrez nos caftans et takchitas et ajoutez vos coups de cœur.</p>" +
          '<a class="btn btn--outline btn--sm" href="#collection" data-cart-close>Voir la collection</a>' +
        "</div>";
    } else {
      body.innerHTML = entries.map(function (e) {
        var p = e.product;
        return (
          '<div class="cart-item">' +
            '<img src="' + p.img + '" alt="" width="76" height="95">' +
            "<div>" +
              "<h3>" + escapeHtml(p.name) + "</h3>" +
              "<p>" + formatPrice(p.price) + "</p>" +
              '<div class="qty">' +
                '<button type="button" data-qty="' + p.id + '" data-delta="-1" aria-label="Diminuer la quantité"><svg class="ic"><use href="#i-minus"/></svg></button>' +
                "<span>" + e.qty + "</span>" +
                '<button type="button" data-qty="' + p.id + '" data-delta="1" aria-label="Augmenter la quantité"><svg class="ic"><use href="#i-plus"/></svg></button>' +
              "</div>" +
            "</div>" +
            '<button class="icon-btn cart-item__remove" type="button" data-remove="' + p.id + '" aria-label="Retirer ' + escapeHtml(p.name) + '"><svg class="ic"><use href="#i-trash"/></svg></button>' +
          "</div>"
        );
      }).join("");
    }

    var checkout = $("[data-cart-checkout]");
    if (entries.length) {
      var lines = entries.map(function (e) { return "• " + e.product.name + " × " + e.qty + " (" + formatPrice(e.product.price * e.qty) + ")"; });
      var msg = "Bonjour Dina Caftan, je souhaite commander :\n" + lines.join("\n") + "\n\nTotal estimé : " + formatPrice(cartTotal()) + "\nMerci de me confirmer la disponibilité et la taille.";
      checkout.href = waLink(msg);
      checkout.removeAttribute("aria-disabled");
    } else {
      checkout.href = "#";
      checkout.setAttribute("aria-disabled", "true");
    }
  }

  $("[data-cart-items]").addEventListener("click", function (e) {
    var q = e.target.closest("[data-qty]");
    if (q) { var id = q.getAttribute("data-qty"); setQty(id, (cart[id] || 0) + Number(q.getAttribute("data-delta"))); return; }
    var r = e.target.closest("[data-remove]");
    if (r) { setQty(r.getAttribute("data-remove"), 0); return; }
    if (e.target.closest("[data-cart-close]")) closeCart();
  });

  function openCart() {
    lastFocus = document.activeElement;
    overlay.hidden = false;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(function () { drawer.focus(); }, 50);
  }
  function closeCart() {
    if (!drawer.classList.contains("is-open")) return;
    overlay.hidden = true;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  $("[data-cart-open]").addEventListener("click", openCart);
  $$(".drawer__head [data-cart-close]").forEach(function (b) { b.addEventListener("click", closeCart); });
  overlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeCart(); closeMenu(); }
  });

  renderCart(false);

  /* ---------- Toast ---------- */
  var toastEl = $("[data-toast]");
  var toastTimer;
  function toast(text) {
    toastEl.innerHTML = '<svg class="ic"><use href="#i-check"/></svg>' + escapeHtml(text);
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("is-visible"); }, 2200);
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }
})();
