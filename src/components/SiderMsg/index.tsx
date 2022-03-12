import React, { useEffect } from 'react';
import { Divider, Avatar, Image } from 'antd';
import './index.css';

const PeopleMsg = (props: any) => {
  const { siderMsg, hospitalList } = props;
  console.log('siderMsg', siderMsg);
  // console.log('hospitalList', hospitalList);
  // const { role_id } = siderMsg;
  const roles = ['医生', '护士', '管理员'];

  // const workHospital = hospitalList.filter((index: any) => {
  //   return index.hospital_id === siderMsg.hospital_id;
  // })[0];

  return (
    <div
      style={{
        textAlign: 'center',
        backgroundColor: 'white',
        // display:'flex'????
        borderRadius: 20,
        width: '90%',
        marginLeft: 20,
      }}
    >
      <Avatar
        style={{
          color: '#f56a00',
          backgroundColor: '#fde3cf',
        }}
        size={48}
      >
        U
      </Avatar>
      <Divider />
      <p>
        <span>姓名：</span>
        {siderMsg.name}
      </p>
      <Divider />
      <p>
        <span>性别：</span>
        {siderMsg.gender}
      </p>
      <Divider />
      <p>
        <span>电话：</span>
        {siderMsg.phone}
      </p>
      <Divider />
      <p>
        <span>邮箱：</span>
        {siderMsg.email}
      </p>
      <Divider />
      <p>
        <span>工作单位：</span>
        {siderMsg.hospital_name}
      </p>
      <Divider />
    </div>
  );
};

export default PeopleMsg;
