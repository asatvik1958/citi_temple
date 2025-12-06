(function () {
        const slides = document.querySelectorAll(".carousel-slide");
        const dots = document.querySelectorAll(".carousel-dot");
        const prevBtn = document.querySelector(".carousel-arrow.left");
        const nextBtn = document.querySelector(".carousel-arrow.right");

        let current = 0;
        let timer = null;

        // Only initialize carousel if slides exist (some pages may not include it)
        if (slides.length > 0) {
          function showSlide(index) {
            slides.forEach((s, i) => {
              s.classList.toggle("active", i === index);
            });
            dots.forEach((d, i) => {
              d.classList.toggle("active", i === index);
            });
            current = index;
          }

          function nextSlide() {
            const n = (current + 1) % slides.length;
            showSlide(n);
          }

          function prevSlide() {
            const n = (current - 1 + slides.length) % slides.length;
            showSlide(n);
          }

          function startAuto() {
            stopAuto();
            timer = setInterval(nextSlide, 6000);
          }

          function stopAuto() {
            if (timer) clearInterval(timer);
          }

          if (nextBtn) {
            nextBtn.addEventListener("click", () => {
              nextSlide();
              startAuto();
            });
          }
          if (prevBtn) {
            prevBtn.addEventListener("click", () => {
              prevSlide();
              startAuto();
            });
          }

          dots.forEach((dot) => {
            dot.addEventListener("click", () => {
              const index = Number(dot.dataset.index);
              showSlide(index);
              startAuto();
            });
          });

          // start
          showSlide(0);
          startAuto();

          // pause on hover (only attach if carousel element exists)
          const carousel = document.querySelector(".carousel");
          if (carousel && carousel.addEventListener) {
            carousel.addEventListener("mouseenter", stopAuto);
            carousel.addEventListener("mouseleave", startAuto);
          }
        }

        // =====================
        // Simple i18n handling - Shared translations only (navbar, footer)
        // Page-specific translations loaded from translations.index.js or translations.about.js
        // =====================
        let translations = {
          en: {
            "nav.home": "Home",
            "nav.about": "About",
            "nav.services": "Services ▼",
            "nav.services.darshan": "Darshan",
            "nav.services.booking": "Pooja Booking",
            "nav.services.events": "Events",
            "nav.contact": "Contact",
            "footer.section1.title": "Temple",
            "footer.section1.link1": "About Temple",
            "footer.section1.link2": "History",
            "footer.section1.link3": "Trust & Management",
            "footer.section2.title": "Services",
            "footer.section2.link1": "Darshan",
            "footer.section2.link2": "Accommodation",
            "footer.section2.link3": "Booking",
            "footer.section3.title": "Support",
            "footer.section3.link1": "Contact Us",
            "footer.section3.link2": "Feedback",
            "footer.section3.link3": "FAQ",
            "footer.bottom": "© 2025 Sri Venkateswaraswamy Temple, Kallakuru — All Rights Reserved"
          },
          te: {
            "nav.home": "హోమ్",
            "nav.about": "గురించి",
            "nav.services": "సేవలు ▼",
            "nav.services.darshan": "దర్శనం",
            "nav.services.booking": "పూజా బుకింగ్",
            "nav.services.events": "ఈవెంట్స్",
            "nav.contact": "సంప్రదించండి",
            "footer.section1.title": "ఆలయం",
            "footer.section1.link1": "ఆలయము గురించి",
            "footer.section1.link2": "చరిత్ర",
            "footer.section1.link3": "ట్రస్ట్ & మేనేజ్మెంట్",
            "footer.section2.title": "సేవలు",
            "footer.section2.link1": "దర్శనం",
            "footer.section2.link2": "గదుల వసతి",
            "footer.section2.link3": "బుకింగ్",
            "footer.section3.title": "సహాయం",
            "footer.section3.link1": "సంప్రదించండి",
            "footer.section3.link2": "ఫీడ్‌బ్యాక్",
            "footer.section3.link3": "సకల్ అడిగే ప్రశ్నలు",
            "footer.bottom": "© 2025 శ్రీ వెంకటేశ్వర స్వామి దేవాలయం, కాళ్ళకూరు — అన్ని హక్కులు రిజర్వు చేయబడ్డాయి"
          }
        };

        // Merge page-specific translations if available
        if (window.TRANSLATIONS && window.TRANSLATIONS.index) {
          translations.en = Object.assign(translations.en, window.TRANSLATIONS.index.en || {});
          translations.te = Object.assign(translations.te, window.TRANSLATIONS.index.te || {});
        }
        if (window.TRANSLATIONS && window.TRANSLATIONS.about) {
          translations.en = Object.assign(translations.en, window.TRANSLATIONS.about.en || {});
          translations.te = Object.assign(translations.te, window.TRANSLATIONS.about.te || {});
        }

        function applyTranslations(lang) {
          const map = translations[lang] || {};
          document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            if (!key) return;
            const val = map[key];
            if (typeof val !== 'undefined') {
              el.innerHTML = val;
            }
          });
          // update active button style
          document.querySelectorAll('.lang-btn').forEach((b) => {
            b.classList.toggle('active', b.dataset.lang === lang);
          });
          // set HTML lang attribute for accessibility
          try {
            document.documentElement.lang = lang;
          } catch (e) {
            // ignore if not available
          }
          // update document title if provided in translations
          if (map['meta.title']) {
            document.title = map['meta.title'];
          }
        }

        // init language from localStorage or default to 'en'
        const savedLang = localStorage.getItem('site-lang') || (navigator.language && navigator.language.startsWith('te') ? 'te' : 'en');
        applyTranslations(savedLang);

        // wire up language buttons (guard existence)
        const btnEn = document.getElementById('lang-en');
        const btnTe = document.getElementById('lang-te');
        if (btnEn) {
          btnEn.addEventListener('click', () => {
            localStorage.setItem('site-lang', 'en');
            applyTranslations('en');
          });
        }
        if (btnTe) {
          btnTe.addEventListener('click', () => {
            localStorage.setItem('site-lang', 'te');
            applyTranslations('te');
          });
        }

        // Mobile nav toggle
        const navToggle = document.getElementById('nav-toggle');
        const navEl = document.querySelector('nav');
        if (navToggle && navEl) {
          navToggle.addEventListener('click', () => {
            const open = navEl.classList.toggle('mobile-open');
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
          });

          // close when clicking a link in the collapsed menu
          navEl.querySelectorAll('.nav-right a').forEach((a) => {
            a.addEventListener('click', () => {
              if (navEl.classList.contains('mobile-open')) {
                navEl.classList.remove('mobile-open');
                navToggle.setAttribute('aria-expanded', 'false');
              }
            });
          });
        }

        // Dropdown toggle for touch / mobile devices
        const dropdownLabels = document.querySelectorAll('.dropdown-label');
        function isMobileView() {
          return window.matchMedia('(max-width: 900px)').matches;
        }

        dropdownLabels.forEach((label) => {
          const li = label.closest('.dropdown');
          if (!li) return;
          label.addEventListener('click', (e) => {
            // allow click-to-toggle on all devices (desktop & mobile)
            e.preventDefault();
            // toggle open, close siblings
            const open = li.classList.toggle('open');
            li.parentElement && Array.from(li.parentElement.children).forEach((sibling) => {
              if (sibling !== li) sibling.classList.remove('open');
            });
            e.stopPropagation();
          });
        });

        // close any open dropdown when clicking/tapping outside (all devices)
        document.addEventListener('click', (e) => {
          const openDropdown = document.querySelector('.dropdown.open');
          if (openDropdown && !openDropdown.contains(e.target)) {
            openDropdown.classList.remove('open');
          }
        });

        // Small debug helper: press 'd' to toggle layout outlines (useful for laptop debugging)
        document.addEventListener('keydown', (e) => {
          if (e.key === 'd' || e.key === 'D') {
            document.body.classList.toggle('debug-outline');
            console.info('Toggled debug-outline class on body');
          }
        });

      })();
