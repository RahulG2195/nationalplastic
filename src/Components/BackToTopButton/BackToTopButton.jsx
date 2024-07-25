'use client';
import { useState, useEffect } from 'react';
import styles from './BackToTopButton.module.css';

const BackToTopButton = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    useEffect(() => {
      window.addEventListener('scroll', toggleVisibility);
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
      };
    }, []);
  
    useEffect(() => {
      console.log('visible', visible); // Debugging line
    }, [visible]);
    
  return (
    <>
      <button
      type="button"
      onClick={scrollToTop}
      className={`${styles.backToTopButton} ${visible ? styles.visible : ''}`}
    >
      ↑
    </button>
    </>
  );
};

export default BackToTopButton;