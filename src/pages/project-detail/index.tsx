import React, { useEffect, useState, useCallback } from 'react';
import styles from './index.module.scss';
import { Table } from '@/components/Table';
import services from '@/services';
import { Project, ProjectTask } from '@/services/project';
import { getFormatDate } from '@/utils/utils';
import { ProjectTaskStatus } from '@/constants';
import { Button } from 'antd';
import { useParams } from 'react-router-dom';
import { getPtojectTaskStatus } from '../selectors/projectTask';




export function ProjectDetail() {
  const { id } = useParams();

  if (!id) return null;
  console.log('id', id);
  return (
    <div className={styles.container}>
      <Table<ProjectTask> columns={[
        { title: '构建分支', dataIndex: 'branch' },
        { title: '版本', dataIndex: 'version', },
        { title: '提交信息', dataIndex: 'commit', },
        { title: '开始时间', dataIndex: 'created_at', render: (created_at: ProjectTask['created_at']) => getFormatDate(created_at, 'YYYY-MM-DD HH:mm'), },
        { title: '结束时间', dataIndex: 'updated_at', render: (created_at: ProjectTask['created_at']) => getFormatDate(created_at, 'YYYY-MM-DD HH:mm'), },
        { title: '状态', dataIndex: 'status', render: (status: ProjectTask['status']) => getPtojectTaskStatus(status), },
        { title: '操作', render: (data: ProjectTask) => <Button type="link" href={`/project/${data.project_id}`}>查看</Button>, },
      ]} rowKey="project_id" fetch={services.project.getHistory} payload={{ id }} />
    </div>
  );
}
