import { request } from '@/services/axios.config';
import { ResponseList } from './common.typing';

export const ssh = {
  create(payload: {
    name: string,
    host: string,
    port: number | string,
    username: string,
    password?: string,
    privateKey?: string;
  }) {
    return request.post<ResponseList<SSH>>('/api/ssh/create', payload);
  },
  update(sshId: number, payload: Partial<{
    name: string,
    host: string,
    port: number | string,
    username: string,
    password?: string,
    privateKey?: string;
  }>) {
    return request.post<ResponseList<SSH>>('/api/ssh/update', payload, { params: { ssh_id: sshId } });
  },
  getList(params: { page: number, size: number; }) {
    return request.get<ResponseList<SSH>>('/api/ssh/list', {
      params
    });
  },
  remove(sshId: number) {
    return request.post<ResponseList<SSH>>('/api/ssh/remove', undefined, { params: { ssh_id: sshId } });
  },
};

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