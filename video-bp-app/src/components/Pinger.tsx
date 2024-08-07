import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pinger: React.FC = () => {
  const [lastPingedTime, setLastPingedTime] = useState<string>('');

  useEffect(() => {
    const fetchLastPingedTime = async () => {
      try {
        await axios.get('https://smartbp-backend.onrender.com/');
        const currentTime = new Date().toLocaleTimeString();
        setLastPingedTime(currentTime);
        console.log('Last Pinged Time:', currentTime);
      } catch (error) {
        console.error('Error fetching last pinged time:', error);
      }
    };

    const interval = setInterval(() => {
      fetchLastPingedTime();
    }, 3000); // Ping every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>Last Pinged Time: {lastPingedTime} (to keep the server active)</p>
    </div>
  );
};

export default Pinger;
