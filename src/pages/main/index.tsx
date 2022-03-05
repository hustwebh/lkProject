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
      <div>主界面</div>
  );
};

function mapStateToProps(state: any) {
  return {
    loading: state.loading,
  };
}

export default connect(mapStateToProps)(Index);
