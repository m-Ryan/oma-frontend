import React, { useEffect, useState, useCallback } from 'react';
import styles from './index.module.scss';
import { Table } from '@/components/Table';
import services from '@/services';
import { Project, SSH, } from '@/services/project';
import { getFormatDate } from '@/utils/utils';
import { Button, PageHeader, Popconfirm } from 'antd';
import { useSelector } from '@/modal';
import { SSHModal } from './components/ssh-modal';

export function SSHConfig() {
  const [payload, setPayload] = useState({
    page: 1,
    size: 10
  });

  const { removeSSH } = useSelector('project');
  const { routeKey } = useSelector('extraHistory');

  return (
    <div className={styles.container}>
      <PageHeader title="项目管理" extra={
        <SSHModal key={routeKey} showBtn={
          <Button type="primary">
            新建ssh配置
          </Button>
        } />
      } />
      <Table<SSH> key={routeKey} payload={payload} columns={[
        { title: '名称', dataIndex: 'name', },
        { title: '创建时间', dataIndex: 'created_at', render: (created_at: SSH['created_at']) => getFormatDate(created_at), },
        {
          title: '操作', render: (data: SSH) => (
            <>
              <Popconfirm
                placement="topRight"
                title={'是否确认删除？'}
                onConfirm={() => removeSSH(data.ssh_id)}
                okText="确定"
                cancelText="取消"
              >
                <Button type="danger">删除</Button>
              </Popconfirm>
              &emsp;
              <SSHModal formData={data} key={routeKey} showBtn={
                <Button type="primary">编辑</Button>
              } />

            </>
          ),
        },
      ]} rowKey="ssh_id" fetch={services.project.getSSHList} />
    </div>
  );
}
