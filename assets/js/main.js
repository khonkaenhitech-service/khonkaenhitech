/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$head = $('head'),
		$body = $('body');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px'],
		'xlarge-to-max': '(min-width: 1681px)',
		'small-to-xlarge': '(min-width: 481px) and (max-width: 1680px)'
	});

	// Stops animations/transitions until the page has ...

	// ... loaded.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// ... stopped resizing.
	var resizeTimeout;

	$window.on('resize', function () {

		// Mark as resizing.
		$body.addClass('is-resizing');

		// Unmark after delay.
		clearTimeout(resizeTimeout);

		resizeTimeout = setTimeout(function () {
			$body.removeClass('is-resizing');
		}, 100);

	});

	// Fixes.

	// Object fit images.
	if (!browser.canUse('object-fit')
		|| browser.name == 'safari')
		$('.image.object').each(function () {

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
	breakpoints.on('<=large', function () {
		$sidebar.addClass('inactive');
	});

	breakpoints.on('>large', function () {
		$sidebar.removeClass('inactive');
	});

	// Hack: Workaround for Chrome/Android scrollbar position bug.
	if (browser.os == 'android'
		&& browser.name == 'chrome')
		$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
			.appendTo($head);

	// Toggle.
	$('<a href="#sidebar" class="toggle">Toggle</a>')
		.appendTo($sidebar)
		.on('click', function (event) {

			// Prevent default.
			event.preventDefault();
			event.stopPropagation();

			// Toggle.
			$sidebar.toggleClass('inactive');

		});

	// Events.

	// Link clicks.
	$sidebar.on('click', 'a', function (event) {

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
		setTimeout(function () {

			if (target == '_blank')
				window.open(href);
			else
				window.location.href = href;

		}, 500);

	});

	// Prevent certain events inside the panel from bubbling.
	$sidebar.on('click touchend touchstart touchmove', function (event) {

		// >large? Bail.
		if (breakpoints.active('>large'))
			return;

		// Prevent propagation.
		event.stopPropagation();

	});

	// Hide panel on body click/tap.
	$body.on('click touchend', function (event) {

		// >large? Bail.
		if (breakpoints.active('>large'))
			return;

		// Deactivate.
		$sidebar.addClass('inactive');

	});

	// Scroll lock.
	// Note: If you do anything to change the height of the sidebar's content, be sure to
	// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

	$window.on('load.sidebar-lock', function () {

		var sh, wh, st;

		// Reset scroll position to 0 if it's 1.
		if ($window.scrollTop() == 1)
			$window.scrollTop(0);

		$window
			.on('scroll.sidebar-lock', function () {

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
			.on('resize.sidebar-lock', function () {

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
	$menu_openers.each(function () {

		var $this = $(this);

		$this.on('click', function (event) {

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
	   KH – Ensure "ติดต่อด่วน" buttons exist on every page
	   - Creates/normalizes 4 buttons right after divider "ติดต่อด่วน"
	   - NO CSS injected here (ให้ไปคุมที่ style.css ของมึงเอง)
	   ========================================================= */
	(function () {
		try {
			if (window.__KH_CONTACT_BUTTONS_DONE__) return;
			window.__KH_CONTACT_BUTTONS_DONE__ = true;

			var $menu = $('#menu');
			if ($menu.length === 0) return;

			var $ul = $menu.children('ul');
			if ($ul.length === 0) $ul = $menu.find('ul').first();
			if ($ul.length === 0) return;

			function findHrefStartsWith(prefix) {
				var $a = $ul.find('a[href^="' + prefix + '"]').first();
				return $a.length ? $a.attr('href') : '';
			}
			function findHrefContains(part) {
				var $a = $ul.find('a[href*="' + part + '"]').first();
				return $a.length ? $a.attr('href') : '';
			}

			var telHref = findHrefStartsWith('tel:') || 'tel:+66944749874';
			var lineHref = findHrefContains('line.me') || 'https://line.me/ti/p/~KKHITECH';
			var fbHref = findHrefContains('facebook.com') || 'https://www.facebook.com/Line0944749874';
			var mapHref = findHrefContains('maps.app.goo.gl') || findHrefContains('google.com/maps') || 'https://maps.app.goo.gl/LyV85313vknT4hBE6';

			var telLabel = 'โทร: 094-474-9874';
			var lineLabel = 'LINE: KKHITECH';
			var fbLabel = 'Facebook Page';
			var mapLabel = 'Google Maps';

			var $divider = $ul.children('li.divider').filter(function () {
				return $(this).text().trim().indexOf('ติดต่อด่วน') !== -1;
			}).first();

			if ($divider.length === 0) {
				$divider = $('<li class="divider">ติดต่อด่วน</li>').appendTo($ul);
			}

			// ลบรายการหลัง divider นี้จนกว่าจะเจอ divider ถัดไป (กันซ้ำ/รก)
			var $cur = $divider.next();
			while ($cur.length && !$cur.hasClass('divider')) {
				var $next = $cur.next();
				$cur.remove();
				$cur = $next;
			}

			function insertBtn(afterEl, href, btnClass, iconClass, label, newTab) {
				var $a = $('<a></a>')
					.attr('href', href)
					.addClass('button ' + btnClass)
					.attr('aria-label', label);

				if (newTab) $a.attr('target', '_blank').attr('rel', 'noopener');

				$a.append($('<span></span>').addClass('icon ' + iconClass));
				$a.append($('<span></span>').text(label));

				var $li = $('<li></li>').append($a);
				$li.insertAfter(afterEl);
				return $li;
			}

			var $last = $divider;
			$last = insertBtn($last, telHref, 'btn-tel', 'solid fa-phone', telLabel, false);
			$last = insertBtn($last, lineHref, 'btn-line', 'brands fa-line', lineLabel, false);
			$last = insertBtn($last, fbHref, 'btn-fb', 'brands fa-facebook-f', fbLabel, true);
			$last = insertBtn($last, mapHref, 'btn-map', 'solid fa-map-marker-alt', mapLabel, true);

		} catch (e) {
			console.warn('KH contact buttons error:', e);
		}
	})();

})(jQuery);


/* =========================================================
   KH – Fix logo path (GitHub Pages project: /khonkaenhitech/)
   - Works with: #header .logo img OR .kh-brand__img img
   ========================================================= */
(function () {
	try {
		const ABS_LOGO = "/khonkaenhitech/images/logo-khonkaen.webp";

		function fixLogo() {
			const img =
				document.querySelector("#header .kh-brand__img img") ||
				document.querySelector("#header .logo img");

			if (!img) return;

			const src = (img.getAttribute("src") || "").trim();

			if (
				src === "images/logo-khonkaen.webp" ||
				src === "./images/logo-khonkaen.webp" ||
				src === "images/logo-khonkaen.png" ||
				src === "./images/logo-khonkaen.png"
			) {
				img.setAttribute("src", ABS_LOGO);
			}

			img.addEventListener("error", () => {
				img.src = ABS_LOGO;
			}, { once: true });
		}

		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", fixLogo);
		} else {
			fixLogo();
		}
	} catch (e) {
		console.warn('KH logo fix error:', e);
	}
})();


/* =========================================================
   KH – Ensure top-right header icons exist (TEL/LINE/MAP)
   - Adds missing icons only (does NOT wipe existing)
   ========================================================= */
(function () {
	try {
		const items = [
			{
				key: 'tel',
				href: 'tel:+66944749874',
				cls: 'icon solid fa-phone',
				title: 'โทร 094-474-9874',
				label: 'โทร',
				external: false
			},
			{
				key: 'line',
				href: 'https://line.me/ti/p/~KKHITECH',
				cls: 'icon brands fa-line',
				title: 'LINE: KKHITECH',
				label: 'LINE',
				external: true
			},
			{
				key: 'map',
				href: 'https://maps.app.goo.gl/LyV85313vknT4hBE6',
				cls: 'icon solid fa-map-marker-alt',
				title: 'Google Maps',
				label: 'แผนที่',
				external: true
			}
		];

		function ensureHeaderIcons() {
			const header = document.querySelector("#header");
			if (!header) return;

			let ul = header.querySelector("ul.icons");
			if (!ul) {
				ul = document.createElement("ul");
				ul.className = "icons";
				header.appendChild(ul);
			}

			// index existing by href prefix
			const existingHrefs = Array.from(ul.querySelectorAll('a[href]')).map(a => a.getAttribute('href') || '');

			items.forEach(it => {
				const already = existingHrefs.some(h => h === it.href || (it.href.startsWith('tel:') && h.startsWith('tel:')));
				if (already) return;

				const li = document.createElement('li');
				const a = document.createElement('a');
				a.href = it.href;
				a.className = it.cls;
				a.title = it.title;

				if (it.external) {
					a.target = "_blank";
					a.rel = "noopener";
				}

				const span = document.createElement('span');
				span.className = "label";
				span.textContent = it.label;

				a.appendChild(span);
				li.appendChild(a);
				ul.appendChild(li);
			});
		}

		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", ensureHeaderIcons);
		} else {
			ensureHeaderIcons();
		}
	} catch (e) {
		console.warn('KH header icons error:', e);
	}
})();


/* =========================================================
   KH – Ensure "ข้อมูลเพิ่มเติม" section exists (Local SEO + Portfolio)
   ========================================================= */
(function () {
	try {
		function ensureExtraInfoSection() {
			const menuUl = document.querySelector("#menu > ul") || document.querySelector("#menu ul");
			if (!menuUl) return;

			const dividers = Array.from(menuUl.querySelectorAll("li.divider"));
			const hasExtra = dividers.some(li => (li.textContent || "").trim() === "ข้อมูลเพิ่มเติม");
			if (hasExtra) return;

			const contactDivider = dividers.find(li => (li.textContent || "").trim() === "ติดต่อด่วน");

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

			if (contactDivider) menuUl.insertBefore(frag, contactDivider);
			else menuUl.appendChild(frag);
		}

		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", ensureExtraInfoSection);
		} else {
			ensureExtraInfoSection();
		}
	} catch (e) {
		console.warn('KH extra info section error:', e);
	}
})();


/* =========================================================
   KH – Remove duplicate khonkaen-system link (keep one)
   ========================================================= */
(function () {
	try {
		function removeDuplicateLocalSEO() {
			const menuUl = document.querySelector("#menu > ul") || document.querySelector("#menu ul");
			if (!menuUl) return;

			const links = Array.from(menuUl.querySelectorAll('a[href*="khonkaen-system.html"]'));
			if (links.length <= 1) return;

			const lis = links.map(a => a.closest("li")).filter(Boolean);
			const keep = lis[0];
			lis.forEach(li => { if (li !== keep) li.remove(); });
		}

		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", removeDuplicateLocalSEO);
		} else {
			removeDuplicateLocalSEO();
		}
	} catch (e) {
		console.warn('KH remove duplicate local seo error:', e);
	}
})();


/* =========================================================
   KH – GLOBAL ACTIVE MENU (RUN ON ALL PAGES) [ONE TIME ONLY]
   ========================================================= */
(() => {
	try {
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

		const boot = () => {
			let tries = 0;
			const tick = () => {
				if (run()) return;
				if (++tries < 25) setTimeout(tick, 120);
			};
			tick();
		};

		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", boot, { once: true });
		} else {
			boot();
		}
	} catch (e) {
		console.warn('KH active menu error:', e);
	}
})();
