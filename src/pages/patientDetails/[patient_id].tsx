import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Tooltip,
  Card,
  Tag,
  Space,
  Pagination,
  Image,
  Input,
} from 'antd';
import ProList from '@ant-design/pro-list';
import ProDescriptions from '@ant-design/pro-descriptions';
import { connect } from 'dva';
import { history } from 'umi';

const PAGE_SIZE = 8;
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
        subTitle: {
          editable: false,
          render: (_, record) => {
            return (
              <div>
                {record.operation ? (
                  <Tag color="blue">已手术</Tag>
                ) : (
                  <Tag color="red">未进行手术</Tag>
                )}
              </div>
              // <Space size={0}>
              //   <Tag color="blue">Ant Design</Tag>
              //   <Tag color="#5BD8A6">TechUI</Tag>
              // </Space>
            );
          },
        },
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

const CTMsgList = (props: any) => {
  const { PatientCTMsg } = props;
  const [currPage, setCurrPage] = useState(1);

  console.log('PatientCTMsg', PatientCTMsg);
  return (
    <div
      style={{
        padding: '10px',
        margin: '20px 0 0 5px' /* marginLeft: '130px'  */,
      }}
    >
      <Card
        style={{ margin: '0 auto' }}
        title="CT图像"
        bodyStyle={{ padding: '12px' }}
        headStyle={{ backgroundColor: '#39bbdb' }}
        size="small"
      >
        <div style={{ flexWrap: 'wrap' }}>
          {PatientCTMsg
            ? PatientCTMsg.slice(
                PAGE_SIZE * (currPage - 1),
                PAGE_SIZE * currPage,
              ).map((item: any, index: any) => {
                return (
                  <div
                    style={{
                      display: 'inline-block',
                      margin: '10px',
                    }}
                    key={index}
                  >
                    <Image
                      preview={false}
                      style={{
                        flex: 'none',
                        display: 'inline-block',
                      }}
                      width={240}
                      // src={`${DICOM_URL}/instances/${item.ID}/preview`}
                      src={item}
                      onClick={() => {
                        history.push(`/detect?uuid=${item.ID}`);
                      }}
                    />
                  </div>
                );
              })
            : null}
        </div>
        <Pagination
          current={currPage}
          onChange={(e) => setCurrPage(e)}
          total={PatientCTMsg.length}
          pageSize={PAGE_SIZE}
          style={{ textAlign: 'center' }}
        />
      </Card>
    </div>
  );
};

const BasicMsgList = (props: any) => {
  const { PatientBasicMsg } = props;
  console.log('PatientBasicMsg', PatientBasicMsg);
  const actionRef = useRef();
  return (
    <ProDescriptions
      actionRef={actionRef}
      title="病人基本信息"
      column={2}
      dataSource={PatientBasicMsg}
      editable={{}}
      columns={[
        {
          title: '姓名',
          key: 'name',
          dataIndex: 'name',
          span: 2,
        },
        {
          title: '地址',
          key: 'address',
          dataIndex: 'address',
          copyable: true,
          span: 2,
          editable: false,
        },
        {
          title: '联系电话',
          key: 'phone',
          dataIndex: 'phone',
          span: 2,
          copyable: true,
        },
        {
          title: '身份证帐号',
          key: 'id_card',
          dataIndex: 'id_card',
          editable: false,
          copyable: true,
        },
        {
          title: '性别',
          key: 'gender',
          dataIndex: 'gender',
          editable: false,
        },
        {
          title: '手术史情况',
          key: 'kidney_ill_before',
          dataIndex: 'kidney_ill_before',
          valueEnum: {
            '0': {
              text: '无手术记录',
              status: 'Success',
            },
            '1': {
              text: '有手术记录',
              status: 'warning',
            },
          },
        },
        {
          title: '婚姻状况',
          key: 'married',
          dataIndex: 'married',
        },
        {
          title: '年龄',
          key: 'age',
          dataIndex: 'age',
          valueType: 'string',
        },
        {
          title: '信息注册时间',
          key: 'create_time',
          dataIndex: 'create_time',
          valueType: 'date',
        },
      ]}
    ></ProDescriptions>
  );
};

const patientDetails = (props: any) => {
  const {
    dispatch,
    location,
    PatientTreatment,
    PatientBasicMsg,
    PatientCTMsg,
  } = props;
  const { query } = location;

  const [activeTab, setActiveTab] = useState('BasicMessage');
  const [patientBasicMsg, setPatientBasicMsg] = useState(PatientBasicMsg);
  const [patientTreatment, setPatientTreatment] = useState(PatientTreatment);
  const [patientCTMsg, setPatientCTMsg] = useState(PatientCTMsg);

  useEffect(() => {
    dispatch({
      type: 'PatientMsg/BasicMsg',
      payload: query,
    });
    dispatch({
      type: 'PatientMsg/TreatmentMsg',
      payload: query,
    });
    dispatch({
      type: 'PatientMsg/CTMsg',
      payload: query,
    });
    return () => {
      setPatientBasicMsg({});
      setPatientTreatment({});
      setPatientCTMsg({});
    };
  }, [1]);

  useEffect(() => {
    setPatientBasicMsg(PatientBasicMsg);
    setPatientTreatment(PatientTreatment);
    setPatientCTMsg(PatientCTMsg);
  }, [PatientBasicMsg, PatientCTMsg, PatientCTMsg]);

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
    BasicMessage: <BasicMsgList PatientBasicMsg={patientBasicMsg} />,
    TreatmantMessage: <TreatmentMsgList PatientTreatment={PatientTreatment} />,
    CTImages: <CTMsgList PatientCTMsg={PatientCTMsg}></CTMsgList>,
  };

  const onTabChange = (key: string) => {
    setActiveTab(key);
  };

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
  const { PatientTreatment, PatientBasicMsg, PatientCTMsg } = PatientMsg;
  return {
    PatientTreatment,
    PatientBasicMsg,
    PatientCTMsg,
  };
}

export default connect(mapStateToProps)(patientDetails);
