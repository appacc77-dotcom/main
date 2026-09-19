const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const form = document.querySelector('.booking-form');
const status = document.querySelector('.form-status');
const slides = Array.from(document.querySelectorAll('.review-slide'));
const dots = Array.from(document.querySelectorAll('.carousel-dot'));
const previousButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');

let activeReview = 0;

const showReview = (index) => {
  if (!slides.length) return;

  activeReview = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeReview;
    slide.classList.toggle('is-active', isActive);
    slide.setAttribute('aria-hidden', String(!isActive));
  });
  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeReview;
    dot.classList.toggle('is-active', isActive);
    if (isActive) dot.setAttribute('aria-current', 'true');
    else dot.removeAttribute('aria-current');
  });
};

menuToggle?.addEventListener('click', () => {
  nav?.classList.toggle('is-open');
  menuToggle.setAttribute('aria-label', nav?.classList.contains('is-open') ? 'Закрыть меню' : 'Открыть меню');
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('is-open'));
});

previousButton?.addEventListener('click', () => showReview(activeReview - 1));
nextButton?.addEventListener('click', () => showReview(activeReview + 1));
dots.forEach((dot, index) => dot.addEventListener('click', () => showReview(index)));

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = String(formData.get('name') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const subject = encodeURIComponent('Новая запись на приём');
  const body = encodeURIComponent(`Имя: ${name}\nТелефон: ${phone}`);

  window.location.href = `mailto:appacc77@gmail.com?subject=${subject}&body=${body}`;
  if (status) status.textContent = 'Открываем почтовое приложение для отправки заявки.';
});
