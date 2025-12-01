(function () {
        const slides = document.querySelectorAll(".carousel-slide");
        const dots = document.querySelectorAll(".carousel-dot");
        const prevBtn = document.querySelector(".carousel-arrow.left");
        const nextBtn = document.querySelector(".carousel-arrow.right");

        let current = 0;
        let timer = null;

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

        nextBtn.addEventListener("click", () => {
          nextSlide();
          startAuto();
        });
        prevBtn.addEventListener("click", () => {
          prevSlide();
          startAuto();
        });

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

        // pause on hover
        const carousel = document.querySelector(".carousel");
        carousel.addEventListener("mouseenter", stopAuto);
        carousel.addEventListener("mouseleave", startAuto);
      })();