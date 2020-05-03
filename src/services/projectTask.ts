import { request } from '@/services/axios.config';
import { ResponseList } from './common.typing';

export const projectTask = {
  create(projectEnvId: number) {
    return request.post<ResponseList<Project>>('/api/project-task/create', {
      project_env_id: projectEnvId
    });
  },
  playback(taskId: number) {
    return request.post<ResponseList<Project>>(
      '/api/project-task/playback',
      undefined,
      {
        params: {
          task_id: taskId
        }
      }
    );
  },
  release(taskId: number) {
    return request.post<ResponseList<Project>>(
      '/api/project-task/release',
      undefined,
      {
        params: {
          task_id: taskId
        }
      }
    );
  },
  getList(params: { page: number; size: number; id: number }) {
    return request.get<ResponseList<ProjectTask>>('/api/project-task/list', {
      params
    });
  },
  update(
    projectId: number,
    payload: Partial<{
      name: string;
      host: string;
      port: number | string;
      username: string;
      password?: string;
      privateKey?: string;
    }>
  ) {
    return request.post<ResponseList<Project>>(
      '/api/project-task/update',
      payload,
      { params: { project_id: projectId } }
    );
  },
  remove(projectId: number) {
    return request.post<ResponseList<Project>>(
      '/api/project-task/remove',
      undefined,
      { params: { project_id: projectId } }
    );
  }
};

export interface Project {
  project_id: number;
  name: string;
  repository_name: string;
  git_path: string;
  desc: string;
  created_at: number;
  user_id: number;
  updated_at: number;
  deleted_at: number;
  environments: IEnvsItem[];
}

export interface IEnvsItem {
  project_env_id: number;
  project_id: number;
  name: string;
  user_id: number;
  ssh_id: number;
  auto_deploy: number;
  public_path: string;
  variables: string;
  branch: string;
  created_at: number;
  updated_at: number;
  deleted_at: number;
}

export interface ProjectTask {
  task_id: number;
  project_env_id: number;
  user_id: number;
  project_id: number;
  ssh_id: number;
  repository: string;
  branch: string;
  version: string;
  commit: string;
  err_msg: string;
  status: number;
  created_at: number;
  updated_at: number;
  deleted_at: number;
}
