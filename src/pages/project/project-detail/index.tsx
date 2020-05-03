import React, { useEffect, useState, useCallback, useMemo } from 'react';
import styles from './index.module.scss';
import { Table } from '@/components/Table';
import services from '@/services';
import { ProjectTask } from '@/services/project';
import { getFormatDate } from '@/utils/utils';
import { Button, PageHeader, Select, Tooltip, Tag } from 'antd';
import { useParams } from 'react-router-dom';
import { getPtojectTaskStatus } from '../../../selectors/projectTask';
import { useForm } from '@/hooks/useForm';
import { useSelector } from '@/modal';
import { ProjectTaskEntityStatus } from '@/modal/useProjectTask';
const Option = Select.Option;

export function ProjectDetail() {
  const { id } = useParams();
  const { getOne, project } = useSelector('project');
  const { create } = useSelector('projectTask');
  const { routeKey } = useSelector('extraHistory');
  const { createSelect, form, setForm } = useForm({ environment: '' });
  const { getLoading } = useSelector('loading');

  useEffect(() => {
    if (id) {
      getOne(parseInt(id));
    }
  }, [getOne, id]);

  useEffect(() => {
    if (
      project &&
      project.environments &&
      project.environments.length > 0 &&
      !form.environment
    ) {
      setForm(newState => {
        newState.environment = project.environments[0].project_env_id.toString();
        return newState;
      });
    }
  }, [form, form.environment, project, setForm]);

  const getBtns = useCallback((data: ProjectTask) => {
    switch (data.status) {
    case ProjectTaskEntityStatus.SUCCESS:
      return <Button>发布</Button>;
    case ProjectTaskEntityStatus.ERROR:
      return <Button>重新构建</Button>;
    default:
      return '--';
    }
  }, []);

  const getStatus = useCallback((data: ProjectTask) => {
    switch (data.status) {
    case ProjectTaskEntityStatus.SUCCESS:
      return (
        <Tooltip title={data.err_msg}>
          <Tag color="green">{getPtojectTaskStatus(data.status)}</Tag>
        </Tooltip>
      );
    case ProjectTaskEntityStatus.ERROR:
      return (
        <Tooltip title={data.err_msg}>
          <Tag color="red">{getPtojectTaskStatus(data.status)}</Tag>
        </Tooltip>
      );
    case ProjectTaskEntityStatus.PENDING:
      return (
        <Tooltip title={data.err_msg}>
          <Tag color="blue">{getPtojectTaskStatus(data.status)}</Tag>
        </Tooltip>
      );
    default:
      return (
        <Tooltip title={data.err_msg}>
          <Tag color="orange">{getPtojectTaskStatus(data.status)}</Tag>
        </Tooltip>
      );
    }
  }, []);

  if (!id || !project) return null;

  return (
    <div className={styles.container}>
      <PageHeader
        title="项目管理"
        extra={
          <div>
            <Select style={{ width: 120 }} {...createSelect('environment')}>
              {project.environments.map(item => {
                return (
                  <Option
                    key={item.project_env_id}
                    value={item.project_env_id.toString()}
                  >
                    {item.name}
                  </Option>
                );
              })}
            </Select>
            &emsp;
            <Button
              loading={getLoading(services.projectTask.create)}
              type="primary"
              onClick={() => create(+form.environment)}
            >
              手动编译
            </Button>
          </div>
        }
      />
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
    </div>
  );
}
