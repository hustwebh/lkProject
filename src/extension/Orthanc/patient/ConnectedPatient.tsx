/*
 * @Author: linkenzone
 * @Date: 2021-06-03 20:20:34
 * @Descripttion: Do not edit
 */
import { Card, List, Layout, Button, Popconfirm } from 'antd';
import { DownloadOutlined, DeleteFilled } from '@ant-design/icons';
import React, { useEffect } from 'react';
import type { Dispatch } from 'dva';
import { connect } from 'dva';
import type { StateType } from '@/models/orthanc/patients';
import style from './index.less';
// import { history } from 'umi';

const { Sider, Content } = Layout;

type AllPatientsProps = {
  uuid: string | null;
  dispatch: Dispatch;

  patientInfo: any;
  patientStudies: any[];
  patientLoading: boolean;
};

const Patient: React.FC<AllPatientsProps> = (props) => {
  const { dispatch, patientInfo, patientStudies, uuid, patientLoading } = props;

  function confirm() {
    dispatch({
      type: 'Orthanc_patients/deletePatient',
      payload: { uuid },
    });
  }

  function cancel(e: any) {
    console.log(e);
  }

  useEffect(() => {
    if (uuid === null) return;
    dispatch({
      type: 'Orthanc_patients/fetchPatient',
      payload: { uuid },
    });
    // 销毁的时候
    // return () => {};
  }, [uuid]);

  return (
    <>
      {/* <Button
        onClick={() => {
          history.goBack();
        }}
      >
        返回
      </Button> */}

      <Layout>
        <Sider theme="light" width="20%">
          <div style={{ paddingRight: '12px' }}>
            <Card
              title="Patient"
              bodyStyle={{ padding: '12px' }}
              headStyle={{ backgroundColor: '#39bbdb' }}
              size="small"
            >
              <p
                className={style.custom_p}
                style={{ fontSize: '16px', fontWeight: 'bold' }}
              >
                {patientInfo?.MainDicomTags.PatientName}
              </p>
              <p className={style.custom_p}>
                PatientBirthDate: {patientInfo?.MainDicomTags.PatientBirthDate}
              </p>
              <p className={style.custom_p}>
                PatientID: {patientInfo?.MainDicomTags.PatientID}
              </p>
              <p className={style.custom_p}>
                PatientSex: {patientInfo?.MainDicomTags.PatientSex}
              </p>
            </Card>

            <Card
              title="操作"
              bodyStyle={{ padding: '12px' }}
              headStyle={{ backgroundColor: '#39bbdb' }}
              size="small"
            >
              <p>
                <Button
                  onClick={() => {
                    console.log('uuid', uuid);
                    window.location.href = `/api/patients/${uuid}/archive`;
                  }}
                  type="primary"
                  icon={<DownloadOutlined />}
                  block
                >
                  下载压缩包
                </Button>

                <Popconfirm
                  // title="Are you sure to delete this task?"
                  title="由于操作不可逆，您确定要删除该 Patient 吗？"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button
                    style={{ marginTop: 8 }}
                    type="primary"
                    icon={<DeleteFilled />}
                    block
                  >
                    删除该 Patient
                  </Button>
                </Popconfirm>
              </p>
            </Card>
          </div>
        </Sider>

        <Layout>
          <Content style={{ background: 'white' }}>
            <List
              bordered
              itemLayout="horizontal"
              dataSource={patientStudies}
              loading={patientLoading}
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 10,
              }}
              renderItem={(item) => (
                <List.Item
                  className={style.custom_list_item}
                  onClick={() => {
                    console.log('item', item);
                    window.location.href = `/Study?uuid=${item.ID}`;
                  }}
                >
                  <List.Item.Meta
                    title={item.MainDicomTags.StudyDescription}
                    description={
                      <div>
                        <div>{`AccessionNumber : ${item.MainDicomTags.AccessionNumber}`}</div>
                        <div>{`ReferringPhysicianName : ${item.MainDicomTags.ReferringPhysicianName}`}</div>
                        <div>{`StudyDate : ${item.MainDicomTags.StudyDate}`}</div>
                        <div>{`StudyID : ${item.MainDicomTags.StudyID}`}</div>
                        <div>{`StudyInstanceUID : ${item.MainDicomTags.StudyInstanceUID}`}</div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

const mapStateToProps = ({
  Orthanc_patients,
  loading,
}: {
  Orthanc_patients: StateType;
  loading: { effects: Record<string, boolean> };
}) => {
  return {
    patientLoading: loading.effects['Orthanc_patients/fetchPatient'],
    patientInfo: Orthanc_patients.patientInfo,
    patientStudies: Orthanc_patients.patientStudies,
  };
};

const ConnectedPatient = connect(mapStateToProps)(Patient);

export default ConnectedPatient;
