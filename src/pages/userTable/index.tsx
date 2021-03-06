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
  id_card: string;
  name: string;
  gender: string;
  hospital_name: any;
  create_time: string;
  phone: string;
  email: string;
  medical_user_id: number;
  role_id: number;
};

interface ActionType {
  reload: (resetPageIndex?: boolean) => void;
  reloadAndRest: () => void;
  reset: () => void;
  clearSelected?: () => void;
  startEditable: (rowKey: number) => boolean;
  cancelEditable: (rowKey: number) => boolean;
}

interface ParmeType {
  current?: number;
  pageSize?: number;
}

const tableListDataSource: TableListItem[] = [];

const Index = (props: any) => {
  const roleArray = ['', '医生', '护士', '管理员'];
  const ref = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (ref) {
        ref.current.reload();
      }
    }, 100);
  }, [1]);

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
    },
    {
      title: '用户类别',
      width: 100,
      // dataIndex: roleArray['role_id'],
      render: (_, record) => <span>{roleArray[record.role_id]}</span>,
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
      dataIndex: 'create_time',
      // valueType: 'date',
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
    console.log('发送请求列表');

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
        actionRef={ref}
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
  console.log('UserMsg', state.UserTable.UserMsg);

  return {
    loading: state.loading,
    UserMsg: state.UserTable.UserMsg,
  };
}

export default connect(mapStateToProps)(Index);
