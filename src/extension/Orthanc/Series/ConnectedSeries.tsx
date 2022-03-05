/*
 * @Author: linkenzone
 * @Date: 2021-06-03 20:20:34
 * @Descripttion: Do not edit
 */
import {
  Button,
  Card,
  List,
  Layout,
  Tooltip,
  Popconfirm,
  Popover,
  Image,
} from 'antd';
import { DownloadOutlined, DeleteFilled } from '@ant-design/icons';
import React, { useEffect } from 'react';
import type { Dispatch } from 'dva';
import { connect } from 'dva';
import type { StateType } from '@/models/orthanc/series';
import style from './index.less';
import { history } from 'umi';

const { Sider, Content } = Layout;

type StudyProps = {
  uuid: string | null;
  dispatch: Dispatch;

  curPatientInfo: any;
  curStudyInfo: any;
  curSeries: any;
  curInstanceList: any[];

  fetchSeriesLoading: boolean;
};

const Study: React.FC<StudyProps> = (props) => {
  const {
    dispatch,
    curPatientInfo,
    curStudyInfo,
    uuid,
    curSeries,
    curInstanceList,
    fetchSeriesLoading,
  } = props;

  function confirm() {
    dispatch({
      type: 'Orthanc_series/deleteSeries',
      payload: { uuid },
    });
  }

  function cancel(e: any) {
    console.log(e);
  }

  useEffect(() => {
    if (uuid === null) return;
    dispatch({
      type: 'Orthanc_series/fetchSeries',
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
              hoverable
              onClick={() => {
                history.push(`/Patient?uuid=${curPatientInfo.ID}`);
              }}
            >
              <p
                className={style.custom_p}
                style={{ fontSize: '16px', fontWeight: 'bold' }}
              >
                {curPatientInfo?.MainDicomTags.PatientName}
              </p>
              <p className={style.custom_p}>
                PatientBirthDate:{' '}
                {curPatientInfo?.MainDicomTags.PatientBirthDate}
              </p>
              <p className={style.custom_p}>
                PatientID: {curPatientInfo?.MainDicomTags.PatientID}
              </p>
              <p className={style.custom_p}>
                PatientSex: {curPatientInfo?.MainDicomTags.PatientSex}
              </p>
            </Card>

            <Card
              title="Study"
              bodyStyle={{ padding: '12px' }}
              headStyle={{ backgroundColor: '#39bbdb' }}
              size="small"
              hoverable
              onClick={() => {
                history.push(`/Study?uuid=${curStudyInfo.ID}`);
              }}
            >
              <p
                className={style.custom_p}
                style={{ fontSize: '16px', fontWeight: 'bold' }}
              >
                {curStudyInfo?.MainDicomTags.StudyDescription}
              </p>
              <p className={style.custom_p}>
                AccessionNumber: {curStudyInfo?.MainDicomTags.AccessionNumber}
              </p>
              <p className={style.custom_p}>
                ReferringPhysicianName:{' '}
                {curStudyInfo?.MainDicomTags.ReferringPhysicianName}
              </p>
              <p className={style.custom_p}>
                StudyDate: {curStudyInfo?.MainDicomTags.StudyDate}
              </p>
              <p className={style.custom_p}>
                StudyID: {curStudyInfo?.MainDicomTags.StudyID}
              </p>
              <p className={style.custom_p}>
                StudyInstanceUID: {curStudyInfo?.MainDicomTags.StudyInstanceUID}
              </p>
            </Card>

            <Card
              title="Series"
              bodyStyle={{ padding: '12px' }}
              headStyle={{ backgroundColor: '#39bbdb' }}
              size="small"
            >
              <p
                className={style.custom_p}
                style={{ fontSize: '16px', fontWeight: 'bold' }}
              >
                {curSeries?.MainDicomTags.SeriesDescription}
              </p>
              <p className={style.custom_p}>Status: {curSeries?.Status}</p>
              <p className={style.custom_p}>
                Modality: {curSeries?.MainDicomTags.Modality}
              </p>
              <p className={style.custom_p}>
                NumberOfSlices: {curSeries?.MainDicomTags.NumberOfSlices}
              </p>
              <p className={style.custom_p}>
                OperatorsName: {curSeries?.MainDicomTags.OperatorsName}
              </p>
              <p className={style.custom_p}>
                SeriesInstanceUID: {curSeries?.MainDicomTags.SeriesInstanceUID}
              </p>
              <p className={style.custom_p}>
                SeriesNumber: {curSeries?.MainDicomTags.SeriesNumber}
              </p>
              <p className={style.custom_p}>
                SeriesType: {curSeries?.MainDicomTags.SeriesType}
              </p>
            </Card>

            <Card
              title="操作"
              headStyle={{ backgroundColor: '#39bbdb' }}
              size="small"
            >
              <p>
                <Button
                  onClick={() => {
                    console.log('uuid', uuid);
                    history.push(`/viewer?uuid=${uuid}`);
                  }}
                  type="primary"
                  block
                >
                  阅片
                </Button>
                <Button
                  style={{ marginTop: 8 }}
                  onClick={() => {
                    console.log('uuid', uuid);
                    history.push(`/previewImage?uuid=${uuid}`);
                  }}
                  type="primary"
                  block
                >
                  检测
                </Button>
                <Button
                  style={{ marginTop: 8 }}
                  onClick={() => {
                    console.log('uuid', uuid);
                    window.location.href = `/api/series/${uuid}/archive`;
                  }}
                  type="primary"
                  icon={<DownloadOutlined />}
                  block
                >
                  下载压缩包
                </Button>

                <Popconfirm
                  // title="Are you sure to delete this task?"
                  title="由于操作不可逆，您确定要删除该 Series 吗？"
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
                    删除该 Series
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
              dataSource={curInstanceList}
              loading={fetchSeriesLoading}
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 10,
              }}
              // renderItem={(item, index) => (
              renderItem={(item) => (
                <List.Item
                  className={style.custom_list_item}
                  onClick={() => {
                    console.log('item', item);
                    // window.location.href = `/Instance?uuid=${item.ID}`;
                    // history.push(`/viewer?uuid=${uuid}`);
                  }}
                >
                  <List.Item.Meta
                    // title={`Instance: ${index}`}
                    title={`Instance: ${item.MainDicomTags.InstanceNumber}`}
                    description={
                      <div>
                        <div>{`ImageIndex : ${item.IndexInSeries}`}</div>
                        <div>{`ImageOrientationPatient : ${item.MainDicomTags.ImageOrientationPatient}`}</div>
                        <div>{`ImagePositionPatient : ${item.MainDicomTags.ImagePositionPatient}`}</div>
                        <div>{`SOPInstanceUID : ${item.MainDicomTags.SOPInstanceUID}`}</div>
                      </div>
                    }
                  />
                  <Popover
                    placement="left"
                    content={
                      <Image src={`/api/instances/${item.ID}/preview`} />
                    }
                    title={`Instance: ${item.ID}`}
                  >
                    {/* <Button type="primary" onClick={() => history.push(`/viewer?uuid=${uuid}`)}> */}
                    <Button type="primary" onClick={() => {}}>
                      Img
                    </Button>
                  </Popover>
                  <Tooltip placement="topLeft" title="标签">
                    <Button
                      onClick={() => {
                        console.log(item.ID);
                        window.location.href = `/Instance?uuid=${item.ID}`;
                      }}
                    >
                      Tag
                    </Button>
                  </Tooltip>
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
  Orthanc_series,
  loading,
}: {
  Orthanc_series: StateType;
  loading: { effects: Record<string, boolean> };
}) => {
  return {
    fetchSeriesLoading: loading.effects['Orthanc_Series/fetchSeries'],
    curPatientInfo: Orthanc_series.curPatientInfo,
    curStudyInfo: Orthanc_series.curStudyInfo,
    curSeries: Orthanc_series.curSeries,
    curInstanceList: Orthanc_series.curInstanceList,
  };
};

const ConnectedStudy = connect(mapStateToProps)(Study);

export default ConnectedStudy;
