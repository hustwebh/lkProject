import React, { useState, useEffect, useRef } from 'react';
import { Button, Tooltip, Card } from 'antd';
import StaffManage from '@/pages/userTable/index';

const PageCard = () => {
  const [activeTab, setActiveTab] = useState('UserManagement');

  const tabList = [
    {
      key: 'UserManagement',
      tab: '用户管理',
    },
    {
      key: 'RolePermissions',
      tab: '角色权限分配',
    },
    {
      key: 'DoctorSettings',
      tab: '主治医生分配',
    },
    {
      key: 'PersonMsgSetting',
      tab: '个人信息管理',
    },
  ];

  const contentList: any = {
    UserManagement: <StaffManage />,
    RolePermissions: <p>角色权限分配</p>,
    DoctorSettings: <p>主治医生分配</p>,
    PersonMsgSetting: <p>个人信息管理</p>,
  };

  const onTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <Card
      style={{ width: '100%', padding: 0 }}
      bordered={false}
      title="管理员用户中心"
      tabList={tabList}
      activeTabKey={activeTab}
      onTabChange={(key) => {
        onTabChange(key);
      }}
    >
      {contentList[activeTab]}
    </Card>
  );
};

export default PageCard;
