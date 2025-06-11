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


    return response.data;
  } catch (error) {
    iziToast.error({
      message: "Sorry, there is no more artists. Please try later!",
      position: "topRight",
      messageColor: '#fff',
      messageSize: '16px',
      backgroundColor: " #EF4040",
      timeout: 3000,
    })
    return {};
  }
}

