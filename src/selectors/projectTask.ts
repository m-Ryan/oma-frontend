import { ProjectTaskEntityStatus } from '@/modal/useProjectTask';

export function getPtojectTaskStatus(status: ProjectTaskEntityStatus) {
  switch (status) {
  case ProjectTaskEntityStatus.PENDING:
    return '等待中';
  case ProjectTaskEntityStatus.DOING:
    return '进行中';
  case ProjectTaskEntityStatus.SUCCESS:
    return '成功';
  case ProjectTaskEntityStatus.ERROR:
    return '失败';
  case ProjectTaskEntityStatus.OVERWRITE:
    return '重新构建';
  default:
    return '未知';
  }
}
