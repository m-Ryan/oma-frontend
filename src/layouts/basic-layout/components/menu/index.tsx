import React, { useEffect, useState, useMemo } from 'react';
import styles from './index.module.scss';
import { Menu as AMenu } from 'antd';
import services from '@/services';
import { IAppMenuItem } from '../../../../services/common';
import { useHistory } from 'react-router-dom';
const SubMenu = AMenu.SubMenu;

export const Menu = () => {
  const [state, setstate] = useState<IAppMenuItem[]>([]);
  const history = useHistory();

  useEffect(() => {
    services.common.getMenu().then((data) => {
      setstate(data);
    });
  }, []);

  const onClickMenuItem = (item: IAppMenuItem) => {
    history.push(item.url!);
  };

  const renderMenu = () => {
    return state.map((menuItem, index) => {
      const hasChlildren = menuItem.children.length > 0;
      return hasChlildren ? (
        <SubMenu
          key={index}
          title={
            <span>
              {/* <Icon type={menuItem.icon} /> */}
              <span>{menuItem.name}</span>
            </span>
          }
        >
          {menuItem.children.map((item: any, cIndex) => (
            <AMenu.Item onClick={() => onClickMenuItem(item)} key={index + '-' + cIndex}>{item.name}</AMenu.Item>
          ))}
        </SubMenu>
      ) : (
        <AMenu.Item key={index} onClick={() => onClickMenuItem(menuItem)}>
          {/* <Icon type={menuItem.icon} /> */}
          <span>{menuItem.name}</span>
        </AMenu.Item>
      );
    });
  };

  return (
    <div className={styles.container}>
      <AMenu defaultOpenKeys={['0']} mode="inline" theme="light">
        {renderMenu()}
      </AMenu>
    </div>
  );
};