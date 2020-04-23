import React, { useEffect, useState, useCallback } from 'react';
import styles from './index.module.scss';
import { Table } from '@/components/Table';
import services from '@/services';
import { Project } from '@/services/project';
import { getFormatDate } from '@/utils/utils';
import { Button, PageHeader } from 'antd';




export function Home() {

  return (
    <div className={styles.container}>
      <PageHeader title="项目管理" extra={
        <Button key="1" type="primary">
          新建项目
        </Button>
      } />
      <Table<Project> columns={[
        { title: '名称', dataIndex: 'name', },
        { title: '创建时间', dataIndex: 'created_at', render: (created_at: Project['created_at']) => getFormatDate(created_at), },
        { title: '操作', render: (data: Project) => <Button type="link" href={`/project/${data.project_id}/detail`}>查看</Button>, },
      ]} rowKey="project_id" fetch={services.project.getList} />
    </div>
  );
}
