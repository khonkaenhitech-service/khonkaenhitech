/* ==========================================================
   KH CURRENT TAB (Sidebar Active Link)
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

    // 1) If current has hash, prefer exact hash match
    if (currHash) {
      for (var i = 0; i < candidates.length; i++) {
        if (candidates[i]._hash === currHash) return candidates[i]._el;
      }
    }

    // 2) Prefer link without hash (page root)
    for (var j = 0; j < candidates.length; j++) {
      if (!candidates[j]._hash) return candidates[j]._el;
    }

    // 3) Fallback first
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

    // Support hosting at / (no filename) -> treat as index.html
    if (currBase === "/" || currBase === "") currBase = "index.html";

    clearActive(links);

    var candidates = [];
    for (var i = 0; i < links.length; i++) {
      var el = links[i];
      var rawHref = el.getAttribute("href") || "";
      if (isSkippableHref(rawHref)) continue;

      // Resolve relative href safely
      var u;
      try {
        u = new URL(rawHref, window.location.href);
      } catch (e) {
        continue;
      }

      var base = lastSegment(u.pathname);
      if (base === "/" || base === "") base = "index.html";

      // Match only same page
      if (base === currBase) {
        candidates.push({ _el: el, _hash: u.hash || "" });
      }
    }

    var best = pickBestMatch(candidates, currHash);
    markActive(best);
  }

  // Run on load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateActive);
  } else {
    updateActive();
  }

  // Update when hash changes (same page sections)
  window.addEventListener("hashchange", updateActive);

  // Update when browser navigation changes
  window.addEventListener("popstate", updateActive);

  // If your template toggles content dynamically and links are injected,
  // you can call window.KH_UPDATE_ACTIVE() manually.
  window.KH_UPDATE_ACTIVE = updateActive;
})();

