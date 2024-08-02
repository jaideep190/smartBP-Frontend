// Instructions.tsx
import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';

interface InstructionsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>How to Use</DialogTitle>
      <DialogContent>
        <Typography variant="body1" paragraph>
          1. Place your finger on the camera make sure your finger goes over the flash light 
          and tap to start.
        </Typography>
        <Typography variant="body1">
          2. After the Video has recorded, the estimations of your blood pressure will be displayed on your screen.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Instructions;