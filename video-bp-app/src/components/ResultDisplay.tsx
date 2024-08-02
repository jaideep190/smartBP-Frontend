import React from 'react';
import { Paper, Typography } from '@mui/material';

interface ResultDisplayProps {
  sbp: number | null;
  dbp: number | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ sbp, dbp }) => {
  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Blood Pressure Results
      </Typography>
      {sbp !== null && dbp !== null ? (
        <>
          <Typography>Systolic Blood Pressure: {sbp} mmHg</Typography>
          <Typography>Diastolic Blood Pressure: {dbp} mmHg</Typography>
        </>
      ) : (
        <Typography>No results available yet.</Typography>
      )}
    </Paper>
  );
};

export default ResultDisplay;