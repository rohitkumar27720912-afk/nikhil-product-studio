/* =====================================================
   NIKHIL PRODUCT STUDIO
   REAL AI ASSISTANT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const button = document.querySelector(".ai-assistant-button");
    const chat = document.querySelector(".ai-chat");
    const close = document.querySelector(".ai-close");

    const messages = document.querySelector(".ai-messages");
    const input = document.querySelector(".ai-input");
    const send = document.querySelector(".ai-send");

    const quickButtons =
        document.querySelectorAll(".ai-quick button");


    /* ==========================================
       OPEN CHAT
    ========================================== */

    button.addEventListener("click", () => {

        chat.classList.toggle("active");

        if (chat.classList.contains("active")) {
            input.focus();
        }

    });


    /* ==========================================
       CLOSE CHAT
    ========================================== */

    close.addEventListener("click", () => {

        chat.classList.remove("active");

    });


    /* ==========================================
       ADD MESSAGE
    ========================================== */

    function addMessage(text, type) {

        const message = document.createElement("div");

        message.className =
            `ai-message ${type}`;

        message.textContent = text;

        messages.appendChild(message);

        messages.scrollTop =
            messages.scrollHeight;

    }


    /* ==========================================
       TYPING
    ========================================== */

    function showTyping() {

        const typing =
            document.createElement("div");

        typing.className =
            "ai-message bot ai-typing-message";

        typing.innerHTML = `
            <div class="ai-typing">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;

        messages.appendChild(typing);

        messages.scrollTop =
            messages.scrollHeight;

        return typing;
    }


    /* ==========================================
       SEND MESSAGE TO BACKEND
    ========================================== */

    async function sendMessage(text) {

        if (!text.trim()) return;

        addMessage(text, "user");

        input.value = "";

        const typing = showTyping();

        try {

            const response = await fetch(
                "http://localhost:3000/api/chat",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        message: text
                    })
                }
            );


            const data =
                await response.json();


            typing.remove();


            if (data.success) {

                addMessage(
                    data.reply,
                    "bot"
                );

            } else {

                addMessage(
                    "Sorry, AI Assistant abhi response nahi de pa raha.",
                    "bot"
                );

            }

        } catch (error) {

            console.error(
                "AI Assistant Error:",
                error
            );

            typing.remove();

            addMessage(
                "AI server se connection nahi ho pa raha. Please thodi der baad try karein.",
                "bot"
            );

        }

    }


    /* ==========================================
       SEND BUTTON
    ========================================== */

    send.addEventListener("click", () => {

        sendMessage(input.value);

    });


    /* ==========================================
       ENTER KEY
    ========================================== */

    input.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            event.preventDefault();

            sendMessage(input.value);

        }

    });


    /* ==========================================
       QUICK QUESTIONS
    ========================================== */

    quickButtons.forEach(button => {

        button.addEventListener("click", () => {

            const question =
                button.dataset.question;

            sendMessage(question);

        });

    });

});