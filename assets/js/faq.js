/* =====================================================
   FAQ ACCORDION
===================================================== */

function initFAQ() {

    const faqItems = document.querySelectorAll(".faq-item");

    if (!faqItems.length) return;

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const icon = question.querySelector("span");

        function toggleFAQ() {

            const isOpen = item.classList.contains("active");

            /* Close all */

            faqItems.forEach(faq => {

                faq.classList.remove("active");

                const ans = faq.querySelector(".faq-answer");
                const ic = faq.querySelector(".faq-question span");

                ans.style.maxHeight = null;

                if (ic) ic.textContent = "+";

            });

            /* Open Current */

            if (!isOpen) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

                if (icon) icon.textContent = "−";

            }

        }

        question.addEventListener("click", toggleFAQ);

        /* Keyboard Support */

        question.addEventListener("keydown", (e) => {

            if (e.key === "Enter" || e.key === " ") {

                e.preventDefault();

                toggleFAQ();

            }

        });

    });

}