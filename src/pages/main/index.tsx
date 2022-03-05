/*
 * @Author: Meng Tian
 * @Date: 2022-03-05 11:51:25
 * @Descripttion: Do not edit
 */
import React, { useEffect } from 'react';
import { Input, Space, Form, Button, Checkbox, message, Row, Col } from 'antd';
import { Link, history } from 'umi';
import { connect } from 'dva';
import logo from '../../../assets/favicon.png';

import style from './style.less';
// import logo from '';

const Index = (props: any) => {
  const { dispatch } = props;

  return (
    <div className={style.loginDiv}>
      {/* <img src={logo} style={{ height: 45, width: 45, marginLeft: '10%' }} /> */}
      <h2
        style={{
          marginLeft: '28%',
          marginTop: -40,
          marginBottom: 30,
          width: '500px',
          color: 'black',
        }}
      >
        肾病辅助诊疗系统
      </h2>
      <div>主界面</div>
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
    loading: state.loading,
  };
}

export default connect(mapStateToProps)(Index);
