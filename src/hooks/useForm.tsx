import React, { useCallback } from 'react';
import { useImmerState } from '@/modal';
import { CheckCircleFilled } from '@ant-design/icons';
export function useForm<T extends { [key: string]: string; } = any>(initState: T) {
  const [form, setForm] = useImmerState<T>(initState);

  const createInput = useCallback((name: keyof T) => {
    return {
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setForm((newForm) => {
          newForm[name] = event.target.value as any;
          return newForm;
        });
      },
      value: form[name]
    };
  }, [form, setForm]);

  return {
    form,
    createInput
  };
}