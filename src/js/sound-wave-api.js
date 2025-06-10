import axios from 'axios';

const BASE_URL = 'https://sound-wave.b.goit.study/api';

export async function getArtists(page = 1, limit = 8) {
  try {
    const response = await axios.get(`${BASE_URL}/artists`, {
      params: {
        page,
        limit,
      },
    });

    console.log('Full API response:', response);
    console.log('API Response:', response.data);

    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    return {};
  }
}


/*export async function fetchFeedbacks() {
return new Promise(resolve => {
setTimeout(() => {
  resolve([
    {
      rating: 4.2,
      text: 'ArtistsHub has transformed the way I discover new music. It’s like having a personal DJ that knows my taste perfectly!',
      author: 'Emily Johnson',
    },
    {
      rating: 5,
      text: 'This app is amazing! I found so many new tracks I love.',
      author: 'Daniel Smith',
    },
    {
      rating: 3.8,
      text: 'Good recommendations, though sometimes a bit repetitive.',
      author: 'Mira Lee',
    },
  ]);
}, 500);
});
}*/
