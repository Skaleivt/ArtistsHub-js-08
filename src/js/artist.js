import { getArtists } from './sound-wave-api.js';

const artistsSection = document.querySelector('#artists');
const artistsList = document.querySelector('.artists-list');
const loadMoreButton = document.querySelector('#load-more-btn');
const noMoreArtistsMsg = document.querySelector('#no-more-artists-msg');

let page = 1;
const limit = 8;

async function loadArtists() {
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

    renderArtists(data.artists);
  } catch (error) {
    console.error('Failed to load artists:', error);
  }
}


function renderArtists(artists) {
  console.log('Rendering Artists:', artists);

  const markup = artists
    .map(artist => {
      const genresMarkup = artist.genres && artist.genres.length > 0
        ? artist.genres.map(genre => `<span class="artist-card-genre">${genre}</span>`).join('')
        : '<span class="artist-card-genre">Unknown</span>';

      return `
        <li class="artist-card" data-id="${artist._id || ''}">
          <img 
            class="artist-card-img" 
            src="${artist.strArtistThumb || './img/placeholderartist.jpg'}" 
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
<button type="button" class="artist-card-btn" data-artist-open>
  Learn More
  <svg class="artist-card-btn-icon" width="8" height="14">
    <use href="#icon-triangle-white"></use>
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
