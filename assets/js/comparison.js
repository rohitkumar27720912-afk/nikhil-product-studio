/* =====================================================
   BEFORE / AFTER COMPARISON SLIDER
===================================================== */

function initComparison() {

    const containers = document.querySelectorAll(".compare-container");

    containers.forEach(container => {

        const overlay = container.querySelector(".compare-overlay");
        const slider =
            container.querySelector(".compare-slider") ||
            container.querySelector(".slider");

        if (!overlay || !slider) return;

        let dragging = false;

        function update(clientX) {

            const rect = container.getBoundingClientRect();

            let x = clientX - rect.left;

            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;

            const percent = (x / rect.width) * 100;

            overlay.style.width = percent + "%";

            slider.style.left = percent + "%";

        }

        /* =========================
           Mouse
        ========================= */

        slider.addEventListener("mousedown", () => {

            dragging = true;

        });

        window.addEventListener("mouseup", () => {

            dragging = false;

        });

        window.addEventListener("mousemove", (e) => {

            if (!dragging) return;

            update(e.clientX);

        });

        /* =========================
           Touch
        ========================= */

        slider.addEventListener("touchstart", () => {

            dragging = true;

        });

        window.addEventListener("touchend", () => {

            dragging = false;

        });

        window.addEventListener("touchmove", (e) => {

            if (!dragging) return;

            update(e.touches[0].clientX);

        });

        /* =========================
           Click Anywhere
        ========================= */

        container.addEventListener("click", (e) => {

            update(e.clientX);

        });

    });

}