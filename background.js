//  DOT GRID BACKGROUND
const canvas  = document.getElementById('bg');
if (canvas) {
    const ctx     = canvas.getContext('2d');
    let mouse     = { x: -9999, y: -9999 };
    const SPACING = 28;
    let dots      = [];

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        dots = [];
        const cols = Math.ceil(canvas.width  / SPACING) + 1;
        const rows = Math.ceil(canvas.height / SPACING) + 1;
        for (let r = 0; r < rows; r++)
            for (let c = 0; c < cols; c++)
                dots.push({ x: c * SPACING, y: r * SPACING });
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('touchstart', e => {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    }, { passive: true });
    window.addEventListener('touchmove', e => {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    }, { passive: true });

    function resetMouse() {
        setTimeout(() => { mouse.x = -9999; mouse.y = -9999; }, 80);
    }
    window.addEventListener('touchend',    resetMouse, { passive: true });
    window.addEventListener('touchcancel', resetMouse, { passive: true });

    resize();

    (function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const d of dots) {
            const dx = d.x - mouse.x, dy = d.y - mouse.y;
            const t  = Math.max(0, 1 - Math.sqrt(dx*dx + dy*dy) / 180);
            ctx.beginPath();
            ctx.arc(d.x, d.y, 1 + 2.5*t, 0, Math.PI*2);
            ctx.fillStyle = `rgba(255,220,0,${0.07 + 0.45*t})`;
            ctx.fill();
        }
        requestAnimationFrame(draw);
    })();
}
