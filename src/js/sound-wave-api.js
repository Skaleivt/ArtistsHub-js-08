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
      ...optionIzi
    })
    return {};
  }
}

export async function fetchFeedbacks() {
  try {
    const response = await axios.get(`${BASE_URL}/feedbacks`);

    console.log('Full API feed response:', response);
    console.log('API feed Response:', response.data);

    return response.data.data;
  } catch (error) {
    console.error('API Error:', error);
    return {};
  }
}
