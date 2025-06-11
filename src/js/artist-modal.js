const modalBackdrop = document.getElementById('artist-modal');
const closeModalBtn = document.getElementById('artist-modal-close');
const loader = document.getElementById('modal-loader');

function showLoader() {
  loader.classList.remove('hidden');
}
function hideLoader() {
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
      artist.strArtistThumb || './images/placeholder.jpg';

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
        const albumDiv = document.createElement('div');
        albumDiv.className = 'album-item';
        albumDiv.innerHTML = `
          <h3>${albumName}</h3>
          <ul>
            <li><strong>Track — Duration</strong></li>
            ${tracks
              .map(track => {
                const name = track.strTrackName || track.strTrack || 'Unknown track';
                const duration = track.intDuration || 'Unknown length';
                const youtube = track.strMusicVid
                  ? `<a href="${track.strMusicVid}" target="_blank" rel="noopener noreferrer">
                      <svg class="youtube-icon" width="16" height="16">
                        <use href="/img/symbol-defs.svg#icon-youtube"></use>
                      </svg>
                    </a>`
                  : '';
                return `<li>${name} — ${duration} ${youtube}</li>`;
              })
              .join('')}
          </ul>
        `;
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
