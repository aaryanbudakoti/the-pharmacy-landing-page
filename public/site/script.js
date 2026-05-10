/* The Pharmacy - Interactions */
(function(){
  // Year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Sticky navbar shadow
  const nav = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 8) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const burger = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  burger?.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open'); burger.classList.remove('open');
    burger.setAttribute('aria-expanded','false');
  }));

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Animated counters
  const counters = document.querySelectorAll('.num');
  const cIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.target;
      const dur = 1600;
      const start = performance.now();
      const fmt = n => n >= 1000 ? n.toLocaleString('en-IN') : String(n);
      const tick = (t) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => cIO.observe(c));

  // Contact form (front-end only)
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (!data.name || !data.phone || !data.message){
      msg.textContent = 'Please fill all fields.'; msg.style.color = '#c0392b';
      return;
    }
    const text = `Hi, I'm ${data.name} (${data.phone}). ${data.message}`;
    const wa = `https://wa.me/918735898101?text=${encodeURIComponent(text)}`;
    msg.style.color = '';
    msg.textContent = 'Opening WhatsApp to send your message...';
    window.open(wa, '_blank', 'noopener');
    form.reset();
  });
})();
