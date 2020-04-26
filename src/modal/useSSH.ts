import { useImmerState, getStore } from '.';
import { useCallback } from 'react';
import services from '../services';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';
import { SSH } from '@/services/ssh';
import { debounce } from 'lodash';


export function useSSH() {
  const [list, setList] = useImmerState<SSH[]>([]);
  const history = useHistory();

  const create = useCallback(async (payload: {
    name: string,
    host: string,
    port: number | string,
    username: string,
    password?: string,
    privateKey?: string;
  }) => {
    try {
      await services.ssh.create(payload);
      message.success('创建成功');
      history.replace('#');
    } catch (error) {
      message.error(error.message);
    }
  }, [history]);

  const update = useCallback(async (sshId: number, payload: {
    name: string,
    host: string,
    port: number | string,
    username: string,
    password?: string,
    privateKey?: string;
  }) => {
    try {
      await services.ssh.update(sshId, payload);
      message.success('更新成功');
      history.replace('#');
    } catch (error) {
      message.error(error.message);
    }
  }, [history]);

  const getList = useCallback(async () => {
    if (list.length) {
      return list;
    }
    try {
      const data = await services.ssh.getList({ page: 1, size: 1000 });
      setList(() => data.list);
      return data.list;
    } catch (error) {
      message.error(error.message);
      return list;
    }
  }, [list, setList]);

  const remove = useCallback(async (sshId: number) => {
    try {
      await services.ssh.remove(sshId);
      message.success('删除成功');
      history.replace('#');
    } catch (error) {
      message.error(error.message);
    }
  }, [history]);

  return {
    remove,
    create,
    update,
    getList,
    list
  };
}