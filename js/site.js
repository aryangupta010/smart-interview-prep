"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("primaryNav");
  const header = document.querySelector(".navbar");

  if (menuToggle && menu && header) {
    function setMenuOpen(isOpen) {
      header.classList.toggle("nav-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    }

    menuToggle.addEventListener("click", function () {
      setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenuOpen(false);
    });

    document.addEventListener("click", function (event) {
      if (!header.contains(event.target)) setMenuOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setMenuOpen(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) setMenuOpen(false);
    });
  }

  const revealItems = document.querySelectorAll("[data-reveal]");
  if (!revealItems.length || !("IntersectionObserver" in window)) return;

  document.documentElement.classList.add("has-reveal");
  const observer = new IntersectionObserver(function (entries, currentObserver) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach(function (item) {
    observer.observe(item);
  });
});
