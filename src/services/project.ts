import { request } from '@/services/axios.config';
import { ResponseList } from './common.typing';

export const project = {
  create(payload: {
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
  }) {
    return request.post<ResponseList<Project>>('/api/project/create', payload);
  },
  createSSHConfig(payload: {
    name: string,
    host: string,
    port: number | string,
    username: string,
    password?: string,
    privateKey?: string;
  }) {
    return request.post<ResponseList<Project>>('/api/project/create-ssh-config', payload);
  },
  getList(params: { page: number, size: number; }) {
    return request.get<ResponseList<Project>>('/api/project/list', {
      params
    });
  },
  getSSHList(params: { page: number, size: number; }) {
    return request.get<ResponseList<SSH>>('/api/project/ssh-list', {
      params
    });
  },
  deleteSSH(sshId: number) {
    return request.post<ResponseList<SSH>>('/api/project/delete-ssh', undefined, { params: { ssh_id: sshId } });
  },
  getHistory(params: { page: number, size: number; id: number; }) {
    return request.get<ResponseList<ProjectTask>>(`/api/project/${params.id}/history`, {
      params
    });
  }
};

export interface Project {
  project_id: number;
  name: string;
  repository_name: string;
  git_path: string;
  desc: { age: string; };
  created_at: number;
  user_id: number;
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

export interface SSH {
  ssh_id: number;
  name: string;
  host: string;
  port: number;
  username: string;
  password: string;
  privateKey: string;
  created_at: number;
  user_id: number;
  type: number;
  updated_at: number;
  deleted_at: number;
}