import React from 'react';
import { Paper, Typography, Box, Divider } from '@mui/material';

interface ResultDisplayProps {
  sbp: number | null;
  dbp: number | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ sbp, dbp }) => {
  const roundToTwoDecimals = (value: number | null) => {
    return value !== null ? Number(value.toFixed(2)) : null;
  };

  const roundedSBP = roundToTwoDecimals(sbp);
  const roundedDBP = roundToTwoDecimals(dbp);

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 600, textAlign: 'center' }}>
        Blood Pressure Results
      </Typography>
      <Divider sx={{ my: 2 }} />
      {roundedSBP !== null && roundedDBP !== null ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="h4" color="secondary" sx={{ fontWeight: 700 }}>
              {roundedSBP}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Systolic (mmHg)
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="secondary" sx={{ fontWeight: 700 }}>
              {roundedDBP}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Diastolic (mmHg)
            </Typography>
          </Box>
        </Box>
      ) : (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
          No results available yet. Please record a video to measure your blood pressure.
        </Typography>
      )}
    </Paper>
  );
};

export default ResultDisplay;