import React from 'react';
import { PageHeader } from 'antd';
import { TaskTable } from '../components/task-table';

export function ProjectBuild() {
  return (
    <>
      <PageHeader title="构建列表" />
      <TaskTable />
    </>
  );
}
