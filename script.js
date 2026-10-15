/**
 * MRIDHULA M — PERSONAL PORTFOLIO INTERACTION & ANIMATION ENGINE
 * Features:
 * - Dynamic Particle Network with Shooting Star / Meteor Streaks (Canvas)
 * - Fluid Ambient Cursor Glow Spotlight with Lerp Physics
 * - Dynamic Realistic Typewriter Engine for Hero Subtitle
 * - 3D Interactive Card Tilt with Specular Glare Reflections
 * - Magnetic Button Micro-Interactions
 * - Scroll Observer & Section Reveal Transitions
 * - Animated CGPA Distinction Counter (0.0 -> 8.6)
 * - Sticky Blur Navigation & Active Section Tracking
 * - Mobile Menu Drawer
 * - Resume Modal Viewer
 * - One-Click Clipboard Copy with Toast Feedback
 * - Contact Form Handler with Mailto Dispatch
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. DYNAMIC PARTICLE NETWORK & SHOOTING STARS (CANVAS)
  // =========================================================================
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let shootingStars = [];
    let animationFrameId;

    // Mouse tracking for subtle node reaction
    const mouse = {
      x: null,
      y: null,
      radius: 140
    };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 2 + 0.8;
        this.color = Math.random() > 0.4 ? 'rgba(56, 189, 248, ' : 'rgba(168, 85, 247, ';
        this.baseAlpha = Math.random() * 0.45 + 0.25;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseVal = Math.random() * Math.PI;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Subtle alpha breathing
        this.pulseVal += this.pulseSpeed;
        const alpha = this.baseAlpha + Math.sin(this.pulseVal) * 0.15;

        // Bounce gently off borders
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Interaction with mouse cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 1.6;
            this.y -= Math.sin(angle) * force * 1.6;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const currentAlpha = Math.max(0.1, this.baseAlpha + Math.sin(this.pulseVal) * 0.15);
        ctx.fillStyle = this.color + currentAlpha + ')';
        ctx.fill();
      }
    }

    // Shooting Star / Cosmic Meteor Class
    class ShootingStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width * 0.8;
        this.y = Math.random() * (height * 0.4);
        this.length = Math.random() * 80 + 50;
        this.speed = Math.random() * 7 + 9;
        this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2; // ~45 degrees diagonal
        this.opacity = 1;
        this.fade = Math.random() * 0.02 + 0.015;
        this.active = true;
      }

      update() {
        if (!this.active) return;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= this.fade;

        if (this.opacity <= 0 || this.x > width || this.y > height) {
          this.active = false;
        }
      }

      draw() {
        if (!this.active) return;
        ctx.save();
        ctx.beginPath();
        const tailX = this.x - Math.cos(this.angle) * this.length;
        const tailY = this.y - Math.sin(this.angle) * this.length;
        const grad = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0)');
        grad.addColorStop(1, `rgba(255, 255, 255, ${this.opacity})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();

        // Glowing Star Head
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }
    }

    function initParticles() {
      particles = [];
      const count = Math.min(Math.floor((width * height) / 15000), 85);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    // Periodically spawn shooting stars
    setInterval(() => {
      if (document.visibilityState === 'visible' && shootingStars.length < 3) {
        shootingStars.push(new ShootingStar());
      }
    }, 4500);

    function connectParticles() {
      const maxDist = 125;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw constellation particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connectParticles();

      // Draw and update shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        shootingStars[i].update();
        shootingStars[i].draw();
        if (!shootingStars[i].active) {
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
  }

  // =========================================================================
  // 2. FLUID AMBIENT CURSOR SPOTLIGHT (LERP PHYSICS)
  // =========================================================================
  const spotlight = document.getElementById('cursor-spotlight');
  if (spotlight && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let isMoving = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        spotlight.classList.add('active');
        isMoving = true;
      }
    });

    window.addEventListener('mouseleave', () => {
      spotlight.classList.remove('active');
      isMoving = false;
    });

    function renderSpotlight() {
      // Smooth lerp interpolation
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      spotlight.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(renderSpotlight);
    }
    renderSpotlight();
  }

  // =========================================================================
  // 3. DYNAMIC TYPEWRITER EFFECT (HERO SUBTITLE)
  // =========================================================================
  const typewriterElement = document.getElementById('typewriter-text');
  if (typewriterElement) {
    const phrases = [
      "Aspiring AI & Data Science Professional",
      "Python & Machine Learning Enthusiast",
      "Data Analytics & SQL Explorer",
      "Passionate Problem Solver & Scholar"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 75;
    const deletingSpeed = 40;
    const pauseDelay = 2200;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
        typewriterElement.textContent = currentPhrase.substring(0, charIndex);
      } else {
        charIndex++;
        typewriterElement.textContent = currentPhrase.substring(0, charIndex);
      }

      let timeout = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentPhrase.length) {
        timeout = pauseDelay;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timeout = 400;
      }

      setTimeout(typeLoop, timeout);
    }

    // Start typing after initial fade-in
    setTimeout(typeLoop, 800);
  }

  // =========================================================================
  // 4. 3D INTERACTIVE CARD TILT & SPECULAR GLARE REFLECTION
  // =========================================================================
  const tiltCards = document.querySelectorAll('.glass-card, .silver-achievement-card');
  
  if (window.matchMedia('(pointer: fine)').matches && window.innerWidth > 768) {
    tiltCards.forEach((card) => {
      // Inject dynamic glare layer
      let glare = card.querySelector('.card-glare');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'card-glare';
        card.appendChild(glare);
      }

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
        const rotateY = ((x - centerX) / centerX) * 6;  // max 6 deg

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.015, 1.015, 1.015)`;

        // Move glare reflection
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        glare.style.opacity = '1';
        glare.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.16) 0%, transparent 60%)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        glare.style.opacity = '0';
      });
    });
  }

  // =========================================================================
  // 5. MAGNETIC BUTTON MICRO-INTERACTIONS
  // =========================================================================
  const magneticButtons = document.querySelectorAll('.hero-cta-group .btn');
  if (window.matchMedia('(pointer: fine)').matches && window.innerWidth > 768) {
    magneticButtons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px) translateY(-2px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // =========================================================================
  // 6. STICKY NAVBAR SCROLL STATE & ACTIVE LINK TRACKING
  // =========================================================================
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleNavbarScroll() {
    if (window.scrollY > 30) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }

    // Active Section Spy
    let currentId = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // =========================================================================
  // 7. MOBILE NAVIGATION DRAWER
  // =========================================================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const drawerOverlay = document.getElementById('drawer-overlay');

  function openMobileMenu() {
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      isOpen ? closeMobileMenu() : openMobileMenu();
    });
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close mobile drawer when clicking any link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeMobileMenu();
      }
    });
  });

  // =========================================================================
  // 8. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal-fade, .reveal-scale, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  // =========================================================================
  // 9. ANIMATED CGPA COUNTER (0.0 -> 8.6)
  // =========================================================================
  const cgpaCounter = document.getElementById('cgpa-counter');
  let counterAnimated = false;

  if (cgpaCounter) {
    const targetValue = parseFloat(cgpaCounter.getAttribute('data-target')) || 8.6;

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counterAnimated) {
          counterAnimated = true;
          animateValue(cgpaCounter, 0.0, targetValue, 1600);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterObserver.observe(cgpaCounter);
  }

  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic function
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = (start + (end - start) * easeProgress).toFixed(1);
      obj.innerHTML = current;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        obj.innerHTML = end.toFixed(1);
      }
    };
    window.requestAnimationFrame(step);
  }

  // =========================================================================
  // 10. RESUME MODAL VIEWER
  // =========================================================================
  const resumeModal = document.getElementById('resume-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const openModalButtons = document.querySelectorAll('.open-resume-modal');

  function openResumeModal() {
    if (!resumeModal) return;
    resumeModal.removeAttribute('hidden');
    void resumeModal.offsetWidth; // Force reflow
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeResumeModal() {
    if (!resumeModal) return;
    resumeModal.classList.remove('active');
    setTimeout(() => {
      resumeModal.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }, 300);
  }

  openModalButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeResumeModal);
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (resumeModal && resumeModal.classList.contains('active')) {
        closeResumeModal();
      }
      if (navMenu && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    }
  });

  // =========================================================================
  // 11. TOAST NOTIFICATION & ONE-CLICK CLIPBOARD COPY
  // =========================================================================
  const toast = document.getElementById('toast-notify');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
        showToast(`Copied to clipboard: ${textToCopy}`);
      } catch (err) {
        showToast(`Failed to copy: ${textToCopy}`);
      }
    });
  });

  // =========================================================================
  // 12. INTERACTIVE CONTACT FORM HANDLER
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('sender-name').value.trim();
      const email = document.getElementById('sender-email').value.trim();
      const subject = document.getElementById('sender-subject').value.trim();
      const message = document.getElementById('sender-message').value.trim();

      if (!name || !email || !subject || !message) {
        if (formFeedback) {
          formFeedback.className = 'form-feedback error';
          formFeedback.textContent = 'Please fill out all fields before sending.';
        }
        return;
      }

      const mailtoUrl = `mailto:mmridhula148@gmail.com?subject=${encodeURIComponent(subject + ' - via Portfolio from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;

      if (formFeedback) {
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `✓ Opening your email client to dispatch to <strong>mmridhula148@gmail.com</strong>...`;
      }

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 500);
    });
  }

  // =========================================================================
  // 13. AUTOMATIC CURRENT YEAR UPDATE
  // =========================================================================
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
