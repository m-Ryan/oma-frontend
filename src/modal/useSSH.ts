import { useImmerState, getStore } from '.';
import { useCallback } from 'react';
import services from '../services';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';


export function useSSH() {
  const history = useHistory();


  const remove = useCallback(async (sshId: number) => {
    try {
      await services.ssh.remove(sshId);
      message.success('删除成功');
      history.replace('#');
    } catch (error) {
      message.error(error.message);
    }
  }, [history]);

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
      await services.project.update(sshId, payload);
      message.success('更新成功');
      history.replace('#');
    } catch (error) {
      message.error(error.message);
    }
  }, [history]);

  return {
    remove,
    create,
    update
  };
}