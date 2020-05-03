import React, { useEffect } from 'react';
import services from '@/services';
import { Button, PageHeader, Select } from 'antd';
import { useParams } from 'react-router-dom';
import { useForm } from '@/hooks/useForm';
import { useSelector } from '@/modal';
import styles from './index.module.scss';
import { TaskTable } from '../components/task-table';

const Option = Select.Option;

export function ProjectDetail() {
  const { id } = useParams();
  const { getOne, project } = useSelector('project');
  const { create } = useSelector('projectTask');
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

  if (!id || !project) return null;

  return (
    <>
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
      <TaskTable />
    </>
  );
}
