(function () {
  "use strict";

  var C = DC.config;
  var html = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lang = html.lang === "ar" ? "ar" : "fr";

  /* ---------- Helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function t(key, vars) {
    var e = DC.t[key];
    var s = e ? (e[lang] != null ? e[lang] : e.fr) : key;
    if (vars) for (var k in vars) s = s.split("{" + k + "}").join(vars[k]);
    return s;
  }
  function L(obj) { return obj ? (obj[lang] || obj.fr) : ""; }
  function load(key, fb) { try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fb; } catch (e) { return fb; } }
  function save(key, v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  var nf = new Intl.NumberFormat("fr-FR");
  function money(n) { return nf.format(n) + " " + t("currency"); }
  function wa(text) { return "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(text); }
  function byId(id) { for (var i = 0; i < DC.products.length; i++) if (DC.products[i].id === id) return DC.products[i]; return null; }
  // A product can use a plain photo instead of the generated webp set:
  //   photo: "assets/img/p/mon-caftan.jpg"   (photo2: optional close-up)
  function img(p, v) {
    if (v === "d" && p.photo2) return p.photo2;
    if (p.photo) return p.photo;
    return "assets/img/p/" + p.id + "-" + v + ".webp";
  }
  function hasDetail(p) { return !p.photo || !!p.photo2; }
  function srcset(p) { return p.photo ? "" : ' srcset="' + img(p, "400") + " 400w, " + img(p, "800") + ' 800w"'; }
  function ico(id, cls) { return '<svg class="ic' + (cls ? " " + cls : "") + '"><use href="#i-' + id + '"/></svg>'; }
  function sizesOf(p) { return p.kids ? DC.sizes.kids : DC.sizes.adult; }
  function sizeLabel(p, s) {
    if (!s) return t("sizeTbd");
    if (s === "custom") return t("sizeCustom");
    return p && p.kids ? s + " " + t("years") : s;
  }
  function productUrl(id) { return location.href.split("#")[0] + "#p/" + id; }

  /* ---------- State ---------- */
  var favs = load("dc_fav", []);
  var cart = load("dc_cart2", []);           // [{ id, size, qty }]
  var seen = load("dc_seen", []);
  var state = { filter: "all", sort: "featured" };
  cart = cart.filter(function (l) { return byId(l.id); });

  /* ---------- Toast ---------- */
  var toastEl = $("[data-toast]"), toastTimer;
  function toast(msg) {
    toastEl.innerHTML = ico("check") + "<span>" + esc(msg) + "</span>";
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("is-on"); }, 2200);
  }
  function bump(sel) {
    $$(sel).forEach(function (el) { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); });
  }

  /* ---------- Static links & i18n ---------- */
  function applyLinks() {
    $$("[data-wa]").forEach(function (a) { a.href = wa(t(a.getAttribute("data-wa"))); });
    $$("[data-tel]").forEach(function (a) { a.href = "tel:" + C.phoneTel; if (!a.children.length) a.textContent = C.phoneDisplay; });
    $$("[data-maps-dir]").forEach(function (a) { a.href = C.mapsDirections; });
    $$("[data-maps-place]").forEach(function (a) { a.href = C.mapsPlace; });
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
    var soc = $("[data-social]");
    if (soc) {
      soc.innerHTML = ["instagram", "facebook", "tiktok"].filter(function (k) { return C.social[k]; }).map(function (k) {
        return '<a href="' + esc(C.social[k]) + '" target="_blank" rel="noopener" aria-label="' + k + '">' + ico(k) + "</a>";
      }).join("");
    }
  }

  function applyI18n() {
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = t("docTitle");
    $$("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-html]").forEach(function (el) { el.innerHTML = t(el.getAttribute("data-i18n-html")); });
    $$("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    $$("[data-i18n-ph]").forEach(function (el) { el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph"))); });
    $$("[data-set-lang]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-set-lang") === lang)); });
  }

  function setLang(l) {
    if (l === lang) return;
    lang = l;
    try { localStorage.setItem("dc_lang", l); } catch (e) { /* ignore */ }
    applyI18n();
    applyLinks();
    renderAll();
    if (current.id && openEl && openEl.id === "sheet-product") renderProduct();
  }

  /* ---------- Announcement ---------- */
  var annMsgs = $$(".ann__msg"), annI = 0;
  if (annMsgs.length > 1 && !reduceMotion) {
    setInterval(function () {
      if (document.hidden) return;
      annMsgs[annI].classList.remove("is-on");
      annI = (annI + 1) % annMsgs.length;
      annMsgs[annI].classList.add("is-on");
    }, 3800);
  }

  /* ---------- Header ---------- */
  var hdr = $(".hdr");
  function onScroll() { hdr.classList.toggle("is-scrolled", window.scrollY > 4); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Products ---------- */
  function card(p, sizes) {
    var name = L(p.name), fabric = L(p.fabric);
    var faved = favs.indexOf(p.id) !== -1;
    var badge = p.badge ? '<span class="badge badge--' + p.badge + '">' + esc(t("badge_" + p.badge)) + "</span>" : "";
    return '<article class="card">' +
      '<a class="card__media" href="#p/' + p.id + '" data-open="' + p.id + '" aria-label="' + esc(t("view", { name: name })) + '">' + badge +
        '<img src="' + img(p, "400") + '"' + srcset(p) + ' sizes="' + sizes + '" width="800" height="1000" alt="' + esc(name + ", " + fabric) + '" loading="lazy" decoding="async">' +
      "</a>" +
      '<button class="fav" type="button" data-fav="' + p.id + '" aria-pressed="' + faved + '" aria-label="' + esc(faved ? t("removeFav") : t("addFav")) + '"><span>' + ico("heart") + "</span></button>" +
      '<div class="card__info">' +
        '<h3 class="card__name"><a href="#p/' + p.id + '" data-open="' + p.id + '">' + esc(name) + "</a></h3>" +
        '<p class="card__fabric">' + esc(fabric) + "</p>" +
        '<div class="card__row"><p class="price"><small>' + esc(t("from")) + "</small><strong>" + money(p.price) + "</strong></p>" +
        '<button class="add" type="button" data-add="' + p.id + '" aria-label="' + esc(t("quickAdd", { name: name })) + '">' + ico("plus") + "</button></div>" +
      "</div></article>";
  }

  function renderRail() {
    var list = DC.products.filter(function (p) { return p.isNew; });
    $("[data-rail-new]").innerHTML = list.map(function (p) { return card(p, "(min-width: 1024px) 270px, 62vw"); }).join("");
  }

  function renderGrid() {
    var list = DC.products.filter(function (p) { return state.filter === "all" || p.cat === state.filter; }).slice();
    if (state.sort === "asc") list.sort(function (a, b) { return a.price - b.price; });
    else if (state.sort === "desc") list.sort(function (a, b) { return b.price - a.price; });
    else list.sort(function (a, b) { return a.order - b.order; });
    $("[data-grid]").innerHTML = list.map(function (p) { return card(p, "(min-width: 1100px) 270px, (min-width: 700px) 33vw, 50vw"); }).join("");
    $("[data-count]").textContent = list.length === 1 ? t("countOne") : t("countMany", { n: list.length });
  }

  function setFilter(f) {
    state.filter = f;
    $$("[data-filter]").forEach(function (b) {
      var on = b.getAttribute("data-filter") === f;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", String(on));
    });
    renderGrid();
  }

  $("[data-sort]").addEventListener("change", function (e) { state.sort = e.target.value; renderGrid(); });

  /* ---------- Favorites ---------- */
  function toggleFav(id, btn) {
    var i = favs.indexOf(id);
    if (i === -1) favs.push(id); else favs.splice(i, 1);
    save("dc_fav", favs);
    var on = i === -1;
    $$('[data-fav="' + id + '"]').forEach(function (b) {
      b.setAttribute("aria-pressed", String(on));
      b.setAttribute("aria-label", on ? t("removeFav") : t("addFav"));
    });
    if (btn) { btn.classList.remove("pop"); void btn.offsetWidth; btn.classList.add("pop"); }
    toast(on ? t("favAdded") : t("favRemoved"));
    renderCounts();
    if (openEl && openEl.id === "sheet-fav") renderFavs();
    if (on) bump("[data-fav-count]");
  }

  function renderFavs() {
    var body = $("[data-fav-body]");
    var list = favs.map(byId).filter(Boolean);
    if (!list.length) {
      body.innerHTML = '<div class="empty">' + ico("heart") + "<strong>" + esc(t("favEmpty")) + "</strong><p>" + esc(t("favEmptyText")) + '</p><a class="btn btn--line btn--sm" href="#collection" data-sheet-link>' + esc(t("browse")) + "</a></div>";
      return;
    }
    body.innerHTML = list.map(function (p) {
      return '<div class="line">' +
        '<a href="#p/' + p.id + '" data-open="' + p.id + '"><img src="' + img(p, "400") + '" alt="" width="72" height="90" loading="lazy"></a>' +
        "<div><h3>" + esc(L(p.name)) + "</h3><p>" + money(p.price) + "</p>" +
        '<div class="line__ctl"><button class="btn btn--dark btn--sm" type="button" data-add="' + p.id + '">' + ico("bag") + "<span>" + esc(t("addToCart")) + "</span></button></div></div>" +
        '<button class="ibtn" type="button" data-fav="' + p.id + '" aria-pressed="true" aria-label="' + esc(t("removeFav")) + '">' + ico("trash") + "</button>" +
      "</div>";
    }).join("");
  }

  /* ---------- Cart ---------- */
  function findLine(id, size) {
    for (var i = 0; i < cart.length; i++) if (cart[i].id === id && cart[i].size === size) return cart[i];
    return null;
  }
  function addToCart(id, size, qty) {
    size = size || "";
    var line = findLine(id, size);
    if (line) line.qty += qty || 1; else cart.push({ id: id, size: size, qty: qty || 1 });
    save("dc_cart2", cart);
    renderCounts();
    bump("[data-cart-count]");
    toast(t("added", { name: L(byId(id).name) }));
    if (openEl && openEl.id === "sheet-cart") renderCart();
  }
  function cartCount() { return cart.reduce(function (n, l) { return n + l.qty; }, 0); }
  function cartTotal() { return cart.reduce(function (n, l) { return n + l.qty * byId(l.id).price; }, 0); }

  function renderCounts() {
    var c = cartCount(), f = favs.length;
    $$("[data-cart-count]").forEach(function (el) { el.textContent = c || ""; });
    $$("[data-fav-count]").forEach(function (el) { el.textContent = f || ""; });
    var lbl = $("[data-cart-count-label]");
    if (lbl) lbl.textContent = c ? "(" + c + ")" : "";
  }

  function orderMessage() {
    var lines = cart.map(function (l) {
      var p = byId(l.id);
      return "• " + L(p.name) + ", " + t("sizeLine", { v: sizeLabel(p, l.size) }) + " × " + l.qty + " (" + money(p.price * l.qty) + ")";
    });
    var msg = [t("waOrderHead")].concat(lines, ["", t("waOrderTotal", { total: money(cartTotal()) })]);
    var name = ($("[data-cart-name]").value || "").trim(), city = ($("[data-cart-city]").value || "").trim();
    if (name) msg.push(t("waOrderName", { v: name }));
    if (city) msg.push(t("waOrderCity", { v: city }));
    msg.push(t("waOrderEnd"));
    return msg.join("\n");
  }
  function updateCheckout() {
    var a = $("[data-cart-checkout]");
    if (cart.length) { a.href = wa(orderMessage()); a.removeAttribute("aria-disabled"); }
    else { a.href = "#"; a.setAttribute("aria-disabled", "true"); }
  }

  function renderCart() {
    var body = $("[data-cart-body]"), foot = $("[data-cart-foot]");
    renderCounts();
    if (!cart.length) {
      body.innerHTML = '<div class="empty">' + ico("bag") + "<strong>" + esc(t("cartEmpty")) + "</strong><p>" + esc(t("cartEmptyText")) + '</p><a class="btn btn--line btn--sm" href="#collection" data-sheet-link>' + esc(t("browse")) + "</a></div>";
      foot.hidden = true;
      updateCheckout();
      return;
    }
    foot.hidden = false;
    body.innerHTML = cart.map(function (l, idx) {
      var p = byId(l.id);
      var opts = [""].concat(sizesOf(p)).map(function (s) {
        return '<option value="' + s + '"' + (s === l.size ? " selected" : "") + ">" + esc(sizeLabel(p, s)) + "</option>";
      }).join("");
      return '<div class="line">' +
        '<a href="#p/' + p.id + '" data-open="' + p.id + '"><img src="' + img(p, "400") + '" alt="" width="72" height="90" loading="lazy"></a>' +
        "<div><h3>" + esc(L(p.name)) + "</h3><p>" + money(p.price) + "</p>" +
          '<div class="line__ctl">' +
            '<label><span class="sr">' + esc(t("size")) + '</span><select data-line-size="' + idx + '">' + opts + "</select></label>" +
            '<div class="qty"><button type="button" data-line-qty="' + idx + '" data-d="-1" aria-label="' + esc(t("less")) + '">' + ico("minus") + "</button><span>" + l.qty + '</span><button type="button" data-line-qty="' + idx + '" data-d="1" aria-label="' + esc(t("more")) + '">' + ico("plus") + "</button></div>" +
          "</div></div>" +
        '<button class="ibtn" type="button" data-line-del="' + idx + '" aria-label="' + esc(t("remove")) + '">' + ico("trash") + "</button>" +
      "</div>";
    }).join("");
    $("[data-cart-total]").textContent = money(cartTotal());
    updateCheckout();
  }

  $("[data-cart-body]").addEventListener("change", function (e) {
    var s = e.target.closest("[data-line-size]");
    if (!s) return;
    var l = cart[+s.getAttribute("data-line-size")];
    var other = findLine(l.id, s.value);
    if (other && other !== l) { other.qty += l.qty; cart.splice(cart.indexOf(l), 1); } else l.size = s.value;
    save("dc_cart2", cart);
    renderCart();
  });
  $("[data-cart-body]").addEventListener("click", function (e) {
    var q = e.target.closest("[data-line-qty]"), d = e.target.closest("[data-line-del]");
    if (q) {
      var l = cart[+q.getAttribute("data-line-qty")];
      l.qty += +q.getAttribute("data-d");
      if (l.qty <= 0) cart.splice(cart.indexOf(l), 1);
    } else if (d) {
      cart.splice(+d.getAttribute("data-line-del"), 1);
    } else return;
    save("dc_cart2", cart);
    renderCart();
  });
  $$("[data-cart-name], [data-cart-city]").forEach(function (i) { i.addEventListener("input", updateCheckout); });

  /* ---------- Product sheet ---------- */
  var current = { id: null, size: "", qty: 1 };

  function productWa() {
    var p = byId(current.id);
    return wa(t("waProduct", { name: L(p.name), size: t("sizeLine", { v: sizeLabel(p, current.size) }), price: money(p.price) }) + "\n" + productUrl(p.id));
  }

  function renderProduct() {
    var p = byId(current.id);
    if (!p) return;
    var name = L(p.name), faved = favs.indexOf(p.id) !== -1;
    $("#sheet-product").setAttribute("aria-label", name);
    var sizes = sizesOf(p).map(function (s) {
      return '<label class="chip"><input type="radio" name="psize" value="' + s + '"' + (s === current.size ? " checked" : "") + "><span>" + esc(sizeLabel(p, s)) + "</span></label>";
    }).join("");
    $("[data-product-body]").innerHTML =
      '<div class="pgal">' +
        '<div class="pgal__track" data-pgal>' +
          '<img src="' + img(p, "800") + '" width="800" height="1000" alt="' + esc(name) + '">' +
          (hasDetail(p) ? '<img src="' + img(p, "d") + '" width="800" height="1000" alt="' + esc(name + ", " + L(p.fabric)) + '" loading="lazy">' : "") +
        "</div>" +
        (hasDetail(p) ? '<span class="pgal__count" data-pgal-count>1 / 2</span>' : "") +
      "</div>" +
      '<div class="pinfo">' +
        '<div class="pinfo__top"><div>' +
          '<p class="eyebrow">' + esc(L(DC.categories[p.cat].one)) + "</p>" +
          '<h2 class="pinfo__name">' + esc(name) + "</h2>" +
        '</div><div class="pinfo__acts">' +
          '<button class="ibtn" type="button" data-fav="' + p.id + '" aria-pressed="' + faved + '" aria-label="' + esc(faved ? t("removeFav") : t("addFav")) + '">' + ico("heart") + "</button>" +
          '<button class="ibtn" type="button" data-share aria-label="' + esc(t("share")) + '">' + ico("share") + "</button>" +
        "</div></div>" +
        '<p class="pinfo__price"><small>' + esc(t("from")) + "</small><strong>" + money(p.price) + "</strong></p>" +
        '<p class="pinfo__fabric">' + esc(L(p.fabric)) + "</p>" +
        '<p class="pinfo__desc">' + esc(L(p.desc)) + "</p>" +
        '<fieldset><legend class="plabel">' + esc(t("size")) + '</legend><div class="sizes" data-psizes>' + sizes + "</div></fieldset>" +
        '<div><span class="plabel">' + esc(t("qty")) + '</span><div class="qty">' +
          '<button type="button" data-pqty="-1" aria-label="' + esc(t("less")) + '">' + ico("minus") + '</button><span data-pqty-val>' + current.qty + '</span><button type="button" data-pqty="1" aria-label="' + esc(t("more")) + '">' + ico("plus") + "</button></div></div>" +
        '<ul class="plist"><li>' + ico("truck") + esc(t("pInfo1")) + "</li><li>" + ico("store") + esc(t("pInfo2")) + "</li><li>" + ico("scissors") + esc(t("pInfo3")) + "</li></ul>" +
      "</div>";
    $("[data-product-foot]").innerHTML =
      '<button class="btn btn--dark btn--lg" type="button" data-padd>' + ico("bag") + "<span>" + esc(t("addToCart")) + "</span></button>" +
      '<a class="btn btn--wa btn--lg" data-pwa href="' + productWa() + '" target="_blank" rel="noopener">' + ico("wa") + "<span>" + esc(t("orderWa")) + "</span></a>";

    var track = $("[data-pgal]"), count = $("[data-pgal-count]");
    if (count) track.addEventListener("scroll", function () {
      var i = Math.round(Math.abs(track.scrollLeft) / track.clientWidth);
      count.textContent = (i + 1) + " / 2";
    }, { passive: true });
  }

  function openProduct(id) {
    if (!byId(id)) return;
    if (current.id !== id) current = { id: id, size: "", qty: 1 };
    renderProduct();
    openSheet("product", "#p/" + id);
    var sc = $("#sheet-product .sheet__scroll");
    if (sc) sc.scrollTop = 0;
  }

  $("#sheet-product").addEventListener("change", function (e) {
    if (e.target.name === "psize") { current.size = e.target.value; $("[data-pwa]").href = productWa(); }
  });
  $("#sheet-product").addEventListener("click", function (e) {
    var q = e.target.closest("[data-pqty]");
    if (q) {
      current.qty = Math.max(1, Math.min(9, current.qty + +q.getAttribute("data-pqty")));
      $("[data-pqty-val]").textContent = current.qty;
      return;
    }
    if (e.target.closest("[data-padd]")) { addToCart(current.id, current.size, current.qty); return; }
    if (e.target.closest("[data-share]")) {
      var p = byId(current.id), url = productUrl(p.id);
      if (navigator.share) navigator.share({ title: L(p.name), text: L(p.name) + " · Dina Caftan", url: url }).catch(function () {});
      else if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { toast(t("linkCopied")); }, function () {});
    }
  });

  /* ---------- Sheets (bottom sheets on phones, dialogs on desktop) ---------- */
  var backdrop = $("[data-backdrop]");
  var openEl = null, lastFocus = null, overlayPushed = false, hideTimer = null;

  function lock(on) { html.classList.toggle("is-locked", on); }

  function pushOverlay(url) {
    var u = url || (location.pathname + location.search);
    try {
      if (overlayPushed) history.replaceState({ dc: 1 }, "", u);
      else { history.pushState({ dc: 1 }, "", u); overlayPushed = true; }
    } catch (e) { /* file:// or sandbox: ignore */ }
  }

  function showSheet(el) {
    clearTimeout(hideTimer);
    el.hidden = false;
    backdrop.hidden = false;
    void el.offsetHeight;
    el.classList.add("is-on");
    backdrop.classList.add("is-on");
    lock(true);
  }
  function hideSheetEl(el, instant) {
    el.classList.remove("is-on");
    if (instant) { el.hidden = true; el.style.transform = ""; return; }
    setTimeout(function () { if (!el.classList.contains("is-on")) { el.hidden = true; el.style.transform = ""; } }, 430);
  }

  function openSheet(name, url) {
    var el = document.getElementById("sheet-" + name);
    if (!el) return;
    if (name === "cart") renderCart();
    if (name === "fav") renderFavs();
    if (openEl === el) { pushOverlay(url); return; }
    if (openEl) hideSheetEl(openEl, true);
    else if (!storyOpen) lastFocus = document.activeElement;
    if (storyOpen) hideStory();
    showSheet(el);
    openEl = el;
    pushOverlay(url);
    setTimeout(function () {
      var f = el.querySelector("[data-sheet-close], button, a[href], input");
      if (f) f.focus({ preventScroll: true });
    }, 80);
  }

  function hideAllOverlays() {
    if (openEl) { hideSheetEl(openEl); openEl = null; }
    if (storyOpen) hideStory();
    backdrop.classList.remove("is-on");
    hideTimer = setTimeout(function () { if (!openEl) backdrop.hidden = true; }, 320);
    lock(false);
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }

  function closeOverlay() {
    if (!openEl && !storyOpen) return;
    if (overlayPushed) { history.back(); return; }   // popstate does the hiding
    hideAllOverlays();
  }

  window.addEventListener("popstate", function () {
    if (overlayPushed) { overlayPushed = false; hideAllOverlays(); }
  });

  backdrop.addEventListener("click", closeOverlay);

  // Drag down to close (phones)
  $$(".sheet").forEach(function (sheet) {
    $$("[data-drag]", sheet).forEach(function (h) {
      var y0 = 0, dy = 0, t0 = 0, active = false;
      h.addEventListener("pointerdown", function (e) {
        if (window.innerWidth >= 1024 || e.target.closest("button, a, input, select")) return;
        active = true; y0 = e.clientY; dy = 0; t0 = Date.now();
        sheet.classList.add("is-drag");
        try { h.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      });
      h.addEventListener("pointermove", function (e) {
        if (!active) return;
        dy = Math.max(0, e.clientY - y0);
        sheet.style.transform = "translateY(" + dy + "px)";
      });
      function end() {
        if (!active) return;
        active = false;
        sheet.classList.remove("is-drag");
        var v = dy / Math.max(1, Date.now() - t0);
        if (dy > 110 || (dy > 30 && v > 0.6)) { sheet.style.transform = "translateY(100%)"; closeOverlay(); }
        else sheet.style.transform = "";
      }
      h.addEventListener("pointerup", end);
      h.addEventListener("pointercancel", end);
    });
  });

  // Keyboard: Escape + focus trap
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && (openEl || storyOpen)) { closeOverlay(); return; }
    if (storyOpen) {
      if (e.key === "ArrowRight") (lang === "ar" ? storyPrev : storyNext)();
      if (e.key === "ArrowLeft") (lang === "ar" ? storyNext : storyPrev)();
    }
    var scope = storyOpen ? $("#story") : openEl;
    if (e.key !== "Tab" || !scope) return;
    var f = $$("button:not([disabled]), a[href], input, select, textarea", scope).filter(function (x) { return x.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ---------- Appointment form ---------- */
  var rdvForm = $("[data-rdv-form]");
  rdvForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = rdvForm.elements, name = (f.name.value || "").trim();
    var nameField = f.name.closest(".field"), err = nameField.querySelector(".field__err");
    if (!name) { nameField.classList.add("is-err"); err.hidden = false; f.name.focus(); return; }
    nameField.classList.remove("is-err"); err.hidden = true;
    var type = rdvForm.querySelector("input[name=type]:checked").value === "bespoke" ? t("rdvBespoke") : t("rdvTry");
    var occ = t(rdvForm.querySelector("input[name=occ]:checked").value);
    var lines = [t("waRdvHead"), t("waRdvName", { v: name }), t("waRdvType", { v: type }), t("waRdvOcc", { v: occ })];
    if (f.date.value) lines.push(t("waRdvDate", { v: f.date.value.split("-").reverse().join("/") }));
    if ((f.msg.value || "").trim()) lines.push(t("waRdvMsg", { v: f.msg.value.trim() }));
    var url = wa(lines.join("\n"));
    var w = window.open(url, "_blank", "noopener");
    if (!w) location.href = url;
  });
  rdvForm.elements.name.addEventListener("input", function () {
    var fld = this.closest(".field");
    if (this.value.trim()) { fld.classList.remove("is-err"); fld.querySelector(".field__err").hidden = true; }
  });

  /* ---------- Stories ---------- */
  var storyEl = $("#story"), storyOpen = false;
  var S = { g: 0, i: 0, items: [], elapsed: 0, last: 0, paused: false, raf: 0, ready: false, dur: 5000, pressAt: 0, y0: 0 };

  function renderStories() {
    $("[data-stories]").innerHTML = DC.stories.map(function (g, i) {
      return '<button class="sbtn' + (seen.indexOf(g.id) !== -1 ? " is-seen" : "") + '" type="button" data-story="' + i + '">' +
        '<span class="sbtn__ring"><img src="' + g.thumb + '" alt="" width="68" height="68" loading="lazy"></span>' +
        '<span class="sbtn__label">' + esc(L(g.title)) + "</span></button>";
    }).join("");
  }

  function storyItems(g) {
    if (g.items) return g.items.map(function (it) { return { img: it.img, cap: L(it.cap), sub: L(it.sub), cta: it.cta }; });
    var out = [];
    g.products.forEach(function (id) {
      var p = byId(id);
      if (!p) return;
      out.push({ img: img(p, "800"), cap: L(p.name), sub: t("from") + " " + money(p.price), cta: "product", id: id });
      if (g.details && hasDetail(p)) out.push({ img: img(p, "d"), cap: L(p.name), sub: L(p.fabric), cta: "product", id: id });
    });
    return out;
  }

  function markSeen(id) {
    if (seen.indexOf(id) === -1) { seen.push(id); save("dc_seen", seen); }
    var b = $('[data-story="' + DC.stories.indexOf(DC.stories.filter(function (g) { return g.id === id; })[0]) + '"]');
    if (b) b.classList.add("is-seen");
  }

  function showStoryItem() {
    var g = DC.stories[S.g];
    S.items = storyItems(g);
    var it = S.items[S.i];
    markSeen(g.id);
    $("[data-story-bars]").innerHTML = S.items.map(function (_, k) {
      return '<span class="story__bar"><i style="width:' + (k < S.i ? 100 : 0) + '%"></i></span>';
    }).join("");
    $("[data-story-avatar]").src = g.thumb;
    $("[data-story-title]").textContent = L(g.title);
    $("[data-story-cap]").textContent = it.cap;
    $("[data-story-sub]").textContent = it.sub;
    var cta = $("[data-story-cta]");
    cta.removeAttribute("target");
    if (it.cta === "product") { cta.href = "#p/" + it.id; cta.innerHTML = esc(t("storySee")) + ico("arrow", "ic--flip"); }
    else if (it.cta === "maps") { cta.href = C.mapsDirections; cta.target = "_blank"; cta.innerHTML = ico("nav") + esc(t("directions")); }
    else if (it.cta === "wa") { cta.href = wa(t("waDefault")); cta.target = "_blank"; cta.innerHTML = ico("wa") + "WhatsApp"; }
    else { cta.href = "#sur-mesure"; cta.innerHTML = ico("calendar") + esc(t("storyRdv")); }
    cta.setAttribute("data-cta", it.cta);
    cta.setAttribute("data-id", it.id || "");

    var im = $("[data-story-img]");
    S.ready = false; S.elapsed = 0;
    im.classList.add("is-loading");
    im.alt = it.cap;
    im.onload = function () { im.classList.remove("is-loading"); S.ready = true; S.last = performance.now(); };
    im.onerror = im.onload;
    im.src = it.img;
    var nx = S.items[S.i + 1];
    if (nx) { var pre = new Image(); pre.src = nx.img; }
  }

  function tick(now) {
    if (!storyOpen) return;
    if (S.ready && !S.paused && !document.hidden) {
      S.elapsed += now - S.last;
      var bar = $$("[data-story-bars] i")[S.i];
      if (bar) bar.style.width = Math.min(100, S.elapsed / S.dur * 100) + "%";
      if (S.elapsed >= S.dur) { storyNext(); }
    }
    S.last = now;
    S.raf = requestAnimationFrame(tick);
  }

  function storyNext() {
    if (S.i < S.items.length - 1) { S.i++; showStoryItem(); }
    else if (S.g < DC.stories.length - 1) { S.g++; S.i = 0; showStoryItem(); }
    else closeOverlay();
  }
  function storyPrev() {
    if (S.i > 0) { S.i--; showStoryItem(); }
    else if (S.g > 0) { S.g--; S.i = 0; showStoryItem(); }
    else { S.elapsed = 0; }
  }

  function openStory(gi) {
    if (openEl) { hideSheetEl(openEl, true); openEl = null; backdrop.classList.remove("is-on"); backdrop.hidden = true; }
    else lastFocus = document.activeElement;
    S.g = gi; S.i = 0; S.paused = false;
    storyEl.hidden = false;
    storyOpen = true;
    lock(true);
    pushOverlay();
    showStoryItem();
    cancelAnimationFrame(S.raf);
    S.last = performance.now();
    S.raf = requestAnimationFrame(tick);
    setTimeout(function () { $("[data-story-close]").focus({ preventScroll: true }); }, 50);
  }
  function hideStory() {
    storyOpen = false;
    cancelAnimationFrame(S.raf);
    storyEl.hidden = true;
  }

  var frame = $(".story__frame");
  frame.addEventListener("pointerdown", function (e) {
    if (e.target.closest("a, [data-story-close]")) return;
    S.paused = true; S.pressAt = Date.now(); S.y0 = e.clientY;
  });
  frame.addEventListener("pointerup", function (e) {
    S.paused = false;
    if (e.clientY - S.y0 > 90) { S.pressAt = 0; closeOverlay(); }
  });
  frame.addEventListener("pointercancel", function () { S.paused = false; });
  $("[data-story-prev]").addEventListener("click", function () { if (Date.now() - S.pressAt < 350) storyPrev(); });
  $("[data-story-next]").addEventListener("click", function () { if (Date.now() - S.pressAt < 350) storyNext(); });
  $("[data-story-close]").addEventListener("click", closeOverlay);
  $("[data-story-cta]").addEventListener("click", function (e) {
    var kind = this.getAttribute("data-cta");
    if (kind === "product") { e.preventDefault(); openProduct(this.getAttribute("data-id")); }
    else if (kind === "rdv") { e.preventDefault(); openSheet("rdv"); }
  });

  /* ---------- Hero carousel ---------- */
  var hTrack = $("[data-hero-track]"), slides = $$(".slide", hTrack), dots = $("[data-hero-dots]");
  var heroIdx = 0, heroPauseUntil = 0, heroVisible = true;
  function renderDots() {
    dots.innerHTML = slides.map(function (_, i) {
      return '<button class="hero__dot" type="button" data-hero-go="' + i + '" aria-label="' + esc(t("slide") + " " + (i + 1)) + '"' + (i === heroIdx ? ' aria-current="true"' : "") + "><span></span></button>";
    }).join("");
  }
  function heroCurrent() {
    var tr = hTrack.getBoundingClientRect(), c = tr.left + tr.width / 2, best = 0, bd = Infinity;
    slides.forEach(function (s, i) { var r = s.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - c); if (d < bd) { bd = d; best = i; } });
    return best;
  }
  function heroGo(i) {
    var tr = hTrack.getBoundingClientRect(), r = slides[i].getBoundingClientRect();
    hTrack.scrollBy({ left: (r.left + r.width / 2) - (tr.left + tr.width / 2), behavior: reduceMotion ? "auto" : "smooth" });
  }
  var heroRaf = 0;
  hTrack.addEventListener("scroll", function () {
    cancelAnimationFrame(heroRaf);
    heroRaf = requestAnimationFrame(function () {
      var i = heroCurrent();
      if (i !== heroIdx) {
        heroIdx = i;
        $$(".hero__dot", dots).forEach(function (d, k) { if (k === i) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
      }
    });
  }, { passive: true });
  hTrack.addEventListener("pointerdown", function () { heroPauseUntil = Date.now() + 9000; }, { passive: true });
  dots.addEventListener("click", function (e) {
    var b = e.target.closest("[data-hero-go]");
    if (b) { heroPauseUntil = Date.now() + 9000; heroGo(+b.getAttribute("data-hero-go")); }
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (en) { heroVisible = en[0].isIntersecting; }, { threshold: 0.6 }).observe(hTrack);
  }
  if (!reduceMotion) {
    setInterval(function () {
      if (!heroVisible || document.hidden || storyOpen || openEl || Date.now() < heroPauseUntil) return;
      heroGo((heroIdx + 1) % slides.length);
    }, 6000);
  }

  /* ---------- Opening hours status ---------- */
  function hourNow() {
    try {
      var parts = new Intl.DateTimeFormat("en-GB", { timeZone: C.timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
      var get = function (type) { return +parts.filter(function (p) { return p.type === type; })[0].value; };
      return get("hour") + get("minute") / 60;
    } catch (e) { var d = new Date(); return d.getHours() + d.getMinutes() / 60; }
  }
  function fmtHour(h) { var s = (h < 10 ? "0" : "") + h; return lang === "ar" ? s + ":00" : s + "h00"; }
  function renderStatus() {
    var h = hourNow(), open = h >= C.hours.open && h < C.hours.close;
    $$("[data-open-status]").forEach(function (el) {
      el.classList.toggle("is-open", open);
      el.classList.toggle("is-closed", !open);
      $(".status__txt", el).textContent = open ? t("openNow", { h: fmtHour(C.hours.close) }) : t("closedNow", { h: fmtHour(C.hours.open) });
    });
  }
  setInterval(renderStatus, 60000);

  /* ---------- Map (loaded on demand to keep the page light) ---------- */
  function loadMap() {
    var box = $("[data-map]");
    if (!box || box.querySelector("iframe")) return;
    box.innerHTML = '<iframe src="' + C.mapEmbed + '" title="' + esc(t("mapFrame")) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
  }

  /* ---------- Bottom nav active state ---------- */
  if ("IntersectionObserver" in window) {
    var colIO = new IntersectionObserver(function (en) {
      var inCol = en[0].isIntersecting;
      $$("[data-bnav]").forEach(function (a) { a.classList.toggle("is-on", (a.getAttribute("data-bnav") === "collection") === inCol); });
    }, { rootMargin: "-45% 0px -45% 0px" });
    colIO.observe($("#collection"));
  }

  /* ---------- Global clicks ---------- */
  document.addEventListener("click", function (e) {
    var el;
    if ((el = e.target.closest("[data-open]"))) { e.preventDefault(); openProduct(el.getAttribute("data-open")); return; }
    if ((el = e.target.closest("[data-fav]"))) { e.preventDefault(); toggleFav(el.getAttribute("data-fav"), el); return; }
    if ((el = e.target.closest("[data-add]"))) {
      e.preventDefault();
      addToCart(el.getAttribute("data-add"), "", 1);
      if (el.classList.contains("add")) {
        el.classList.add("is-done"); el.innerHTML = ico("check");
        setTimeout(function () { el.classList.remove("is-done"); el.innerHTML = ico("plus"); }, 1300);
      }
      return;
    }
    if ((el = e.target.closest("[data-sheet-open]"))) { e.preventDefault(); openSheet(el.getAttribute("data-sheet-open")); return; }
    if ((el = e.target.closest("[data-sheet-close]"))) { e.preventDefault(); closeOverlay(); return; }
    if ((el = e.target.closest("[data-sheet-link]"))) {
      e.preventDefault();
      var target = $(el.getAttribute("href"));
      closeOverlay();
      setTimeout(function () { if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }); }, 380);
      return;
    }
    if ((el = e.target.closest("[data-story]"))) { openStory(+el.getAttribute("data-story")); return; }
    if ((el = e.target.closest("[data-filter]"))) { setFilter(el.getAttribute("data-filter")); return; }
    if ((el = e.target.closest("[data-filter-link]"))) { setFilter(el.getAttribute("data-filter-link")); return; }
    if ((el = e.target.closest("[data-lang-toggle]"))) { setLang(lang === "ar" ? "fr" : "ar"); return; }
    if ((el = e.target.closest("[data-set-lang]"))) { setLang(el.getAttribute("data-set-lang")); return; }
    if ((el = e.target.closest("[data-map-load]"))) { loadMap(); return; }
    if ((el = e.target.closest("[data-cart-checkout]")) && !cart.length) { e.preventDefault(); }
  });

  /* ---------- Init ---------- */
  function renderAll() {
    renderStories();
    renderRail();
    renderGrid();
    renderCounts();
    renderDots();
    renderStatus();
    if (openEl && openEl.id === "sheet-cart") renderCart();
    if (openEl && openEl.id === "sheet-fav") renderFavs();
  }

  applyI18n();
  applyLinks();
  renderAll();

  // Deep link: #p/<id> opens the product directly (shared links)
  function openFromHash() {
    var m = location.hash.match(/^#p\/([\w-]+)/);
    if (!m || !byId(m[1]) || (openEl && openEl.id === "sheet-product" && current.id === m[1])) return;
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) { /* ignore */ }
    overlayPushed = false;
    openProduct(m[1]);
  }
  window.addEventListener("hashchange", openFromHash);
  openFromHash();
})();
