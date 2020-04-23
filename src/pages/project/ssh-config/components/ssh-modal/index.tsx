import React, { useEffect, useState, useCallback } from 'react';
import { Button, Form, Modal, Input, Radio, message } from 'antd';
import { useSelector } from '@/modal';
import { useForm, Validators } from '@/hooks/useForm';
import { SSH } from '@/services/project';

export function SSHModal({ showBtn, formData = {
  ssh_id: 0,
  name: '',
  host: '',
  port: 22,
  username: 'root',
  password: '',
  privateKey: '',
  created_at: 0,
  user_id: 0,
  type: 0,
  updated_at: 0,
  deleted_at: 0,
} }: { showBtn: React.ReactNode; formData?: SSH; }) {
  const [visible, setVisible] = useState(false);
  const { form, createInput, createRadio, verify } = useForm<SSH & { radio: string; }>({
    ...formData,
    radio: formData && formData.privateKey ? 'privateKey' : 'password'
  });
  const { createSSH } = useSelector('project');

  const submit = useCallback(() => {
    const errMsg = verify();
    if (errMsg) {
      message.warning(errMsg);
      return;
    }
    createSSH(form);
  }, [createSSH, form, verify]);

  return (
    <>

      <Modal
        title="SSH 配置"
        visible={visible}
        okText="确定"
        cancelText="取消"
        centered
        onOk={submit}
        onCancel={() => setVisible(false)}
      >
        <Form>
          <Form.Item label="配置名称">
            <Input
              {...createInput('name', { validator: Validators.required, label: '配置名称' })}
              placeholder="配置名称"
            />
          </Form.Item>

          <Form.Item label="host">
            <Input
              {...createInput('host')}
              placeholder="host"
            />
          </Form.Item>
          <Form.Item label="port">
            <Input
              {...createInput('port')}
              placeholder="port"
            />
          </Form.Item>
          <Form.Item label="username">
            <Input
              {...createInput('username')}
              placeholder="username"
            />
          </Form.Item>
          {/* 解决自动填充的问题 */}
          <div style={{ width: 0, height: 0, overflow: 'hidden' }}>
            <input value="hidden" onChange={() => { }} type="text" />
          </div>
          <Form.Item label="连接类型">

            <Radio.Group  {...createRadio('radio')} >
              <Radio value="password">password</Radio>
              <Radio value="privateKey">privateKey</Radio>
            </Radio.Group>

          </Form.Item>
          {
            form.radio === 'password'
              ? (
                <Form.Item label="password">
                  <Input
                    {...createInput('password')}
                    type="password"
                    placeholder="password"
                  />
                </Form.Item>
              )
              : (
                <Form.Item label="privateKey">
                  <Input.TextArea
                    {...createInput('privateKey')}
                    placeholder="privateKey"
                  />
                </Form.Item>
              )
          }

        </Form>
      </Modal>
      <div style={{ display: 'inline-flex' }} onClick={() => setVisible(true)}>{showBtn}</div>
    </>
  );
}