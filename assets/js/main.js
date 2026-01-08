/* KHON KAEN HITECH: MASTER SCRIPT */
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. อัปเดตปีปัจจุบันอัตโนมัติ (Copyright)
    const yearSpan = document.getElementById('y');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();

    // 2. SEO Auto-Alt: เติมคำอธิบายรูปภาพให้ Google อ่านออก
    document.querySelectorAll('img').forEach(img => {
        if (!img.alt) img.alt = "ช่างขอนแก่น ซ่อมไฟ กล้องวงจรปิด ระบบหยอดเหรียญ";
        img.loading = "lazy"; // ทำให้เว็บโหลดไว
    });

    // 3. Inject FAQ (คำถามปิดการขาย) ลงในทุกหน้าที่มี Footer
    const footer = document.getElementById('footer');
    if (footer && !document.getElementById('auto-faq')) {
        const faqDiv = document.createElement('section');
        faqDiv.id = 'auto-faq';
        faqDiv.style.cssText = "margin-top:40px; padding:30px; background:#fff9f9; border-top:4px solid #d32f2f;";
        faqDiv.innerHTML = `
            <header class="main" style="text-align:center;">
                <h3><i class="icon solid fa-shield-alt"></i> ทำไมต้องจ้าง ขอนแก่นไฮเทค?</h3>
            </header>
            <div class="row">
                <div class="col-6 col-12-small">
                    <h4>✅ ไม่ทิ้งงาน 100%</h4>
                    <p>มีหน้าร้านจริงในเมืองขอนแก่น ตามตัวได้ มีประกันงานซ่อม ไม่ใช่ช่างฟรีแลนซ์ขาจร</p>
                </div>
                <div class="col-6 col-12-small">
                    <h4>✅ ราคามาตรฐาน</h4>
                    <p>แจ้งราคาก่อนทำ ไม่มีบวกเพิ่มหน้างาน งบไม่บานปลาย</p>
                </div>
            </div>
            <div style="text-align:center; margin-top:20px;">
                <a href="tel:+66944749874" class="button primary">โทรปรึกษาฟรี 094-474-9874</a>
            </div>
        `;
        footer.parentNode.insertBefore(faqDiv, footer);
    }
});
