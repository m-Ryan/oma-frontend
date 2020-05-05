import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Tabs, Form, Modal, Input, Radio, message } from 'antd';
import { useSelector } from '@/modal';
import { useForm, Validators } from '@/hooks/useForm';
import { Project } from '@/services/project';
import { EnvironmentForm } from '../environment-form';
import services from '@/services';
import { IEnvsItem } from '@/services/project';
const TabPane = Tabs.TabPane;

const defaultEnv = {
  project_env_id: 0,
  project_id: 0,
  name: '正式环境',
  user_id: 0,
  ssh_id: 0,
  auto_deploy: 1,
  public_path: '',
  variables: `{ NODE_ENV: 'production' }`,
  branch: 'master',
  created_at: 0,
  updated_at: 0,
  deleted_at: 0
};

export function ProjectModal({
  showBtn,
  formData = {
    created_at: 1587306285,
    deleted_at: 0,
    desc: '',
    git_path: 'git@github.com:m-Ryan/react-admin.git',
    name: 'admin-后台',
    project_id: 0,
    repository_name: 'react-admin',
    updated_at: 1587306285,
    user_id: 1,
    environments: [defaultEnv],
    upload_floder: ''
  }
}: {
  showBtn: React.ReactNode;
  formData?: Project;
}) {
  const { getLoading } = useSelector('loading');
  const [visible, setVisible] = useState(false);
  const { form, createInput, verify, setForm } = useForm<Project>(formData);
  const { create, update } = useSelector('project');
  const { getList, list } = useSelector('ssh');

  useEffect(() => {
    getList();
  }, [getList]);

  useEffect(() => {
    if (visible && list.length === 0) {
      message.warning('需要先配置SSH');
    }
  }, [list.length, visible]);

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

  const onEdit = useCallback(
    (
      targetKey: string | React.MouseEvent<HTMLElement, MouseEvent>,
      action: 'add' | 'remove'
    ) => {
      if (action === 'add') {
        setForm(newForm => {
          const nameList = new Array(100)
            .fill(true)
            .map((item, index) => `develop-${index}`);
          const name = nameList.find(name =>
            form.environments.every(env => env.name !== name)
          )!;
          newForm.environments.push({
            ...defaultEnv,
            name,
            branch: 'develop'
          });
          return newForm;
        });
      } else {
        console.log('targetKey', targetKey);
        setForm(newForm => {
          newForm.environments = newForm.environments.filter(
            (item, index) => index !== +targetKey
          );
          return newForm;
        });
      }
    },
    [form.environments, setForm]
  );

  const onChangeEnvironment = useCallback(
    (index: number, data: IEnvsItem) => {
      setForm(newForm => {
        newForm.environments[index] = data;
        return newForm;
      });
    },
    [setForm]
  );

  const renderContent = useMemo(() => {
    if (getLoading(services.ssh.getList)) return null;
    return (
      <Form>
        <Form.Item label="项目名称">
          <Input
            {...createInput('name', {
              validator: Validators.required,
              label: '项目名称'
            })}
            placeholder="项目名称"
          />
        </Form.Item>

        <Form.Item label="仓库路径">
          <Input
            {...createInput('git_path', {
              validator: Validators.required,
              label: '仓库路径'
            })}
            placeholder="仓库路径"
          />
        </Form.Item>

        <Form.Item label="上传路径">
          <Input
            {...createInput('upload_floder', {
              validator: Validators.required,
              label: '上传路径'
            })}
            placeholder="上传路径"
          />
        </Form.Item>
        <Tabs type="editable-card" onEdit={onEdit}>
          {form.environments.map((item, index) => (
            <TabPane
              key={index.toString()}
              tab={item.name}
              closable={form.environments.length > 0}
            >
              <EnvironmentForm
                onChange={(data: IEnvsItem) => onChangeEnvironment(index, data)}
                formData={item}
              />
            </TabPane>
          ))}
        </Tabs>
      </Form>
    );
  }, [createInput, form.environments, getLoading, onChangeEnvironment, onEdit]);
  return (
    <>
      <Modal
        title="项目 配置"
        visible={visible}
        okText="确定"
        cancelText="取消"
        centered
        confirmLoading={getLoading(services.project.create)}
        onOk={submit}
        onCancel={() => setVisible(false)}
      >
        {renderContent}
      </Modal>
      <div style={{ display: 'inline-flex' }} onClick={() => setVisible(true)}>
        {showBtn}
      </div>
    </>
  );
}
