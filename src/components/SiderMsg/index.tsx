import React, { useEffect } from 'react';
import { Divider, Avatar, Image } from 'antd';
import Doctorlogo from '@/assets/doctor.png';
import Nurselogo from '@/assets/nurse.png';
import Adminlogo from '@/assets/admin.png';
import MalePatient from '@/assets/man.png';
import FamalePatient from '@/assets/woman.png';
import './index.css';

const PeopleMsg = (props: any) => {
  const { siderMsg, hospitalList } = props;
  // console.log('组件siderMsg', siderMsg);

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
      {siderMsg.role_id ? (
        siderMsg.role_id === 1 ? (
          <Avatar size={75} src={Doctorlogo} className="SiderAvatar" />
        ) : siderMsg.role_id === 2 ? (
          <Avatar size={75} src={Nurselogo} className="SiderAvatar" />
        ) : (
          <Avatar size={75} src={Adminlogo} className="SiderAvatar" />
        )
      ) : null}
      {/* {siderMsg.patient_id ? (
        siderMsg.gender === '男' ? (
          <Avatar size={75} src={MalePatient} className="SiderAvatar" />
        ) : (
          <Avatar size={75} src={FamalePatient} className="SiderAvatar" />
        )
      ) : null} */}
      <Divider />
      <p className="msgShow">
        <span>姓名:</span>
        <div>{siderMsg.name}</div>
      </p>
      <Divider />
      <p className="msgShow">
        <span>性别:</span>
        <div>{siderMsg.gender}</div>
      </p>
      <Divider />
      <p className="msgShow">
        <span>电话:</span>
        <div>{siderMsg.phone}</div>
      </p>
      <Divider />
      <p className="msgShow">
        <span>邮箱:</span>
        <div>{siderMsg.email}</div>
      </p>
      <Divider />
      <p className="msgShow">
        <span>工作单位:</span>
        <div>{siderMsg.hospital_name}</div>
      </p>
      <Divider />
    </div>
  );
};

export default PeopleMsg;
