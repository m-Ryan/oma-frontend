import { useImmerState } from '.';
import { useMemo, useCallback, useState } from 'react';
import services from '../services';
import { IUser } from '../services/user';
import { message } from 'antd';
import { UserStorage } from '@/utils/user-storage';

interface LoginDto { phone: string, password: string, saved: boolean; }

export function useUser() {
  const [user, setUser] = useState<IUser | null>(null);

  const login = useCallback(async ({ phone, password, saved }: LoginDto) => {
    try {
      const userData = await services.user.login(phone, password);
      UserStorage.setToken(userData.token, saved);
      setUser(() => userData);
      message.success('登录成功');
    } catch (error) {
      message.error(error.message);
    }

  }, []);

  const getUser = useCallback(async () => {
    const userData = await services.user.getAccount();
    setUser(() => userData);
  }, [setUser]);

  const hasLogout = useMemo(() => {
    return UserStorage.getToken();
  }, []);

  return {
    user,
    login,
    getUser
  };
}