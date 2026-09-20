/* GlamBy Elara — booking page
   Quick enquiry: validation, a "from" price hint and a confirmation state.
   Demo mode: nothing is sent. Add data-endpoint="https://formspree.io/f/xxxx"
   (or any JSON POST endpoint) to <form id="bookingForm"> to send real requests. */

(function () {
  'use strict';

  const form = document.getElementById('bookingForm');
  if (!form) return;

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* "From" prices — mirrored on services.html. */
  const SERVICES = {
    bridal:    { name: 'Signature Bridal',   from: 180, note: 'trial included' },
    trial:     { name: 'Bridal Trial',       from: 60,  note: 'two hours in the studio' },
    party:     { name: 'Bridal Party',       from: 65,  note: 'per person' },
    occasion:  { name: 'Occasion Glam',      from: 70,  note: 'per person' },
    editorial: { name: 'Editorial & Shoots', from: 150, note: 'half or full day' },
    lesson:    { name: 'Makeup Lesson',      from: 90,  note: '1:1 or group' },
    unsure:    { name: 'Not sure yet' }
  };

  const el = {
    service: $('#serviceSelect'),
    hint: $('#serviceHint'),
    date: $('#dateInput'),
    error: $('#formError'),
    layout: $('#bookingLayout'),
    success: $('#bookingSuccess')
  };

  // Today as the earliest bookable date (local time).
  const today = new Date();
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  el.date.min = iso(today);

  const fmtDate = (value) => {
    if (!value) return '—';
    const d = new Date(value + 'T12:00:00');
    if (Number.isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  };
  const gbp = (n) => `£${n.toLocaleString('en-GB')}`;
  const esc = (v) => String(v).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const state = () => {
    const data = new FormData(form);
    return {
      service: data.get('service') || '',
      date: data.get('date') || '',
      name: (data.get('name') || '').trim(),
      email: (data.get('email') || '').trim(),
      phone: (data.get('phone') || '').trim(),
      message: (data.get('message') || '').trim()
    };
  };

  // "From £180 · trial included" under the service select
  const renderHint = () => {
    const svc = SERVICES[el.service.value];
    const show = Boolean(svc && svc.from);
    el.hint.hidden = !show;
    if (show) el.hint.textContent = `From ${gbp(svc.from)} · ${svc.note}. Final quote confirmed by email.`;
  };
  el.service.addEventListener('change', renderHint);

  // Pre-select a service from ?service=bridal (links from the looks grid and services page)
  const pre = new URLSearchParams(location.search).get('service');
  if (pre && SERVICES[pre]) el.service.value = pre;
  renderHint();

  /* ---------------------------------------------------------------------
     Validation + submit
     --------------------------------------------------------------------- */
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const markField = (name, ok) => {
    const field = form.elements[name] && form.elements[name].closest('.field');
    if (field) field.classList.toggle('is-invalid', !ok);
  };
  const showError = (msg) => {
    el.error.textContent = msg;
    el.error.hidden = !msg;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const s = state();

    const checks = [
      ['service', Boolean(SERVICES[s.service]), 'Choose a service.'],
      ['date', Boolean(s.date) && s.date >= el.date.min, 'Pick a date — today or later.'],
      ['name', s.name.length > 1, 'Add your name.'],
      ['email', emailOk(s.email), 'Add a valid email address.']
    ];
    checks.forEach(([name, ok]) => markField(name, ok));
    const failed = checks.filter(([, ok]) => !ok);
    if (failed.length) {
      showError(failed.map(([, , msg]) => msg).join(' '));
      const first = form.elements[failed[0][0]];
      first.closest('.field').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      first.focus({ preventScroll: true });
      return;
    }
    showError('');

    const btn = form.querySelector('button[type="submit"]');
    const label = btn.querySelector('.pill');
    btn.disabled = true;
    label.textContent = 'Sending…';

    const svc = SERVICES[s.service];
    const payload = { ...s, serviceName: svc.name, from: svc.from || null };

    try {
      const endpoint = form.dataset.endpoint;
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Request failed');
      } else {
        await new Promise((r) => setTimeout(r, 800)); // demo delay
        console.info('[GlamBy Elara] Enquiry (demo mode):', payload);
      }
      showSuccess(s);
    } catch (err) {
      showError('Something went wrong sending that. Please try again or email hello@glambyelara.co.uk.');
    } finally {
      btn.disabled = false;
      label.textContent = 'Send enquiry';
    }
  });

  form.addEventListener('input', (e) => {
    const field = e.target.closest('.field');
    if (field) field.classList.remove('is-invalid');
  });

  const showSuccess = (s) => {
    const svc = SERVICES[s.service];
    const ref = `GE-${String(today.getFullYear()).slice(2)}${String(today.getMonth() + 1).padStart(2, '0')}-${String(Math.floor(1000 + Math.random() * 9000))}`;
    $('#successName').textContent = s.name.split(' ')[0] || 'there';
    $('#successRef').textContent = ref;

    const rows = [
      ['Service', svc.name],
      ['Date', fmtDate(s.date)],
      ['Reply to', s.email],
      svc.from ? ['Starts from', gbp(svc.from)] : null
    ].filter(Boolean);
    $('#successList').innerHTML = rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('');

    el.layout.hidden = true;
    el.success.hidden = false;
    el.success.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  $('#bookAgain').addEventListener('click', () => {
    form.reset();
    renderHint();
    showError('');
    el.success.hidden = true;
    el.layout.hidden = false;
    $('#book').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  });
})();
