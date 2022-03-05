import {
  Button,
  Card,
  List,
  Layout,
  Popconfirm,
  Image,
  BackTop,
  Typography,
} from 'antd';
import {
  DownloadOutlined,
  DeleteFilled,
  ToTopOutlined,
} from '@ant-design/icons';
import React, { useEffect } from 'react';
import type { Dispatch } from 'dva';
import { connect } from 'dva';
import type { StateType } from '@/models/orthanc/instance';
// import ConnectedTag from './components/ConnectedTag';
import style from './index.less';
import { history } from 'umi';

const { Sider, Content } = Layout;
const { Title } = Typography;

type InstanceProps = {
  uuid: string | null;
  dispatch: Dispatch;
  curPatientInfo: any;
  curStudyInfo: any;
  curSeriesInfo: any;
  curInstances: any;
  curHeaderKey: any;
  curHeaderValue: any;
  curDicom: any[];
  curDicomtags: any[];
  curDicomtagKey: any[];
  curDicomtagValue: any[];
  mainDicomKey: any[];
  mainDicomValue: any[];
  parentSeriesId: any;
  fetchSeriesLoading: boolean;
};

const Instance: React.FC<InstanceProps> = (props) => {
  const {
    dispatch,
    curPatientInfo,
    curStudyInfo,
    uuid,
    curSeriesInfo,
    curInstances,
    curHeaderKey,
    curHeaderValue,
    curDicomtagKey,
    // curDicomtagValue,
    mainDicomKey,
    mainDicomValue,
    fetchSeriesLoading,
  } = props;

  function confirm() {
    dispatch({
      type: 'Orthanc_instances/deleteInstances',
      payload: { uuid },
    });
  }

  function cancel() {}

  useEffect(() => {
    if (uuid === null) return;
    dispatch({
      type: 'Orthanc_instances/fetchInstances',
      payload: { uuid },
      // 销毁的时候
      // return () => {};
    });
  }, [uuid]);

  // let _page = 1;
  // const _pageSize = 100;
  const seriesID = curSeriesInfo ? curSeriesInfo.ID : '';

  return (
    <>
      {/* <></> === <React.fragment></React.fragment> */}
      {/* <Button
        onClick={() => {
          history.goBack();
        }}
      >
        返回
      </Button> */}
      <BackTop>
        <div
          style={{
            width: 40,
            height: 40,
            lineHeight: '40px',
            textAlign: 'center',
            borderRadius: '50%',
            backgroundColor: '#39bbdb',
          }}
        >
          <ToTopOutlined style={{ fontSize: 20, color: 'white' }} />
        </div>
      </BackTop>
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
              hoverable
              onClick={() => {
                history.push(`/Series?uuid=${curSeriesInfo.ID}`);
              }}
            >
              <p
                className={style.custom_p}
                style={{ fontSize: '16px', fontWeight: 'bold' }}
              >
                {curSeriesInfo?.MainDicomTags.SeriesDescription}
              </p>
              <p className={style.custom_p}>Status: {curSeriesInfo?.Status}</p>
              <p className={style.custom_p}>
                Modality: {curSeriesInfo?.MainDicomTags.Modality}
              </p>
              <p className={style.custom_p}>
                NumberOfSlices: {curSeriesInfo?.MainDicomTags.NumberOfSlices}
              </p>
              <p className={style.custom_p}>
                OperatorsName: {curSeriesInfo?.MainDicomTags.OperatorsName}
              </p>
              <p className={style.custom_p}>
                SeriesInstanceUID:{' '}
                {curSeriesInfo?.MainDicomTags.SeriesInstanceUID}
              </p>
              <p className={style.custom_p}>
                SeriesNumber: {curSeriesInfo?.MainDicomTags.SeriesNumber}
              </p>
              <p className={style.custom_p}>
                SeriesType: {curSeriesInfo?.MainDicomTags.SeriesType}
              </p>
            </Card>

            <Card
              title="Instance"
              bodyStyle={{ padding: '12px' }}
              headStyle={{ backgroundColor: '#39bbdb' }}
              size="small"
            >
              <Image src={`/api/instances/${uuid}/preview`} />
              <p className={style.custom_p} style={{ marginTop: 8 }}>
                Instance: {curInstances?.IndexInSeries}
              </p>
              <p className={style.custom_p}>
                ImageOrientationPatient:{' '}
                {curInstances?.MainDicomTags.ImageOrientationPatient}
              </p>
              <p className={style.custom_p}>
                ImagePositionPatient:{' '}
                {curInstances?.MainDicomTags.ImagePositionPatient}
              </p>
              <p className={style.custom_p}>
                SOPInstanceUID: {curInstances?.MainDicomTags.SOPInstanceUID}
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
                    history.push(`/viewer?uuid=${seriesID}`);
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
                    window.location.href = `/api/instances/${uuid}/file`;
                  }}
                  type="primary"
                  icon={<DownloadOutlined />}
                  block
                >
                  下载DICOM文件
                </Button>
                <Button
                  style={{ marginTop: 8 }}
                  onClick={() => {
                    console.log('uuid', uuid);
                    window.open(`/api/instances/${uuid}/tags`);
                  }}
                  type="primary"
                  icon={<DownloadOutlined />}
                  block
                >
                  下载JSON文件
                </Button>

                <Popconfirm
                  // title="Are you sure to delete this task?"
                  title="由于操作不可逆，您确定要删除该 Instance 吗？"
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
                    删除该 Instance
                  </Button>
                </Popconfirm>
              </p>
            </Card>
          </div>
        </Sider>

        <Layout>
          <Content
            style={{ background: 'white' }}
            className={'Content_List_Header'}
          >
            <Title>DICOM Tags</Title>
            <List
              itemLayout="horizontal"
              dataSource={curDicomtagKey}
              loading={fetchSeriesLoading}
              // header="Meta Header"
              size="large"
            >
              <Title level={2}>Meta Header</Title>
              <List.Item>
                <List.Item.Meta
                  className={'List_Header'}
                  description={curHeaderKey.map((key: any, index: number) => {
                    return (
                      <div>
                        {`${key}(${curHeaderValue[index].Name}) :`}
                        <span style={{ fontWeight: 700 }}>
                          {curHeaderValue[index].Value}
                        </span>
                      </div>
                    );
                  })}
                />
              </List.Item>
              <Title level={2}>Dataset</Title>
              <List.Item>
                <List.Item.Meta
                  className={'List_Header'}
                  description={mainDicomKey.map((key: any, index: number) => {
                    return (
                      <div>
                        {`${key}(${mainDicomValue[index].Name}) :`}
                        <span style={{ fontWeight: 700 }}>
                          {mainDicomValue[index].Value}
                        </span>
                      </div>
                    );
                  })}
                />
              </List.Item>
            </List>
            {/* 下面是渲染所有 tag , 包括 sequence 类型的 json数据 */}
            {/* <List
              itemLayout="horizontal"
              dataSource={curDicomtagKey}
              loading={fetchSeriesLoading}
              header="Dataset"
              size="large"
              pagination={{
                onChange: (page) => {
                  _page = page;
                },
                pageSize: _pageSize,
              }}
              renderItem={(item, index) => (
                <List.Item
                  onClick={() => {
                    console.log(index, curDicomtagValue[index + (_page - 1) * _pageSize].Value);
                  }}
                >
                  {curDicomtagValue[index + (_page - 1) * _pageSize].Type === 'Sequence' &&
                  (curDicomtagValue[index + (_page - 1) * _pageSize].Value !== null ||
                    undefined) ? (
                    <ConnectedTag
                      item={item}
                      DicomTagName={curDicomtagValue[index + (_page - 1) * _pageSize].Name}
                      DicomTagValue={curDicomtagValue[index + (_page - 1) * _pageSize].Value}
                    />
                  ) : (
                    <List.Item.Meta
                      className={'Item_Meta'}
                      description={
                        <div>
                          <div>
                            {`${item} (${
                              curDicomtagValue[index + (_page - 1) * _pageSize].Name
                            }) : `}
                            <span style={{ fontWeight: 700 }}>
                              {curDicomtagValue[index + (_page - 1) * _pageSize].Value}
                            </span>
                          </div>
                        </div>
                      }
                    />
                  )}
                </List.Item>
              )}
            /> */}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

const mapStateToProps = ({
  Orthanc_instances,
  loading,
}: {
  Orthanc_instances: StateType;
  loading: { effects: Record<string, boolean> };
}) => {
  return {
    fetchSeriesLoading: loading.effects['Orthanc_instances/fetchInstance'],
    curDicom: Orthanc_instances.curDicom,
    curPatientInfo: Orthanc_instances.curPatientInfo,
    curStudyInfo: Orthanc_instances.curStudyInfo,
    curSeriesInfo: Orthanc_instances.curSeriesInfo,
    curInstances: Orthanc_instances.curInstances,
    curHeaderKey: Orthanc_instances.curHeaderKey,
    curHeaderValue: Orthanc_instances.curHeaderValue,
    curDicomtags: Orthanc_instances.curDicomtags,
    curDicomtagKey: Orthanc_instances.curDicomtagKey,
    curDicomtagValue: Orthanc_instances.curDicomtagValue,
    mainDicomKey: Orthanc_instances.mainDicomKey,
    mainDicomValue: Orthanc_instances.mainDicomValue,
    parentSeriesId: Orthanc_instances.parentSeriesId,
  };
};

const ConnectedInstance = connect(mapStateToProps)(Instance);

export default ConnectedInstance;
