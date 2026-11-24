









(() => {
  'use strict';

  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  


  const toggle = $('.navbar__toggle');
  const menu = $('#menu');

  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('is-open', open);
  };

  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  




  const themeBtn = $('.navbar__theme');
  const themeMeta = $('meta[name="theme-color"]');

  const applyTheme = (dark, save) => {
    if (dark) root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    if (themeMeta) themeMeta.setAttribute('content', dark ? '#0d1127' : '#1f2a6b');
    if (save) { try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {  } }
  };

  applyTheme(root.getAttribute('data-theme') === 'dark', false);

  themeBtn.addEventListener('click', () => {
    root.classList.add('theme-transition');
    applyTheme(root.getAttribute('data-theme') !== 'dark', true);
    setTimeout(() => root.classList.remove('theme-transition'), 450);
  });

  




  const sw = $('.switch');
  const labels = $$('.billing__label');
  const prices = $$('.plan__price');

  const setBilling = (annual) => {
    sw.setAttribute('aria-checked', String(annual));
    sw.setAttribute('aria-label', annual ? 'Annual billing' : 'Monthly billing');
    labels.forEach((l) => l.classList.toggle('is-on', (l.dataset.for === 'annual') === annual));
    prices.forEach((p) => {
      const to = Number(annual ? p.dataset.annual : p.dataset.monthly);
      const from = Number(p.textContent.replace(/\D/g, '')) || to;
      if (window.gsap) {
        const counter = { v: from };
        gsap.to(counter, { v: to, duration: 0.5, ease: 'power2.out', onUpdate: () => { p.textContent = '$' + Math.round(counter.v); } });
      } else {
        p.textContent = '$' + to;
      }
    });
  };

  sw.addEventListener('click', () => setBilling(sw.getAttribute('aria-checked') !== 'true'));
  labels.forEach((l) => l.addEventListener('click', () => setBilling(l.dataset.for === 'annual')));

  




  const testimonials = [
    { text: 'Now I an Manage my Remote Team in Easy Way', name: 'Alber Riera', role: 'CEO of Patah Hati Agency' },
    { text: 'Our organic traffic doubled in just a few months', name: 'Sara Benali', role: 'Marketing Lead at Atlas Studio' },
    { text: 'Clear reports and a team that really listens', name: 'Omar Haddad', role: 'Founder of Medina Digital' },
  ];
  const slide = $('.testimonials__slide');
  const slideText = $('.testimonials__text');
  const slideName = $('.testimonials__name');
  const slideRole = $('.testimonials__role');
  let current = 0;
  let busy = false;

  const showTestimonial = (dir) => {
    if (busy) return;
    busy = true;
    current = (current + dir + testimonials.length) % testimonials.length;
    slide.classList.add('is-changing'); 
    setTimeout(() => {
      const t = testimonials[current];
      slideText.textContent = t.text;
      slideName.textContent = t.name;
      slideRole.textContent = t.role;
      slide.classList.remove('is-changing'); 
      busy = false;
    }, 300);
  };

  $$('.arrow').forEach((btn) => btn.addEventListener('click', () => showTestimonial(Number(btn.dataset.dir))));

  


  const form = $('.cta__form');
  const input = $('#email');
  const msg = $('.cta__msg');
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = input.value.trim();
    const valid = emailOk(value);
    input.classList.toggle('is-invalid', !valid);
    msg.classList.toggle('is-error', !valid);
    msg.textContent = valid ? 'Thank you! You are now subscribed.' : 'Please enter a valid email address.';
    if (valid) form.reset();
  });
  input.addEventListener('input', () => input.classList.remove('is-invalid'));

  







  const showEverything = () => root.classList.remove('js-anim');

  
  if (!window.gsap || !window.ScrollTrigger) {
    showEverything();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: reduce)', showEverything);

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const variants = {
      up: { y: 40 },
      left: { x: -60 },
      right: { x: 60 },
      scale: { scale: 0.92 },
      fade: {},
    };

    const start = () => {
      
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .fromTo('[data-hero-media]', { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 1.1, clearProps: 'transform' })
        .fromTo('[data-hero]', { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, clearProps: 'transform' }, 0.1);

      
      gsap.utils.toArray('[data-anim]').forEach((el) => {
        const from = variants[el.dataset.anim] || variants.up;
        gsap.fromTo(
          el,
          { opacity: 0, ...from },
          {
            opacity: 1, x: 0, y: 0, scale: 1,
            duration: 0.9,
            delay: Number(el.dataset.delay) || 0,
            ease: 'power3.out',
            clearProps: 'transform', 
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        );
      });

      
      gsap.utils.toArray('[data-stagger]').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            duration: 0.8, stagger: 0.14, ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: { trigger: group, start: 'top 85%', once: true },
          }
        );
      });

      
      const counter = $('[data-count]');
      if (counter) {
        const target = Number(counter.dataset.count);
        const state = { v: 0 };
        counter.textContent = '0%';
        gsap.to(state, {
          v: target, duration: 1.6, ease: 'power2.out',
          onUpdate: () => { counter.textContent = Math.round(state.v) + '%'; },
          scrollTrigger: { trigger: counter, start: 'top 90%', once: true },
        });
      }

      
      const line = $('.chart-line');
      const area = $('.chart-area');
      const tip = $('.chart-tip');
      if (line && area && tip) {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        gsap.set(area, { opacity: 0 });
        gsap.set(tip, { opacity: 0, y: 8 });
        gsap.timeline({ scrollTrigger: { trigger: '.profile-card', start: 'top 80%', once: true } })
          .to(line, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' })
          .to(area, { opacity: 1, duration: 0.8 }, 0.3)
          .to(tip, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(2)' }, '-=0.3');
      }
    };

    
    
    const fontsReady = document.fonts && document.fonts.ready
      ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))])
      : Promise.resolve();

    fontsReady.then(() => {
      start();
      ScrollTrigger.refresh();
    });

    
    const safety = setTimeout(() => {
      if (!document.querySelector('[data-hero][style*="opacity"]')) showEverything();
    }, 3500);

    return () => clearTimeout(safety);
  });

  
  if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
