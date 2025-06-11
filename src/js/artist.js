import { renderArtistModal } from './artist-modal.js';
import { getArtists } from './sound-wave-api.js';

const artistsSection = document.querySelector('#artists');
const artistsList = document.querySelector('.artists-list');
const loadMoreButton = document.querySelector('#load-more-btn');

let page = 1;
const limit = 8;

async function loadArtists() {
  try {
    const data = await getArtists(page, limit);
    renderArtists(data.artists);
  } catch (error) {
    console.error('Failed to load artists:', error);
  }
}

function renderArtists(artists) {
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
            src="${artist.strArtistThumb || './images/placeholder.jpg'}" 
            alt="${artist.strArtist || 'Unknown Artist'}" 
          />
          <div class="artist-card-content">
            <div class="artist-card-genres">${genresMarkup}</div>
            <h3 class="artist-card-name">${artist.strArtist || 'Unknown Artist'}</h3>
            <p class="artist-card-description">
              ${artist.strBiographyEN || 'No description available.'}
            </p>
            <button 
              type="button" 
              class="artist-card-btn" 
              data-artist-open 
              data-artist-id="${artist._id}"
            >
              Learn More
              <svg class="artist-card-btn-icon" width="8" height="14" viewBox="0 0 8 14" fill="none">
                <path d="M0 14L8 7L0 0V14Z"/>
              </svg>
            </button>
          </div>
        </li>
      `;
    })
    .join('');

  artistsList.insertAdjacentHTML('beforeend', markup);
  attachModalListeners();
}

function attachModalListeners() {
  const buttons = document.querySelectorAll('[data-artist-open]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.artistId;
      console.log('🔍 Clicked artist ID:', id);

      if (!id) {
        console.warn('Artist ID is missing — modal will not open.');
        return;
      }

      const artistPromise = fetch(`https://sound-wave.b.goit.study/api/artists/${id}`).then(res =>
        res.json()
      );
      renderArtistModal(artistPromise);
    });
  });
}

loadMoreButton.addEventListener('click', async () => {
  page += 1;
  await loadArtists();
});

loadArtists();
