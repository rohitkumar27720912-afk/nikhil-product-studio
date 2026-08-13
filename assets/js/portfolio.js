/* =====================================================
   PORTFOLIO FILTER + LIGHTBOX
===================================================== */

function initPortfolio() {

    /* ==========================
       FILTER
    ========================== */

    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".portfolio-card");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter = button.dataset.filter;

            cards.forEach(card => {

                const category = card.dataset.category;

                if (filter === "all" || category === filter) {

                    card.style.display = "block";

                    requestAnimationFrame(() => {

                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";

                    });

                } else {

                    card.style.opacity = "0";
                    card.style.transform = "scale(.9)";

                    setTimeout(() => {

                        card.style.display = "none";

                    }, 250);

                }

            });

        });

    });


    /* ==========================
       LIGHTBOX
    ========================== */

    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = document.querySelector(".lightbox-image");
    const lightboxClose = document.querySelector(".lightbox-close");

    if (!lightbox || !lightboxImage || !lightboxClose) return;


    /* Click Image */

    document.querySelectorAll(".portfolio-card img").forEach(img => {

        img.addEventListener("click", () => {

            lightbox.classList.add("active");

            lightboxImage.src = img.src;

        });

    });


    /* View Button */

    document.querySelectorAll(".view-btn").forEach(btn => {

        btn.addEventListener("click", (e) => {

            e.preventDefault();

            const img = btn
                .closest(".portfolio-card")
                .querySelector(".compare-after");

            if (!img) return;

            lightbox.classList.add("active");

            lightboxImage.src = img.src;

        });

    });


    /* Close */

    lightboxClose.addEventListener("click", () => {

        lightbox.classList.remove("active");

    });


    /* Click Outside */

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {

            lightbox.classList.remove("active");

        }

    });


    /* ESC Key */

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            lightbox.classList.remove("active");

        }

    });

}