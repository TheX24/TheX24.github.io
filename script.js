//  CONFIG
const CONFIG = {
    me: {
        name:   'TX24',
        handle: 'Marche, Italy',
        avatar: 'avatar.png',
        bio:    'Chinese developer, lyrics syncer & gamer living in Italy. I build Python tools for controller emulation and websites for lyric splitting. I play R6 Siege too.',
        tags:   ['Python', 'TypeScript', 'Gamer', 'Lyrics', 'R6 Siege'],
    },

    socials: [
        { icon: 'fab fa-discord',      url: 'https://discord.com/users/504541573636161546',      cls: 's-discord',  label: 'Discord'  },
        { icon: 'fab fa-reddit-alien', url: 'https://reddit.com/user/Escaltins',     cls: 's-reddit',   label: 'Reddit'   },
        { icon: 'fab fa-tiktok',       url: 'https://tiktok.com/@TX246408',      cls: 's-tiktok',   label: 'TikTok'   },
        { icon: 'fab fa-twitch',       url: 'https://twitch.tv/tx246408',        cls: 's-twitch',   label: 'Twitch'   },
        { icon: 'fa-brands fa-x-twitter',      url: 'https://x.com/TX246408',      cls: 's-twitter',  label: 'Twitter'  },
        { icon: 'fa-brands fa-youtube',      url: 'https://youtube.com/@tx24',     cls: 's-youtube',  label: 'YouTube'  },
        { icon: 'fab fa-github',       url: 'https://github.com/TheX24',       cls: 's-github',   label: 'GitHub'   },
        { icon: 'fab fa-spotify',      url: 'https://open.spotify.com/user/31t4j3exml3peu57xuxcpco6c5ly', cls: 's-spotify',  label: 'Spotify'  },
        { icon: 'fab fa-telegram',     url: 'https://t.me/tx246408',             cls: 's-telegram', label: 'Telegram' },
        { icon: 'si si-roblox',      url: 'https://roblox.com/users/937461254/profile',       cls: 's-roblox',   label: 'Roblox'   },
        { icon: 'fab fa-steam',        url: 'https://steamcommunity.com/id/TX246408',  cls: 's-steam',    label: 'Steam'    },
    ],

    timezone: {
        zone:  'Europe/Rome',
        label: 'CET/GMT+1/UTC+1 — Italy',
    },

    birthday: { month: 10, day: 11 }, // October 11

    languages: [
        { code: 'IT', name: 'Italian',  flag: '🇮🇹', level: 'Fluent'  },
        { code: 'EN', name: 'English',  flag: '🇬🇧', level: 'Fluent'  },
        { code: 'ZH', name: 'Chinese',  flag: '🇨🇳', level: 'Native'},
    ],

    games: [
        { name: 'Rainbow Six Siege X',   img: 'games/rainbowsixsiege.jpg',  fav: true  },
        { name: 'Dispatch',              img: 'games/dispatch.jpg', fav: false },
        { name: 'Steel Century Groove',  img: 'games/steelcenturygroove.jpg', fav: false },
        { name: 'Titanfall 2',           img: 'games/titanfall2.jpg', fav: false },
        { name: 'Schedule I',            img: 'games/schedule1.jpg', fav: false },
        { name: 'The Crew Motorfest',    img: 'games/thecrewmotorfest.jpg', fav: false },
        { name: 'Forza Horizon 5',       img: 'games/forzahorizon5.png', fav: false },
        { name: 'Forza Horizon 6',       img: 'games/forzahorizon6.png', fav: false },
        { name: 'Minecraft',             img: 'games/minecraft.png', fav: false },
        { name: 'Roblox',                img: 'games/roblox.png', fav: false },
        { name: 'VRChat',                img: 'games/vrchat.jpg',  fav: false },
        { name: 'Stray',                 img: 'games/stray.jpg', fav: false },
        { name: 'Counter-Strike 2',      img: 'games/counterstrike2.jpg',     fav: false },
        { name: 'Rocket League',         img: 'games/rocketleague.jpg',  fav: false },
        { name: 'Powerwash Simulator 2', img: 'games/powerwashsimulator2.jpg', fav: false },
        { name: 'Mini Motorways',        img: 'games/minimotorways.jpg', fav: false },
    ],

    projects: [
        {
            icon:  'fas fa-gamepad',
            name:  'DD2RL Emulator',
            desc:  'Use your DrunkDeer G75 magnetic keyboard as a virtual Xbox 360 controller.',
            url:   'https://github.com/TheX24/DD2RL',
        },
        {
            icon:  'fas fa-music',
            name:  'Lyrprep',
            desc:  'A powerful web application for formatting and preprocessing song lyrics with real-time conversion.',
            url:   'https://github.com/TheX24/Lyrprep',
            site:  'https://lyrprep.spicylyrics.org',
        },
    ],
};

//  HELPERS
function block(inner) {
    return `<div class="block"><div class="tilt-wrap">${inner}</div></div>`;
}
function wrapCard(cls, label, inner) {
    return block(`<div class="${cls} reveal"><div class="label">${label}</div>${inner}</div>`);
}

//  RENDERERS
function renderMe() {
    const { name, handle, avatar, bio, tags } = CONFIG.me;
    const avatarInner = avatar ? `<img src="${avatar}" alt="${name}">` : name[0];
    return wrapCard('card', 'me', `
        <div class="me-top">
            <div class="avatar">${avatarInner}</div>
            <div><h1>${name}</h1><div class="handle">${handle}</div></div>
        </div>
        <p class="bio">${bio}</p>
        <div class="tags">${tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    `);
}
function renderTimezone() {
    const { zone, label } = CONFIG.timezone;
    const fmt = new Intl.DateTimeFormat('en-GB', {
        timeZone: zone,
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    });
    const inner = `
        <div class="tz-wrap">
            <div class="tz-time" id="tz-clock">--:--:--</div>
            <div class="tz-label">${label}</div>
        </div>`;
    setTimeout(() => {
        const el = document.getElementById('tz-clock');
        if (el) { setInterval(() => { el.textContent = fmt.format(new Date()); }, 1000); el.textContent = fmt.format(new Date()); }
    }, 0);
    return wrapCard('card', 'timezone', inner);
}
function renderLanguages() {
    const bars = CONFIG.languages.map(({ flag, name, level }) => `
        <div class="lang-row">
            <span class="lang-flag">${flag}</span>
            <span class="lang-name">${name}</span>
            <span class="lang-level">${level}</span>
        </div>`).join('');
    return wrapCard('card', 'languages', `<div class="lang-list">${bars}</div>`);
}
function renderBirthday() {
    function getCountdown() {
        const now   = new Date();
        let next    = new Date(now.getFullYear(), CONFIG.birthday.month - 1, CONFIG.birthday.day);
        if (next <= now) next.setFullYear(next.getFullYear() + 1);
        const diff  = next - now;
        const days  = Math.floor(diff / 86400000);
        const hrs   = Math.floor((diff % 86400000) / 3600000);
        const mins  = Math.floor((diff % 3600000)  / 60000);
        const secs  = Math.floor((diff % 60000)    / 1000);
        return { days, hrs, mins, secs };
    }
    const inner = `
        <div class="bday-wrap">
            <div class="bday-units">
                <div class="bday-unit"><span id="bd-d">--</span><small>days</small></div>
                <div class="bday-sep">:</div>
                <div class="bday-unit"><span id="bd-h">--</span><small>hrs</small></div>
                <div class="bday-sep">:</div>
                <div class="bday-unit"><span id="bd-m">--</span><small>min</small></div>
                <div class="bday-sep">:</div>
                <div class="bday-unit"><span id="bd-s">--</span><small>sec</small></div>
            </div>
            <div class="bday-date">October ${CONFIG.birthday.day} 🎂</div>
        </div>`;
    setTimeout(() => {
        function tick() {
            const { days, hrs, mins, secs } = getCountdown();
            document.getElementById('bd-d').textContent = days;
            document.getElementById('bd-h').textContent = String(hrs).padStart(2,'0');
            document.getElementById('bd-m').textContent = String(mins).padStart(2,'0');
            document.getElementById('bd-s').textContent = String(secs).padStart(2,'0');
        }
        tick(); setInterval(tick, 1000);
    }, 0);
    return wrapCard('card', 'birthday', inner);
}
function renderGames() {
    const items = CONFIG.games.map(({ name, img, fav }) => `
        <div class="game-item${fav ? ' game-fav' : ''} game-art-wrap" data-name="${name}">
            <img src="${img}" alt="${name}" loading="lazy" onerror="this.parentElement.classList.add('game-no-img')">
            ${fav ? '<div class="game-fav-badge"><i class="fas fa-star"></i></div>' : ''}
        </div>`).join('');

    setTimeout(() => {
        let tooltip = document.getElementById('game-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'game-tooltip';
            document.body.appendChild(tooltip);
        }

        document.querySelectorAll('.game-art-wrap').forEach(el => {
            // Mouse
            el.addEventListener('mouseenter', () => {
               tooltip.textContent = el.dataset.name;
               tooltip.style.opacity = '1';
            });
            el.addEventListener('mousemove', e => {
                tooltip.style.left = e.clientX + 'px';
                tooltip.style.top  = e.clientY + 'px';
            });
            el.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
            });

            // Touch
            el.addEventListener('touchstart', e => {
                const t = e.touches[0];
                tooltip.textContent = el.dataset.name;
                tooltip.style.left = t.clientX + 'px';
                tooltip.style.top  = t.clientY + 'px';
                tooltip.style.opacity = '1';
            }, { passive: true });
            el.addEventListener('touchmove', e => {
                const t = e.touches[0];
                tooltip.style.left = t.clientX + 'px';
                tooltip.style.top  = t.clientY + 'px';
            }, { passive: true });
            el.addEventListener('touchend', () => {
                tooltip.style.opacity = '0';
            }, { passive: true });
        });
    }, 0);

    return wrapCard('card', 'games', `<div class="games-grid">${items}</div>`);
}
function renderSocials() {
    const icons = CONFIG.socials.map(({ icon, url, cls, label }) => `
        <a href="${url}" class="social ${cls}" title="${label}" target="_blank">
            <i class="${icon}"></i>
        </a>`).join('');
    return wrapCard('socials-card', 'socials', `<div class="socials">${icons}</div>`);
}
function renderProjects() {
    const cards = CONFIG.projects.map(({ icon, name, desc, url, site }, i) => `
        <div class="proj-card reveal" style="--d:${i * 100}ms">
            <div class="proj-icon"><i class="${icon}"></i></div>
            <strong>${name}</strong>
            <p>${desc}</p>
            <div class="proj-links">
                <a href="${url}" target="_blank"><i class="fab fa-github"></i> GitHub</a>
                ${site ? `<a href="${site}" target="_blank"><i class="fas fa-globe"></i> Website</a>` : ''}
            </div>
        </div>`).join('');
    return wrapCard('card', 'projects', `<div class="projects-grid">${cards}</div>`);
}
function renderRow(...renderers) {
    const inner = renderers.map(r => `<div class="row-item">${r()}</div>`).join('');
    return `<div class="block-row">${inner}</div>`;
}

//  BUILD PAGE
document.getElementById('app').innerHTML = [
    renderMe(),
    renderSocials(),
    renderRow(() => renderTimezone(), () => renderBirthday()),
    renderLanguages(),
    renderProjects(),
    renderGames(),
].join('');

//  DOT GRID BACKGROUND
const canvas  = document.getElementById('bg');
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
window.addEventListener('touchmove', e => {
    const t = e.touches[0];
    mouse.x = t.clientX;
    mouse.y = t.clientY;
}, { passive: true });
window.addEventListener('touchend', () => {
    mouse.x = -9999;
    mouse.y = -9999;
}, { passive: true });
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

//  REVEAL + TILT
document.querySelectorAll('.reveal').forEach((el, i) =>
    setTimeout(() => el.classList.add('visible'), 50 + i * 80)
);

const MAX_TILT = 6;
document.querySelectorAll('.tilt-wrap').forEach(wrap => {
    const card = wrap.querySelector('.card, .socials-card');
    if (!card) return;

    function applyTilt(clientX, clientY) {
        const r = wrap.getBoundingClientRect();
        const x = (clientX - r.left) / r.width  - 0.5;
        const y = (clientY - r.top)  / r.height - 0.5;
        card.style.transform = `rotateY(${x * MAX_TILT * 2}deg) rotateX(${-y * MAX_TILT * 2}deg)`;
    }

    function resetTilt() {
        card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, background 0.3s, box-shadow 0.3s';
        card.style.transform  = 'rotateY(0deg) rotateX(0deg)';
    }

    // Mouse
    wrap.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease-out, border-color 0.3s, background 0.3s, box-shadow 0.3s';
    });
    wrap.addEventListener('mousemove', e => applyTilt(e.clientX, e.clientY));
    wrap.addEventListener('mouseleave', resetTilt);

    // Touch
    wrap.addEventListener('touchstart', () => {
        card.style.transition = 'transform 0.1s ease-out, border-color 0.3s, background 0.3s, box-shadow 0.3s';
    }, { passive: true });
    wrap.addEventListener('touchmove', e => {
        const t = e.touches[0];
        applyTilt(t.clientX, t.clientY);
    }, { passive: true });
    wrap.addEventListener('touchend', resetTilt, { passive: true });
});