// ============================================
// CYDA SA - Designer de Sobrancelhas
// JavaScript Interativo
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // HEADER - Scroll Effect
    // ============================================
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ============================================
    // MENU MOBILE - Toggle
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ============================================
    // SLIDER DE DEPOIMENTOS
    // ============================================
    const track = document.getElementById('depoimentosTrack');
    const cards = track.children;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    let currentIndex = 0;
    let autoSlideInterval;

    // Criar dots
    for (let i = 0; i < cards.length; i++) {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        dot.setAttribute('aria-label', 'Ir para depoimento ' + (i + 1));
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.children;

    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Atualizar dots
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }
        dots[currentIndex].classList.add('active');
        
        resetAutoSlide();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        goToSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        goToSlide(currentIndex);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Iniciar autoplay
    resetAutoSlide();

    // Pausar autoplay no hover
    const slider = document.getElementById('depoimentosSlider');
    slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    slider.addEventListener('mouseleave', resetAutoSlide);

    // ============================================
    // BOTÃO BOOKSY - Animação de pulso
    // ============================================
    const booksyBtn = document.querySelector('.btn-booksy');
    if (booksyBtn) {
        booksyBtn.style.animation = 'pulse 2s infinite';
        
        const pulseStyle = document.createElement('style');
        pulseStyle.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.03); }
            }
        `;
        document.head.appendChild(pulseStyle);
    }

    // ============================================
    // SCROLL SUAVE PARA LINKS INTERNOS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // FILTROS DE SERVIÇOS
    // ============================================
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const servicoCards = document.querySelectorAll('.servico-card');

    function aplicarFiltro(filtro) {
        filtroBtns.forEach(b => b.classList.remove('active'));
        const btnAtivo = document.querySelector(`.filtro-btn[data-filtro="${filtro}"]`);
        if (btnAtivo) btnAtivo.classList.add('active');

        servicoCards.forEach(card => {
            if (filtro === 'todos' || card.getAttribute('data-categoria') === filtro) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    filtroBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            aplicarFiltro(this.getAttribute('data-filtro'));
        });
    });

    // Links do rodapé com filtro
    document.querySelectorAll('.footer-links a[data-filtro]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filtro = this.getAttribute('data-filtro');
            aplicarFiltro(filtro);
            
            // Scroll suave até a seção de serviços
            const servicosSection = document.getElementById('servicos');
            if (servicosSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = servicosSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ANIMAÇÃO DE SCROLL - Elementos aparecem
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    document.querySelectorAll('.contato-item, .sobre-features li').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ============================================
    // CONTADOR DE ANIMAÇÕES (Badge)
    // ============================================
    const badgeNumber = document.querySelector('.badge-number');
    if (badgeNumber) {
        let count = 0;
        const target = 5;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const counter = setInterval(() => {
            count += increment;
            if (count >= target) {
                badgeNumber.textContent = target + '+';
                clearInterval(counter);
            } else {
                badgeNumber.textContent = Math.floor(count) + '+';
            }
        }, 16);
    }

    console.log('✨ Cyda Sa - Landing Page carregada com sucesso!');
});
