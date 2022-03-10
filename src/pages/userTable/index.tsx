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
  createdAt: string;
  phone: string;
  email: string;
  medical_user_id: number;
  role_id: number;
};

interface ParmeType {
  current?: number;
  pageSize?: number;
}

const tableListDataSource: TableListItem[] = [];

const Index = (props: any) => {
  const { dispatch, UserMsg } = props;

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
      // sorter: (a, b) => a.createdAt - b.createdAt,
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render: (_, record) => {
        if (record.role_id === 3) {
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
    return dispatch({
      type: 'UserTable/getUserList',
      payload: params,
    }).then((res: boolean) => {
      if (res) {
        return UserMsg;
      }
    });
  };

  return (
    <div className={style.mainContent}>
      <ProTable<TableListItem>
        scroll={{ y: 752, x: 'max-content' }}
        columns={columns}
        request={(params) => queryTableData(params)}
        // request={(params, sorter, filter) => {
        //   // 表单搜索项会从 params 传入，传递给后端接口。
        //   console.log(params, sorter, filter);
        //   return queryTableData(params);
        // }}
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
  console.log('UserMsg', state);

  return {
    // loading: state.loading,
    UserMsg: state.UserTable.UserMsg,
  };
}

export default connect(mapStateToProps)(Index);
