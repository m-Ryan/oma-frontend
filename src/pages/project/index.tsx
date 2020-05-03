import React, { useEffect, useState, useCallback } from 'react';
import { Table } from '@/components/Table';
import services from '@/services';
import { Project } from '@/services/project';
import { getFormatDate } from '@/utils/utils';
import { Button, PageHeader, Popconfirm, Space } from 'antd';
import { ProjectModal } from './components/project-modal';
import { useSelector } from '@/modal';

export function Preject() {
  const { routeKey } = useSelector('extraHistory');
  const { remove } = useSelector('project');

  return (
    <>
      <PageHeader
        title="项目管理"
        extra={
          <ProjectModal
            key={routeKey}
            showBtn={<Button type="primary">新建项目</Button>}
          />
        }
      />
      <Table<Project>
        key={routeKey}
        columns={[
          { title: '名称', dataIndex: 'name' },
          {
            title: '创建时间',
            dataIndex: 'created_at',
            render: (created_at: Project['created_at']) =>
              getFormatDate(created_at)
          },
          {
            title: '操作',
            render: (data: Project) => (
              <>
                <Space size="large">
                  <Popconfirm
                    placement="topRight"
                    title={'是否确认删除？'}
                    onConfirm={() => remove(data.project_id)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button type="danger">删除</Button>
                  </Popconfirm>

                  <ProjectModal
                    formData={data}
                    key={routeKey}
                    showBtn={<Button type="primary">编辑</Button>}
                  />
                  <Button
                    type="primary"
                    href={`/project/${data.project_id}/detail`}
                  >
                    查看
                  </Button>
                </Space>
              </>
            )
          }
        ]}
        rowKey="project_id"
        fetch={services.project.getList}
      />
    </>
  );
}
