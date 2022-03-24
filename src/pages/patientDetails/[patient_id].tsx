import React, { useState, useEffect } from 'react';
import { Button, Tooltip, Card, Tag, Space } from 'antd';
import ProList from '@ant-design/pro-list';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { ProFormRadio, ProFormField } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { connect } from 'dva';

const TreatmentMsgList = (props: any) => {
  const { PatientTreatment } = props;

  type DataItem = typeof PatientTreatment[number];
  const [dataSource, setDataSource] = useState<DataItem[]>(PatientTreatment);
  return (
    <ProList<DataItem>
      rowKey="id"
      headerTitle="诊疗记录"
      split
      dataSource={dataSource}
      editable={{
        onSave: async (key, record, originRow) => {
          console.log('onSave', key, record, originRow);
          return true;
        },
      }}
      onDataSourceChange={setDataSource}
      metas={{
        title: {
          dataIndex: 'treat_time',
          editable: false,
        },
        description: {
          dataIndex: 'record',
        },
        // subTitle: {
        //   render: () => {
        //     return (
        //       <Space size={0}>
        //         <Tag color="blue">Ant Design</Tag>
        //         <Tag color="#5BD8A6">TechUI</Tag>
        //       </Space>
        //     );
        //   },
        // },
        actions: {
          render: (text, row, index, action) => [
            <a
              onClick={() => {
                action?.startEditable(row.id);
              }}
              key="edit"
            >
              编辑
            </a>,
            <a onClick={(e: any) => {}} key="delete">
              删除
            </a>,
          ],
        },
      }}
    />
  );
};

const BasicMsgList = (props: any) => {
  const { PatientBasicMsg } = props;
  return <>{PatientBasicMsg}</>;
};

const patientDetails = (props: any) => {
  const { dispatch, location, PatientTreatment, PatientBasicMsg } = props;
  const { query } = location;

  const [activeTab, setActiveTab] = useState('BasicMessage');

  const tabList = [
    {
      key: 'BasicMessage',
      tab: '基本信息',
    },
    {
      key: 'TreatmantMessage',
      tab: '诊疗信息',
    },
    {
      key: 'CTImages',
      tab: 'CT影像',
    },
  ];

  const contentList: any = {
    BasicMessage: <BasicMsgList PatientBasicMsg={PatientBasicMsg} />,
    TreatmantMessage: <TreatmentMsgList PatientTreatment={PatientTreatment} />,
    CTImages: <p>CTImages</p>,
  };

  const onTabChange = (key: string) => {
    setActiveTab(key);
  };

  useEffect(() => {
    dispatch({
      type: 'PatientMsg/TreatmentMsg',
      payload: query,
    });
  }, [1]);

  return (
    <Card
      style={{ width: '100%', padding: 0 }}
      bordered={false}
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
function mapStateToProps({ PatientMsg }: { PatientMsg: any }) {
  const { PatientTreatment, PatientBasicMsg } = PatientMsg;
  return {
    PatientTreatment,
    PatientBasicMsg,
  };
}

export default connect(mapStateToProps)(patientDetails);
