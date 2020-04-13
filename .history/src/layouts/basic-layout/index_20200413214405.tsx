import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Menu } from './components/menu';
import { Header } from './components/header';
import { useSelector } from '@/modal';
interface IProps {
  children: React.ReactNode;
}

export function BasicLayout(props: IProps) {
  const { getUser } = useSelector('user');
  const [a, setA] = useState('')

  useEffect(() => {
    getUser();
    console.log(a)
  }, [a, getUser]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.wrap}>
        <div className={styles.menu}>
          <Menu />
        </div>
        <div className={styles.contentWrap}>
          <div className={styles.content}>{props.children}</div>
        </div>
      </div>
    </div>
  );
}