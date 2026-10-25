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

  // ---- Mobile nav drawer ----
  var navToggle = document.querySelector("[data-nav-toggle]");
  var navLinks = document.querySelector("[data-nav-links]");
  var navBackdrop = document.querySelector("[data-nav-backdrop]");
  var navClose = document.querySelector("[data-nav-close]");

  function openDrawer() {
    navLinks.classList.add("is-open");
    if (navBackdrop) navBackdrop.classList.add("is-open");
    document.body.style.overflow = "hidden";
    if (navToggle) navToggle.setAttribute("aria-expanded", "true");
  }
  function closeDrawer() {
    navLinks.classList.remove("is-open");
    if (navBackdrop) navBackdrop.classList.remove("is-open");
    document.body.style.overflow = "";
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      if (navLinks.classList.contains("is-open")) closeDrawer();
      else openDrawer();
    });
    if (navClose) navClose.addEventListener("click", closeDrawer);
    if (navBackdrop) navBackdrop.addEventListener("click", closeDrawer);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeDrawer);
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

  // ---- Scroll progress bar + back-to-top ----
  var progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  var backToTop = document.createElement("button");
  backToTop.className = "back-to-top";
  backToTop.setAttribute("aria-label", "Back to top");
  backToTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(backToTop);
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function onScroll() {
    var doc = document.documentElement;
    var scrollTop = doc.scrollTop || document.body.scrollTop;
    var scrollable = doc.scrollHeight - doc.clientHeight;
    var pct = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
    progressBar.style.width = pct + "%";
    if (scrollTop > 500) backToTop.classList.add("is-visible");
    else backToTop.classList.remove("is-visible");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- Card cursor-glow ----
  var glowCards = document.querySelectorAll(".project-card, .cert-card, .contact-card, .info-card");
  glowCards.forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - rect.left) + "px");
      card.style.setProperty("--my", (e.clientY - rect.top) + "px");
    });
  });

  // ---- Count-up stats ----
  var countEls = document.querySelectorAll("[data-countup]");
  if (countEls.length) {
    function countUp(el, target, duration) {
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
    }
    if ("IntersectionObserver" in window) {
      var countIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var target = parseInt(entry.target.getAttribute("data-countup"), 10);
            countUp(entry.target, target, 1200);
            countIo.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      countEls.forEach(function (el) { countIo.observe(el); });
    } else {
      countEls.forEach(function (el) {
        el.textContent = el.getAttribute("data-countup");
      });
    }
  }
})();
