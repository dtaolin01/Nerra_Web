document.addEventListener("DOMContentLoaded", () => {

    // 1. Navbar Glass Effect
    const navbar = document.getElementById("navbar");
    const myBar = document.getElementById("myBar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 30) navbar.classList.add("scrolled");
        else navbar.classList.remove("scrolled");

        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        if(myBar) myBar.style.width = scrolled + "%";
    });

    // 2. Mobile Menu
    const mobileMenuBtn = document.getElementById("mobile-menu");
    const navLinks = document.getElementById("nav-links");

    if(mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const icon = mobileMenuBtn.querySelector('i');
            if(navLinks.classList.contains("active")) {
                icon.setAttribute("data-lucide", "x");
            } else {
                icon.setAttribute("data-lucide", "menu");
            }
            lucide.createIcons();
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                mobileMenuBtn.querySelector('i').setAttribute("data-lucide", "menu");
                lucide.createIcons();
            });
        });
    }

    // 3. Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

    // 4. TRUE Live Counters (Tidak Berhenti)
    function startLiveCounter(id, baseValue, incrementPerSecond, isFloat = false) {
        const el = document.getElementById(id);
        if(!el) return;

        let current = baseValue;
        const incrementPer100ms = incrementPerSecond / 10;

        setInterval(() => {
            current += incrementPer100ms;
            if (isFloat) {
                el.innerText = current.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            } else {
                el.innerText = Math.floor(current).toLocaleString('en-US');
            }
        }, 100);
    }

    startLiveCounter('hero-counter', 13000000, 2.5);
    startLiveCounter('count-tpa', 210075.60, 0.0185, true);
    startLiveCounter('count-sungai', 4267.34, 0.0004, true);
    startLiveCounter('count-jatim', 1543192.31, 0.1359, true);

    // 5. Form Submit (Aman)
    const form = document.getElementById('challengeForm');
    const pledgeCount = document.getElementById('pledge-count');

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            btn.innerHTML = `<i data-lucide="check-circle" class="w-5 h-5 inline mr-2"></i> WELCOME TO SQUAD!`;
            btn.style.background = "#10B981";
            btn.style.color = "#FFFFFF";
            lucide.createIcons();

            if(pledgeCount) {
                let currentCount = parseInt(pledgeCount.innerText.replace(/,/g, ''));
                pledgeCount.innerText = (currentCount + 1).toLocaleString('en-US');
            }

            setTimeout(() => {
                form.reset();
                btn.innerText = originalText;
                btn.style.background = "";
                btn.style.color = "";
                lucide.createIcons();
            }, 3000);
        });
    }

    // 6. Ambient Particles
    const particlesContainer = document.getElementById("particles-container");
    if(particlesContainer) {
        for(let i = 0; i < 25; i++) {
            let p = document.createElement("div");
            p.classList.add("particle");
            let size = Math.random() * 3 + 1;
            p.style.width = size + "px";
            p.style.height = size + "px";
            p.style.left = Math.random() * 100 + "vw";
            p.style.animationDuration = (Math.random() * 15 + 10) + "s";
            p.style.animationDelay = Math.random() * 5 + "s";
            particlesContainer.appendChild(p);
        }
    }

    // 4. Before/After Simulation (Telah diperbarui memakai clip-path)
    const sliders = document.querySelectorAll('.slider-control');
    sliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const container = e.target.parentElement;
            const afterSide = container.querySelector('.side.after');
            const sliderLine = container.querySelector('.slider-line');

            // Inset clip-path crops from top, right, bottom, left.
            // 100 - value gives the percentage to crop from the right!
            if(afterSide) {
                afterSide.style.clipPath = `inset(0 ${100 - e.target.value}% 0 0)`;
            }
            if(sliderLine) {
                sliderLine.style.left = e.target.value + "%";
            }
        });
    });

    lucide.createIcons();
});