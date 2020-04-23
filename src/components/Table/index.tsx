import React, { useMemo, useEffect, useCallback } from 'react';
import { Table as ATable, message } from 'antd';
import { GetRowKey } from 'antd/lib/table/interface';
import { useImmerState } from '@/modal';
import { ResponseList } from '@/services/common.typing';

interface Column<T> {
  title: string;
  dataIndex?: keyof T;
  key?: string;
  render?: (data: any) => React.ReactNode;
};

interface Props<T> {
  columns: Column<T>[];
  rowKey: string | GetRowKey<object>;
  payload?: { [key: string]: any; };
  fetch: (...payload: any) => Promise<ResponseList<T>>;
  onChange?: (payload: TablePayload & { [key: string]: any; }) => void;
}

interface TableState<T extends any = any> {
  total: number;
  list: T[];
}

interface TablePayload {
  page: number;
  size: number;
}

export function Table<T>(props: Props<T>) {
  const [data, setData] = useImmerState<TableState>({ total: 0, list: [] });
  const [payload, setPayload] = useImmerState<TablePayload>({ page: 0, size: 10, ...props.payload });
  const { fetch } = props;

  // // merge 
  useEffect(() => {

    setPayload(newPayload => {
      if (!newPayload.page) newPayload.page = 1;
      Object.assign(newPayload, props.payload);
      return newPayload;
    });
  }, [props.payload, setPayload]);

  // fetch after merge
  useEffect(() => {
    if (!payload.page) return;

    fetch(payload)
      .then((res) => {
        setData(newState => {
          newState.list = res.list;
          newState.total = res.count;
          return newState;

        });
      })
      .catch(err => {
        message.error(err.message);
      });

  }, [fetch, payload, setData]);


  const fullColumn = useMemo(() => {
    return props.columns.map(item => ({
      key: item.key || item.title,
      ...item
    }));
  }, [props.columns]) as any;

  return useMemo(() => {
    return (
      <ATable
        columns={fullColumn}
        dataSource={data.list}
        rowKey={props.rowKey}
        pagination={{ current: payload.page, pageSize: payload.size, total: data.total }}
      />
    );
  }, [data.list, data.total, fullColumn, payload.page, payload.size, props.rowKey]);
}