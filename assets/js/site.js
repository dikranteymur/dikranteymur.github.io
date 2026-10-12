/*
 * MDT Software Apps — renders config-driven parts of the pages and runs the
 * mobile menu. Every page also works without JavaScript: legal text is static
 * HTML and each generated block has a static fallback.
 */
(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.remove("no-js");

  var config = window.MDT_CONFIG;
  // Path from the current page back to the site root, e.g. "../../" on app pages.
  var root = doc.getAttribute("data-root") || "";

  var STORES = {
    appStore: {
      label: "App Store",
      badge: "assets/img/badges/app-store.svg",
      badgeAlt: "Download on the App Store",
      className: "apple"
    },
    googlePlay: {
      label: "Google Play",
      badge: "assets/img/badges/google-play.png",
      badgeAlt: "Get it on Google Play",
      className: "google"
    }
  };

  var STATUS_TEXT = {
    "coming-soon": "Coming soon",
    unavailable: "Not available yet"
  };

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (key === "text") node.textContent = attrs[key];
        else node.setAttribute(key, attrs[key]);
      });
    }
    (children || []).forEach(function (child) {
      if (child) node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });
    return node;
  }

  function href(path) {
    return root + path;
  }

  function isLive(entry) {
    return entry && entry.status === "available" && /^https:\/\//.test(entry.url || "");
  }

  /* A verified listing gets the official badge; anything else gets a plain status label. */
  function storeButton(app, key) {
    var store = STORES[key];
    var entry = app.stores[key];
    if (isLive(entry)) {
      return el("a", {
        class: "store-badge " + store.className,
        href: entry.url,
        rel: "noopener",
        "aria-label": app.name + " on the " + store.label
      }, [el("img", { src: href(store.badge), alt: store.badgeAlt, width: store.className === "apple" ? "120" : "155", height: store.className === "apple" ? "40" : "60", loading: "lazy" })]);
    }
    var text = STATUS_TEXT[(entry && entry.status) || "unavailable"] || STATUS_TEXT.unavailable;
    return el("span", { class: "store-pending" }, [el("strong", { text: store.label }), text]);
  }

  function stateLabel(entry) {
    if (isLive(entry)) return el("span", { class: "state state-live", text: "Live" });
    if (entry && entry.status === "coming-soon") return el("span", { class: "state state-soon", text: "Soon" });
    return el("span", { class: "state state-none", text: "—" });
  }

  function legalLinks(app, className) {
    return el("div", { class: className }, [
      el("a", { href: href(app.pages.privacy), text: "Privacy Policy" }),
      el("a", { href: href(app.pages.eula), text: "EULA" }),
      el("a", { href: href(app.pages.support), text: "Support" })
    ]);
  }

  function renderCards(target) {
    target.textContent = "";
    config.apps.forEach(function (app) {
      var title = el("h3", { id: app.slug + "-title", text: app.name });
      var card = el("article", { class: "app-card", id: app.slug, "aria-labelledby": app.slug + "-title" }, [
        el("div", { class: "app-card-head" }, [
          el("img", { class: "app-icon", src: href(app.icon), alt: "", width: "64", height: "64", loading: "lazy" }),
          el("div", null, [
            title,
            el("p", { class: "meta", text: app.category + " · " + app.platforms })
          ])
        ]),
        el("p", { class: "app-desc", text: app.description }),
        el("div", { class: "stores" }, [storeButton(app, "appStore"), storeButton(app, "googlePlay")]),
        legalLinks(app, "app-links")
      ]);
      target.appendChild(card);
    });
  }

  function renderBoard(target) {
    target.textContent = "";
    config.apps.forEach(function (app) {
      var label = app.name + ": App Store " + (isLive(app.stores.appStore) ? "live" : (STATUS_TEXT[app.stores.appStore.status] || "").toLowerCase()) +
        ", Google Play " + (isLive(app.stores.googlePlay) ? "live" : (STATUS_TEXT[app.stores.googlePlay.status] || "").toLowerCase());
      target.appendChild(el("a", { class: "board-row", href: "#" + app.slug, "aria-label": label }, [
        el("span", { class: "board-app" }, [
          el("img", { src: href(app.icon), alt: "", width: "36", height: "36" }),
          el("span", null, [app.name, el("small", { text: app.category })])
        ]),
        stateLabel(app.stores.appStore),
        stateLabel(app.stores.googlePlay)
      ]));
    });
  }

  function renderSupportList(target) {
    target.textContent = "";
    config.apps.forEach(function (app) {
      target.appendChild(el("li", null, [
        el("a", { href: href(app.pages.support) }, [
          el("img", { src: href(app.icon), alt: "", width: "32", height: "32", loading: "lazy" }),
          app.name + " support",
          el("span", { class: "arrow", "aria-hidden": "true", text: "→" })
        ])
      ]));
    });
  }

  function renderFooterLegal(target) {
    target.textContent = "";
    config.apps.forEach(function (app) {
      target.appendChild(el("li", { class: "footer-legal-app" }, [
        el("span", { text: app.name + ":" }),
        el("a", { href: href(app.pages.privacy), text: "Privacy" }),
        el("a", { href: href(app.pages.eula), text: "EULA" })
      ]));
    });
  }

  function findApp(slug) {
    for (var i = 0; i < config.apps.length; i++) if (config.apps[i].slug === slug) return config.apps[i];
    return null;
  }

  function renderAppPage() {
    var app = findApp(document.body.getAttribute("data-app"));
    if (!app) return;

    document.querySelectorAll("[data-store-links]").forEach(function (target) {
      target.textContent = "";
      target.appendChild(storeButton(app, "appStore"));
      target.appendChild(storeButton(app, "googlePlay"));
    });

    document.querySelectorAll("[data-shots]").forEach(function (target) {
      if (!app.screenshots.length) {
        target.remove();
        return;
      }
      target.textContent = "";
      app.screenshots.forEach(function (src, i) {
        target.appendChild(el("img", {
          src: href(src),
          alt: app.name + " screenshot " + (i + 1),
          width: "414",
          height: "900",
          loading: "lazy"
        }));
      });
    });
  }

  function setupNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      nav.classList.toggle("is-open", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 761px)").addEventListener("change", function (mq) {
      if (mq.matches) setOpen(false);
    });
  }

  function fill(selector, render) {
    var target = document.querySelector(selector);
    if (target && config) render(target);
  }

  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  if (config) {
    document.querySelectorAll("[data-brand-email]").forEach(function (node) {
      node.textContent = config.brand.email;
      node.setAttribute("href", "mailto:" + config.brand.email);
    });
    fill("#app-grid", renderCards);
    fill("#release-board", renderBoard);
    fill("#support-list", renderSupportList);
    fill("#footer-legal", renderFooterLegal);
    renderAppPage();
  }

  setupNav();
})();
