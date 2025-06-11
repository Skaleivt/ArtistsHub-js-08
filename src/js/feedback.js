import { fetchFeedbacks } from './sound-wave-api.js';

async function renderFeedback() {
const feedbacks = await fetchFeedbacks();
const wrapper = document.querySelector('#feedback-list');
wrapper.innerHTML = '';

const totalSlides = feedbacks.length;
const middleIndex = Math.floor(totalSlides / 2);


feedbacks.forEach(feedback => {
const slide = document.createElement('div');
slide.classList.add('swiper-slide');
slide.innerHTML = `
  <div class="feedback-card">
    <div class="rating" data-rating="${feedback.rating}">
      <div class="rating__stars">
      ${createStars(feedback.rating)}
      </div>
    </div> 
    <p class="feedback-text">${feedback.descr || '—'}</p>
    <h5 class="feedback-author">${feedback.name || 'Анонім'}</h5>
  </div>`;
wrapper.appendChild(slide);
});

const swiper = new Swiper('.feedback-swiper', {
slidesPerView: 1,
spaceBetween: 32,
speed: 500,
loop: false,
navigation: {
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev',
},
pagination: {
  el: '.swiper-pagination',
  clickable: false, 
  renderBullet: function (index, className) {
    if (index === 0 || index === middleIndex || index === totalSlides - 1) {
      return `<span class="${className}" data-index="${index}"></span>`;
    }
    return '';
  },
},
on: {
  slideChange: function () {
    const activeSlide = this.activeIndex;
    const bullets = document.querySelectorAll('.swiper-pagination span');
    bullets.forEach(b => b.classList.remove('swiper-pagination-bullet-active'));

    let activeBulletIndex = 0;

    if (activeSlide >= totalSlides - 2) {
      activeBulletIndex = totalSlides - 1;
    } else if (activeSlide >= middleIndex - 1 && activeSlide <= middleIndex + 1) {
      activeBulletIndex = middleIndex;
    } else {
      activeBulletIndex = 0;
    }

    const activeBullet = document.querySelector(
      `.swiper-pagination [data-index="${activeBulletIndex}"]`
    );
    

    if (activeBullet) {
      activeBullet.classList.add('swiper-pagination-bullet-active');
    }
  },
},
touchRatio: 1,
simulateTouch: true,
});

swiper.emit('slideChange');

document.querySelectorAll('.swiper-pagination [data-index]').forEach(el => {
el.addEventListener('click', () => {
  const targetIndex = parseInt(el.dataset.index);
  swiper.slideTo(targetIndex);
});
});
}

function createStars(rating) {
const roundedRating = Math.round(rating);
return Array.from({ length: 5 }, (_, i) => {
const activeClass = i < roundedRating ? 'active' : '';
return `<span class="rating__star ${activeClass}">★</span>`;
}).join('');
}

document.addEventListener('DOMContentLoaded', renderFeedback);