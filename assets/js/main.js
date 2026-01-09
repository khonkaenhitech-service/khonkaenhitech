/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$head = $('head'),
		$body = $('body');

	// Breakpoints.
	breakpoints({
		xlarge:   [ '1281px',  '1680px' ],
		large:    [ '981px',   '1280px' ],
		medium:   [ '737px',   '980px'  ],
		small:    [ '481px',   '736px'  ],
		xsmall:   [ null,      '480px'  ],
		'xlarge-to-max':    '(min-width: 1681px)',
		'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
	});

	// Stops animations/transitions until the page has loaded.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Sidebar Menu Toggle
	var $sidebar = $('#sidebar'),
		$sidebar_inner = $sidebar.children('.inner');

	// Inerts hack for menu
	var $menu = $('#menu'),
		$menu_openers = $menu.children('ul').find('.opener');

	$menu_openers.each(function() {
		var $this = $(this);
		$this.on('click', function(event) {
			event.preventDefault();
			$menu_openers.not($this).removeClass('active');
			$this.toggleClass('active');
			$window.triggerHandler('resize.sidebar-lock');
		});
	});

})(jQuery);

/* ==========================================================================
   KHON KAEN HITECH: GLOBAL INJECTOR SYSTEM (PRO EDITION)
   ระบบแทรกโค้ดอัตโนมัติ: ปุ่มลอย, FAQ จิตวิทยา, และ SEO
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function() {
    
    const body = document.body;
    const isMobile = window.innerWidth <= 768;

    // --- 1. อัปเดตปีลิขสิทธิ์อัตโนมัติ ---
    const yearSpan = document.getElementById('y');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();

    // --- 2. สร้างปุ่มลอย (Floating Widgets) แบบจิตวิทยา ---
    // ใช้คำกระตุ้นความกลัว (Fear) และ ความเร่งด่วน (Urgency)
    
    if (!isMobile) {
        // [Desktop Version]
        const floatDiv = document.createElement('div');
        floatDiv.className = 'kh-social-float';
        floatDiv.innerHTML = `
            <a href="tel:+66944749874" class="kh-app-btn btn-tel-color" data-label="โทรปรึกษา (ก่อนปัญหาลุกลาม)"><i class="icon solid fa-phone"></i></a>
            <a href="https://line.me/ti/p/~KKHITECH" target="_blank" class="kh-app-btn btn-line-color" data-label="ส่งรูปประเมินราคา (ฟรี)"><i class="icon brands fa-line"></i></a>
            <a href="https://m.me/Line0944749874" target="_blank" class="kh-app-btn btn-repair-color" data-label="แจ้งซ่อมด่วน (ลัดคิว)"><i class="icon solid fa-tools"></i></a>
            <a href="https://www.facebook.com/Line0944749874" target="_blank" class="kh-app-btn btn-fb-color" data-label="ดูรีวิวลูกค้าจริง"><i class="icon brands fa-facebook-f"></i></a>
        `;
        body.appendChild(floatDiv);
    } else {
        // [Mobile Version] Sticky Bar ด้านล่าง
        const mobDiv = document.createElement('div');
        mobDiv.className = 'mobile-action-bar';
        mobDiv.innerHTML = `
            <a href="tel:+66944749874" class="action-btn btn-tel-color">
                <i class="icon solid fa-phone-alt"></i> โทรเลย
            </a>
            <a href="https://line.me/ti/p/~KKHITECH" class="action-btn btn-line-color" target="_blank">
                <i class="icon brands fa-line"></i> ไลน์
            </a>
            <a href="https://m.me/Line0944749874" class="action-btn btn-repair-color" target="_blank">
                <i class="icon solid fa-tools"></i> ซ่อมด่วน
            </a>
            <a href="https://www.facebook.com/Line0944749874" class="action-btn btn-fb-color" target="_blank">
                <i class="icon brands fa-facebook-f"></i> เพจ
            </a>
        `;
        body.appendChild(mobDiv);
    }

    // --- 3. AUTO-INJECT FAQ (คำถามปิดการขายแบบจิตวิทยา) ---
    // ใส่ไว้ก่อน Footer ทุกหน้า เพื่อดักลูกค้าที่ลังเล และเพิ่ม SEO Keyword
    
    const footer = document.getElementById('footer');
    if (footer) { // ถ้ามี footer ค่อยใส่
        const faqSection = document.createElement('section');
        faqSection.id = 'auto-faq';
        faqSection.style.borderTop = '5px solid var(--gold)';
        faqSection.style.backgroundColor = '#fff';
        faqSection.style.padding = '40px 20px';
        faqSection.style.marginTop = '40px';
        
        faqSection.innerHTML = `
            <header class="main" style="text-align:center; max-width:800px; margin:0 auto;">
                <h2>ถาม-ตอบ: ทำไมต้องจ้างเรา? (อ่านก่อนตัดสินใจ)</h2>
                <p style="color:#d32f2f; font-weight:bold;">⚠️ อย่าเสี่ยงกับช่างราคาถูก ที่อาจทิ้งงานหรือทำบ้านไฟไหม้!</p>
            </header>
            <div class="faq-container" style="max-width:900px; margin:30px auto; display:grid; gap:20px;">
                
                <div class="faq-item" style="background:#f9f9f9; padding:20px; border-radius:10px; border-left:4px solid #d32f2f;">
                    <h3 style="margin-bottom:10px; font-size:1.1em; color:#000;">
                        <i class="icon solid fa-bolt" style="color:#d32f2f;"></i> ราคาแพงกว่าช่างทั่วไปไหม?
                    </h3>
                    <p style="margin:0;">
                        <strong>ตอบตรงๆ:</strong> เราไม่ใช่ช่างที่ถูกที่สุด แต่เรา <strong>"คุ้มค่าที่สุด"</strong> ครับ 
                        ช่างทั่วไปอาจคิดถูกแต่ใช้อุปกรณ์เกรดต่ำ (เสี่ยงไฟช็อต/น้ำรั่วใน 3 เดือน) 
                        แต่เราใช้ของแท้เกรด A มี มอก. เท่านั้น <em>"เจ็บแต่จบ ดีกว่าเสียน้อยเสียยากครับ"</em>
                    </p>
                </div>

                <div class="faq-item" style="background:#f9f9f9; padding:20px; border-radius:10px; border-left:4px solid var(--gold);">
                    <h3 style="margin-bottom:10px; font-size:1.1em; color:#000;">
                        <i class="icon solid fa-user-shield" style="color:var(--gold);"></i> กลัวช่างทิ้งงาน เบิกเงินแล้วหนี?
                    </h3>
                    <p style="margin:0;">
                        <strong>ตอบ:</strong> สบายใจได้ครับ เรามี <strong>"หน้าร้านจริงในขอนแก่น"</strong> ตามตัวได้ตลอด 
                        มีฐานลูกค้ากว่า 500 ราย ไม่ใช่ช่างฟรีแลนซ์ที่เปลี่ยนเบอร์หนีได้ เราทำธุรกิจระยะยาวครับ
                    </p>
                </div>

                <div class="faq-item" style="background:#f9f9f9; padding:20px; border-radius:10px; border-left:4px solid #2ecc71;">
                    <h3 style="margin-bottom:10px; font-size:1.1em; color:#000;">
                        <i class="icon solid fa-clock" style="color:#2ecc71;"></i> นานไหมกว่าช่างจะเข้า?
                    </h3>
                    <p style="margin:0;">
                        <strong>ตอบ:</strong> เรามีทีมช่างแสตนบายพร้อมรถบริการ 
                        หากคิวว่าง <strong>"เราเข้าหน้างานทันทีภายใน 1-2 ชม."</strong> 
                        (แนะนำให้โทรจองคิวก่อนช่วงเช้า เพื่อความชัวร์ครับ)
                    </p>
                </div>

            </div>
            <div style="text-align:center; margin-top:30px;">
                <a href="tel:+66944749874" class="button primary big" style="box-shadow: 0 10px 20px rgba(168,121,16,0.3);">
                    <i class="icon solid fa-phone-volume"></i> อย่ารอให้ปัญหาบานปลาย โทรเลย!
                </a>
            </div>
        `;
        
        // แทรก FAQ ไปไว้ก่อน Footer
        footer.parentNode.insertBefore(faqSection, footer);
    }

    // --- 4. SEO OPTIMIZER (เติม Alt Text อัตโนมัติ) ---
    // ช่วยให้ Google เข้าใจรูปภาพ โดยไม่ต้องแก้ HTML ทีละรูป
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('alt') || img.getAttribute('alt').trim() === '') {
            img.setAttribute('alt', 'ช่างขอนแก่น ซ่อมไฟ กล้องวงจรปิด ระบบหยอดเหรียญ ขอนแก่นไฮเทค');
        }
        // เพิ่ม Lazy Loading ให้เว็บโหลดไว
        img.setAttribute('loading', 'lazy');
    });

    console.log("Khon Kaen Hitech System: Fully Loaded (Widgets + FAQ + SEO)");
});
