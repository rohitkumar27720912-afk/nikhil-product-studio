document.addEventListener("DOMContentLoaded", function () {

    const quantityButtons =
        document.querySelectorAll(".quantity-btn");

    const quantityDisplay =
        document.getElementById("selected-quantity");

    const priceDisplay =
        document.getElementById("estimated-price");

    const whatsappButton =
        document.getElementById("pricing-whatsapp");

    const whatsappNumber = "918808463184";

    function updatePricing(button) {

        const quantity =
            button.dataset.quantity;

        const price =
            button.dataset.price;

        quantityDisplay.textContent =
            quantity >= 100 ? "100+" : quantity;

        priceDisplay.textContent =
            "₹" + Number(price).toLocaleString("en-IN");

        const message =
            `Hello Nikhil, I need professional product image editing. ` +
            `I am interested in ${quantity >= 100 ? "100+" : quantity} images. ` +
            `Estimated price: ₹${Number(price).toLocaleString("en-IN")}. ` +
            `Please share the details.`;

        whatsappButton.href =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    }

    quantityButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            quantityButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            updatePricing(button);

        });

    });

    // Default selection
    updatePricing(quantityButtons[0]);

});