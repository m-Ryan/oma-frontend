import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Menu } from './components/menu';
import { Header } from './components/header';
import { useSelector } from '@/modal';
import { useHistory } from 'react-router-dom';
import { LOGIN_ADDRESS } from '@/constants';
interface IProps {
  children: React.ReactNode;
}

export function BasicLayout(props: IProps) {
  const { getUser, user } = useSelector('user');
  const { replace } = useHistory();

  useEffect(() => {
    getUser()
      .catch(() => {
        replace(LOGIN_ADDRESS)
      });
  }, [getUser]);

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