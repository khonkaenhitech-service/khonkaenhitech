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

	// Stops animations/transitions until the page has ...
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Menu.
		var $sidebar = $('#sidebar'),
			$sidebar_inner = $sidebar.children('.inner');

		// Inerts hack.
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
   GLOBAL WIDGET INJECTOR (Professional System)
   ระบบสร้างปุ่มอัตโนมัติ เขียนที่เดียว โผล่ทุกหน้า (SEO Friendly)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. ตรวจสอบว่าหน้าจอขนาดไหน (Mobile vs PC)
    const isMobile = window.innerWidth <= 768;
    const body = document.body;

    // ข้อมูลลิขสิทธิ์อัตโนมัติ (Footer)
    const yearSpan = document.getElementById('y');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();

    // -----------------------------------------------------
    // A. สร้างปุ่มลอยด้านขวา (Desktop Floating Widget)
    // -----------------------------------------------------
    if (!isMobile) {
        const floatDiv = document.createElement('div');
        floatDiv.className = 'kh-social-float';
        // ใช้ innerHTML สร้างปุ่มรวดเดียว
        floatDiv.innerHTML = `
            <a href="tel:+66944749874" class="kh-app-btn btn-tel-color" data-label="โทรหาช่างเดี๋ยวนี้ (ด่วน)"><i class="icon solid fa-phone"></i></a>
            <a href="https://line.me/ti/p/~KKHITECH" target="_blank" class="kh-app-btn btn-line-color" data-label="ส่งรูปหน้างาน (LINE)"><i class="icon brands fa-line"></i></a>
            <a href="https://m.me/Line0944749874" target="_blank" class="kh-app-btn btn-repair-color" data-label="แจ้งซ่อมด่วน (24ชม.)"><i class="icon solid fa-tools"></i></a>
            <a href="https://www.facebook.com/Line0944749874" target="_blank" class="kh-app-btn btn-fb-color" data-label="ดูรีวิวผลงาน"><i class="icon brands fa-facebook-f"></i></a>
        `;
        body.appendChild(floatDiv);
    }

    // -----------------------------------------------------
    // B. สร้างแถบเมนูติดล่าง (Mobile Sticky Bar)
    // -----------------------------------------------------
    if (isMobile) {
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

    // -----------------------------------------------------
    // C. DARK PSYCHOLOGY OPTIMIZER (เพิ่มประสิทธิภาพ SEO & Sales)
    // -----------------------------------------------------
    
    // 1. เติม Alt Text ให้รูปภาพ (SEO) - บอทชอบมาก
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('alt') || img.getAttribute('alt') === '') {
            img.setAttribute('alt', 'บริการช่างขอนแก่น ซ่อมไฟ กล้องวงจรปิด ระบบหยอดเหรียญ');
        }
        // Lazy Load ให้เว็บโหลดไว
        img.setAttribute('loading', 'lazy');
    });

    // 2. ป้องกันคลิกขวาดูรูป (Basic Protection) - ทำให้ดู Professional/Private
    // body.addEventListener('contextmenu', event => event.preventDefault()); (เลือกเปิด/ปิดได้)

    console.log("KHON KAEN HITECH SYSTEM: Loaded Successfully.");
});
