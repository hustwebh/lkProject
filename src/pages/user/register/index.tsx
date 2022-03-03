import React, { useEffect } from 'react';
import { Input, Space, Form, Button, Checkbox, message, Radio } from 'antd';
import { Link, history } from 'umi';
import style from './style.less';
import logo from '../../../assets/favicon.png';
import { connect } from 'dva';

const Index = (props: any) => {
  const { dispatch } = props;

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

  const Login = () => {
    const onFinish = (values: any) => {
      // console.log("hahah!")
      dispatch({
        type: 'register/register',
        payload: { ...values, type: 100 },
      }).then((res: any) => {
        if (res) {
          history.push('/user/login');
        } else {
          message.error('注册失败, 检查邮箱或用户名是否重复！');
        }
      });
    };

    const onFinishFailed = (errorInfo:any) => {
      console.log('Failed:', errorInfo);
    };

    return (
      <Form
        {...layout}
        name="basic"
        size="large"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="姓名"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入姓名!',
            },
          ]}
        >
          <Input size="large" className={style.user} autoComplete="off" />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            {
              required: true,
              message: '请输入邮箱!',
            },
            {
              type: 'email',
              message: '请输入正确的邮箱格式!',
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
            pattern:/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: '请输入正确的格式!',
          },
        ]}
        >
          <Input size="large" className={style.id_card} autoComplete="off" />
        </Form.Item>

        <Form.Item
        label="所属医院"
        name="hospital"
        rules={[
          {
            required: true,
            message: '请输入工作单位!',
          },
        ]}
        >
          <Input size="large" className={style.hospital} autoComplete="off" />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          style={{ color: 'balck' }}
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
            {
              pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
              message: '密码必须包含数字和英文，长度6-20!',
            },
          ]}
          hasFeedback
        >
          <Input.Password size="large" className={style.password} />
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="password2"
          style={{ color: 'balck' }}
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次输入的密码不一致！');
              },
            }),
          ]}
        >
          <Input.Password size="large" className={style.password} />
        </Form.Item>

        <Form.Item
          label="用户类型"
          name="role"
          style={{ marginBottom: 0 }}
          rules={[
            {
              required: true,
              message: '请选择用户身份类型!',
            },
          ]}
        >
          <Radio.Group value={2}>
            <Radio value={2}>医生</Radio>
            <Radio value={3}>护士</Radio>
            <Radio value={4}>管理员</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item {...tailLayout} name="back">
          <Link to="/user/login">
            <span className={style.back}>已有账号，点此登录...</span>
          </Link>
        </Form.Item>

        <Form.Item {..._tailLayout}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            注册
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div className={style.loginDiv}>
      <img src={logo} style={{ height: 45, width: 45, marginLeft: '25%' }} />
      <h2
        style={{
          marginLeft: '38%',
          marginTop: -40,
          marginBottom: 30,
          color: 'black',
        }}
      >
        肾病辅助诊疗系统
      </h2>
      <Login />
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
    loading: state.loading,
  };
}

export default connect(mapStateToProps)(Index);
