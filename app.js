const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const themeToggle = document.querySelector('.theme-toggle');
const progress = document.querySelector('.scroll-progress');

if (toggle && nav) {
  const closeNav = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    toggle.textContent = '☰';
  };
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    toggle.textContent = isOpen ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
  document.addEventListener('click', event => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) closeNav();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeNav(); });
}

if (themeToggle) {
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('skillcircle-theme'); } catch (_) {}
  if (savedTheme === 'light') document.body.classList.add('light-theme');
  const updateThemeButton = () => {
    const light = document.body.classList.contains('light-theme');
    themeToggle.setAttribute('aria-pressed', String(light));
    themeToggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    themeToggle.textContent = light ? '☾ Theme' : '☼ Theme';
  };
  updateThemeButton();
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    updateThemeButton();
    try { localStorage.setItem('skillcircle-theme', document.body.classList.contains('light-theme') ? 'light' : 'dark'); } catch (_) {}
  });
}

if (progress) {
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
}

const revealItems = document.querySelectorAll('.hero-copy, .hero-art, .feature, .step, .founder-visual, .founder-copy, .closing');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.body.classList.add('reveal-ready');
  revealItems.forEach(item => item.classList.add('reveal'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
}
