console.log("Website Loaded Successfully!");

/* =====================================================
   NIKHIL PRODUCT STUDIO
   MAIN SCRIPT
===================================================== */

console.log("🚀 Nikhil Product Studio Loaded");

/* =====================================
   DOM READY
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    initComparison();

    initPortfolio();

    initCounter();

    initFAQ();

    initLoader();

    initCursor();

    initProgress();

    initAOS();

});

/* =====================================
   WINDOW RESIZE
===================================== */

window.addEventListener("resize", () => {

    // Future responsive updates

});

/* =====================================
   WINDOW LOAD
===================================== */

window.addEventListener("load", () => {

    console.log("All Assets Loaded");

});

/* =====================================================
   CONTACT FORM → WHATSAPP
===================================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name =
            document.getElementById("contactName").value.trim();

        const email =
            document.getElementById("contactEmail").value.trim();

        const whatsapp =
            document.getElementById("contactWhatsApp").value.trim();

        const message =
            document.getElementById("contactMessage").value.trim();


        if (!name || !email || !whatsapp || !message) {

            alert("Please fill all the fields.");

            return;
        }


        const text =
`Hello Nikhil Product Studio,

I want to discuss a product image editing project.

Name: ${name}

Email: ${email}

WhatsApp: ${whatsapp}

Project Details:
${message}`;


        const phone = "918808463184";

        const whatsappURL =
            "https://wa.me/" +
            phone +
            "?text=" +
            encodeURIComponent(text);


        window.open(
            whatsappURL,
            "_blank"
        );

    });

}