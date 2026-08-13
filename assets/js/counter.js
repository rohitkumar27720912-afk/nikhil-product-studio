/* =====================================================
   ANIMATED COUNTER
===================================================== */

function initCounter() {

    const counters = document.querySelectorAll(".counter");

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(counter.dataset.target);

            let current = 0;

            const duration = 2000;

            const stepTime = 16;

            const increment = target / (duration / stepTime);

            function updateCounter() {

                current += increment;

                if (current < target) {

                    counter.textContent = Math.ceil(current);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = target + "+";

                }

            }

            updateCounter();

            observer.unobserve(counter);

        });

    }, {

        threshold: 0.5

    });

    counters.forEach(counter => {

        observer.observe(counter);

    });

}