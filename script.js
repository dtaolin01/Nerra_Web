document.addEventListener("DOMContentLoaded", () => {

    // 1. Mobile Menu Interactivity
    const mobileMenuBtn = document.getElementById("mobile-menu");
    const navLinks = document.getElementById("nav-links");

    if(mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains("active")) {
                icon.setAttribute("data-lucide", "x");
            } else {
                icon.setAttribute("data-lucide", "menu");
            }
            lucide.createIcons();
        });

        // Close menu on link click (Mobile)
        const links = navLinks.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                mobileMenuBtn.querySelector('i').setAttribute("data-lucide", "menu");
                lucide.createIcons();
            });
        });
    }

    // 2. Glassmorphism Navbar on Scroll
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 3. Scroll Reveal Animation (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-fade').forEach(el => observer.observe(el));

    // 4. Live Counter Simulation Engine
    function animateLiveCounter(id, targetPerYear) {
        const element = document.getElementById(id);
        if (!element) return;

        // Calculate addition per 100ms
        const incrementPerMs = targetPerYear / (365 * 24 * 60 * 60 * 10);
        let currentVal = targetPerYear * 0.95; // Start at 95% of target for realism

        setInterval(() => {
            currentVal += incrementPerMs;
            element.innerText = Math.floor(currentVal).toLocaleString('id-ID');
        }, 100);
    }

    // Execute with Real Data
    animateLiveCounter('hero-counter', 13000000);
    animateLiveCounter('plastic-jatim', 13000000);
    animateLiveCounter('plastic-leak', 1270000);
    animateLiveCounter('sea-animals', 64828);

    // 5. Pledge Form Submission UX
    const form = document.getElementById('challengeForm');
    const pledgeCountElement = document.getElementById('pledge-count');

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalHtml = btn.innerHTML;

            // Success Feedback
            btn.innerHTML = `<i data-lucide="check" class="mr-2"></i> IKRAR TERCATAT!`;
            btn.style.background = "linear-gradient(135deg, #10B981, #059669)";
            lucide.createIcons();

            // Increment UI Counter
            if(pledgeCountElement) {
                let currentCount = parseInt(pledgeCountElement.innerText.replace(/,/g, ''));
                pledgeCountElement.innerText = (currentCount + 1).toLocaleString('id-ID');
            }

            // Reset after 3 seconds
            setTimeout(() => {
                form.reset();
                btn.innerHTML = originalHtml;
                btn.style.background = "";
                lucide.createIcons();
            }, 3000);
        });
    }
});