import {
  Table,
  Modal,
  Radio,
  Space,
  Button,
  Card,
  Image,
  Spin,
  Pagination,
} from 'antd';
import {
  DownloadOutlined,
  DeleteFilled,
  DownOutlined,
} from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import type { Dispatch } from 'dva';
import { connect } from 'dva';
import { getUUID } from '../../utils/location';
// import type { StateType } from './model';
import style from './index.less';
import { history } from 'umi';
import { PreProcess } from '@/pages/detect/service';
import TextArea from 'antd/es/input/TextArea';

const PAGE_SIZE = 8;

type CTInfoProps = {
  dispatch: Dispatch;
  // location: Location;
  ctInfo?: any;
};

const CTSeg: React.FC<CTInfoProps> = (props) => {
  const { dispatch, ctInfo, location } = props;
  const [visible, setVisible] = useState(true);
  const [patientVal, setpatientVal] = useState(undefined);
  const [currPage, setCurrPage] = useState(1);
  const [patient_id, setPatientId] = useState('');

  // let patient_id = '';
  // const handleOk = () => {
  //   setVisible(false);
  // };

  useEffect(() => {
    dispatch({
      type: 'ctInfo/getPatientList',
      payload: {},
    });

    console.log('ctinfo', ctInfo);
  }, []);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (text: any, record: any) => {
        // console.log(record.patient_id);
        return (
          <Space size="middle">
            <Button
              onClick={() => {
                setVisible(false);
                // console.log('patient_id', record.patient_id);
                history.replace(`/segInfo?patient_id=${record.patient_id}`);
                setPatientId(record.patient_id);
                dispatch({
                  type: 'ctInfo/getCtUrl',
                  payload: { patient_id: record.patient_id },
                });
                // const urlList = data.data
                // console.log('ctInfo.urlList', ctInfo.urlList);
              }}
            >
              选择
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Modal
        title="请选择病人信息"
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Table dataSource={ctInfo?.patientsList} columns={columns} />
      </Modal>

      <Space style={{ display: visible ? 'none' : '' }}>
        <Spin spinning={ctInfo.imgLists.length === 0}>
          {/* {ctInfo.imgLists.map((item) => {
          return (
            <>
              <img src={item} />
            </>
          );
        })} */}
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
              {/* <Space>
                <Button onClick={() => {}}>上传</Button>
              </Space> */}
              <div style={{ flexWrap: 'wrap' }}>
                {ctInfo.imgLists
                  ? ctInfo.imgLists
                      .slice(PAGE_SIZE * (currPage - 1), PAGE_SIZE * currPage)
                      .map((item: any, index: any) => {
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
                              // https://guli-miler.oss-cn-beijing.aliyuncs.com/kidney_seg_result/origin_png/7b23b6ca3e64400b91f825d94ed9f34f.dcm.png
                              onClick={() => {
                                const tempArr = item.split('/');
                                const uuid =
                                  tempArr[tempArr.length - 1].split('.')[0];
                                history.push(
                                  `/detect?patient_id=${patient_id}&uuid=${uuid}`,
                                );
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
                total={ctInfo.imgLists.length}
                pageSize={PAGE_SIZE}
                style={{ textAlign: 'center' }}
              />
            </Card>
          </div>
        </Spin>
      </Space>
    </>
  );
};

const mapStateToProps = ({ ctInfo }: { ctInfo: any }) => {
  // console.log('state', state);
  return { ctInfo };
};

export default connect(mapStateToProps)(CTSeg);
