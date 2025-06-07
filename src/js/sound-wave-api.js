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

