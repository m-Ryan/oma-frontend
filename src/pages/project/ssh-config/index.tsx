import React from 'react';
import { Table } from '@/components/Table';
import services from '@/services';
import { getFormatDate } from '@/utils/utils';
import { Button, PageHeader, Popconfirm } from 'antd';
import { useSelector } from '@/modal';
import { SSHModal } from './components/ssh-modal';
import { SSH } from '@/services/ssh';

export function SSHConfig() {
  const { remove } = useSelector('ssh');
  const { routeKey } = useSelector('extraHistory');

  return (
    <>
      <PageHeader
        title="项目管理"
        extra={
          <SSHModal
            key={routeKey}
            showBtn={<Button type="primary">新建ssh配置</Button>}
          />
        }
      />
      <Table<SSH>
        key={routeKey}
        columns={[
          { title: '名称', dataIndex: 'name' },
          {
            title: '创建时间',
            dataIndex: 'created_at',
            render: (created_at: SSH['created_at']) => getFormatDate(created_at)
          },
          {
            title: '操作',
            render: (data: SSH) => (
              <>
                <Popconfirm
                  placement="topRight"
                  title={'是否确认删除？'}
                  onConfirm={() => remove(data.ssh_id)}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button type="danger">删除</Button>
                </Popconfirm>
                &emsp;
                <SSHModal
                  formData={data}
                  key={routeKey}
                  showBtn={<Button type="primary">编辑</Button>}
                />
              </>
            )
          }
        ]}
        rowKey="ssh_id"
        fetch={services.ssh.getList}
      />
    </>
  );
}
