import { useImmerState, getStore } from '.';
import { useCallback } from 'react';
import services from '../services';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';


export function useProject() {
  const history = useHistory();

  const createProject = useCallback(async () => {

  }, []);

  const removeSSH = useCallback(async (sshId: number) => {
    try {
      await services.project.deleteSSH(sshId);
      message.success('删除成功');
      history.replace('#');
    } catch (error) {
      message.error(error.message);
    }
  }, [history]);

  const createSSH = useCallback(async (payload: {
    name: string,
    host: string,
    port: number | string,
    username: string,
    password?: string,
    privateKey?: string;
  }) => {
    try {
      await services.project.createSSHConfig(payload);
      message.success('创建成功');
      history.replace('#');
    } catch (error) {
      message.error(error.message);
    }
  }, [history]);

  return {
    removeSSH,
    createSSH
  };
}