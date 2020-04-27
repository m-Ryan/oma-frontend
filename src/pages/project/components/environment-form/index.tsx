import React, { useEffect, useState, useCallback } from 'react';
import { Form, Input, Select } from 'antd';
import { useSelector } from '@/modal';
import { IEnvsItem } from '@/services/project';
const Option = Select.Option;

export function EnvironmentForm({ formData, onChange }: { formData: IEnvsItem; onChange: (data: IEnvsItem) => void; }) {
  const { list } = useSelector('ssh');

  const onChangeValue = useCallback(<T extends keyof IEnvsItem>(name: T, value: IEnvsItem[T]) => {
    onChange({
      ...formData,
      [name]: value
    });
  }, [formData, onChange]);

  useEffect(() => {
    const sshId = list[0].ssh_id;
    if (!formData.ssh_id && sshId) {
      onChangeValue('ssh_id', sshId);
    }
  }, [formData.ssh_id, list, onChangeValue]);

  return (
    <>
      <Form.Item label="环境名称">
        <Input
          value={formData.name}
          onChange={(e) => onChangeValue('name', e.target.value)}
          placeholder="环境名称"
        />
      </Form.Item>
      <Form.Item label="部署分支">
        <Input
          value={formData.branch}
          onChange={(e) => onChangeValue('branch', e.target.value)}
          placeholder="部署分支"
        />
      </Form.Item>
      <Form.Item label="环境变量">
        <Input.TextArea
          value={formData.variables}
          onChange={(e) => onChangeValue('variables', e.target.value)}
          placeholder="环境变量"
        />
      </Form.Item>
      <Form.Item label="服务器SSH">
        <Select value={formData.ssh_id} onChange={(value) => onChangeValue('ssh_id', value)} style={{ width: 120 }}>
          {
            list.map(item => <Option key={item.ssh_id} value={item.ssh_id}>{item.name}</Option>)
          }
        </Select>
      </Form.Item>
    </>
  );
}