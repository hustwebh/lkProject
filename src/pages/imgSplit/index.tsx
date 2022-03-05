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
  BackTop,
} from 'antd';
import {
  DownloadOutlined,
  DeleteFilled,
  ToTopOutlined,
} from '@ant-design/icons';
import React, { useEffect } from 'react';
import type { Dispatch } from 'dva';
import { connect } from 'dva';
import { getUUID } from '../../utils/location';
import type { StateType } from '@/models/orthanc/series';
import { history } from 'umi';

const { Sider, Content } = Layout;
const DICOM_URL = 'http://27.17.30.150:20083';
type DeteceProps = {
  uuid: string | null;
  dispatch: Dispatch;

  curPatientInfo: any;
  curStudyInfo: any;
  curSeries: any;
  curInstanceList: any[];

  fetchSeriesLoading: boolean;
};

const Detect: React.FC<DeteceProps> = (props) => {
  const {
    dispatch,
    curPatientInfo,
    curStudyInfo,
    curSeries,
    curInstanceList,
    fetchSeriesLoading,
  } = props;

  // 在这个函数中获取浏览器路由参数
  // const uuid = 'bfd34afd-f97a9f7c-c0551428-93a0c48a-0285c8ce'
  const uuid = getUUID();
  console.log('uuid', uuid);

  console.log('curInstanceList', curInstanceList);

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
        {/* <Sider theme="light" width="100%"> */}
        <div
          style={{ padding: '10px', margin: '20px' /* marginLeft: '130px'  */ }}
        >
          <Card
            style={{ margin: '0 auto' }}
            title="图像预览"
            bodyStyle={{ padding: '12px' }}
            headStyle={{ backgroundColor: '#39bbdb' }}
            size="small"
          >
            <div style={{ flexWrap: 'wrap', marginLeft: '100px' }}>
              {curInstanceList
                ? curInstanceList.map((item, index) => {
                    return (
                      <div style={{ display: 'inline-block', margin: '10px' }}>
                        <Image
                          preview={false}
                          style={{ flex: 'none', display: 'inline-block' }}
                          width={250}
                          src={`${DICOM_URL}/instances/${item.ID}/preview`}
                          onClick={() => {
                            history.push(`/detect?uuid=${item.ID}`);
                          }}
                        />
                      </div>
                    );
                  })
                : null}
            </div>
          </Card>
        </div>
        {/* </Sider> */}
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

export default connect(mapStateToProps)(Detect);
