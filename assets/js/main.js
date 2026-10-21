/* 云栖智能官网交互脚本 */
(function () {
  "use strict";

  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");

  /* 滚动时导航栏加背景 */
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* 移动端菜单 */
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    nav.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); });
    });
  }

  /* 滚动入场 */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var siblings = Array.prototype.slice.call(el.parentElement.children);
            var i = siblings.indexOf(el);
            el.style.transitionDelay = Math.min(i, 4) * 70 + "ms";
            el.classList.add("in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* 数字滚动 */
  var counters = document.querySelectorAll("[data-count]");
  function animate(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var start = null;
    var dur = 1100;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var io2 = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { animate(e.target); io2.unobserve(e.target); }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (c) { io2.observe(c); });
  } else {
    counters.forEach(animate);
  }

  /* 表单校验（纯前端演示） */
  var form = document.getElementById("contactForm");
  var tip = document.getElementById("formTip");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      tip.className = "form-tip";
      if (!name) {
        tip.textContent = "请填写称呼";
        tip.classList.add("err");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        tip.textContent = "邮箱格式看起来不太对";
        tip.classList.add("err");
        return;
      }
      tip.textContent = "已收到，我们会在 1 个工作日内联系你。";
      form.reset();
    });
  }

  /* 年份 */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
