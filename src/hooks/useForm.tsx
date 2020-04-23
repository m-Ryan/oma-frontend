import React, { useCallback, useRef } from 'react';
import { useImmerState } from '@/modal';
import { RadioChangeEvent } from 'antd/lib/radio';
import { isNumber } from 'util';

export function useForm<T extends { [key: string]: any; } = any>(initState: T) {
  const [form, setForm] = useImmerState<T>(initState);
  const validatorsRef = useRef<any>({});

  const verify = useCallback(() => {
    const validators = validatorsRef.current;
    const errItem = Object.keys(validators).map(key => validators[key](form[key])).find(item => !!item);
    return errItem;
  }, [form]);

  const createInput = useCallback((name: keyof T, options: { validator?: (data: string) => boolean; errMsg?: string; label?: string; } = {}) => {
    const validator = options.validator;
    if (validator) {
      validatorsRef.current[name] = (data: string) => {
        if (validator(data)) {
          return '';
        }
        return options.errMsg || `${options.label || name}填写有误`;
      };
    }

    return {
      onChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        event.persist();
        setForm((newForm) => {
          newForm[name] = event.target.value as any;
          return newForm;
        });
      },
      value: form[name]
    };
  }, [form, setForm]);

  const createRadio = useCallback((name: keyof T) => {
    return {
      onChange: (event: RadioChangeEvent) => {
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
    createInput,
    createRadio,
    verify
  };
}

export const Validators = {
  required: (data: string) => !!data,
  isNumber: isNumber,
  len: (min: number, max: number = 255) => {
    return (data: string) => {
      return data.length >= min && data.length <= max;
    };
  }
};