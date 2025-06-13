
const modalBackdrop = document.getElementById('artist-modal');
const closeModalBtn = document.getElementById('artist-modal-close');
const loader = document.getElementById('modal-loader');
import spritePath from '../img/symbol-defs.svg';


export function showLoader() {
  loader.classList.remove('hidden');
}
export function hideLoader() {
  loader.classList.add('hidden');
}

function onBackdropClick(e) {
  if (e.target === modalBackdrop) closeModal();
}
function onEscKey(e) {
  if (e.key === 'Escape') closeModal();
}

function openModal() {
  modalBackdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  closeModalBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', onBackdropClick);
  document.addEventListener('keydown', onEscKey);
}

function closeModal() {
  modalBackdrop.classList.remove('is-open');
  document.body.style.overflow = '';
  closeModalBtn.removeEventListener('click', closeModal);
  modalBackdrop.removeEventListener('click', onBackdropClick);
  document.removeEventListener('keydown', onEscKey);
}

export async function renderArtistModal(artistPromise) {
  showLoader();
  try {
    const artist = await artistPromise;
    
    document.getElementById('artist-name').textContent = artist.strArtist || 'Unknown';
    document.getElementById('artist-years').textContent = artist.intFormedYear
      ? `${artist.intFormedYear}–${artist.intDiedYear || 'present'}`
      : 'information missing';
    document.getElementById('artist-sex').textContent = artist.strGender || 'N/A';
    document.getElementById('artist-members').textContent = artist.intMembers || 'N/A';
    document.getElementById('artist-country').textContent = artist.strCountry || 'N/A';
    document.getElementById('artist-bio').textContent =
      artist.strBiographyEN || 'No biography available.';
    document.getElementById('artist-image').src =
      artist.strArtistThumb;

    const genresContainer = document.getElementById('artist-genres');
    genresContainer.innerHTML = '';
    if (Array.isArray(artist.genres) && artist.genres.length > 0) {
      artist.genres.forEach(genreText => {
        const span = document.createElement('span');
        span.className = 'genre-item';
        span.textContent = genreText;
        genresContainer.appendChild(span);
      });
    } else {
      const span = document.createElement('span');
      span.className = 'genre-item';
      span.textContent = 'Unknown genre';
      genresContainer.appendChild(span);
    }

    const albumsContainer = document.getElementById('albums-container');
albumsContainer.innerHTML = '';

if (Array.isArray(artist.tracksList) && artist.tracksList.length > 0) {
  const tracksByAlbum = {};

  artist.tracksList.forEach(track => {
    const album = track.strAlbum || 'Unknown Album';
    if (!tracksByAlbum[album]) tracksByAlbum[album] = [];
    tracksByAlbum[album].push(track);
  });

  Object.entries(tracksByAlbum).forEach(([albumName, tracks]) => {
    const albumDiv = document.createElement('li');
    albumDiv.className = 'album';

    const title = document.createElement('h2');
    title.className = 'album-title';
    title.textContent = albumName;

    const trackListContainer = document.createElement('div');
    trackListContainer.className = 'track-list-container';

    const header = document.createElement('div');
    header.className = 'track-header';
    header.innerHTML = `
      <span>Track</span>
      <span>Time</span>
      <span>Link</span>
    `;

    const trackList = document.createElement('ul');
    trackList.className = 'track-list';

    tracks.forEach(track => {
      const name = track.strTrackName || track.strTrack || 'Unknown track';
      const rawDuration = track.intDuration;
      
      
      
      function formatDuration(ms) {
        const totalSeconds = Math.floor(Number(ms) / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }
    
      const formattedDuration = rawDuration ? formatDuration(rawDuration) : 'Unknown length';
      const youtubeUrl = track.movie;
      
    
      const li = document.createElement('li');
      li.className = 'track-item';
    
      li.innerHTML = `
        <span class="track-name">${name}</span>
        <span class="track-time">${formattedDuration}</span>
        ${
          youtubeUrl
            ? `<a href="${youtubeUrl}" class="track-link" target="_blank" rel="noopener noreferrer">
                 <svg class="youtube-link" width="24" height="25">
                   <use href="${spritePath}#icon-youtube"></use>
                 </svg>
               </a>`
            : '<span class="track-link"> </span>'
        }
      `;
    
      trackList.appendChild(li);
    });

    trackListContainer.appendChild(header);
    trackListContainer.appendChild(trackList);

    albumDiv.appendChild(title);
    albumDiv.appendChild(trackListContainer);

    albumsContainer.appendChild(albumDiv);
  });
} else {
  const empty = document.createElement('p');
  empty.className = 'no-albums';
  empty.textContent = 'No tracks available.';
  albumsContainer.appendChild(empty);
}

    openModal();
  } catch (err) {
    console.error('Error loading artist:', err);
  } finally {
    hideLoader();
  }
}
