import { useImmerState, getStore } from '.';
import { useCallback } from 'react';
import services from '../services';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';
import { Project } from '@/services/project';

export function useProjectTask() {
  const [project, setProject] = useImmerState<Project | null>(null);
  const history = useHistory();

  const create = useCallback(
    async (projectEnvId: number) => {
      const { loading } = getStore();
      try {
        loading.startLoading(services.projectTask.create);
        await services.projectTask.create(projectEnvId);
        message.success('创建成功');
        history.replace('#');
      } catch (error) {
        message.error(error.message);
      } finally {
        loading.finishLoading(services.projectTask.create);
      }
    },
    [history]
  );

  const playback = useCallback(
    async (taskId: number) => {
      const { loading } = getStore();
      try {
        loading.startLoading(services.projectTask.playback);
        await services.projectTask.playback(taskId);
        message.success('创建成功');
        history.replace('#');
      } catch (error) {
        message.error(error.message);
      } finally {
        loading.finishLoading(services.projectTask.playback);
      }
    },
    [history]
  );

  const release = useCallback(async (taskId: number) => {
    const { loading } = getStore();
    try {
      loading.startLoading(services.projectTask.release, taskId);
      await services.projectTask.release(taskId);
      message.success('发布成功');
    } catch (error) {
      message.error(error.message);
    } finally {
      loading.finishLoading(services.projectTask.release, taskId);
    }
  }, []);

  const update = useCallback(
    async (
      projectId: number,
      payload: Partial<{
        name: string;
        git_path: string;
        envs: {
          name: string;
          public_path: string;
          env_name: string;
          branch: string;
          ssh_id: number;
          auto_deploy: number;
        }[];
      }>
    ) => {
      try {
        await services.project.update(projectId, payload);
        message.success('更新成功');
        history.replace('#');
      } catch (error) {
        message.error(error.message);
      }
    },
    [history]
  );

  const remove = useCallback(
    async (projectId: number) => {
      try {
        await services.project.remove(projectId);
        message.success('删除成功');
        history.replace('#');
      } catch (error) {
        message.error(error.message);
      }
    },
    [history]
  );

  const getOne = useCallback(
    async (projectId: number) => {
      try {
        const data = await services.project.getOne(projectId);
        setProject(() => data);
      } catch (error) {
        message.error(error.message);
      }
    },
    [setProject]
  );

  return {
    create,
    playback,
    release,
    update,
    remove,
    getOne,
    project
  };
}

export enum ProjectTaskEntityStatus {
  PENDING = 1,
  DOING = 2,
  SUCCESS = 3,
  ERROR = 4,
  OVERWRITE = 5
}
