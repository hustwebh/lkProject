import BasicLayouts from './BasicLayout/BasicLayouts';
import UserLayout from './Userlayout/UserLayouts';
import React from 'react';
// import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';

const index = (props) => {
  const { location } = props;
  const { pathname } = location;

console.log('xxxxxpathname',pathname)
  if (pathname.search('/user') == -1) {
    console.log("pathname1",pathname);
    return (
      <ConfigProvider >
        <BasicLayouts {...props} />
      </ConfigProvider>
    );
  } else if (pathname.search('/user') != -1) {
    console.log("pathname2",pathname);
    return (
      <ConfigProvider >
        <UserLayout {...props} />
      </ConfigProvider>
    );
  }

};

export default index;
