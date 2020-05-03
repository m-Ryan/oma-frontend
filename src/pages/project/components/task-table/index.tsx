import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Button, Drawer, Tooltip, Tag } from 'antd';
import { ProjectTaskEntityStatus } from '@/modal/useProjectTask';
import { ProjectTask } from '@/services/project';
import { getProjectTaskStatus } from '@/selectors/projectTask';
import { Table } from '@/components/Table';
import { useSelector } from '@/modal';
import { getFormatDate } from '@/utils/utils';
import services from '@/services';
import { useParams } from 'react-router-dom';

export function TaskTable() {
  const { id } = useParams();
  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);
  const { getLoading } = useSelector('loading');
  const { playback, release } = useSelector('projectTask');

  const { routeKey } = useSelector('extraHistory');

  const getBtns = useCallback(
    (data: ProjectTask) => {
      const readBtn = (
        <Button onClick={() => setSelectedTask(data)}>查看</Button>
      );
      let statusBtn: React.ReactNode = null;
      switch (data.status) {
        case ProjectTaskEntityStatus.SUCCESS:
          statusBtn = (
            <Button
              loading={getLoading(services.projectTask.release, data.task_id)}
              onClick={() => release(data.task_id)}
            >
              发布
            </Button>
          );
          break;
      }
      return (
        <>
          {readBtn}&emsp;{statusBtn}&emsp;
          <Button
            loading={getLoading(services.projectTask.playback, data.task_id)}
            onClick={() => playback(data.task_id)}
          >
            回放
          </Button>
        </>
      );
    },
    [getLoading, playback, release]
  );

  const getStatus = useCallback((data: ProjectTask) => {
    const statusText = getProjectTaskStatus(data.status);
    switch (data.status) {
      case ProjectTaskEntityStatus.SUCCESS:
        return <Tag color="green">{statusText}</Tag>;
      case ProjectTaskEntityStatus.ERROR:
        return <Tag color="red">{statusText}</Tag>;
      case ProjectTaskEntityStatus.PENDING:
        return <Tag color="blue">{statusText}</Tag>;
      default:
        return <Tag color="orange">{statusText}</Tag>;
    }
  }, []);
  return (
    <>
      <Table<ProjectTask>
        key={routeKey}
        columns={[
          { title: '构建分支', dataIndex: 'branch' },
          { title: '版本', dataIndex: 'version' },
          { title: '提交信息', dataIndex: 'commit' },
          {
            title: '开始时间',
            dataIndex: 'created_at',
            render: (created_at: ProjectTask['created_at']) =>
              getFormatDate(created_at, 'YYYY-MM-DD HH:mm')
          },
          {
            title: '结束时间',
            dataIndex: 'updated_at',
            render: (created_at: ProjectTask['created_at']) =>
              getFormatDate(created_at, 'YYYY-MM-DD HH:mm')
          },
          {
            title: '状态',
            render: getStatus
          },
          {
            title: '操作',
            render: getBtns
          }
        ]}
        rowKey="task_id"
        fetch={services.projectTask.getList}
        payload={{ id }}
      />
      <Drawer
        title="编译详情"
        onClose={() => setSelectedTask(null)}
        visible={!!selectedTask}
        width={'50%'}
        bodyStyle={{
          whiteSpace: 'pre-wrap',
          color: '#1777dc'
        }}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: selectedTask ? selectedTask.infomation : ''
          }}
        ></div>
      </Drawer>
    </>
  );
}
