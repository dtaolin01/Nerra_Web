document.addEventListener("DOMContentLoaded", () => {

    // 1. Navbar Glass Effect & Scroll Progress Bar
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

    // 2. Mobile Menu Toggle
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

    // 3. Scroll Reveal Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

    // 4. Counters
    function startCounter(id, target, startVal) {
        const el = document.getElementById(id);
        if(!el) return;
        let current = startVal;
        setInterval(() => {
            current += (target / 20000);
            el.innerText = Math.floor(current).toLocaleString('id-ID');
        }, 100);
    }

    startCounter('hero-counter', 13000000, 12900000);
    startCounter('plastic-leak', 1270000, 1260000);
    startCounter('sea-animals', 64828, 64000);

    // 5. Form Pledges
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
                pledgeCount.innerText = (currentCount + 1).toLocaleString('id-ID');
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
        for(let i = 0; i < 20; i++) {
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

    lucide.createIcons();
});