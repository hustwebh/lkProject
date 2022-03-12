import React, { useEffect } from 'react';
import { Input, Space, Form, Button, message, Row, Col } from 'antd';
import { Link, history } from 'umi';
import { connect } from 'dva';
import logo from '@/assets/favicon.png';

import style from './style.less';

const Index = (props: any) => {
  const { dispatch } = props;

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 20,
    },
  };
  const _tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 20,
    },
  };

  const Login = () => {
    const onFinish = (values: any) => {
      dispatch({
        type: 'login/login',
        payload: values,
      }).then((res: any) => {
        console.log(res);
        if (res) {
          message.success('登录成功！');
          history.push('/');
        } else {
          message.error('登录失败！');
        }
      });
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    return (
      <Form
        {...layout}
        labelAlign="right"
        name="basic"
        size="large"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="手机号"
          name="phone"
          rules={[
            {
              required: true,
              message: '请输入电话号码!',
            },
          ]}
        >
          <Input size="large" className={style.user} id="user" />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          style={{ margin: '0 0' }}
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
            {
              pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
              message: '密码只能包含数字和英文，长度6-20!',
            },
          ]}
        >
          <Input.Password
            size="large"
            className={style.password}
            id="password"
          />
        </Form.Item>

        <Row>
          <Col span={16}>
            <Form.Item
              {...tailLayout}
              valuePropName="checked"
              name="remember"
              style={{ margin: '0 0' }}
            ></Form.Item>
          </Col>
          <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/user/register">
              <span className={style.linkto} style={{ marginLeft: 48 }}>
                注册账户
              </span>
            </Link>
            {/* <a className={style.linkto} style={{ marginLeft: 10 }}>
            忘记密码
          </a> */}
          </Col>
        </Row>

        <Form.Item {..._tailLayout} style={{ marginTop: 10 }}>
          <Button
            type="primary"
            id="loginBtn"
            htmlType="submit"
            style={{ width: '100%' }}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div className={style.loginDiv}>
      <img src={logo} style={{ height: 45, width: 45, marginLeft: '10%' }} />
      <h2
        style={{
          marginLeft: '28%',
          marginTop: -40,
          marginBottom: 30,
          width: '500px',
          color: 'black',
        }}
      >
        肾脏图像分割系统
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
