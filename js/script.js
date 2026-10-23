(function () {
  "use strict";

  // ---- Theme toggle ----
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  if (stored === "dark" || stored === "light") {
    root.setAttribute("data-theme", stored);
  }

  function currentTheme() {
    var attr = root.getAttribute("data-theme");
    if (attr) return attr;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function toggleTheme() {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  }

  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", toggleTheme);
  });

  // ---- Mobile nav toggle ----
  var navToggle = document.querySelector("[data-nav-toggle]");
  var navLinks = document.querySelector("[data-nav-links]");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("is-open");
      var expanded = navLinks.classList.contains("is-open");
      navToggle.setAttribute("aria-expanded", String(expanded));
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- Contact form -> mailto ----
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("#name").value.trim();
      var email = form.querySelector("#email").value.trim();
      var message = form.querySelector("#message").value.trim();

      var subject = encodeURIComponent("Portfolio inquiry from " + (name || "website visitor"));
      var bodyLines = [
        message,
        "",
        "— " + (name || "N/A"),
        email ? "Reply to: " + email : ""
      ];
      var body = encodeURIComponent(bodyLines.join("\n"));
      window.location.href = "mailto:zakee8979@gmail.com?subject=" + subject + "&body=" + body;
    });
  }

  // ---- Current year in footer ----
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ---- Scroll reveal ----
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }

  // ---- Certificate lightbox ----
  var lightbox = document.querySelector("[data-lightbox]");
  if (lightbox) {
    var lbImg = lightbox.querySelector("[data-lightbox-img]");
    var lbTitle = lightbox.querySelector("[data-lightbox-title]");
    var lbMeta = lightbox.querySelector("[data-lightbox-meta]");

    function openLightbox(trigger) {
      lbImg.src = trigger.getAttribute("data-cert-img");
      lbImg.alt = trigger.getAttribute("data-cert-title") || "Certificate";
      lbTitle.textContent = trigger.getAttribute("data-cert-title") || "";
      lbMeta.textContent = trigger.getAttribute("data-cert-meta") || "";
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function closeLightbox() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      lbImg.src = "";
    }

    document.querySelectorAll("[data-cert-trigger]").forEach(function (card) {
      card.addEventListener("click", function () { openLightbox(card); });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(card); }
      });
    });
    lightbox.querySelectorAll("[data-lightbox-close]").forEach(function (btn) {
      btn.addEventListener("click", closeLightbox);
    });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
    });
  }
})();
