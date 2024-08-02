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
    console.error('Error uploading video:', error);
    throw error;
  }
};
