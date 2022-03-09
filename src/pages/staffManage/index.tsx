import React from 'react';
import { Button, Tooltip } from 'antd';
import { DownOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import style from './index.less';

const HospitalList = [
  '湖北省第三人民医院',
  '武汉市第一人民医院',
  '武汉市妇幼保健院',
];

export type TableListItem = {
  key: number;
  id_card: string;
  name: string;
  gender: string;
  hospital_id: any;
  createdAt: number;
  phone: string;
  email: string;
  medical_user_id: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 20; i += 1) {
  tableListDataSource.push({
    key: i,
    id_card: '433130200212200139',
    name: creators[Math.floor(Math.random() * creators.length)],
    gender: '男',
    hospital_id: HospitalList[1],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    medical_user_id: '管理员',
    phone: '111111111',
    email: `${i}@qq.com`,
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '身份证号',
    width: 220,
    dataIndex: 'id_card',
    // render: (_) => <a>{_}</a>,
  },
  {
    title: '姓名',
    width: 120,
    dataIndex: 'name',
    // valueEnum: {
    //   all: { text: '全部' },
    //   付小小: { text: '付小小' },
    //   曲丽丽: { text: '曲丽丽' },
    //   林东东: { text: '林东东' },
    //   陈帅帅: { text: '陈帅帅' },
    //   兼某某: { text: '兼某某' },
    // },
  },
  {
    title: '性别',
    width: 100,
    dataIndex: 'gender',
  },
  {
    title: '工作单位',
    width: 150,
    dataIndex: 'hospital_id',
    initialValue: 'all',
    // valueEnum: {
    //   all: { text: '全部', status: 'Default' },
    //   close: { text: '关闭', status: 'Default' },
    //   running: { text: '运行中', status: 'Processing' },
    //   online: { text: '已上线', status: 'Success' },
    //   error: { text: '异常', status: 'Error' },
    // },
  },
  {
    title: '创建时间',
    width: 240,
    // key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    sorter: (a, b) => a.createdAt - b.createdAt,
  },
  {
    title: '邮箱地址',
    dataIndex: 'email',
    copyable: true,
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
  },
  {
    title: 'yonghuleibie',
    width: 120,
    dataIndex: 'medical_user_id',
  },
  {
    title: '操作',
    width: 180,
    key: 'option',
    valueType: 'option',
    render: () => [
      <Button key="link">编辑</Button>,
      <Button key="link">删除</Button>,
    ],
  },
];

export default function StaffManage() {
  return (
    <div className={style.mainContent}>
      <ProTable<TableListItem>
        columns={columns}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
        }}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        search={false}
        dateFormatter="string"
        headerTitle="注册用户列表"
        toolBarRender={() => [
          <Button key="show">查看日志</Button>,
          <Button key="out">
            导出数据
            <DownOutlined />
          </Button>,
          <Button type="primary" key="primary">
            创建应用
          </Button>,
        ]}
      />
    </div>
  );
}
