import { useImmerState, getStore } from '.';
import { useCallback } from 'react';
import services from '../services';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';
import { SSH } from '@/services/ssh';

export function useSSH() {
  const [list, setList] = useImmerState<SSH[]>([]);
  const history = useHistory();

  const create = useCallback(
    async (payload: {
      name: string;
      host: string;
      port: number | string;
      username: string;
      password?: string;
      privateKey?: string;
    }) => {
      try {
        await services.ssh.create(payload);
        message.success('创建成功');
        history.replace('#');
      } catch (error) {
        message.error(error.message);
      }
    },
    [history]
  );

  const update = useCallback(
    async (
      sshId: number,
      payload: {
        name: string;
        host: string;
        port: number | string;
        username: string;
        password?: string;
        privateKey?: string;
      }
    ) => {
      const { loading } = getStore();
      try {
        loading.startLoading(services.ssh.update);
        await services.ssh.update(sshId, payload);
        message.success('更新成功');
        history.replace('#');
      } catch (error) {
        message.error(error.message);
      } finally {
        loading.finishLoading(services.ssh.update);
      }
    },
    [history]
  );

  const getList = useCallback(async () => {
    if (list.length) {
      return list;
    }
    const { loading } = getStore();
    try {
      loading.startLoading(services.ssh.getList);
      const data = await services.ssh.getList({ page: 1, size: 1000 });
      setList(() => data.list);
      return data.list;
    } catch (error) {
      message.error(error.message);
      return list;
    } finally {
      loading.finishLoading(services.ssh.getList);
    }
  }, [list, setList]);

  const remove = useCallback(
    async (sshId: number) => {
      try {
        await services.ssh.remove(sshId);
        message.success('删除成功');
        history.replace('#');
      } catch (error) {
        message.error(error.message);
      }
    },
    [history]
  );

  return {
    remove,
    create,
    update,
    getList,
    list
  };
}
