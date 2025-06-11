const refs = {
  openBtn: document.querySelector('[data-menu-open]'),
  closeBtn: document.querySelector('[data-menu-close]'),
  mobileMenu: document.querySelector('[data-menu]'),
};

refs.openBtn.addEventListener('click', () => {
  refs.mobileMenu.classList.remove('is-hidden');
  refs.mobileMenu.classList.add('is-open');
  document.body.style.overflow = 'hidden';
});

refs.closeBtn.addEventListener('click', () => {
  refs.mobileMenu.classList.remove('is-open');
  refs.mobileMenu.classList.add('is-hidden');
  document.body.style.overflow = '';
});

export {};
