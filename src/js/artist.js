import { renderArtistModal, hideLoader, showLoader } from './artist-modal.js';
import { getArtists } from './sound-wave-api.js';
import spritePath from '../img/symbol-defs.svg';
import placeholder from '../img/placeholder.jpg'


const artistsList = document.querySelector('.artists-list');
const loadMoreButton = document.querySelector('#load-more-btn');


let page = 1;
const limit = 8;

async function loadArtists() {
  showLoader();
  try {
    const data = await getArtists(page, limit);

    if (data.artists.length === 0) {
    
      loadMoreButton.style.display = 'none';
    
      iziToast.info({
        title: 'Notice',
        message: 'No more artists to load',
        position: 'bottomRight',
        messageColor: '#fff',
        messageSize: '16px',
        backgroundColor: " #EF4040",
        timeout: 3000,
      });      
    
      return;
    }
    
    renderArtists(data.artists, spritePath, placeholder);
  } catch (error) {
    console.error('Failed to load artists:', error);
  } finally {
    hideLoader(); 
  }
}


function renderArtists(artists, spritePath, placeholder) {
  const filtered = artists.filter(artist => artist._id);
  const markup = filtered
    .map(artist => {
      const genresMarkup = artist.genres?.length
        ? artist.genres.map(genre => `<span class="artist-card-genre">${genre}</span>`).join('')
        : '<span class="artist-card-genre">Unknown</span>';

      return `
        <li class="artist-card" data-id="${artist._id}">
          <img 
            class="artist-card-img" 
            src="${artist.strArtistThumb || placeholder}" 
            alt="${artist.strArtist || 'Unknown Artist'}" 
          />
          <div class="artist-card-content">
            <div class="artist-card-genres">${genresMarkup}</div>
            <h3 class="artist-card-name">${artist.strArtist || 'Unknown Artist'}</h3>
            <p class="artist-card-description">
              ${artist.strBiographyEN || 'No description available.'}
            </p>

<button type="button" class="artist-card-btn" data-artist-open data-artist-id="${artist._id}">
  Learn More
  <svg class="artist-card-btn-icon" width="8" height="14">
    <use href="${spritePath}#icon-triangle-white"></use>
  </svg>
</button>

          </div>
        </li>
      `;
    })
    .join('');

  artistsList.insertAdjacentHTML('beforeend', markup);
  
}

function attachModalListeners() {
  artistsList.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-artist-open]');
    if (!btn) return;

    const id = btn.dataset.artistId;

    if (!id) {
      console.warn('Artist ID is missing — modal will not open.');
      return;
    }

    const artistPromise = fetch(`https://sound-wave.b.goit.study/api/artists/${id}`).then(res =>
      res.json()
    );
    renderArtistModal(artistPromise);
  });
}

loadMoreButton.addEventListener('click', async () => {
  page += 1;
  await loadArtists();
});
loadArtists();
attachModalListeners();
