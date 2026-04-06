function waitForStarsLayer(callback) {
    const container = document.getElementById('stars-layer');
    if (container) {
        callback(container);
    } else {
        requestAnimationFrame(() => waitForStarsLayer(callback));
    }
}

waitForStarsLayer((container) => {

    const numberOfStars = 200;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;

        container.appendChild(star);
    }
});









