(() => {
    const root = document.documentElement;
    const mqLandscape = window.matchMedia('(orientation: landscape)');
    let runId = 0;

    // Скільки максимум чекати, поки img взагалі отримає src/currentSrc (через i18n)
    const WAIT_SRC_MS = 1200;

    // Страховка: навіть якщо щось пішло не так — стартуємо
    const HARD_CAP_MS = 2000;

    function hasSrc(img) {
        // currentSrc працює краще, коли src/srcset виставляються динамічно
        return !!(img.currentSrc || img.getAttribute('src') || img.getAttribute('srcset'));
    }

    function waitForSrc(img, ms = WAIT_SRC_MS) {
        if (hasSrc(img)) return Promise.resolve(true);

        return new Promise((resolve) => {
            const t0 = performance.now();
            const tick = () => {
                if (hasSrc(img)) return resolve(true);
                if (performance.now() - t0 >= ms) return resolve(false);
                requestAnimationFrame(tick);
            };
            tick();
        });
    }

    async function waitImg(img) {
        // 1) дочекайся, щоб src зʼявився (але не вічно)
        const gotSrc = await waitForSrc(img);
        if (!gotSrc) return; // не блокуємо старт, якщо src так і не поставили

        // 2) якщо вже завантажено — decode
        if (img.complete && img.naturalWidth > 0) {
            if (img.decode) await img.decode().catch(() => {});
            return;
        }

        // 3) інакше — чекаємо load/error, потім decode
        await new Promise((resolve) => {
            const done = () => resolve();
            img.addEventListener('load', done, { once: true });
            img.addEventListener('error', done, { once: true });
        });

        if (img.decode) await img.decode().catch(() => {});
    }

    function pick(selector) {
        return Array.from(document.querySelectorAll(selector));
    }

    function getCritical() {
        const isLandscape = mqLandscape.matches;

        const bg1 = isLandscape
            ? pick('.background-layer .background-image.bg-1.landscape')
            : pick('.background-layer .background-image.bg-1:not(.landscape)');

        const logo = isLandscape
            ? pick('.logo-image.logo-landscape')
            : pick('.logo-image.logo-portrait');

        const stack = pick('.stack img'); // wheel / wheel-2 / arrow

        return [...bg1, ...logo, ...stack];
    }

    function startGate() {
        const myRun = ++runId;

        // заморозили все (твій CSS html:not(.fps-ready) ...)
        root.classList.remove('fps-ready');

        const critical = getCritical();

        const startPromise = Promise.all(critical.map(waitImg));

        const capPromise = new Promise((res) => setTimeout(res, HARD_CAP_MS));

        Promise.race([startPromise, capPromise]).then(() => {
            if (myRun !== runId) return;
            root.classList.add('fps-ready');
        });
    }

    startGate();

    // якщо повернули екран — перезапустили gate (під нові bg1/logo)
    if (mqLandscape.addEventListener) {
        mqLandscape.addEventListener('change', startGate);
    } else {
        mqLandscape.addListener(startGate);
    }
})();
