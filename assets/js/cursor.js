/* =====================================================
   CUSTOM CURSOR
===================================================== */

function initCursor() {

    const cursor = document.querySelector(".cursor");
    const blur = document.querySelector(".cursor-blur");

    if (!cursor || !blur) return;

    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;

    let blurX = 0;
    let blurY = 0;

    document.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

    });

    function animate() {

        cursorX += (mouseX - cursorX) * 0.35;
        cursorY += (mouseY - cursorY) * 0.35;

        blurX += (mouseX - blurX) * 0.12;
        blurY += (mouseY - blurY) * 0.12;

        cursor.style.left = cursorX + "px";
        cursor.style.top = cursorY + "px";

        blur.style.left = blurX + "px";
        blur.style.top = blurY + "px";

        requestAnimationFrame(animate);

    }

    animate();

    /* ==========================
       Hover Effect
    ========================== */

    const hoverItems = document.querySelectorAll(
        "a, button, .service-card, .portfolio-card, .price-card"
    );

    hoverItems.forEach(item => {

        item.addEventListener("mouseenter", () => {

            cursor.classList.add("cursor-hover");
            blur.classList.add("cursor-hover");

        });

        item.addEventListener("mouseleave", () => {

            cursor.classList.remove("cursor-hover");
            blur.classList.remove("cursor-hover");

        });

    });

}