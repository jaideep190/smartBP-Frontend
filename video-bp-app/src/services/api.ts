import axios from 'axios';

const API_URL = 'https://smartbp-backend.onrender.com/upload';

export const uploadVideo = async (videoBlob: Blob): Promise<{ sbp: number; dbp: number }> => {
  const formData = new FormData();
  formData.append('video', videoBlob, 'recorded_video.mp4');

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};