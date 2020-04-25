import { useImmerState, getStore } from '.';
import { useCallback } from 'react';
import services from '../services';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';


export function useProject() {
  const history = useHistory();

  const create = useCallback(async (payload: {
    name: string,
    git_path: string;
    envs: {
      name: string,
      public_path: string,
      env_name: string,
      branch: string,
      ssh_id: number,
      auto_deploy: number;
    }[];
  }) => {
    try {
      await services.project.create(payload);
      message.success('创建成功');
      history.replace('#');
    } catch (error) {
      message.error(error.message);
    }
  }, [history]);

  const update = useCallback(async (sshId: number, payload: Partial<{
    name: string,
    git_path: string;
    envs: {
      name: string,
      public_path: string,
      env_name: string,
      branch: string,
      ssh_id: number,
      auto_deploy: number;
    }[];
  }>) => {
    try {
      await services.project.update(sshId, payload);
      message.success('更新成功');
      history.replace('#');
    } catch (error) {
      message.error(error.message);
    }
  }, [history]);

  const remove = useCallback(async (sshId: number) => {
    try {
      await services.project.deleteSSH(sshId);
      message.success('删除成功');
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