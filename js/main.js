/* GlamBy Elara — shared interactions (all pages)
   Plain JS, no dependencies. Every feature checks its elements exist,
   so the same file runs on every page. */

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     Header: solid background once scrolled, current-page pill
     --------------------------------------------------------------------- */
  const header = $('#header');
  if (header) {
    const onScrollHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
    onScrollHeader();
    window.addEventListener('scroll', onScrollHeader, { passive: true });

    const here = location.pathname.split('/').pop() || 'index.html';
    $$('.header__nav a, .mobile-menu a').forEach((a) => {
      const target = (a.getAttribute('href') || '').split('#')[0];
      if (target && target === here) a.classList.add('is-current');
    });
  }

  /* ---------------------------------------------------------------------
     Mobile menu
     --------------------------------------------------------------------- */
  const burger = $('#burger');
  const menu = $('#mobileMenu');
  if (burger && menu) {
    const setMenu = (open) => {
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
    $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  }

  /* ---------------------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------------------- */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ---------------------------------------------------------------------
     Scroll-driven text: words light up as the paragraph passes through the viewport
     --------------------------------------------------------------------- */
  $$('[data-scroll-text]').forEach((scrollText) => {
    const words = scrollText.textContent.trim().split(/\s+/);
    scrollText.innerHTML = words.map((w) => `<span class="w">${w}</span>`).join(' ');
    const spans = $$('.w', scrollText);

    const update = () => {
      const rect = scrollText.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.35;
      const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      const lit = Math.round(p * spans.length);
      spans.forEach((s, i) => s.classList.toggle('lit', i < lit));
    };
    if (reduceMotion) {
      spans.forEach((s) => s.classList.add('lit'));
    } else {
      update();
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
    }
  });

  /* ---------------------------------------------------------------------
     Hero mini-reviews (arrows)
     --------------------------------------------------------------------- */
  const heroArrows = $$('#heroArrows button');
  if (heroArrows.length === 2) {
    const heroReviews = [
      { q: '“Didn\'t expect much from a trial, but my makeup lasted sixteen hours. Zero touch-ups.”', n: 'Amira Okafor', r: 'Bride, June 2026' },
      { q: '“She made my mum cry — in the good way. Soft, glowing, and still her.”', n: 'Hannah Whitmore', r: 'Bride, August 2026' },
      { q: '“Skin looked like skin under studio lights. The retoucher had nothing to do.”', n: 'Priya Nair', r: 'Creative Director' }
    ];
    let heroIdx = 0;
    const heroQuote = $('#heroQuote');
    const heroName = $('#heroName');
    const heroRole = $('#heroRole');
    const renderHero = () => {
      const r = heroReviews[heroIdx];
      heroQuote.textContent = r.q;
      heroName.textContent = r.n;
      heroRole.textContent = r.r;
    };
    heroArrows[0].addEventListener('click', () => { heroIdx = (heroIdx - 1 + heroReviews.length) % heroReviews.length; renderHero(); });
    heroArrows[1].addEventListener('click', () => { heroIdx = (heroIdx + 1) % heroReviews.length; renderHero(); });
  }

  /* ---------------------------------------------------------------------
     Looks: filter tabs, search, show more, hearts
     --------------------------------------------------------------------- */
  const looks = $$('.look');
  if (looks.length) {
    const tabs = $$('.pill--tab');
    const search = $('#lookSearch');
    const showMore = $('#showMore');
    const emptyMsg = $('#looksEmpty');
    let activeFilter = 'all';
    let expanded = !showMore;

    const applyLooks = () => {
      const q = (search && search.value || '').trim().toLowerCase();
      let visible = 0;
      looks.forEach((card) => {
        const matchesFilter = activeFilter === 'all' || card.dataset.cat === activeFilter;
        const matchesSearch = !q || card.textContent.toLowerCase().includes(q);
        const isExtra = card.classList.contains('is-extra');
        // Extras stay hidden until "Show more" — unless the user is filtering or searching.
        const show = matchesFilter && matchesSearch && (expanded || !isExtra || activeFilter !== 'all' || q);
        card.hidden = !show;
        if (show) {
          visible += 1;
          card.classList.add('in');
        }
      });
      if (emptyMsg) emptyMsg.hidden = visible !== 0;
      if (showMore) showMore.parentElement.hidden = expanded || activeFilter !== 'all' || Boolean(q);
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');
        activeFilter = tab.dataset.filter;
        applyLooks();
      });
    });
    if (search) search.addEventListener('input', applyLooks);
    if (showMore) showMore.addEventListener('click', () => { expanded = true; applyLooks(); });

    // Deep link: services.html#looks?cat=bridal or ?cat=bridal
    const cat = new URLSearchParams(location.search).get('cat');
    const preTab = cat && tabs.find((t) => t.dataset.filter === cat);
    if (preTab) preTab.click();
  }

  $$('.heart').forEach((btn) => {
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('is-on');
      btn.setAttribute('aria-pressed', String(on));
    });
  });

  /* ---------------------------------------------------------------------
     Testimonials switcher
     --------------------------------------------------------------------- */
  const tImage = $('#tImage');
  if (tImage) {
    const reviews = [
      { q: 'I stopped worrying about my makeup halfway through the day. It lasted from first look to the very last dance.', n: 'Amira Okafor', r: 'Bride, June 2026', img: 'https://images.unsplash.com/photo-1492175742197-ed20dc5a6bed?w=1000&q=80&auto=format&fit=crop' },
      { q: 'Elara listened. No heavy contour, no lashes I didn\'t ask for — just me, but the version I see on good days.', n: 'Sophie Reynolds', r: 'Bridesmaid, May 2026', img: 'https://images.unsplash.com/photo-1778109303745-8a5d68af26b4?w=1000&q=80&auto=format&fit=crop' },
      { q: 'Booked her for our campaign shoot. Skin looked like skin under studio lights — the retoucher barely had anything to do.', n: 'Priya Nair', r: 'Creative Director', img: 'https://images.unsplash.com/photo-1730320870329-616a2fe8a8e8?w=1000&q=80&auto=format&fit=crop' },
      { q: 'Calm, on time, and somehow made six bridesmaids look cohesive without making anyone look the same.', n: 'Hannah Whitmore', r: 'Bride, August 2026', img: 'https://images.unsplash.com/photo-1536567307162-551e460b7fc2?w=1000&q=80&auto=format&fit=crop' },
      { q: 'The lesson changed how I do my makeup every morning. Ten minutes now, and it actually looks good.', n: 'Leila Hassan', r: 'Masterclass client', img: 'https://images.unsplash.com/photo-1765813107112-5a8740b1511b?w=1000&q=80&auto=format&fit=crop' }
    ];
    const tQuote = $('#tQuote');
    const tName = $('#tName');
    const tRole = $('#tRole');
    const counters = $$('#tCounter li');
    const avatars = $$('.avatar[data-index]');

    const showReview = (i) => {
      const r = reviews[i];
      counters.forEach((li, k) => li.classList.toggle('is-active', k === i));
      avatars.forEach((a) => a.classList.toggle('is-active', Number(a.dataset.index) === i));
      tImage.classList.add('is-fading');
      const swap = () => {
        tImage.src = r.img;
        tQuote.textContent = r.q;
        tName.textContent = r.n;
        tRole.textContent = r.r;
        tImage.classList.remove('is-fading');
      };
      reduceMotion ? swap() : setTimeout(swap, 260);
    };
    avatars.forEach((a) => a.addEventListener('click', () => showReview(Number(a.dataset.index))));
  }
})();
