/*
 * @Author: Meng Tian
 * @Date: 2022-03-05 11:51:25
 * @Descripttion: Do not edit
 */
import React, { Suspense, useEffect } from 'react';
import { Input, Space, Form, Button, Checkbox, message, Row, Col } from 'antd';
import { Link, history } from 'umi';
import { connect } from 'dva';
import logo from '../../../assets/favicon.png';

import style from './main.less';
// import logo from '';

interface mainContentProps {
  MainPage: any;
}

const MainContent: React.FC<mainContentProps> = (props) => {
  return <div className={style.rightContent}>各个菜单界面</div>;
};

const mapStateToProps = ({ mainPage }: { mainPage: any }) => {
  return {
    MainPage: mainPage,
  };
};

export default connect(mapStateToProps)(MainContent);
