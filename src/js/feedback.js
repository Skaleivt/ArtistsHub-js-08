import { fetchFeedbacks } from './sound-wave-api';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function createFeedbackSlide({ rating, text, author }) {
const roundedRating = Math.round(rating);
/*const stars = Array.from({ length: 5 }, (_, i) => {
return `<i class="fa-star ${
    i < roundedRating ? 'fas active' : 'far'
}"></i>`;
}).join('');*/

return `
<div class="swiper-slide">
    <div class="feedback-card">
    <div class="rating" data-rating="${roundedRating}">
    <div class="rating__stars">
      <span class="rating__star"></span>
      <span class="rating__star"></span>
      <span class="rating__star"></span>
      <span class="rating__star"></span>
      <span class="rating__star"></span>
    </div>
    <div class="rating__overlay"></div>
  </div>
    <p class="feedback-text">"${text}"</p>
    <p class="feedback-author">${author}</p>
    </div>
</div>
`;
}



async function initFeedbackSection() {
const container = document.querySelector('#feedback-list');
const feedbacks = await fetchFeedbacks();

const markup = feedbacks.map(createFeedbackSlide).join('');
container.innerHTML = markup;

const paginationEl = document.createElement('div');
paginationEl.className = 'swiper-pagination';
document.querySelector('.feedback-swiper').appendChild(paginationEl);

new Swiper('.feedback-swiper', {
modules: [Navigation, Pagination],
loop: true,
navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
},
pagination: {
    el: '.swiper-pagination',
    clickable: true,
},
breakpoints: {
    0: {
    allowTouchMove: true,
    },
    768: {
    allowTouchMove: false,
    },
},
});
}

initFeedbackSection();
