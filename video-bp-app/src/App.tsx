import React, { useState } from 'react';
import { Container, Typography, ThemeProvider, createTheme, CssBaseline, Paper, Box, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import VideoRecorder from './components/VideoRecorder';
import ResultDisplay from './components/ResultDisplay';
import Instructions from './components/Instructions';
import { uploadVideo } from './services/api';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
        },
      },
    },
  },
});

const App: React.FC = () => {
  const [sbp, setSbp] = useState<number | null>(null);
  const [dbp, setDbp] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  const handleVideoRecorded = async (blob: Blob) => {
    setIsProcessing(true);
    try {
      const result = await uploadVideo(blob);
      setSbp(result.sbp);
      setDbp(result.dbp);
    } catch (error) {
      console.error('Error processing video:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOpenInstructions = () => {
    setIsInstructionsOpen(true);
  };

  const handleCloseInstructions = () => {
    setIsInstructionsOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ py: 4 }}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h4" color="primary" align="center" sx={{ mb: 2 }}>
                Blood Pressure Monitor
              </Typography>
              <Typography variant="body2" color="primary" align="left" sx={{ mb: 3 }}>
                Website Developer : Thakur Jaideep Singh
                <br />
                Github: <a href="https://github.com/jaideep190">jaideep190</a>
                <br />
                LinkedIn: <a href="https://www.linkedin.com/in/jaideep190">jaideep190</a>
                <br />
                Email: ajaiajai710@gmail.com
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<InfoIcon />}
                  onClick={handleOpenInstructions}
                  sx={{ flexGrow: 1 }}
                >
                  Help
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<InfoIcon />}
                  onClick={() => window.open('https://magu-net-smartbp.vercel.app/', '_blank')}
                  sx={{ flexGrow: 1 }}
                >
                  Prediction Mechanism
                </Button>
              </Box>
            </Box>
            <Typography variant="body2" align="center" color="error" sx={{ mb: 3 }}>
              Note: The model is deployed on a free tier server and might be inactive at the moment.
            </Typography>
            <VideoRecorder onVideoRecorded={handleVideoRecorded} isProcessing={isProcessing} />
          </Paper>
          {!isProcessing && <ResultDisplay sbp={sbp} dbp={dbp} />}
        </Box>
      </Container>
      <Instructions isOpen={isInstructionsOpen} onClose={handleCloseInstructions} />
    </ThemeProvider>
  );
};

export default App;