/* ==========================================================
   KH CURRENT TAB (Advanced)
   - Marks only ONE best match as active
   - Supports: page.html, page.html#hash, #hash
   - Adds: class "is-active" + "active" + aria-current="page"
   ========================================================== */
(function () {
  "use strict";

  function lastSegment(pathname) {
    if (!pathname) return "index.html";
    var parts = pathname.split("/").filter(Boolean);
    var last = parts.length ? parts[parts.length - 1] : "";
    return last || "index.html";
  }

  function isSkippableHref(href) {
    if (!href) return true;
    var h = href.trim().toLowerCase();
    return (
      h === "" ||
      h.startsWith("tel:") ||
      h.startsWith("mailto:") ||
      h.startsWith("javascript:") ||
      h.startsWith("http:") ||
      h.startsWith("https:")
    );
  }

  function clearActive(links) {
    for (var i = 0; i < links.length; i++) {
      links[i].classList.remove("is-active", "active");
      links[i].removeAttribute("aria-current");
    }
  }

  function markActive(link) {
    if (!link) return;
    link.classList.add("is-active", "active");
    link.setAttribute("aria-current", "page");
  }

  function pickBestMatch(candidates, currHash) {
    if (!candidates.length) return null;

    // Prefer exact hash match when hash exists
    if (currHash) {
      for (var i = 0; i < candidates.length; i++) {
        if (candidates[i]._hash === currHash) return candidates[i]._el;
      }
    }
    // Prefer link without hash (page root)
    for (var j = 0; j < candidates.length; j++) {
      if (!candidates[j]._hash) return candidates[j]._el;
    }
    return candidates[0]._el;
  }

  function updateActive() {
    var menu = document.querySelector("#sidebar #menu");
    if (!menu) return;

    var links = menu.querySelectorAll("a[href]");
    if (!links || !links.length) return;

    var curr = new URL(window.location.href);
    var currBase = lastSegment(curr.pathname);
    var currHash = curr.hash || "";

    if (currBase === "/" || currBase === "") currBase = "index.html";

    clearActive(links);

    var candidates = [];
    for (var i = 0; i < links.length; i++) {
      var el = links[i];
      var rawHref = el.getAttribute("href") || "";
      if (isSkippableHref(rawHref)) continue;

      var u;
      try { u = new URL(rawHref, window.location.href); } catch (e) { continue; }

      var base = lastSegment(u.pathname);
      if (base === "/" || base === "") base = "index.html";

      if (base === currBase) {
        candidates.push({ _el: el, _hash: u.hash || "" });
      }
    }

    var best = pickBestMatch(candidates, currHash);
    markActive(best);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateActive);
  } else {
    updateActive();
  }

  window.addEventListener("hashchange", updateActive);
  window.addEventListener("popstate", updateActive);

  window.KH_UPDATE_ACTIVE = updateActive;
})();
