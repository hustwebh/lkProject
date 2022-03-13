// import
import React, { useState, useEffect } from 'react';
import {
  Form,
  Row,
  Col,
  Modal,
  Table,
  message,
  Input,
  Menu,
  Popconfirm,
  Button,
  Divider,
  Space,
  Dropdown,
  DatePicker,
  Radio,
} from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { DownOutlined } from '@ant-design/icons';
import request from 'umi-request';
import style from './index.less';
import { connect } from 'dva';

export type Member = {
  name: string;
  phone: string;
  patient_id: number;
};

//病人列表弹窗
const SelectPatientModal = (props: any) => {
  const { PatientList, patientMsgHandler } = props;

  const [visible, setvisible] = useState(false);

  const tableListDataSource: Member[] = [];

  if (PatientList) {
    for (let i = 0; i < PatientList.length; i++) {
      tableListDataSource.push({
        name: PatientList[i].name,
        phone: PatientList[i].phone,
        patient_id: PatientList[i].patient_id,
      });
    }
  }

  const columns: ProColumns<Member>[] = [
    {
      dataIndex: 'name',
      title: '姓名',
    },
    {
      dataIndex: 'phone',
      title: '手机号',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => {
        return (
          <Button
            onClick={() => {
              setvisible(false);
              return patientMsgHandler(record);
            }}
          >
            选择
          </Button>
        );
      },
    },
  ];

  const setRowKey = (record: Member) => {
    return record.patient_id;
  };

  const queryTableData = (params: any) => {
    return Promise.resolve({
      success: true,
      total: tableListDataSource.length,
      ...params,
      data: tableListDataSource,
    });
  };

  return (
    <>
      <Button
        style={{ height: 45, marginTop: 15, marginLeft: 20 }}
        type="primary"
        onClick={() => {
          setvisible(true);
        }}
      >
        添加病人信息
      </Button>

      <Modal
        title="选择病人信息"
        visible={visible}
        onCancel={() => {
          setvisible(false);
        }}
        onOk={() => {
          // form.submit();
        }}
      >
        <ProTable<Member>
          columns={columns}
          request={(params) => queryTableData(params)}
          rowKey={setRowKey}
          pagination={{
            showQuickJumper: true,
          }}
          toolBarRender={false}
          search={false}
        />
      </Modal>
    </>
  );
};

//病人诊疗信息表单渲染
const PatientMedicalForm = (props: any) => {
  const { submitMedicalMsg } = props;
  const { TextArea } = Input;
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  const _tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 20,
    },
  };

  // const TextAreaChange = (e:any) => {
  //   console.log('Change:', e.target.value);
  // };
  // const DateChange=(date:any, dateString:string) =>{
  //   console.log(date, dateString);
  // }

  const onFinish = (values: any) => {
    submitMedicalMsg({
      ...values,
      treat_time: values.treat_time.format('YYYY-MM-DD'),
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      labelAlign="right"
      size="large"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="诊疗时间"
        name="treat_time"
        rules={[
          {
            required: true,
            message: '请确认诊疗记录时间！',
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="是否有手术记录"
        name="operation"
        style={{ margin: '0 0' }}
        rules={[
          {
            required: true,
            message: '请确认患者是否有过手术记录！',
          },
        ]}
      >
        {/* <Input.Password
          size="large"
          className={style.password}
          id="password"
        /> */}
        <Radio.Group value={0}>
          <Radio value={0}>否</Radio>
          <Radio value={1}>是</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="诊疗记录"
        name="record"
        rules={[
          {
            required: true,
            message: '内容不能为空！',
          },
        ]}
      >
        <TextArea showCount maxLength={200} style={{ width: '50%' }} />
      </Form.Item>

      <Form.Item {..._tailLayout} style={{ marginTop: 10 }}>
        <Button type="primary" htmlType="submit" style={{ width: '30%' }}>
          确认上传
        </Button>
      </Form.Item>
    </Form>
  );
};

const BasicInfo = (props: any) => {
  const { dispatch, PatientList } = props;

  const [editableMsg, setEditableMsg] = useState<any>([]);

  useEffect(() => {
    dispatch({
      type: 'medicalInfo/getPatientList',
    });
  }, [1]);

  const patientMsgHandler = (PatientMsg: any) => {
    setEditableMsg([...editableMsg, PatientMsg]);
  };

  const submitMedicalMsg = (values: any) => {
    dispatch({
      type: 'medicalInfo/submitMedicalInfo',
      payload: {
        ...values,
        patient_id: editableMsg[0].patient_id,
      },
    }).then((res: boolean) => {
      if (res) {
        message.success('诊疗信息上传成功'), setEditableMsg([]);
      } else {
        message.error('上传失败，请重试');
      }
    });
  };

  return (
    <div className={style.rightContent}>
      <div className={style.addContent}>
        <SelectPatientModal
          PatientList={PatientList}
          patientMsgHandler={patientMsgHandler}
        />
      </div>
      <Divider orientation="left">病人诊疗信息填报</Divider>
      <div className={style.PatientList}>
        {editableMsg.length ? (
          <div>
            请完成对{editableMsg[0].name}的诊疗信息填报:
            <br />
            <PatientMedicalForm submitMedicalMsg={submitMedicalMsg} />
          </div>
        ) : (
          <div>请先选择病人进行信息上报！</div>
        )}
      </div>
    </div>
  );
};

function mapStateToProps({ medicalInfo }: { medicalInfo: any }) {
  const { PatientList } = medicalInfo;
  return {
    PatientList,
  };
}
export default connect(mapStateToProps)(BasicInfo);
