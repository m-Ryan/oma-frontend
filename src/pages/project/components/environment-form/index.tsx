import React, { useEffect, useState, useCallback } from 'react';
import { Tabs, Form, Modal, Input, Radio, Select } from 'antd';
import { useSelector } from '@/modal';
import { useForm, Validators } from '@/hooks/useForm';
import { IEnvsItem } from '@/services/project';
const Option = Select.Option;

export function EnvironmentForm({ formData }: { formData: IEnvsItem; }) {
  const { list } = useSelector('ssh');
  const { form, createInput, verify } = useForm<IEnvsItem>(
    formData
  );
  return (
    <>
      <Form.Item label="环境名称">
        <Input
          {...createInput('name', { validator: Validators.required, label: '环境名称' })}
          placeholder="环境名称"
        />
      </Form.Item>
      <Form.Item label="部署分支">
        <Input
          {...createInput('branch', { validator: Validators.required, label: '部署分支' })}
          placeholder="部署分支"
        />
      </Form.Item>
      <Form.Item label="环境变量">
        <Input.TextArea
          {...createInput('variables', { validator: Validators.required, label: '环境变量' })}
          placeholder="环境变量"
        />
      </Form.Item>
      <Form.Item label="服务器SSH">
        <Select defaultValue={list[0].ssh_id} style={{ width: 120 }}>
          {
            list.map(item => <Option key={item.ssh_id} value={item.ssh_id}>{item.name}</Option>)
          }
        </Select>
      </Form.Item>
    </>
  );
}