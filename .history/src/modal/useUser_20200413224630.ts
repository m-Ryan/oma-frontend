import { useImmerState } from '.';
import { useMemo, useCallback, useState } from 'react';
import services from '../services';
import { IUser } from '../services/user';
import { message } from 'antd';
import { UserStorage } from '@/utils/user-storage';

interface LoginDto { nickname: string, password: string, saved: boolean; }

export function useUser() {
  const [user, setUser] = useImmerState<IUser | null>(null);

  const login = useCallback(async ({ nickname, password, saved }: LoginDto) => {
    try {
      const userData = await services.user.login(nickname, password);
      UserStorage.setToken(userData.token, saved);
      setUser(() => userData);
      message.success('登录成功');
    } catch (error) {
      message.error(error.message);
    }

  }, [setUser]);

  const getUser = useCallback(async () => {
    const userData = await services.user.getAccount();
    setUser(() => userData);
  }, [setUser]);

  return {
    user,
    login,
    getUser
  };
}