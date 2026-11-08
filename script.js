/* Falk Bonitz Rafique — small enhancements. The site works without this file. */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // ---------- Navigation ----------
  var nav = document.getElementById("nav");
  var toggle = nav && nav.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });
    nav.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
      });
    });
  }

  // ---------- The sun rises as you scroll ----------
  var ticking = false;
  function update() {
    ticking = false;
    var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    var p = Math.min(1, Math.max(0, window.scrollY / max));
    if (!reduceMotion) root.style.setProperty("--p", p.toFixed(4));
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();

  // ---------- Embeds (only when the site is opened directly, e.g. on GitHub Pages) ----------
  // Inside a sandboxed preview frame, YouTube and Spotify players are blocked,
  // so the media cards stay as plain links that open in a new tab.
  var isTopLevel = (function () { try { return window.self === window.top; } catch (e) { return false; } })();
  if (!isTopLevel) return;

  // Real YouTube thumbnails replace the local stand-in photos when they load.
  document.querySelectorAll(".clip[data-youtube]").forEach(function (clip) {
    var id = clip.getAttribute("data-youtube");
    var img = clip.querySelector(".clip-thumb img");
    if (!id || !img) return;
    var probe = new Image();
    probe.onload = function () { if (probe.naturalWidth > 120) img.src = probe.src; };
    probe.src = "https://i.ytimg.com/vi/" + encodeURIComponent(id) + "/hqdefault.jpg";
  });

  // Spotify players
  document.querySelectorAll(".spotify-slot[data-spotify]").forEach(function (slot) {
    var path = slot.getAttribute("data-spotify");
    var f = document.createElement("iframe");
    f.src = "https://open.spotify.com/embed/" + path + "?utm_source=generator&theme=0";
    f.height = slot.getAttribute("data-height") || "352";
    f.loading = "lazy";
    f.title = "Spotify player";
    f.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
    slot.appendChild(f);
  });

  // Video overlay player
  var player = document.getElementById("player");
  if (!player) return;
  var frame = player.querySelector(".player-frame");
  var closeBtn = player.querySelector(".player-close");
  var outLink = player.querySelector(".player-out");
  var lastFocus = null;

  function openPlayer(id, href, title) {
    lastFocus = document.activeElement;
    frame.innerHTML = "";
    var f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0";
    f.title = title || "Video";
    f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    f.allowFullscreen = true;
    frame.appendChild(f);
    outLink.href = href;
    player.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }
  function closePlayer() {
    player.hidden = true;
    frame.innerHTML = "";
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll(".clip[data-youtube]").forEach(function (clip) {
    clip.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return; // let people open in a new tab
      e.preventDefault();
      var t = clip.querySelector(".clip-title");
      openPlayer(clip.getAttribute("data-youtube"), clip.href, t ? t.textContent : "");
    });
  });
  closeBtn.addEventListener("click", closePlayer);
  player.addEventListener("click", function (e) { if (e.target === player) closePlayer(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !player.hidden) closePlayer(); });
})();
