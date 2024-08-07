import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pinger: React.FC = () => {
  const [lastPingedTime, setLastPingedTime] = useState<string>('');

  useEffect(() => {
    const fetchLastPingedTime = async () => {
      try {
        setLastPingedTime(new Date().toLocaleString());
        console.log('Last Pinged Time:', lastPingedTime);
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
      <p>Last Pinged : {lastPingedTime} (to maintain server activity)</p>
    </div>
  );
};

export default Pinger;
