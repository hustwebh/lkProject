import React, { useState, useEffect, useRef } from 'react';
import { Button, Tooltip, Card } from 'antd';
import {
  DownOutlined,
  QuestionCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import style from './index.less';
import { connect } from 'dva';

export type TableListItem = {
  key: number;
  id_card: string;
  name: string;
  gender: string;
  hospital_name: any;
  createdAt: number;
  phone: string;
  email: string;
  medical_user_id: number;
  role_id: string;
};

interface ParmeType {
  current?: number;
  pageSize?: number;
}

const tableListDataSource: TableListItem[] = [];

const StaffManage = (props: any) => {
  const { dispatch, UserMsg } = props;

  const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];
  const typeofUser = ['医生', '管理员', '护士'];
  const HospitalList = [
    '湖北省第三人民医院',
    '武汉市第一人民医院',
    '武汉市妇幼保健院',
  ];

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '身份证号',
      width: 230,
      dataIndex: 'id_card',
    },
    {
      title: '姓名',
      width: 100,
      dataIndex: 'name',
    },
    {
      title: '性别',
      width: 80,
      dataIndex: 'gender',
    },
    {
      title: '工作单位',
      width: 170,
      dataIndex: 'hospital_name',
      initialValue: 'all',
    },
    {
      title: '用户类别',
      width: 100,
      dataIndex: 'role_id',
    },
    {
      title: '邮箱地址',
      width: 200,
      dataIndex: 'email',
      copyable: true,
    },
    {
      title: '联系电话',
      width: 120,
      dataIndex: 'phone',
    },
    {
      title: '创建时间',
      width: 160,
      // key: 'since',
      dataIndex: 'createdAt',
      valueType: 'date',
      sorter: (a, b) => a.createdAt - b.createdAt,
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render: (_, record) => {
        if (record.role_id === '管理员') {
          return [<Button key="edit">编辑</Button>];
        } else {
          return [
            <Button key="edit">编辑</Button>,
            <Button key="delete">删除</Button>,
          ];
        }
      },
    },
  ];

  const setRowKey = (record: TableListItem) => {
    return record.medical_user_id;
  };

  const queryTableData = (params: ParmeType) => {
    console.log('start');
    return dispatch({
      type: 'UserTable/getUserList',
      payload: params,
    }).then((res: boolean) => {
      if (res) {
        return UserMsg;
      } else {
        return { success: false };
      }
    });
  };

  return (
    <div className={style.mainContent}>
      <ProTable<TableListItem>
        scroll={{ y: 752, x: 'max-content' }}
        columns={columns}
        // request={(params) => queryTableData(params)}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          return queryTableData(params);
        }}
        rowKey={setRowKey}
        pagination={{
          showQuickJumper: true,
        }}
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
        ]}
        search={false}
        dateFormatter="string"
        headerTitle="注册用户列表"
      />
    </div>
  );
};

function mapStateToProps(state: any) {
  console.log('UserMsg', state.UserMsg);

  return {
    // loading: state.loading,
    UserMsg: state.UserMsg,
  };
}

connect(mapStateToProps)(StaffManage);

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
