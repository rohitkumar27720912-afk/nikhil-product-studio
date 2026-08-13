/* =====================================================
   WEBSITE LOADER
===================================================== */

function initLoader() {

    const loader = document.getElementById("loader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("loader-hide");

            setTimeout(() => {

                loader.remove();

            }, 800);

        }, 1800);

    });

}