/* ============================================
   SUNDEEPA BAMVAL — PREMIUM PORTFOLIO
   Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Preloader ────────────────────────────
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1200);
  });

  // Fallback: hide after 3 seconds max
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 3000);

  // ─── Custom Cursor ────────────────────────
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor hover effect on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .project-card, .service-card');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // ─── Navbar Scroll Effect ─────────────────
  const navbar = document.getElementById('navbar');
  const heroSection = document.getElementById('hero');

  function handleNavScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ─── Mobile Hamburger Menu ────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ─── Smooth Scroll ────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── Scroll Reveal (Intersection Observer) ─
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ─── Hero Parallax ────────────────────────
  const heroBgImg = document.getElementById('heroBgImg');

  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      const offset = window.scrollY * 0.4;
      heroBgImg.style.transform = `scale(1.1) translateY(${offset}px)`;
    }
  }, { passive: true });

  // ─── Testimonial Carousel ─────────────────
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  let currentSlide = 0;
  let autoPlayInterval;

  function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    currentSlide = ((index % slides.length) + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.index));
      resetAutoPlay();
    });
  });

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  startAutoPlay();

  // ─── Contact Form ─────────────────────────
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Construct mailto link
    const mailtoLink = `mailto:sundeepa.bamval@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;

    // Visual feedback
    const btn = contactForm.querySelector('.form-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Message Sent! ✓';
    btn.style.background = '#4a7c59';
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      contactForm.reset();
    }, 2500);
  });

  // ─── Active Nav Link Highlighting ─────────
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + entry.target.id) {
            a.style.color = 'var(--clr-gold)';
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(s => sectionObserver.observe(s));

  // ─── Service Cards Tilt on Hover ──────────
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -5;
      const rotateY = (x - centerX) / centerX * 5;
      card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});
