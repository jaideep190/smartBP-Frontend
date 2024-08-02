import React, { useRef, useState, useEffect } from 'react';
import { Button, CircularProgress, Box, Typography } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';

interface VideoRecorderProps {
  onVideoRecorded: (blob: Blob) => void;
  isProcessing: boolean;
}

const VideoRecorder: React.FC<VideoRecorderProps> = ({ onVideoRecorded, isProcessing }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
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

      // Attempt to turn on the flash if available
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities() as any;
      if (capabilities.torch) {
        try {
          await track.applyConstraints({
            advanced: [{ torch: true } as any],
          });
        } catch (flashError) {
          console.error('Error turning on flash:', flashError);
        }
      }

      streamRef.current = stream;
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

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative', mb: 2, borderRadius: 2, overflow: 'hidden' }}>
        <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', maxWidth: '400px', display: 'block' }} />
        {isRecording && (
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
            <CircularProgress variant="determinate" value={(10 - countdown) * 10} size={60} thickness={5} sx={{ color: 'white' }} />
            <Typography variant="h4" sx={{ position: 'absolute', color: 'white' }}>{countdown}</Typography>
          </Box>
        )}
      </Box>
      {!isRecording && !isProcessing && (
        <Button
          variant="contained"
          color="primary"
          onClick={startRecording}
          startIcon={<VideocamIcon />}
          sx={{ px: 4, py: 1.5 }}
        >
          Start Recording
        </Button>
      )}
      {isProcessing && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress size={40} thickness={4} sx={{ mb: 2 }} />
          <Typography variant="body1" color="text.secondary">Processing video...</Typography>
        </Box>
      )}
    </Box>
  );
};

export default VideoRecorder;