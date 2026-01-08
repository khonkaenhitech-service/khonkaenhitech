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
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ],
			'xlarge-to-max':    '(min-width: 1681px)',
			'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
		});

	// Stops animations/transitions until the page has ...

		// ... loaded.
			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-preload');
				}, 100);
			});

		// ... stopped resizing.
			var resizeTimeout;

			$window.on('resize', function() {

				// Mark as resizing.
					$body.addClass('is-resizing');

				// Unmark after delay.
					clearTimeout(resizeTimeout);

					resizeTimeout = setTimeout(function() {
						$body.removeClass('is-resizing');
					}, 100);

			});

	// Fixes.

		// Object fit images.
			if (!browser.canUse('object-fit')
			||	browser.name == 'safari')
				$('.image.object').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Hide original image.
						$img.css('opacity', '0');

					// Set background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
							.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

				});

	// Sidebar.
		var $sidebar = $('#sidebar'),
			$sidebar_inner = $sidebar.children('.inner');

		// Inactive by default on <= large.
			breakpoints.on('<=large', function() {
				$sidebar.addClass('inactive');
			});

			breakpoints.on('>large', function() {
				$sidebar.removeClass('inactive');
			});

		// Hack: Workaround for Chrome/Android scrollbar position bug.
			if (browser.os == 'android'
			&&	browser.name == 'chrome')
				$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
					.appendTo($head);

		// Toggle.
			$('<a href="#sidebar" class="toggle">Toggle</a>')
				.appendTo($sidebar)
				.on('click', function(event) {

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Toggle.
						$sidebar.toggleClass('inactive');

				});

		// Events.

			// Link clicks.
				$sidebar.on('click', 'a', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Vars.
						var $a = $(this),
							href = $a.attr('href'),
							target = $a.attr('target');

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Check URL.
						if (!href || href == '#' || href == '')
							return;

					// Hide sidebar.
						$sidebar.addClass('inactive');

					// Redirect to href.
						setTimeout(function() {

							if (target == '_blank')
								window.open(href);
							else
								window.location.href = href;

						}, 500);

				});

			// Prevent certain events inside the panel from bubbling.
				$sidebar.on('click touchend touchstart touchmove', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Prevent propagation.
						event.stopPropagation();

				});

			// Hide panel on body click/tap.
				$body.on('click touchend', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Deactivate.
						$sidebar.addClass('inactive');

				});

		// Scroll lock.
		// Note: If you do anything to change the height of the sidebar's content, be sure to
		// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

			$window.on('load.sidebar-lock', function() {

				var sh, wh, st;

				// Reset scroll position to 0 if it's 1.
					if ($window.scrollTop() == 1)
						$window.scrollTop(0);

				$window
					.on('scroll.sidebar-lock', function() {

						var x, y;

						// <=large? Bail.
							if (breakpoints.active('<=large')) {

								$sidebar_inner
									.data('locked', 0)
									.css('position', '')
									.css('top', '');

								return;

							}

						// Calculate positions.
							x = Math.max(sh - wh, 0);
							y = Math.max(0, $window.scrollTop() - x);

						// Lock/unlock.
							if ($sidebar_inner.data('locked') == 1) {

								if (y <= 0)
									$sidebar_inner
										.data('locked', 0)
										.css('position', '')
										.css('top', '');
								else
									$sidebar_inner
										.css('top', -1 * x);

							}
							else {

								if (y > 0)
									$sidebar_inner
										.data('locked', 1)
										.css('position', 'fixed')
										.css('top', -1 * x);

							}

					})
					.on('resize.sidebar-lock', function() {

						// Calculate heights.
							wh = $window.height();
							sh = $sidebar_inner.outerHeight() + 30;

						// Trigger scroll.
							$window.trigger('scroll.sidebar-lock');

					})
					.trigger('resize.sidebar-lock');

				});

	// Menu.
		var $menu = $('#menu'),
			$menu_openers = $menu.children('ul').find('.opener');

		// Openers.
			$menu_openers.each(function() {

				var $this = $(this);

				$this.on('click', function(event) {

					// Prevent default.
						event.preventDefault();

					// Toggle.
						$menu_openers.not($this).removeClass('active');
						$this.toggleClass('active');

					// Trigger resize (sidebar lock).
						$window.triggerHandler('resize.sidebar-lock');

				});

			});


	/* =========================================================
	   KH - Quick Contact Pills (Apply to every page)
	   - Turns "ติดต่อด่วน" links into 4 capsule buttons (Tel/LINE/FB/Maps)
	   - Works even if some pages have plain <a> links
	   ========================================================= */
	(function() {
		// Prevent double init.
		if (window.__khQuickContactPills) return;
		window.__khQuickContactPills = true;

		var $menu = $('#menu');
		if ($menu.length === 0) return;

		var $ul = $menu.children('ul');
		if ($ul.length === 0) $ul = $menu.find('ul').first();
		if ($ul.length === 0) return;

		// Inject CSS once (so you don't need to edit style.css for this feature).
		if ($('#khQuickContactPillsStyle').length === 0) {
			$('<style id="khQuickContactPillsStyle">\
#menu ul li a.button.kh-qc{\
	width:100% !important;\
	display:flex !important;\
	flex-direction:column !important;\
	align-items:center !important;\
	justify-content:center !important;\
	gap:6px !important;\
	border:0 !important;\
	border-radius:999px !important;\
	padding:16px 12px !important;\
	margin:10px 0 0 0 !important;\
	line-height:1.15 !important;\
	font-weight:900 !important;\
	text-align:center !important;\
	box-shadow:0 10px 18px rgba(0,0,0,.14) !important;\
	letter-spacing:.2px !important;\
}\
#menu ul li a.button.kh-qc .icon{\
	margin:0 !important;\
	opacity:.95 !important;\
	font-size:18px !important;\
	line-height:1 !important;\
}\
#menu ul li a.button.kh-qc .kh-qc__txt{\
	display:block !important;\
	font-size:12px !important;\
	text-transform:uppercase !important;\
}\
/* Colors */\
#menu ul li a.button.kh-qc.btn-tel{background:#2c3e50 !important;color:#fff !important;}\
#menu ul li a.button.kh-qc.btn-line{background:#06c755 !important;color:#fff !important;}\
#menu ul li a.button.kh-qc.btn-fb{background:#1877f2 !important;color:#fff !important;}\
#menu ul li a.button.kh-qc.btn-map{background:#ea4335 !important;color:#fff !important;}\
#menu ul li a.button.kh-qc:hover{filter:brightness(1.05);}\
#menu ul li a.button.kh-qc:active{transform:scale(.98);}\
</style>').appendTo($head);
		}

		// Helpers
		function findHrefStartsWith(prefix) {
			var $a = $ul.find('a[href^="' + prefix + '"]').first();
			return $a.length ? $a.attr('href') : '';
		}
		function findHrefContains(part) {
			var $a = $ul.find('a[href*="' + part + '"]').first();
			return $a.length ? $a.attr('href') : '';
		}

		// Prefer existing links (if a page already has them), fallback to defaults.
		var telHref  = findHrefStartsWith('tel:') || 'tel:+66944749874';
		var lineHref = findHrefContains('line.me') || 'https://line.me/ti/p/~KKHITECH';
		var fbHref   = findHrefContains('facebook.com') || 'https://www.facebook.com/Line0944749874';
		var mapHref  = findHrefContains('maps.app.goo.gl') || findHrefContains('google.com/maps') || 'https://maps.app.goo.gl/LyV85313vknT4hBE6';

		// Display labels (ตามภาพ)
		var telLabel  = 'โทร: 094-474-9874';
		var lineLabel = 'LINE: KKHITECH';
		var fbLabel   = 'FACEBOOK PAGE';
		var mapLabel  = 'GOOGLE MAPS';

		// Find the divider "ติดต่อด่วน"
		var $divider = $ul.children('li.divider').filter(function() {
			return $(this).text().trim().indexOf('ติดต่อด่วน') !== -1;
		}).first();

		if ($divider.length === 0) {
			$divider = $('<li class="divider">ติดต่อด่วน</li>').appendTo($ul);
		}

		// Remove old items after divider until next divider
		var $cur = $divider.next();
		while ($cur.length && !$cur.hasClass('divider')) {
			var $next = $cur.next();
			$cur.remove();
			$cur = $next;
		}

		// Insert our 4 buttons right after divider
		function insertBtn(afterEl, href, btnClass, iconClass, label, newTab) {
			var $a = $('<a></a>')
				.attr('href', href)
				.addClass('button kh-qc ' + btnClass)
				.attr('aria-label', label);

			if (newTab) $a.attr('target','_blank').attr('rel','noopener');

			$a.append($('<span></span>').addClass('icon ' + iconClass));
			$a.append($('<span></span>').addClass('kh-qc__txt').text(label));

			var $li = $('<li></li>').append($a);
			$li.insertAfter(afterEl);
			return $li;
		}

		var $last = $divider;
		$last = insertBtn($last, telHref,  'btn-tel', 'solid fa-phone',          telLabel,  false);
		$last = insertBtn($last, lineHref, 'btn-line','brands fa-line',          lineLabel, false);
		$last = insertBtn($last, fbHref,   'btn-fb',  'brands fa-facebook-f',    fbLabel,   true);
		$last = insertBtn($last, mapHref,  'btn-map', 'solid fa-map-marker-alt', mapLabel,  true);

	})();

})(jQuery);


// KH Fix Logo Path (GitHub Pages project /khonkaenhitech/)
(function () {
  const ABS_LOGO = "/khonkaenhitech/images/logo-khonkaen.webp";

  function fixLogo() {
    const img = document.querySelector("#header .logo img");
    if (!img) return;

    const src = (img.getAttribute("src") || "").trim();

    // ถ้าเป็น relative ให้บังคับเป็น absolute
    if (src === "images/logo-khonkaen.webp" || src === "./images/logo-khonkaen.webp") {
      img.setAttribute("src", ABS_LOGO);
    }

    // ถ้าโหลดพัง ให้ fallback ไป absolute
    img.addEventListener("error", () => {
      img.src = ABS_LOGO;
    }, { once: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fixLogo);
  } else {
    fixLogo();
  }
})();


// ==============================
// KH: Ensure top-right header icons exist on every page
// ==============================
(function () {
  const ICONS_HTML = `
    <li>
      <a href="tel:+66944749874" class="icon solid fa-phone" title="โทร 094-474-9874">
        <span class="label">โทร</span>
      </a>
    </li>
    <li>
      <a href="https://line.me/ti/p/~KKHITECH" class="icon brands fa-line" title="LINE: KKHITECH">
        <span class="label">LINE</span>
      </a>
    </li>
    <li>
      <a href="https://maps.app.goo.gl/LyV85313vknT4hBE6" class="icon solid fa-map-marker-alt" title="Google Maps">
        <span class="label">แผนที่</span>
      </a>
    </li>
  `;

  function ensureHeaderIcons() {
    const header = document.querySelector("#header");
    if (!header) return;

    // หา UL.icons ถ้ามีอยู่แล้ว
    let ul = header.querySelector("ul.icons");

    // ถ้าไม่มี -> สร้างใหม่
    if (!ul) {
      ul = document.createElement("ul");
      ul.className = "icons";
      header.appendChild(ul);
    }

    // ถ้าว่าง/มีไม่ครบ -> เติมให้ครบ
    if (ul.querySelectorAll("li").length < 3) {
      ul.innerHTML = ICONS_HTML;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureHeaderIcons);
  } else {
    ensureHeaderIcons();
  }
})();

// KH: Ensure top-right header icons exist on every page
(function () {
  const ICONS_HTML = `
    <li>
      <a href="tel:+66944749874" class="icon solid fa-phone" title="โทร 094-474-9874">
        <span class="label">โทร</span>
      </a>
    </li>
    <li>
      <a href="https://line.me/ti/p/~KKHITECH" class="icon brands fa-line" title="LINE: KKHITECH">
        <span class="label">LINE</span>
      </a>
    </li>
    <li>
      <a href="https://maps.app.goo.gl/LyV85313vknT4hBE6" class="icon solid fa-map-marker-alt" title="Google Maps">
        <span class="label">แผนที่</span>
      </a>
    </li>
  `;

  function ensureHeaderIcons() {
    const header = document.querySelector("#header");
    if (!header) return;

    let ul = header.querySelector("ul.icons");
    if (!ul) {
      ul = document.createElement("ul");
      ul.className = "icons";
      header.appendChild(ul);
    }

    if (ul.querySelectorAll("li").length < 3) {
      ul.innerHTML = ICONS_HTML;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureHeaderIcons);
  } else {
    ensureHeaderIcons();
  }
})();



// ==============================
// KH: Ensure "ข้อมูลเพิ่มเติม" section exists in sidebar menu on every page
// ==============================
(function () {
  function textEq(el, t) {
    return (el?.textContent || "").trim() === t;
  }

  function ensureExtraInfoSection() {
    const menuUl = document.querySelector("#menu > ul");
    if (!menuUl) return;

    // ถ้ามีหัวข้อ "ข้อมูลเพิ่มเติม" อยู่แล้ว ไม่ทำซ้ำ
    const hasDivider = Array.from(menuUl.querySelectorAll("li.divider"))
      .some(li => textEq(li, "ข้อมูลเพิ่มเติม"));
    if (hasDivider) return;

    // หา "ติดต่อด่วน" เพื่อแทรกก่อน (ถ้าไม่เจอจะต่อท้าย)
    const contactDivider = Array.from(menuUl.querySelectorAll("li.divider"))
      .find(li => textEq(li, "ติดต่อด่วน"));

    const frag = document.createDocumentFragment();

    const d = document.createElement("li");
    d.className = "divider";
    d.textContent = "ข้อมูลเพิ่มเติม";
    frag.appendChild(d);

    const li1 = document.createElement("li");
    li1.innerHTML = `<a href="khonkaen-system.html">บทความ Local SEO</a>`;
    frag.appendChild(li1);

    const li2 = document.createElement("li");
    li2.innerHTML = `<a href="elements.html">ผลงาน & รีวิว (Portfolio)</a>`;
    frag.appendChild(li2);

    if (contactDivider) {
      menuUl.insertBefore(frag, contactDivider);
    } else {
      menuUl.appendChild(frag);
    }
  }

  // defer scripts รันหลัง parse แล้ว ปกติเรียกตรงๆ ได้
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureExtraInfoSection);
  } else {
    ensureExtraInfoSection();
  }
})();

// ==============================
// KH: Remove duplicate "บทความ LOCAL SEO" menu item (keep only one)
// ==============================
(function () {
  function isExtraInfoItem(li) {
    // เช็คว่า li นี้อยู่ใต้ divider "ข้อมูลเพิ่มเติม" ไหม
    let prev = li.previousElementSibling;
    while (prev) {
      if (prev.classList && prev.classList.contains("divider")) {
        return (prev.textContent || "").trim() === "ข้อมูลเพิ่มเติม";
      }
      prev = prev.previousElementSibling;
    }
    return false;
  }

  function removeDuplicateLocalSEO() {
    const menuUl = document.querySelector("#menu > ul");
    if (!menuUl) return;

    const links = Array.from(menuUl.querySelectorAll('a[href*="khonkaen-system.html"]'));
    if (links.length <= 1) return;

    const items = links
      .map(a => a.closest("li"))
      .filter(Boolean);

    // เลือกตัวที่อยู่ใต้ "ข้อมูลเพิ่มเติม" เป็นตัวหลัก (ถ้ามี)
    let keepLi = items.find(isExtraInfoItem) || items[0];

    // ลบตัวอื่นทิ้ง
    items.forEach(li => {
      if (li !== keepLi) li.remove();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", removeDuplicateLocalSEO);
  } else {
    removeDuplicateLocalSEO();
  }
})();
/* =========================================================
   KH – GLOBAL ACTIVE MENU (RUN ON ALL PAGES)
   Put at the VERY BOTTOM of assets/js/main.js
   ========================================================= */
(() => {
  // กันรันซ้ำ (เผื่อบางหน้ามี kh-current-tab.js อยู่แล้ว)
  if (window.__KH_ACTIVE_MENU_DONE__) return;
  window.__KH_ACTIVE_MENU_DONE__ = true;

  const norm = (x) => {
    if (!x) return "index.html";
    x = String(x).split("#")[0].split("?")[0].trim();
    const parts = x.split("/");
    let last = parts.pop() || parts.pop() || "";
    last = decodeURIComponent(last).toLowerCase();
    if (!last || last.endsWith("/")) return "index.html";
    return last;
  };

  const run = () => {
    const menu = document.querySelector("#menu");
    if (!menu) return false;

    const current = norm(window.location.pathname);

    menu.querySelectorAll("li.active, a.active").forEach(el => el.classList.remove("active"));

    menu.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute("href");
      if (!href) return;

      // ข้าม external และปุ่มพวก tel/line/map
      if (
        href.startsWith("http") ||
        href.startsWith("tel:") ||
        href.startsWith("mailto:") ||
        href.startsWith("#")
      ) return;

      const target = norm(href);
      const match =
        current === target ||
        (current === "index.html" && (target === "" || target === "index.html"));

      if (match) {
        a.classList.add("active");
        const li = a.closest("li");
        if (li) li.classList.add("active");
      }
    });

    return true;
  };

  // ให้ชัวร์แม้บางธีมโหลดช้า
  const boot = () => {
    let tries = 0;
    const tick = () => {
      if (run()) return;
      tries++;
      if (tries < 20) setTimeout(tick, 120);
    };
    tick();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
