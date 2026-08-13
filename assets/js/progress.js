/* =====================================================
   SCROLL PROGRESS BAR
===================================================== */

function initProgress() {

    const progressBar = document.querySelector(".progress-bar");

    if (!progressBar) return;

    function updateProgress() {

        const scrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop;

        const documentHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress =
            (scrollTop / documentHeight) * 100;

        progressBar.style.width = progress + "%";

    }

    updateProgress();

    window.addEventListener("scroll", updateProgress);

}