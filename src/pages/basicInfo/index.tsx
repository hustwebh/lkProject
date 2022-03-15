import {
  Input,
  Space,
  Form,
  Button,
  Checkbox,
  message,
  Radio,
  Select,
} from 'antd';
import style from './index.less';
import { Link, history } from 'umi';
import { connect } from 'dva';
import { useState, useEffect } from 'react';
import request from 'umi-request';
import { SERVICEURL } from '@/utils/const';

const BasicInfo = (props: any) => {
  const { dispatch } = props;
  const { Option } = Select;
  const [doctors, setDoctors] = useState<any>([]);
  // const doctors: string[] = [];
  const [selectDoctors, setSelectDoctors] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('roles') === '1') {
      dispatch({
        type: 'basicInfo/getLoginMsg',
      }).then((res: any) => {
        setDoctors([...doctors, res.name]);
      });
      setSelectDoctors(true);
    } else {
      dispatch({
        type: 'basicInfo/getDoctorList',
      }).then((res: any[]) => {
        for (let value of res) {
          setDoctors([...doctors, value.name]);
        }
      });
    }
  }, [1]);

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 6,
      span: 20,
    },
  };
  const _tailLayout = {
    wrapperCol: {
      offset: 6,
      span: 20,
    },
  };

  const onFinish = (values: any) => {
    dispatch({
      type: 'basicInfo/SubmitBasicInfo',
      payload: values,
    }).then((res: boolean) => {
      if (res) {
        message.success('上传成功！');
        history.push('/');
      }
    });
  };

  const onFinishFailed = () => {};

  return (
    <div className={style.FormDiv}>
      <Form
        {...layout}
        name="basic"
        size="large"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="患者姓名"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入患者姓名!',
            },
          ]}
        >
          <Input size="large" className={style.user} autoComplete="off" />
        </Form.Item>

        <Form.Item
          label="性别"
          name="gender"
          style={{ marginBottom: 0 }}
          rules={[
            {
              required: true,
              message: '请选择患者性别!',
            },
          ]}
        >
          <Radio.Group>
            <Radio value="男">男</Radio>
            <Radio value="女">女</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="年龄"
          name="age"
          rules={[
            {
              required: true,
              message: '请输入邮箱!',
            },
            {
              type: 'number',
              message: '请输入正确的年龄!',
            },
          ]}
        >
          <Input size="large" className={style.email} autoComplete="off" />
        </Form.Item>

        <Form.Item
          label="住址"
          name="address"
          rules={[
            {
              required: true,
              message: '请输入住址!',
            },
          ]}
        >
          <Input size="large" className={style.address} autoComplete="off" />
        </Form.Item>

        <Form.Item
          label="联系电话"
          name="phone"
          rules={[
            {
              required: true,
              message: '请输入联系电话!',
            },
          ]}
        >
          <Input size="large" className={style.email} autoComplete="off" />
        </Form.Item>

        <Form.Item
          label="身份证号"
          name="id_card"
          rules={[
            {
              required: true,
              message: '请输入身份证号!',
            },
            {
              pattern:
                /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
              message: '请输入正确的格式!',
            },
          ]}
        >
          <Input size="large" className={style.id_card} autoComplete="off" />
        </Form.Item>

        <Form.Item
          label="是否结婚"
          name="married"
          style={{ marginBottom: 0 }}
          rules={[
            {
              required: true,
              message: '请选择用户身份类型!',
            },
          ]}
        >
          <Radio.Group>
            <Radio value={0}>未婚</Radio>
            <Radio value={1}>已婚</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="是否有过肾疾病史"
          name="kidney_ill_defore"
          style={{ marginBottom: 0 }}
          rules={[
            {
              required: true,
              message: '请选择患者状态!',
            },
          ]}
        >
          <Radio.Group>
            <Radio value={1}>有病史</Radio>
            <Radio value={2}>无病史</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="主治医生"
          name="doctor_id"
          rules={[
            {
              required: true,
              message: '请确认主治医生!',
            },
          ]}
        >
          <Select
            style={{ width: 307 }}
            disabled={selectDoctors}
            defaultValue={0}
          >
            {doctors.map((item: string, index: number) => {
              console.log('123', item, index);
              return <Option value={index}>{item}</Option>;
            })}
          </Select>
        </Form.Item>

        <Form.Item {..._tailLayout}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(() => {})(BasicInfo);
