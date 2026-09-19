const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const nav = document.querySelector<HTMLElement>('.nav');
const form = document.querySelector<HTMLFormElement>('.booking-form');
const status = document.querySelector<HTMLParagraphElement>('.form-status');
const slides = Array.from(document.querySelectorAll<HTMLElement>('.review-slide'));
const dots = Array.from(document.querySelectorAll<HTMLButtonElement>('.carousel-dot'));
const previousButton = document.querySelector<HTMLButtonElement>('.carousel-prev');
const nextButton = document.querySelector<HTMLButtonElement>('.carousel-next');

let activeReview = 0;

const showReview = (index: number) => {
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

previousButton?.addEventListener('click', () => showReview(activeReview - 1));
nextButton?.addEventListener('click', () => showReview(activeReview + 1));
dots.forEach((dot, index) => dot.addEventListener('click', () => showReview(index)));

menuToggle?.addEventListener('click', () => {
  nav?.classList.toggle('is-open');
  menuToggle.setAttribute('aria-label', nav?.classList.contains('is-open') ? 'Закрыть меню' : 'Открыть меню');
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('is-open'));
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!status) return;
  status.textContent = 'Спасибо! Я свяжусь с вами в ближайшее время.';
  form.reset();
});
