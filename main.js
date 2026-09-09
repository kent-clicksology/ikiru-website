document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const header = document.querySelector('[data-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  document.querySelectorAll('.disclosure__toggle').forEach((btn) => {
    const item = btn.closest('.disclosure');
    const panel = item.querySelector('.disclosure__panel');
    // The collapsed state is clipped via max-height/opacity, not display:none,
    // so the transition can animate — but that alone only hides it visually.
    // aria-hidden marks it out of the accessibility tree too.
    const sync = (isOpen) => {
      btn.setAttribute('aria-expanded', String(isOpen));
      item.classList.toggle('is-open', isOpen);
      if (panel) panel.setAttribute('aria-hidden', String(!isOpen));
    };
    sync(false);
    btn.addEventListener('click', () => sync(btn.getAttribute('aria-expanded') !== 'true'));
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.offer-slider').forEach((slider) => {
    const track = slider.querySelector('.offer-track');
    const prevBtn = slider.querySelector('.offer-nav__btn--prev');
    const nextBtn = slider.querySelector('.offer-nav__btn--next');
    if (!track) return;

    const step = () => (track.querySelector('.offer-card')?.offsetWidth || 240) + 20;
    const updateButtons = () => {
      const max = track.scrollWidth - track.clientWidth - 1;
      if (prevBtn) prevBtn.disabled = track.scrollLeft <= 0;
      if (nextBtn) nextBtn.disabled = track.scrollLeft >= max;
    };
    const scrollBySteps = (dir) => {
      track.scrollBy({ left: dir * step(), behavior: reduceMotion ? 'auto' : 'smooth' });
    };

    if (prevBtn) prevBtn.addEventListener('click', () => scrollBySteps(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollBySteps(1));
    track.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons, { passive: true });
    updateButtons();
  });
});
