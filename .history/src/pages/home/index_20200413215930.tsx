import React, { useEffect, useState, useCallback } from 'react';
import styles from './index.module.scss';

export function Home() {
  const [a, setA] = useState('');

  useEffect(() => {
    console.log(a)
  }, [])

  return (
    <div className={styles.container}>
      111
    </div>
  );
}
