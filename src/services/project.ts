import { request } from '@/services/axios.config';
import { ResponseList } from './common.typing';

export const project = {
  create(payload: {
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
  }) {
    return request.post<ResponseList<Project>>('/api/project/create', payload);
  },
  getOne(id: number) {
    return request.get<Project>(`/api/project/${id}`);
  },
  getList(params: { page: number; size: number }) {
    return request.get<ResponseList<Project>>('/api/project/list', {
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
    return request.post<ResponseList<Project>>('/api/project/update', payload, {
      params: { project_id: projectId }
    });
  },
  remove(projectId: number) {
    return request.post<ResponseList<Project>>(
      '/api/project/remove',
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
  upload_floder: string;
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
  infomation: string;
  status: number;
  created_at: number;
  updated_at: number;
  deleted_at: number;
}
