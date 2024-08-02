import React, { useState } from 'react';
import { Container, Typography, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import VideoRecorder from './components/VideoRecorder';
import ResultDisplay from './components/ResultDisplay';
import { uploadVideo } from './services/api';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const App: React.FC = () => {
  const [sbp, setSbp] = useState<number | null>(null);
  const [dbp, setDbp] = useState<number | null>(null);

  const handleVideoRecorded = async (blob: Blob) => {
    try {
      const result = await uploadVideo(blob);
      setSbp(result.sbp);
      setDbp(result.dbp);
    } catch (error) {
      console.error('Error processing video:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" style={{ paddingTop: '20px' }}>
        <Typography variant="h4" gutterBottom align="center">
          Blood Pressure Measurement
        </Typography>
        <VideoRecorder onVideoRecorded={handleVideoRecorded} />
        <ResultDisplay sbp={sbp} dbp={dbp} />
      </Container>
    </ThemeProvider>
  );
};

export default App;