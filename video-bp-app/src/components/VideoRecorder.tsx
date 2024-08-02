import React, { useRef, useState, useEffect } from 'react';
import { Button, CircularProgress } from '@mui/material';

interface VideoRecorderProps {
  onVideoRecorded: (blob: Blob) => void;
}

const VideoRecorder: React.FC<VideoRecorderProps> = ({ onVideoRecorded }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let intervalId: number;
    if (isRecording && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      stopRecording();
    }
    return () => clearInterval(intervalId);
  }, [isRecording, countdown]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/mp4' });
      mediaRecorderRef.current = mediaRecorder;
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        onVideoRecorded(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setCountdown(10);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', maxWidth: '400px' }} />
      {!isRecording ? (
        <Button variant="contained" color="primary" onClick={startRecording}>
          Start Recording
        </Button>
      ) : (
        <div>
          <CircularProgress variant="determinate" value={(10 - countdown) * 10} />
          <p>Recording: {countdown}s</p>
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
