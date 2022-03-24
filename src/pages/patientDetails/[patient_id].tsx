import React, { useState, useEffect } from 'react';
import { Button, Tooltip, Card, Tag, Space, Pagination, Image } from 'antd';
import ProList from '@ant-design/pro-list';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { ProFormRadio, ProFormField } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
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
  // console.log('PatientBasicMsg', PatientBasicMsg);
  if (PatientBasicMsg === undefined) return <div></div>;
  return (
    <div>
      姓名：{PatientBasicMsg.name}
      <br />
      性别：{PatientBasicMsg.gender}
      <br />
      年龄：{PatientBasicMsg.age}
      <br />
      手机号：{PatientBasicMsg.phone}
      <br />
      地址：{PatientBasicMsg.address}
      <br />
      是否已婚：{PatientBasicMsg.married === '1' ? '是' : '否'}
      <br />
      是否患过肾脏疾病：
      {PatientBasicMsg.kidney_ill_before === '1' ? '是' : '否'}
      <br />
      哈哈
    </div>
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
    CTImages: <CTMsgList PatientCTMsg={PatientCTMsg}></CTMsgList>,
  };

  const onTabChange = (key: string) => {
    setActiveTab(key);
  };

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
    console.log(props);
  }, []);

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
