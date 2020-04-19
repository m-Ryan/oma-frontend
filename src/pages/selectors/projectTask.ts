import { ProjectTaskStatus } from '@/constants';

export function getPtojectTaskStatus(status: ProjectTaskStatus) {
  switch (status) {
  case ProjectTaskStatus.ERROR: return '失败';
  case ProjectTaskStatus.SUCCESS: return '成功';
  case ProjectTaskStatus.PENDING: return '进行中';
  case ProjectTaskStatus.OVERWRITE: return '重新构建';
  }
}