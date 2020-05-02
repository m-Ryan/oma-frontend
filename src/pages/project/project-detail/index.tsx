import React, { useEffect, useState, useCallback } from 'react';
import styles from './index.module.scss';
import { Table } from '@/components/Table';
import services from '@/services';
import { Project, ProjectTask } from '@/services/project';
import { getFormatDate } from '@/utils/utils';
import { ProjectTaskStatus } from '@/constants';
import { Button, PageHeader, Select } from 'antd';
import { useParams } from 'react-router-dom';
import { getPtojectTaskStatus } from '../../selectors/projectTask';
import { useForm } from '@/hooks/useForm';
import { useSelector } from '@/modal';
const Option = Select.Option;

export function ProjectDetail() {
  const { id } = useParams();
  const { getOne, project } = useSelector('project');
  const { create } = useSelector('projectTask');
  const { createSelect, form, setForm } = useForm({ environment: '' });

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
            <Button type="primary" onClick={() => create(+form.environment)}>
              手动编译
            </Button>
          </div>
        }
      />
      <Table<ProjectTask>
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
            dataIndex: 'status',
            render: (status: ProjectTask['status']) =>
              getPtojectTaskStatus(status)
          },
          {
            title: '操作',
            render: (data: ProjectTask) => (
              <Button type="link" href={`/project/${data.project_id}`}>
                查看
              </Button>
            )
          }
        ]}
        rowKey="project_task_id"
        fetch={services.projectTask.getList}
        payload={{ id }}
      />
    </div>
  );
}
