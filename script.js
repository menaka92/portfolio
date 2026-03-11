/* Menaka Lakshan Portfolio — script.js */
/* menakalakshan.com */


  // Hamburger menu
  const hamburger  = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function toggleMenu(open) {
    hamburger.classList.toggle('open', open);
    navLinksEl.classList.toggle('open', open);
    navOverlay.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => toggleMenu(!hamburger.classList.contains('open')));
  navOverlay.addEventListener('click', () => toggleMenu(false));
  document.querySelectorAll('#navLinks a').forEach(a => {
    a.addEventListener('click', () => toggleMenu(false));
  });

// Person background — show only after carousel
  const personBg = document.getElementById('person-bg');
  const carouselEl = document.getElementById('carousel');

  function updatePersonBg() {
    const carouselBottom = carouselEl.getBoundingClientRect().bottom;
    if (carouselBottom <= 0) {
      personBg.style.opacity = '1';
      personBg.style.transition = 'opacity 0.6s ease';
    } else {
      personBg.style.opacity = '0';
    }
  }
  personBg.style.opacity = '0';
  window.addEventListener('scroll', updatePersonBg);
  updatePersonBg();

  // Carousel
  const track = document.getElementById('carouselTrack');
  const dots = document.querySelectorAll('.carousel-dot');
  const counter = document.getElementById('carouselCounter');
  let current = 0;
  const total = 3;
  let autoTimer;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    counter.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
  }

  document.getElementById('nextBtn').addEventListener('click', () => { goTo(current + 1); resetAuto(); });
  document.getElementById('prevBtn').addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  document.querySelectorAll('.carousel-dot').forEach((dot, i) => { dot.addEventListener('click', () => { goTo(i); resetAuto(); }); dot.style.cursor = 'none'; });

  function resetAuto() { clearInterval(autoTimer); autoTimer = setInterval(() => goTo(current + 1), 5000); }
  resetAuto();

  // Cursor
  const cursor = document.getElementById('cursor');
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .skill-tag, .project-card, .stat-box').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
