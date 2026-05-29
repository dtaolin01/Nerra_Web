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


    // =========================================================
    // 4. LOGIKA "DATABASE LOKAL" (PERSISTENT LIVE COUNTER)
    // =========================================================
    function startLiveCounter(id, baseValue, incrementPerSecond, isFloat = false) {
        const el = document.getElementById(id);
        if(!el) return;

        // Membuat 'kunci' unik untuk menyimpan data di database browser
        const keyVal = `nerra_db_val_${id}`;
        const keyTime = `nerra_db_time_${id}`;

        let currentVal;
        const now = Date.now(); // Waktu saat ini dalam milidetik

        // 1. Cek apakah ada data terakhir yang disimpan di browser klien
        const savedVal = localStorage.getItem(keyVal);
        const savedTime = localStorage.getItem(keyTime);

        if (savedVal !== null && savedTime !== null) {
            // Jika ada, hitung selisih waktu (dalam detik) sejak klien terakhir menutup web
            const elapsedSeconds = (now - parseInt(savedTime)) / 1000;
            // Lanjutkan dari angka terakhir + (waktu yang hilang * penambahan per detik)
            currentVal = parseFloat(savedVal) + (elapsedSeconds * incrementPerSecond);
        } else {
            // Jika baru PERTAMA KALI dibuka, gunakan perhitungan waktu dari 1 Jan 2026
            const baseDate = new Date("2026-01-01T00:00:00").getTime();
            const elapsedSeconds = (now - baseDate) / 1000;
            // Cegah angka minus jika dites sebelum tahun 2026
            const validElapsed = elapsedSeconds > 0 ? elapsedSeconds : 0;
            currentVal = baseValue + (validElapsed * incrementPerSecond);
        }

        const incrementPer100ms = incrementPerSecond / 10;

        setInterval(() => {
            // Tambahkan nilai setiap 100 milidetik
            currentVal += incrementPer100ms;

            // Tampilkan ke layar
            if (isFloat) {
                el.innerText = currentVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            } else {
                el.innerText = Math.floor(currentVal).toLocaleString('en-US');
            }

            // 2. Simpan nilai dan waktu terbaru ke database browser (berjalan di background)
            localStorage.setItem(keyVal, currentVal.toString());
            localStorage.setItem(keyTime, Date.now().toString());

        }, 100);
    }

    startLiveCounter('hero-counter', 13000000, 2.5);
    startLiveCounter('count-tpa', 210075.60, 0.0185, true);
    startLiveCounter('count-sungai', 4267.34, 0.0004, true);
    startLiveCounter('count-jatim', 1543192.31, 0.1359, true);


    // 5. Slider Simulation
    const sliders = document.querySelectorAll('.slider-control');
    sliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const container = e.target.parentElement;
            const afterSide = container.querySelector('.side.after');
            const sliderLine = container.querySelector('.slider-line');

            if(afterSide) {
                afterSide.style.clipPath = `inset(0 ${100 - e.target.value}% 0 0)`;
            }
            if(sliderLine) {
                sliderLine.style.left = e.target.value + "%";
            }
        });
    });

    // 6. Form Submit Email Asli (FormSubmit)
    // JANGAN LUPA GANTI DENGAN EMAIL ASLI ANDA DI BAWAH INI
    const ADMIN_EMAIL = "email_asli_anda@gmail.com";

    const challengeForm = document.getElementById('challengeForm');
    if(challengeForm) {
        challengeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = "MENGIRIM...";
            const formData = new FormData(this);
            formData.append("_subject", "Eco Squad Baru Bergabung!");

            fetch(`https://formsubmit.co/ajax/${ADMIN_EMAIL}`, {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    btn.innerHTML = `<i data-lucide="check-circle" class="w-5 h-5 inline mr-2"></i> WELCOME TO SQUAD!`;
                    btn.style.background = "#10B981";
                    btn.style.color = "#FFFFFF";
                    lucide.createIcons();

                    const pledgeCount = document.getElementById('pledge-count');
                    if(pledgeCount) {
                        let currentCount = parseInt(pledgeCount.innerText.replace(/,/g, ''));
                        pledgeCount.innerText = (currentCount + 1).toLocaleString('en-US');
                    }

                    setTimeout(() => {
                        challengeForm.reset();
                        btn.innerText = originalText;
                        btn.style.background = "";
                        btn.style.color = "";
                        lucide.createIcons();
                    }, 3000);
                })
                .catch(error => {
                    btn.innerText = "GAGAL TERKIRIM, COBA LAGI";
                    setTimeout(() => { btn.innerText = originalText; }, 3000);
                });
        });
    }

    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerText = "MENGIRIM...";
            const formData = new FormData(this);
            formData.append("_subject", "Pesan Baru dari Website Nerra!");

            fetch(`https://formsubmit.co/ajax/${ADMIN_EMAIL}`, {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    btn.innerHTML = `Terkirim! <i data-lucide="check-circle" class="w-5 h-5 ml-2 inline"></i>`;
                    btn.style.background = "#10B981";
                    lucide.createIcons();

                    setTimeout(() => {
                        contactForm.reset();
                        btn.innerHTML = originalText;
                        btn.style.background = "";
                        lucide.createIcons();
                    }, 3000);
                })
                .catch(error => {
                    btn.innerText = "Gagal Terkirim!";
                    setTimeout(() => { btn.innerHTML = originalText; }, 3000);
                });
        });
    }

    // 7. Ambient Particles
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
    // =========================================================
    // 8. FORCE SMOOTH SCROLL UNTUK SEMUA TOMBOL MENU
    // =========================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Mencegah loncatan kasar bawaan HTML

            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Abaikan kalau cuma href="#"

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Hitung tinggi navbar agar berhentinya pas dan tidak tertutup
                const navbarHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                // Paksa scroll mulus
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // (Opsional) Tutup menu mobile jika tombol ditekan dari HP
                const navLinks = document.getElementById("nav-links");
                if (navLinks && navLinks.classList.contains("active")) {
                    navLinks.classList.remove("active");
                    const mobileMenuBtn = document.getElementById("mobile-menu");
                    if (mobileMenuBtn) {
                        mobileMenuBtn.querySelector('i').setAttribute("data-lucide", "menu");
                        lucide.createIcons();
                    }
                }
            }
        });
    });
    lucide.createIcons();
});