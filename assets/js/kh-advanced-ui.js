/* ==========================================================
   KH ADVANCED UI (Sidebar state + Floating follow-scroll)
   Safe drop-in: does nothing if elements are missing.
   ========================================================== */
(function(){
  "use strict";

  // ---------- Sidebar state sync (works with HTML5UP toggle) ----------
  var sidebar = document.getElementById("sidebar");
  if (sidebar) {
    function syncBody(){
      var closed = sidebar.classList.contains("inactive");
      document.body.classList.toggle("kh-sidebar-closed", closed);
    }
    // initial
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", syncBody);
    } else {
      syncBody();
    }

    // observe class changes
    try{
      var obs = new MutationObserver(function(muts){
        for (var i=0;i<muts.length;i++){
          if (muts[i].attributeName === "class") { syncBody(); break; }
        }
      });
      obs.observe(sidebar, { attributes:true });
    }catch(e){}

    // persist open/close preference (desktop only)
    function isMobile(){ return window.matchMedia("(max-width: 1280px)").matches; }

    function readPref(){
      try{ return localStorage.getItem("kh_sidebar_open"); }catch(e){ return null; }
    }
    function writePref(open){
      try{ localStorage.setItem("kh_sidebar_open", open ? "1" : "0"); }catch(e){}
    }

    // apply pref on desktop
    function applyPref(){
      if (isMobile()) return; // do not force on mobile
      var pref = readPref();
      if (pref === "1") sidebar.classList.remove("inactive");
      if (pref === "0") sidebar.classList.add("inactive");
      syncBody();
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", applyPref);
    } else {
      applyPref();
    }

    // Hook: when toggle clicked, store preference
    document.addEventListener("click", function(ev){
      var t = ev.target;
      // click inside <a class="toggle"> or its pseudo elements -> closest
      var toggle = t && t.closest ? t.closest("#sidebar .toggle") : null;
      if (!toggle) return;
      // after template toggles, store value in next frame
      requestAnimationFrame(function(){
        if (isMobile()) return;
        var open = !sidebar.classList.contains("inactive");
        writePref(open);
        syncBody();
      });
    });
  }

  // ---------- Floating bar follow scroll (like screenshot) ----------
  var floatBar = document.getElementById("khFloatBar") || document.querySelector("[data-kh-floatbar]");
  if (floatBar) {
    // Ensure absolute positioning (required for follow-scroll effect)
    floatBar.style.position = "absolute";

    var currentTop = 220;

    function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }

    function tick(){
      var doc = document.documentElement;
      var barH = floatBar.offsetHeight || 0;

      // keep within document bounds
      var minTop = 120;
      var maxTop = Math.max(minTop, (doc.scrollHeight - barH - 40));

      // target tracks viewport center in doc coordinates
      var target = clamp(
        window.scrollY + (window.innerHeight * 0.50) - (barH / 2),
        minTop,
        maxTop
      );

      // smooth follow
      currentTop = currentTop + (target - currentTop) * 0.12;
      floatBar.style.top = currentTop.toFixed(1) + "px";

      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
})();
