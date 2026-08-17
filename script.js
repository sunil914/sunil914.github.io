const body = document.body;
const themeButton = document.querySelector('.theme-toggle');
const navButton = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') body.classList.add('dark');

themeButton?.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('portfolio-theme', body.classList.contains('dark') ? 'dark' : 'light');
});

navButton?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navButton.setAttribute('aria-expanded', String(isOpen));
  navButton.textContent = isOpen ? 'Close' : 'Menu';
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navButton?.setAttribute('aria-expanded', 'false');
    if (navButton) navButton.textContent = 'Menu';
  });
});

filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    cards.forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.status !== filter);
    });
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.section-heading, .project-card, .skill-panel, .timeline article');
revealItems.forEach(item => item.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}
