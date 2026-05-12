document.addEventListener("DOMContentLoaded", () => {

    // Navbar Scroll & Bar
    const navbar = document.getElementById("navbar");
    const myBar = document.getElementById("myBar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 30) navbar.classList.add("scrolled");
        else navbar.classList.remove("scrolled");
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if(myBar) myBar.style.width = ((winScroll / height) * 100) + "%";
    });

    // Mobile Menu
    const mobileMenuBtn = document.getElementById("mobile-menu");
    const navLinks = document.getElementById("nav-links");
    if(mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            lucide.createIcons();
        });
    }

    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("active"); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

    // Live Counters
    function startLiveCounter(id, baseValue, incrementPerSecond, isFloat = false) {
        const el = document.getElementById(id);
        if(!el) return;
        let current = baseValue;
        setInterval(() => {
            current += (incrementPerSecond / 10);
            if (isFloat) el.innerText = current.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            else el.innerText = Math.floor(current).toLocaleString('en-US');
        }, 100);
    }
    startLiveCounter('hero-counter', 13000000, 2.5);
    startLiveCounter('count-tpa', 210075.60, 0.0185, true);
    startLiveCounter('count-sungai', 4267.34, 0.0004, true);
    startLiveCounter('count-jatim', 1543192.31, 0.1359, true);

    // Form
    const form = document.getElementById('challengeForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.innerText = "WELCOME TO SQUAD!";
            btn.style.background = "#10B981";
            setTimeout(() => { form.reset(); btn.innerText = "COUNT ME IN!"; btn.style.background = ""; }, 3000);
        });
    }

    // Particles
    const container = document.getElementById("particles-container");
    if(container) {
        for(let i = 0; i < 25; i++) {
            let p = document.createElement("div"); p.classList.add("particle");
            p.style.width = p.style.height = (Math.random() * 3 + 1) + "px";
            p.style.left = Math.random() * 100 + "vw";
            p.style.animationDuration = (Math.random() * 10 + 10) + "s";
            p.style.animationDelay = Math.random() * 5 + "s";
            container.appendChild(p);
        }
    }
    lucide.createIcons();
});