
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
