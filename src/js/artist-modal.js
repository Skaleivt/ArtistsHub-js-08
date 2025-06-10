const modalBackdrop = document.getElementById('artist-modal');
const openModalBtns = document.querySelectorAll('[data-artist-open]');
const closeModalBtn = document.getElementById('artist-modal-close');

openModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modalBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
});

closeModalBtn.addEventListener('click', () => {
  closeModal();
});

modalBackdrop.addEventListener('click', e => {
  if (e.target === modalBackdrop) {
    closeModal();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modalBackdrop.classList.contains('is-open')) {
    closeModal();
  }
});

function closeModal() {
  modalBackdrop.classList.remove('is-open');
  document.body.style.overflow = '';
}