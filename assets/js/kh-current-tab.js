/* ==========================================================================
   KH CURRENT TAB + GLOBAL HEADER INJECTOR
   - Highlight current menu item (#menu) on every page
   - Ensure header logo + icons exist on every page
   ========================================================================== */

(function () {
  function cleanUrl(u) {
    return (u || "").split("#")[0].split("?")[0];
  }

  function getCurrentFile() {
    let file = (location.pathname.split("/").pop() || "").toLowerCase();
    if (!file) file = "index.html";
    return file;
  }

  function ensureHeader() {
    const header = document.getElementById("header");
    if (!header) return;

    // --- LOGO ---
    let logo = header.querySelector("a.logo");
    if (!logo) {
      logo = document.createElement("a");
      logo.className = "logo";
      logo.href = "index.html";
      header.prepend(logo);
    }

    let strong = logo.querySelector("strong");
    if (!strong) {
      strong = document.createElement("strong");
      strong.textContent = "ขอนแก่นไฮเทค";
      logo.appendChild(strong);
    }

    // ใส่ <img> ถ้ายังไม่มี
    let img = logo.querySelector("img");
    if (!img) {
      img = document.createElement("img");
      img.src = "images/logo-khonkaen.webp";
      img.alt = "โลโก้ ขอนแก่นไฮเทค";
      img.loading = "eager";
      img.decoding = "async";
      logo.insertBefore(img, strong);
    }

    // --- ICONS ---
    let icons = header.querySelector("ul.icons");
    if (!icons) {
      icons = document.createElement("ul");
      icons.className = "icons";
      header.appendChild(icons);
    }

    // ถ้าว่าง -> เติม 3 ไอคอน
    if (icons.children.length === 0) {
      icons.innerHTML = `
        <li>
          <a href="tel:+66944749874" class="icon solid fa-phone" aria-label="โทร" title="โทร 094-474-9874">
            <span class="label">โทร</span>
          </a>
        </li>
        <li>
          <a href="https://line.me/ti/p/~KKHITECH" class="icon brands fa-line" aria-label="LINE" title="LINE: KKHITECH">
            <span class="label">LINE</span>
          </a>
        </li>
        <li>
          <a href="https://maps.app.goo.gl/LyV85313vknT4hBE6" class="icon solid fa-map-marker-alt" aria-label="แผนที่" title="Google Maps">
            <span class="label">แผนที่</span>
          </a>
        </li>
      `;
    }
  }

  function enhanceMenuContacts() {
    const menu = document.querySelector("#menu");
    if (!menu) return;

    const links = menu.querySelectorAll('a[href]');
    links.forEach(a => {
      const href = a.getAttribute("href") || "";
      const h = href.toLowerCase();

      // ทำปุ่มเฉพาะลิงก์ติดต่อ
      const isTel = h.startsWith("tel:");
      const isLine = h.includes("line.me/");
      const isFb = h.includes("facebook.com");
      const isMap = h.includes("maps.app.goo.gl") || h.includes("google.com/maps");

      if (!(isTel || isLine || isFb || isMap)) return;

      // ใส่ class button ถ้ายังไม่มี
      if (!a.classList.contains("button")) a.classList.add("button");

      // ใส่สี + ไอคอน
      if (isTel) {
        a.classList.add("btn-tel");
        if (!a.querySelector(".icon")) a.insertAdjacentHTML("afterbegin", `<span class="icon solid fa-phone"></span>`);
      } else if (isLine) {
        a.classList.add("btn-line");
        if (!a.querySelector(".icon")) a.insertAdjacentHTML("afterbegin", `<span class="icon brands fa-line"></span>`);
      } else if (isFb) {
        a.classList.add("btn-fb");
        if (!a.querySelector(".icon")) a.insertAdjacentHTML("afterbegin", `<span class="icon brands fa-facebook-f"></span>`);
      } else if (isMap) {
        a.classList.add("btn-map");
        if (!a.querySelector(".icon")) a.insertAdjacentHTML("afterbegin", `<span class="icon solid fa-map-marker-alt"></span>`);
      }
    });
  }

  function setActiveMenu() {
    const file = getCurrentFile();
    const links = document.querySelectorAll("#menu a[href]");

    links.forEach(a => {
      const href = a.getAttribute("href") || "";
      const h = href.toLowerCase();

      // ข้ามลิงก์ภายนอก/โทร/ไลน์/แฮช
      if (h.startsWith("http") || h.startsWith("tel:") || h.startsWith("mailto:") || h.startsWith("#")) return;

      const cleaned = cleanUrl(href);
      let target = (cleaned.split("/").pop() || "").toLowerCase();
      if (!target) target = "index.html";

      // reset ก่อน
      a.classList.remove("active");
      a.removeAttribute("aria-current");
      const li0 = a.closest("li");
      if (li0) li0.classList.remove("active");

      // set active
      if (target === file) {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
        const li = a.closest("li");
        if (li) li.classList.add("active");
      }
    });
  }

  function init() {
    ensureHeader();
    enhanceMenuContacts();
    setActiveMenu();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
