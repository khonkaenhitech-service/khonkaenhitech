/* REVIEWS AUTO SCROLL */
document.addEventListener("DOMContentLoaded", () => {
  const marquee = document.getElementById("khReviewsMarquee");
  const track = document.getElementById("khReviewsTrack");
  
  if (!marquee || !track) return;

  // Clone รีวิวเพื่อให้เลื่อนวนลูปได้ไม่สะดุด
  const items = Array.from(track.children);
  items.forEach(item => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
  });

  // CSS Animation ถูกควบคุมใน style.css หรือ inline style
  // (ไฟล์นี้ทำหน้าที่ Clone content ให้เต็มพื้นที่)
});
