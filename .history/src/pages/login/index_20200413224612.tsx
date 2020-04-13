import React from 'react';
import styles from './index.module.scss';
import { Form, Input, Button, message } from 'antd';
import { useSelector } from '@/modal';
import { useForm } from '@/hooks/useForm';

export function Login() {

  const { login } = useSelector('user');
  const { form, createInput } = useForm({ nickname: '', password: '' });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>h5快速营销系统</div>
        <div className={styles.form}>
          <Form className={styles.loginForm}>
            <Form.Item label="账号">
              <Input
                {...createInput('nickname')}
                placeholder="请输入管理员账号"
              />
            </Form.Item>
            <Form.Item label="密码">
              <Input
                {...createInput('password')}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Button size="large" type="primary" onClick={() => login({ phone: form.phone, password: form.password, saved: true })} className={styles.loginBtn}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
