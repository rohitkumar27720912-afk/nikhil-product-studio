/* =====================================================
   PORTFOLIO
   FILTER + LIGHTBOX + BEFORE/AFTER SLIDER
   NO ZOOM
===================================================== */

function initPortfolio() {

    /* =================================================
       FILTER
    ================================================= */

    const buttons =
        document.querySelectorAll(".filter-btn");

    const cards =
        document.querySelectorAll(".portfolio-card");


    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter =
                button.dataset.filter;


            cards.forEach(card => {

                const category =
                    card.dataset.category;


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    card.style.display = "block";

                    requestAnimationFrame(() => {

                        card.style.opacity = "1";

                        card.style.transform =
                            "scale(1)";

                    });

                } else {

                    card.style.opacity = "0";

                    card.style.transform =
                        "scale(.92)";


                    setTimeout(() => {

                        card.style.display =
                            "none";

                    }, 250);

                }

            });

        });

    });


    /* =================================================
       BEFORE / AFTER SLIDERS
    ================================================= */

    const sliders =
        document.querySelectorAll(
            ".portfolio .compare-container"
        );


    sliders.forEach(container => {

        const overlay =
            container.querySelector(
                ".compare-overlay"
            );

        const slider =
            container.querySelector(
                ".compare-slider"
            );

        const beforeImage =
            container.querySelector(
                ".compare-before"
            );


        if (
            !overlay ||
            !slider ||
            !beforeImage
        ) return;


        let dragging = false;


        /* =============================================
           FIX IMAGE SIZE
           This is what prevents the zoom effect.
        ============================================= */

        function fixBeforeImageSize() {

            const width =
                container.getBoundingClientRect().width;

            const height =
                container.getBoundingClientRect().height;


            beforeImage.style.width =
                width + "px";

            beforeImage.style.height =
                height + "px";

            beforeImage.style.maxWidth =
                "none";

        }


        /* =============================================
           UPDATE SLIDER
        ============================================= */

        function updateSlider(clientX) {

            const rect =
                container.getBoundingClientRect();


            let x =
                clientX - rect.left;


            if (x < 0) {
                x = 0;
            }


            if (x > rect.width) {
                x = rect.width;
            }


            const percent =
                (x / rect.width) * 100;


            overlay.style.width =
                percent + "%";


            slider.style.left =
                percent + "%";

        }


        /* Initial */

        fixBeforeImageSize();


        /* =============================================
           MOUSE
        ============================================= */

        slider.addEventListener(
            "mousedown",
            e => {

                e.preventDefault();

                dragging = true;

            }
        );


        window.addEventListener(
            "mousemove",
            e => {

                if (!dragging) return;

                updateSlider(e.clientX);

            }
        );


        window.addEventListener(
            "mouseup",
            () => {

                dragging = false;

            }
        );


        /* =============================================
           TOUCH / MOBILE
        ============================================= */

        slider.addEventListener(
            "touchstart",
            e => {

                e.preventDefault();

                dragging = true;

            },
            { passive: false }
        );


        window.addEventListener(
            "touchmove",
            e => {

                if (!dragging) return;


                e.preventDefault();

                updateSlider(
                    e.touches[0].clientX
                );

            },
            { passive: false }
        );


        window.addEventListener(
            "touchend",
            () => {

                dragging = false;

            }
        );


        /* =============================================
           CLICK / TAP ANYWHERE
        ============================================= */

        container.addEventListener(
            "click",
            e => {

                if (
                    e.target.closest(
                        ".view-btn"
                    )
                ) return;


                updateSlider(e.clientX);

            }
        );


        /* =============================================
           RESIZE
        ============================================= */

        window.addEventListener(
            "resize",
            () => {

                fixBeforeImageSize();

            }
        );

    });


    /* =================================================
       LIGHTBOX
    ================================================= */

    const lightbox =
        document.querySelector(".lightbox");

    const lightboxImage =
        document.querySelector(
            ".lightbox-image"
        );

    const lightboxClose =
        document.querySelector(
            ".lightbox-close"
        );


    if (
        lightbox &&
        lightboxImage &&
        lightboxClose
    ) {


        /* Image click */

        document
            .querySelectorAll(
                ".portfolio-card img"
            )
            .forEach(img => {

                img.addEventListener(
                    "click",
                    e => {

                        e.stopPropagation();

                        lightbox.classList.add(
                            "active"
                        );

                        lightboxImage.src =
                            img.src;

                    }
                );

            });


        /* View Project */

        document
            .querySelectorAll(".view-btn")
            .forEach(btn => {

                btn.addEventListener(
                    "click",
                    e => {

                        e.preventDefault();

                        const img =
                            btn
                                .closest(
                                    ".portfolio-card"
                                )
                                .querySelector(
                                    ".compare-after"
                                );


                        if (!img) return;


                        lightbox.classList.add(
                            "active"
                        );

                        lightboxImage.src =
                            img.src;

                    }
                );

            });


        /* Close */

        lightboxClose.addEventListener(
            "click",
            () => {

                lightbox.classList.remove(
                    "active"
                );

            }
        );


        /* Outside click */

        lightbox.addEventListener(
            "click",
            e => {

                if (
                    e.target === lightbox
                ) {

                    lightbox.classList.remove(
                        "active"
                    );

                }

            }
        );


        /* ESC */

        document.addEventListener(
            "keydown",
            e => {

                if (
                    e.key === "Escape"
                ) {

                    lightbox.classList.remove(
                        "active"
                    );

                }

            }
        );

    }

}


/* =====================================================
   AUTO INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initPortfolio();

    }
);