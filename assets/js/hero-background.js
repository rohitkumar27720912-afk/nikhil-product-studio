document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("constellation-canvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let width;
    let height;

    let particles = [];

    const mouse = {
        x: null,
        y: null,
        radius: 180
    };

    /* ==========================================
       SETTINGS
    ========================================== */

    const settings = {

        particleCount: 90,

        particleSize: 1.5,

        maxDistance: 130,

        mouseDistance: 220,

        speed: 0.25,

        lineOpacity: 0.20

    };


    /* ==========================================
       RESIZE
    ========================================== */

    function resizeCanvas() {

        const rect = canvas.getBoundingClientRect();

        width = rect.width;
        height = rect.height;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        createParticles();

    }


    /* ==========================================
       CREATE PARTICLES
    ========================================== */

    function createParticles() {

        particles = [];

        const count =
            window.innerWidth < 768
                ? 45
                : settings.particleCount;

        for (let i = 0; i < count; i++) {

            particles.push({

                x: Math.random() * width,

                y: Math.random() * height,

                vx:
                    (Math.random() - 0.5)
                    * settings.speed,

                vy:
                    (Math.random() - 0.5)
                    * settings.speed,

                size:
                    Math.random() * 1.5
                    + settings.particleSize,

                alpha:
                    Math.random() * 0.5
                    + 0.3

            });

        }

    }


    /* ==========================================
       DRAW PARTICLE
    ========================================== */

    function drawParticle(particle) {

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(56,189,248,${particle.alpha})`;

        ctx.fill();

    }


    /* ==========================================
       CONNECT PARTICLES
    ========================================== */

    function connectParticles() {

        for (let i = 0; i < particles.length; i++) {

            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const p1 = particles[i];

                const p2 = particles[j];

                const dx = p1.x - p2.x;

                const dy = p1.y - p2.y;

                const distance =
                    Math.sqrt(dx * dx + dy * dy);

                if (
                    distance <
                    settings.maxDistance
                ) {

                    const opacity =
                        (1 - distance / settings.maxDistance)
                        * settings.lineOpacity;

                    ctx.beginPath();

                    ctx.moveTo(
                        p1.x,
                        p1.y
                    );

                    ctx.lineTo(
                        p2.x,
                        p2.y
                    );

                    ctx.strokeStyle =
                        `rgba(56,189,248,${opacity})`;

                    ctx.lineWidth = 0.6;

                    ctx.stroke();

                }

            }

        }

    }


    /* ==========================================
       MOUSE CONNECTION
    ========================================== */

    function connectMouse() {

        if (
            mouse.x === null ||
            mouse.y === null
        ) return;

        particles.forEach(particle => {

            const dx =
                particle.x - mouse.x;

            const dy =
                particle.y - mouse.y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);

            if (
                distance <
                settings.mouseDistance
            ) {

                const opacity =
                    (1 - distance / settings.mouseDistance)
                    * 0.45;

                ctx.beginPath();

                ctx.moveTo(
                    particle.x,
                    particle.y
                );

                ctx.lineTo(
                    mouse.x,
                    mouse.y
                );

                ctx.strokeStyle =
                    `rgba(56,189,248,${opacity})`;

                ctx.lineWidth = 0.8;

                ctx.stroke();

            }

        });

    }


    /* ==========================================
       UPDATE
    ========================================== */

    function updateParticles() {

        particles.forEach(particle => {

            particle.x += particle.vx;

            particle.y += particle.vy;


            /* Screen wrapping */

            if (particle.x < -10)
                particle.x = width + 10;

            if (particle.x > width + 10)
                particle.x = -10;

            if (particle.y < -10)
                particle.y = height + 10;

            if (particle.y > height + 10)
                particle.y = -10;


            /* Mouse attraction */

            if (
                mouse.x !== null &&
                mouse.y !== null
            ) {

                const dx =
                    mouse.x - particle.x;

                const dy =
                    mouse.y - particle.y;

                const distance =
                    Math.sqrt(dx * dx + dy * dy);

                if (
                    distance <
                    mouse.radius
                ) {

                    const force =
                        (mouse.radius - distance)
                        / mouse.radius;

                    particle.x -=
                        dx * force * 0.002;

                    particle.y -=
                        dy * force * 0.002;

                }

            }

        });

    }


    /* ==========================================
       ANIMATION
    ========================================== */

    function animate() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        updateParticles();

        connectParticles();

        connectMouse();

        particles.forEach(drawParticle);

        requestAnimationFrame(animate);

    }


    /* ==========================================
       MOUSE MOVE
    ========================================== */

    const hero =
        document.querySelector(".hero");

    if (hero) {

        hero.addEventListener(
            "mousemove",
            event => {

                const rect =
                    hero.getBoundingClientRect();

                mouse.x =
                    event.clientX - rect.left;

                mouse.y =
                    event.clientY - rect.top;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                mouse.x = null;

                mouse.y = null;

            }
        );

    }


    /* ==========================================
       START
    ========================================== */

    window.addEventListener(
        "resize",
        resizeCanvas
    );

    resizeCanvas();

    animate();

});