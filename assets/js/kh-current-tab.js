/* ===== Reviews Auto Marquee (Fixed + Smooth) ===== */
document.addEventListener("DOMContentLoaded", () => {
  // ลดปัญหา motion สำหรับคนแพ้แอนิเมชัน
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduceMotion) return;

  // 1) สุ่มชื่อผู้เขียนรีวิว (ทำเฉพาะของจริง ไม่ยุ่งกับ clone)
  const pool = [
    "ช่างแม็ก · ช่างประจำร้าน ขอนแก่นไฮเทค",
    "คุณเหมียว · ฝ่ายขาย ขอนแก่นไฮเทค",
    "ทีมขอนแก่นไฮเทค · แอดมิน/ทีมงาน"
  ];

  document.querySelectorAll("[data-review-by]").forEach((el) => {
    // กันกรณีมันเป็น clone
    if (el.closest('[data-clone="1"]')) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    el.textContent = pick;
  });

  // 2) Marquee (แนวตั้ง)
  const marquee = document.getElementById("khReviewsMarquee");
  const track = document.getElementById("khReviewsTrack");
  if (!marquee || !track) return;

  let timer = null;

  const clearClones = () => {
    track.querySelectorAll('[data-clone="1"]').forEach(n => n.remove());
  };

  const setupMarquee = () => {
    clearClones();

    const originals = Array.from(track.children);
    if (originals.length < 2) return;

    // รอให้ layout เซ็ตตัวก่อนค่อยวัด (กันกระตุก)
    requestAnimationFrame(() => {
      const originalHeight = track.scrollHeight;
      const viewH = marquee.clientHeight || 0;

      // ถ้า content น้อย ให้ clone เพิ่มจน “วนไม่เห็นช่องว่าง”
      const frag = document.createDocumentFragment();
      let guard = 0;

      while (track.scrollHeight < viewH + originalHeight && guard < 8) {
        originals.forEach((node) => {
          const c = node.cloneNode(true);
          c.setAttribute("data-clone", "1");
          frag.appendChild(c);
        });
        track.appendChild(frag.cloneNode(true)); // เพิ่มเป็นชุดๆ
        guard++;
      }

      // ตั้งค่าระยะเลื่อน = ความสูงของ “ชุดจริง” เท่านั้น
      marquee.style.setProperty("--kh-marquee-h", `${originalHeight}px`);

      // ตั้งความเร็ว (px ต่อวินาที)
      const pxPerSec = 42; // ปรับได้: 35 ช้า / 50 เร็ว
      const dur = Math.max(18, originalHeight / pxPerSec);
      marquee.style.setProperty("--kh-marquee-dur", `${dur}s`);
    });
  };

  // ทำครั้งแรก
  setupMarquee();

  // 3) ใช้ ResizeObserver เนียนกว่า resize ธรรมดา (ฟอนต์/รูปโหลดแล้วก็จับได้)
  const ro = new ResizeObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(setupMarquee, 160);
  });
  ro.observe(marquee);
  ro.observe(track);

  // 4) เผื่อรูปในรีวิวโหลดทีหลัง (กันความสูงเปลี่ยน)
  window.addEventListener("load", () => {
    clearTimeout(timer);
    timer = setTimeout(setupMarquee, 120);
  });

  // 5) แตะหน้าจอให้หยุดชั่วคราว (มือถือ)
  marquee.addEventListener("touchstart", () => {
    marquee.classList.add("is-paused");
    clearTimeout(timer);
    timer = setTimeout(() => marquee.classList.remove("is-paused"), 2500);
  }, { passive: true });
});
