document.addEventListener("DOMContentLoaded", () => {
  // 1) หา container ของหน้าเพื่อ "ฉีด" แท็บเข้าไปอัตโนมัติ
  const inner =
    document.querySelector("#main .inner") ||
    document.querySelector("#main") ||
    document.body;

  if (!inner) return;

  // 2) ถ้ายังไม่มีแท็บ ให้สร้างและแทรกไว้บนสุดของคอนเทนต์
  if (!document.querySelector(".kh-loc")) {
    const wrap = document.createElement("div");
    wrap.innerHTML = `
      <div class="kh-loc" role="navigation" aria-label="ตำแหน่งปัจจุบัน">
        <div class="kh-loc__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M12 2c-3.86 0-7 3.14-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/>
          </svg>
        </div>
        <div class="kh-loc__text">
          <div class="kh-loc__kicker">คุณอยู่ที่</div>
          <div class="kh-loc__title" id="khCurrentPage">กำลังโหลด…</div>
        </div>
        <a class="kh-loc__cta" href="#menu">ดูเมนู</a>
      </div>
    `.trim();

    // แทรกไว้บนสุดของคอนเทนต์
    inner.insertBefore(wrap.firstChild, inner.firstChild);
  }

  const out = document.getElementById("khCurrentPage");
  if (!out) return;

  // 3) หาเมนู/ลิงก์ที่ตรงกับหน้าปัจจุบัน เพื่อเอาชื่อมาโชว์ + ไฮไลต์
  const menu = document.querySelector("#menu");
  const links = menu ? Array.from(menu.querySelectorAll("a")) : [];

  const currentFile = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

  const clearActive = () => {
    if (!menu) return;
    menu.querySelectorAll("li.active").forEach(li => li.classList.remove("active"));
    menu.querySelectorAll("a.active").forEach(a => a.classList.remove("active"));
  };

  const getParentLabel = (a) => {
    const li = a.closest("li");
    const parentUL = li ? li.closest("ul") : null;
    const parentLI = parentUL ? parentUL.closest("li") : null;
    const opener = parentLI ? parentLI.querySelector(".opener") : null;
    return opener ? opener.textContent.trim() : "";
  };

  let activeLink = null;

  for (const a of links) {
    const href = (a.getAttribute("href") || "").trim();
    if (!href) continue;

    // ข้ามลิงก์นอก
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;

    // เอาแค่ชื่อไฟล์มาเทียบ (กันกรณีอยู่ในโฟลเดอร์)
    const hrefFile = href.split("#")[0].split("?")[0].split("/").pop()?.toLowerCase();
    if (hrefFile && hrefFile === currentFile) {
      activeLink = a;
      break;
    }
  }

  // fallback: ใช้หัวข้อ h1/h2 ถ้าไม่มีเมนูให้เทียบ
  const fallbackTitle =
    document.querySelector("h1")?.textContent?.trim() ||
    document.querySelector("h2")?.textContent?.trim() ||
    "หน้าหลัก";

  clearActive();

  if (activeLink) {
    const label = activeLink.textContent.trim();
    const parent = getParentLabel(activeLink);

    out.innerHTML = parent
      ? `${escapeHtml(parent)} <span class="kh-sep">›</span> ${escapeHtml(label)}`
      : escapeHtml(label);

    // ไฮไลต์เมนู
    activeLink.classList.add("active");
    const li = activeLink.closest("li");
    if (li) li.classList.add("active");

    const parentLI = li?.closest("ul")?.closest("li");
    if (parentLI) parentLI.classList.add("active");
  } else {
    out.textContent = fallbackTitle;
  }

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, s => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[s]));
  }
});

/* ===== Reviews Auto Marquee ===== */
document.addEventListener("DOMContentLoaded", () => {
  // 1) สุ่มชื่อผู้เขียนรีวิว (สลับกันแบบ random)
  const pool = [
    "ช่างแม็ก · ช่างประจำร้าน ขอนแก่นไฮเทค",
    "คุณเหมียว · ฝ่ายขาย ขอนแก่นไฮเทค",
    "ทีมขอนแก่นไฮเทค · แอดมิน/ทีมงาน"
  ];

  document.querySelectorAll("[data-review-by]").forEach((el) => {
    const pick = pool[Math.floor(Math.random() * pool.length)];
    el.textContent = pick;
  });

  // 2) ทำรีวิวเลื่อนอัตโนมัติแบบลื่น (แนวตั้ง)
  const marquee = document.getElementById("khReviewsMarquee");
  const track = document.getElementById("khReviewsTrack");
  if (!marquee || !track) return;

  let resizeTimer = null;

  const setupMarquee = () => {
    // ลบ clone เก่า (กันซ้ำ)
    track.querySelectorAll('[data-clone="1"]').forEach((n) => n.remove());

    const items = Array.from(track.children);
    if (items.length < 2) return;

    // วัดความสูง "ชุดจริง" ก่อนทำซ้ำ
    const originalHeight = track.scrollHeight;

    // ทำซ้ำอีก 1 รอบ เพื่อเลื่อนวนเนียน
    items.forEach((node) => {
      const clone = node.cloneNode(true);
      clone.setAttribute("data-clone", "1");
      track.appendChild(clone);
    });

    marquee.style.setProperty("--kh-marquee-h", `${originalHeight}px`);

    // ตั้งความเร็ว: px ต่อวินาที (เลขน้อย = ช้า, เลขมาก = เร็ว)
    const pxPerSec = 45;
    const dur = Math.max(18, originalHeight / pxPerSec);
    marquee.style.setProperty("--kh-marquee-dur", `${dur}s`);
  };

  setupMarquee();

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setupMarquee, 160);
  });

  marquee.addEventListener(
    "touchstart",
    () => {
      marquee.classList.add("is-paused");
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => marquee.classList.remove("is-paused"), 2500);
    },
    { passive: true }
  );
});
