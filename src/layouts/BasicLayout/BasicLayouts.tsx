import React, { useState, useEffect } from 'react';
import { Link, connect, Dispatch, history } from 'umi';
// import CookieUtil from '@/utils/cookie.js';
import request from '@/utils/request';
import moment from 'moment';
import topLogo from '@/assets/rayplus.png';
// import bottomLogo from '@/assets/bottom-logo.png';
import { SERVICEURL } from '@/utils/const';
import {
  Layout,
} from 'antd';

import './BasicLayouts.less';

const { Header, Sider, Footer, Content } = Layout;
const roles = ['医生', '护士', '管理员'];

const BasicLayouts = () => {
  return (
    <div>
      <Layout>
        <Header style={{ backgroundColor: '#2D2D2D', zIndex: 999, height: 55 }}>
        <div className="logo">
            <img src={topLogo} alt="肾脏诊疗系统" style={{ width: 80 }} />
            <b>肾脏诊疗系统</b>
          </div>
        </Header>
        <Layout style={{ backgroundColor: '#343434' }}>
          main
        </Layout>

        <Footer
          style={{
            backgroundColor: '#292929',
            textAlign: 'center',
            padding: '12px 50px',
          }}
        >
          footer
        </Footer>
      </Layout>
    </div>
  )
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps)(BasicLayouts)
