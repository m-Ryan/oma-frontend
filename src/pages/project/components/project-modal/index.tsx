import React, { useEffect, useState, useCallback } from 'react';
import { Tabs, Form, Modal, Input, Radio, message } from 'antd';
import { useSelector } from '@/modal';
import { useForm, Validators } from '@/hooks/useForm';
import { Project } from '@/services/project';
const TabPane = Tabs.TabPane;

export function ProjectModal({ showBtn, formData = {
  created_at: 1587306285,
  deleted_at: 0,
  desc: "",
  git_path: "git@github.com:m-Ryan/react-admin.git",
  name: "admin-后台",
  project_id: 1,
  repository_name: "react-admin",
  updated_at: 1587306285,
  user_id: 1,
  envs: [
    {
      project_env_id: 0,
      project_id: 0,
      name: 'master',
      user_id: 0,
      ssh_id: 0,
      auto_deploy: 1,
      public_path: '',
      env_name: '',
      branch: '',
      created_at: 0,
      updated_at: 0,
      deleted_at: 0,
    }
  ]
} }: { showBtn: React.ReactNode; formData?: Project; }) {
  const [visible, setVisible] = useState(false);
  const { form, createInput, verify } = useForm<Project>(
    formData
  );
  const { create, update } = useSelector('project');

  const submit = useCallback(() => {
    const errMsg = verify();
    if (errMsg) {
      message.warning(errMsg);
      return;
    }
    if (form.project_id) {
      update(form.project_id, form);
    } else {
      create(form);
    }

  }, [create, form, update, verify]);

  return (
    <>

      <Modal
        title="项目 配置"
        visible={visible}
        okText="确定"
        cancelText="取消"
        centered
        onOk={submit}
        onCancel={() => setVisible(false)}
      >
        <Form>
          <Form.Item label="项目名称">
            <Input
              {...createInput('name', { validator: Validators.required, label: '项目名称' })}
              placeholder="项目名称"
            />
          </Form.Item>

          <Form.Item label="仓库路径">
            <Input
              {...createInput('git_path', { validator: Validators.required, label: '仓库路径' })}
              placeholder="仓库路径"
            />
          </Form.Item>
          <Tabs>
            <TabPane tab="">


            </TabPane>
          </Tabs>
        </Form>
      </Modal>
      <div style={{ display: 'inline-flex' }} onClick={() => setVisible(true)}>{showBtn}</div>
    </>
  );
}
