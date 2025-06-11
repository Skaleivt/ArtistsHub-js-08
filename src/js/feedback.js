/*import { fetchFeedbacks } from './sound-wave-api';
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

/*return `
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

initFeedbackSection();*/

/*import axios from 'axios';

const BASE_URL = 'https://sound-wave.b.goit.study/api';

export async function fetchAllFeedbacks() {
  try {
    const response = await axios.get(`${BASE_URL}/feedbacks`);
    return response.data.results || []; // масив фідбеків
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}
const feedbacks = await fetchAllFeedbacks();

// Динамічно створюємо слайди по одному фідбеку
const swiperWrapper = document.querySelector('.swiper-wrapper');



const allFeedbacks = await fetchAllFeedbacks();

// Показати перший фідбек
console.log(allFeedbacks[0]);

// Пройтись по одному:
for (const feedback of allFeedbacks) {
  console.log('Один фідбек:', feedback);
  // можеш показувати в UI по черзі, вставляти в слайдер і т.д.
}



feedbacks.forEach(feedback => {
  const slide = document.createElement('div');
  slide.classList.add('swiper-slide');
    slide.innerHTML = `
  <div class="swiper-slide">
    <div class="feedback-card">
    <div class="rating" data-rating="${feedback.rating}">
    <div class="rating__stars">
      <span class="rating__star"></span>
      <span class="rating__star"></span>
      <span class="rating__star"></span>
      <span class="rating__star"></span>
      <span class="rating__star"></span>
    </div>
    <div class="rating__overlay"></div>
  </div>
    <p class="feedback-text">"${feedback.comment}"</p>
    <p class="feedback-author">${feedback.author}</p>
    </div>
</div>
  `;
  swiperWrapper.appendChild(slide);
});

// Ініціалізуємо слайдер після додав*/
// import { fetchFeedbacks } from './sound-wave-api.js';
// const swiper = document.querySelector('.swiper').swiper;


// async function renderFeedback() {
//   const feedbacks = await fetchFeedbacks();
//   console.log(feedbacks);
//   const wrapper = document.querySelector('#feedback-list');
//   wrapper.innerHTML = '';
  
//   feedbacks.forEach(feedback => {
//     const slide = document.createElement('div');
//     slide.classList.add('swiper-slide');
//     slide.innerHTML = `<div class="feedback-card">
//         <div class="rating" data-rating="${feedback.rating}">
//           <div class="rating__stars">
//             <span class="rating__star"></span>
//             <span class="rating__star"></span>
//             <span class="rating__star"></span>
//             <span class="rating__star"></span>
//             <span class="rating__star"></span>
//           </div>
//           <div class="rating__overlay"></div>
//         </div>
//         <p class="feedback-text">${feedback.descr}</p>
//         <h5 class="feedback-author" >${feedback.name}</h5>
//       </div>`;
//     wrapper.appendChild(slide);
//   });
//   swiper.update();
// }


// document.addEventListener('DOMContentLoaded', () => {
//   const swiper = new Swiper('.feedback-swiper', {
//     slidesPerView: 1, // показує тільки 1 слайд
//     speed: 400,
//     spaceBetween: 100,
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
//     pagination: {
//       el: '.swiper-pagination',
//       clickable: true,
//     },
//   });

//   renderFeedback(swiper);
// });
// 

import { fetchFeedbacks } from './sound-wave-api.js';

async function renderFeedback() {
  const feedbacks = await fetchFeedbacks();
  const wrapper = document.querySelector('#feedback-list');
  wrapper.innerHTML = '';

  feedbacks.forEach(feedback => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.innerHTML = `
      <div class="feedback-card">
        <div class="rating" data-rating="${feedback.rating}">
          <div class="rating__stars">
            <span class="rating__star"></span>
            <span class="rating__star"></span>
            <span class="rating__star"></span>
            <span class="rating__star"></span>
            <span class="rating__star"></span>
          </div>
        </div> 
        <p class="feedback-text">${feedback.descr}</p>
        <h5 class="feedback-author">${feedback.name}</h5>
      </div>`;
    wrapper.appendChild(slide);
  });

  // Тепер ініціалізація Swiper
  new Swiper('.feedback-swiper', {
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
      clickable: true,
    },
  });
}

document.addEventListener('DOMContentLoaded', renderFeedback);
// Динамічно створюємо слайди по одному фідбеку
const swiperWrapper = document.querySelector('.swiper-wrapper');



