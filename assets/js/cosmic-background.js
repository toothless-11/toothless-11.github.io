(() => {
    const canvas = document.getElementById("cosmic-background");
    const context = canvas?.getContext("2d", { alpha: true });

    if (!(canvas instanceof HTMLCanvasElement) || !context) {
        console.error("The homepage starfield could not initialize a 2D canvas.");
        return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const starPalettes = {
        dark: [
            [255, 255, 255],
            [220, 210, 255],
            [177, 150, 255],
            [133, 161, 255],
            [255, 213, 237],
        ],
        light: [
            [75, 58, 117],
            [103, 75, 153],
            [126, 87, 181],
            [66, 88, 139],
            [157, 83, 133],
        ],
    };

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let focalLength = 1;
    let stars = [];
    let frame = 0;
    let previousTime = 0;
    let lastPointerTime = 0;
    let pointerActive = false;
    let pointerX = 0;
    let pointerY = 0;
    let holeX = 0;
    let holeY = 0;
    let holeOpacity = 0;

    function random(min, max) {
        return min + Math.random() * (max - min);
    }

    function makeStar() {
        return {
            x: random(-1.7, 1.7),
            y: random(-1.7, 1.7),
            z: random(0.55, 3.2),
            vx: 0,
            vy: 0,
            radius: random(0.45, 1.45),
            alpha: random(0.38, 0.95),
            twinkle: random(0, Math.PI * 2),
            colorIndex: Math.floor(Math.random() * starPalettes.dark.length),
        };
    }

    function resetStar(star) {
        Object.assign(star, makeStar(), { z: random(2.6, 3.2) });
    }

    function resize() {
        const bounds = canvas.getBoundingClientRect();
        width = bounds.width;
        height = bounds.height;
        pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = Math.round(width * pixelRatio);
        canvas.height = Math.round(height * pixelRatio);
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        focalLength = Math.min(width, height) * 0.72;

        const count = Math.min(440, Math.max(140, Math.round((width * height) / 3600)));
        stars = Array.from({ length: count }, makeStar);
        holeX = width / 2;
        holeY = height / 2;
        render(0, 0);
    }

    function project(star) {
        const scale = focalLength / star.z;
        return {
            x: width / 2 + star.x * scale,
            y: height / 2 + star.y * scale,
            scale,
        };
    }

    function drawStar(star, x, y, radius, alpha, time) {
        const palette = document.documentElement.dataset.theme === "light"
            ? starPalettes.light
            : starPalettes.dark;
        const [red, green, blue] = palette[star.colorIndex];
        const pulse = 0.8 + Math.sin(time * 0.0012 + star.twinkle) * 0.2;
        const brightness = alpha * pulse;

        context.beginPath();
        context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${brightness})`;
        context.shadowBlur = radius * 5;
        context.shadowColor = `rgba(${red}, ${green}, ${blue}, ${brightness})`;
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;
    }

    function drawBlackHole(time) {
        if (holeOpacity < 0.015) {
            return;
        }

        const radius = 15;
        const rotation = time * 0.00022;

        context.save();
        context.globalAlpha = holeOpacity;

        const glow = context.createRadialGradient(holeX, holeY, radius * 0.8, holeX, holeY, 92);
        glow.addColorStop(0, "rgba(8, 5, 23, 0.94)");
        glow.addColorStop(0.25, "rgba(62, 33, 115, 0.28)");
        glow.addColorStop(0.58, "rgba(119, 89, 205, 0.09)");
        glow.addColorStop(1, "rgba(119, 89, 205, 0)");
        context.fillStyle = glow;
        context.beginPath();
        context.arc(holeX, holeY, 92, 0, Math.PI * 2);
        context.fill();

        context.translate(holeX, holeY);
        context.rotate(rotation);
        context.beginPath();
        context.ellipse(0, 0, 34, 11, -0.22, 0, Math.PI * 2);
        const disk = context.createLinearGradient(-34, 0, 34, 0);
        disk.addColorStop(0, "rgba(124, 92, 255, 0)");
        disk.addColorStop(0.32, "rgba(171, 126, 255, 0.18)");
        disk.addColorStop(0.5, "rgba(255, 229, 255, 0.88)");
        disk.addColorStop(0.68, "rgba(146, 104, 255, 0.28)");
        disk.addColorStop(1, "rgba(124, 92, 255, 0)");
        context.strokeStyle = disk;
        context.lineWidth = 3;
        context.shadowBlur = 16;
        context.shadowColor = "rgba(165, 126, 255, 0.82)";
        context.stroke();
        context.shadowBlur = 0;

        const eventHorizon = context.createRadialGradient(-4, -5, 1, 0, 0, radius);
        eventHorizon.addColorStop(0, "#000");
        eventHorizon.addColorStop(0.72, "#03020a");
        eventHorizon.addColorStop(1, "#171021");
        context.beginPath();
        context.arc(0, 0, radius, 0, Math.PI * 2);
        context.fillStyle = eventHorizon;
        context.fill();
        context.restore();
    }

    function render(time, delta) {
        context.clearRect(0, 0, width, height);

        const holeVisible = finePointer.matches &&
            pointerActive &&
            performance.now() - lastPointerTime < 1800;
        if (holeVisible) {
            const follow = 1 - Math.exp(-delta / 100);
            holeX += (pointerX - holeX) * follow;
            holeY += (pointerY - holeY) * follow;
            holeOpacity = Math.min(1, holeOpacity + delta / 180);
        } else {
            holeOpacity = Math.max(0, holeOpacity - delta / 550);
        }

        for (const star of stars) {
            star.z -= (reducedMotion.matches ? 0 : 0.035) * delta / 1000;
            if (star.z < 0.48) {
                resetStar(star);
                continue;
            }

            const point = project(star);
            let x = point.x;
            let y = point.y;

            if (holeOpacity > 0) {
                const dx = x - holeX;
                const dy = y - holeY;
                const distance = Math.hypot(dx, dy) || 1;
                const influence = Math.max(0, 1 - distance / 245) * holeOpacity;

                if (influence > 0) {
                    if (distance < 17) {
                        resetStar(star);
                        continue;
                    }

                    const inverseScale = 1 / point.scale;
                    const inward = 0.72 * influence / star.z;
                    const swirl = 0.46 * influence / star.z;
                    const towardX = -dx / distance;
                    const towardY = -dy / distance;
                    star.vx += (towardX * inward - towardY * swirl) * delta / 1000;
                    star.vy += (towardY * inward + towardX * swirl) * delta / 1000;
                    star.vx *= 0.998;
                    star.vy *= 0.998;
                    star.x += star.vx * delta / 1000;
                    star.y += star.vy * delta / 1000;

                    const lensBend = Math.min(76, (1450 / (distance + 13)) * holeOpacity);
                    x += (dx / distance) * lensBend;
                    y += (dy / distance) * lensBend;
                }
            }

            if (x < -40 || x > width + 40 || y < -40 || y > height + 40) {
                resetStar(star);
                continue;
            }

            const size = Math.min(3.2, star.radius * (0.7 + point.scale / focalLength));
            drawStar(star, x, y, size, star.alpha, time);
        }

        drawBlackHole(time);
    }

    function animate(time) {
        if (document.hidden) {
            frame = 0;
            return;
        }

        const delta = previousTime ? Math.min(time - previousTime, 40) : 16;
        previousTime = time;
        render(time, delta);
        frame = window.requestAnimationFrame(animate);
    }

    function start() {
        if (!frame) {
            previousTime = 0;
            frame = window.requestAnimationFrame(animate);
        }
    }

    function stop() {
        if (frame) {
            window.cancelAnimationFrame(frame);
            frame = 0;
        }
    }

    function onPointerMove(event) {
        if (!finePointer.matches || event.pointerType === "touch") {
            return;
        }

        pointerX = event.clientX;
        pointerY = event.clientY;
        pointerActive = true;
        lastPointerTime = performance.now();
    }

    function onVisibilityChange() {
        if (document.hidden) {
            stop();
        } else if (reducedMotion.matches) {
            render(performance.now(), 0);
        } else {
            start();
        }
    }

    function onMotionPreferenceChange() {
        if (reducedMotion.matches) {
            stop();
            render(performance.now(), 0);
        } else {
            start();
        }
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.addEventListener("change", onMotionPreferenceChange);
    resize();
    if (!reducedMotion.matches) {
        start();
    }
})();
