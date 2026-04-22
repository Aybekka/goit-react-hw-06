import { useState, useEffect } from 'react';
import styles from './ThemeToggle.module.css';

const ThemeToggle = () => {
  const [isLight, setIsLight] = useState(() => {
    const hour = new Date().getHours();
    return hour >= 7 && hour < 19;
  });

  useEffect(() => {
    document.body.classList.toggle('light-mode', isLight);
  }, [isLight]);

  return (
    <button className={styles.btn} onClick={() => setIsLight(p => !p)}>
      {isLight ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default ThemeToggle;
