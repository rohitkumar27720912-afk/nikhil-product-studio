/* =====================================================
   BEFORE / AFTER COMPARISON SLIDER
   No Zoom Effect
===================================================== */

function initComparison() {

    const containers =
        document.querySelectorAll(".compare-container");

    containers.forEach(container => {

        const overlay =
            container.querySelector(".compare-overlay");

        const slider =
            container.querySelector(".slider");

        if (!overlay || !slider) return;

        const beforeImage =
            overlay.querySelector(".compare-image");

        if (!beforeImage) return;

        let dragging = false;


        /* =================================================
           FIX IMAGE SIZE
           BEFORE image always remains same size
           as comparison container.
        ================================================= */

        function fixImageSize() {

            const width = container.clientWidth;
            const height = container.clientHeight;

            beforeImage.style.width = width + "px";
            beforeImage.style.height = height + "px";

            beforeImage.style.maxWidth = "none";
            beforeImage.style.maxHeight = "none";

        }


        /* =================================================
           UPDATE SLIDER
        ================================================= */

        function update(clientX) {

            const rect =
                container.getBoundingClientRect();

            let x =
                clientX - rect.left;


            /* Keep slider inside container */

            if (x < 0) {
                x = 0;
            }

            if (x > rect.width) {
                x = rect.width;
            }


            const percent =
                (x / rect.width) * 100;


            /* BEFORE visible area */

            overlay.style.width =
                percent + "%";


            /* Slider line */

            slider.style.left =
                percent + "%";

        }


        /* =================================================
           POINTER DOWN
        ================================================= */

        slider.addEventListener(
            "pointerdown",
            function (e) {

                dragging = true;

                slider.setPointerCapture(
                    e.pointerId
                );

                e.preventDefault();

            }
        );


        /* =================================================
           POINTER MOVE
        ================================================= */

        slider.addEventListener(
            "pointermove",
            function (e) {

                if (!dragging) return;

                update(e.clientX);

            }
        );


        /* =================================================
           POINTER UP
        ================================================= */

        slider.addEventListener(
            "pointerup",
            function () {

                dragging = false;

            }
        );


        slider.addEventListener(
            "pointercancel",
            function () {

                dragging = false;

            }
        );


        /* =================================================
           CLICK ANYWHERE
        ================================================= */

        container.addEventListener(
            "pointerdown",
            function (e) {

                /*
                   Agar directly container par click/touch
                   karein to slider wahan chala jayega.
                */

                if (
                    e.target === slider ||
                    slider.contains(e.target)
                ) {
                    return;
                }

                update(e.clientX);

            }
        );


        /* =================================================
           INITIALIZE
        ================================================= */

        fixImageSize();

        update(
            container.getBoundingClientRect().left +
            container.getBoundingClientRect().width / 2
        );


        /* =================================================
           RESIZE
        ================================================= */

        window.addEventListener(
            "resize",
            function () {

                fixImageSize();

            }
        );

    });

}


/* =====================================================
   START
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initComparison();

    }
);