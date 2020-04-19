import { request } from '@/services/axios.config';
import { ResponseList } from './common.typing';

export const project = {
  getList(params: { page: number, size: number; }) {
    return request.get<ResponseList<Project>>('/api/project/list', {
      params
    });
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

export interface ProjectTask { task_id: number; project_env_id: number; user_id: number; project_id: number; ssh_id: number; repository: string; branch: string; version: string; commit: string; err_msg: string; status: number; created_at: number; updated_at: number; deleted_at: number; }