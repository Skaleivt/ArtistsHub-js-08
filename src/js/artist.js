import { getArtists } from './sound-wave-api.js';

const artistsSection = document.querySelector('#artists');
const artistsList = document.querySelector('.artists-list');
const loadMoreButton = document.querySelector('#load-more-btn');

let page = 1;
const limit = 8;

async function loadArtists() {
  try {
    const data = await getArtists(page, limit);
    console.log('Artists Data:', data);
    console.log('Results:', data.artists);

    renderArtists(data.artists);
  } catch (error) {
    console.error('Failed to load artists:', error);
  }
}

function renderArtists(artists) {
    console.log('Rendering Artists:', artists);
  
    const markup = artists
      .map(artist => {
        // Виправили — genres тепер правильно!
        const genresMarkup = artist.genres && artist.genres.length > 0
          ? artist.genres.map(genre => `<span class="artist-card-genre">${genre}</span>`).join('')
          : '<span class="artist-card-genre">Unknown</span>';
  
        return `
          <li class="artist-card" data-id="${artist._id || ''}">
            <img 
              class="artist-card-img" 
              src="${artist.strArtistThumb || './images/placeholder.jpg'}" 
              alt="${artist.strArtist || 'Unknown Artist'}" 
            />
            <div class="artist-card-content">
              <div class="artist-card-genres">
                ${genresMarkup}
              </div>
              <h3 class="artist-card-name">${artist.strArtist || 'Unknown Artist'}</h3>
              <p class="artist-card-description">
                ${artist.strBiographyEN 
                  ? artist.strBiographyEN 
                  : 'No description available.'
                }
              </p>
              <button type="button" class="artist-card-btn">
                Learn More
                <svg class="artist-card-btn-icon" width="16" height="16">
                  <use href="./images/icons.svg#icon-arrow"></use>
                </svg>
              </button>
            </div>
          </li>
        `;
      })
      .join('');
  
    artistsList.insertAdjacentHTML('beforeend', markup);
  }
  
  

loadMoreButton.addEventListener('click', async () => {
  page += 1;
  await loadArtists();
});

loadArtists();
