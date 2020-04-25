import React, { useEffect, useState, useCallback } from 'react';
import { Tabs, Form, Modal, Input, Radio, message } from 'antd';
import { useSelector } from '@/modal';
import { useForm, Validators } from '@/hooks/useForm';

export function EnvForm({ formData }: { formData: any; }) {
  const { form, createInput, verify } = useForm<any>(
    formData
  );
  return (
    <>
      <Form.Item label="分支名称">
        <Input
          {...createInput('name', { validator: Validators.required, label: '分支名称' })}
          placeholder="分支名称"
        />
      </Form.Item>
      <Form.Item label="环境变量">
        <Input
          {...createInput('name', { validator: Validators.required, label: '环境变量' })}
          placeholder="环境变量"
        />
      </Form.Item>
      <Form.Item label="上传目录">
        <Input
          {...createInput('name', { validator: Validators.required, label: '上传目录' })}
          placeholder="上传目录"
        />
      </Form.Item>
    </>
  );
}