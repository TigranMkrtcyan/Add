const canvases = document.querySelectorAll('.canvas');

canvases.forEach((canvas) => {
    const ctx = canvas.getContext('2d');

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const img = new Image();
    img.src = 'coin.png';

    img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
    };

    function erase(x, y) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2); // ← увеличил размер
        ctx.fill();
    }

    // 🖱 ПК
    canvas.addEventListener('mousemove', (e) => {
        if (e.buttons === 1) {
            erase(e.offsetX, e.offsetY);
        }
    });

    // 📱 Телефон
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();

        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];

        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        erase(x, y);
    }, { passive: false });

    canvas.addEventListener('touchstart', (e) => {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];

        erase(touch.clientX - rect.left, touch.clientY - rect.top);
    });
});

function disableScroll() {
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = '';
}

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.onload = () => {
    window.scrollTo(0, 0);
};

disableScroll();

setTimeout(enableScroll, 7000);
