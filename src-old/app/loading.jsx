"use client"
import React, { useState, useEffect } from 'react';
import { SyncLoader } from 'react-spinners';

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 30010); // Change 3001 to the desired duration in milliseconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='container d-flex justify-content-center align-items-center ' style={{height:'60vh '}}>
      {isLoading && (
        <div className='loader-content'>
          <SyncLoader color='#262262' loading={true} size={25} />
          <p className='fw-bold'>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Loading;
