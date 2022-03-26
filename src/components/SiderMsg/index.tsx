import React, { useEffect, useState } from 'react';
import { Divider, Avatar, Image } from 'antd';
import Doctorlogo from '@/assets/doctor.png';
import Nurselogo from '@/assets/nurse.png';
import Adminlogo from '@/assets/admin.png';
import MalePatient from '@/assets/man.png';
import FamalePatient from '@/assets/woman.png';
import './index.css';

// interface listValuesType{
//   "name"?:string;
//   'gender'?:string;
//   'age'?:string;
//   'address'?:string;
//   'phone'?:string;
//   'email'?:string;
//   'hospital_name'?:string;
//   'id_card'?:string;
// }

const PeopleMsg = (props: any) => {
  const { siderMsg, hospitalList } = props;

  const { name, gender, phone, email, hospital_name, address, id_card, age } =
    siderMsg;
  const roles = ['医生', '护士', '管理员'];

  let listKeys: string[] = [];
  let listValues: any = {};

  if (hospital_name) {
    //有工作单位信息，是登陆用户或者主治医生的信息
    listKeys = ['姓名', '性别', '联系电话', '邮箱', '工作单位'];
    listValues = { name, gender, phone, email, hospital_name };
  } else {
    listKeys = ['姓名', '性别', '联系电话', '家庭住址', '身份证号'];
    listValues = { name, age, phone, address, id_card };
  }

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
      {siderMsg.patient_id ? (
        siderMsg.gender === '男' ? (
          <Avatar size={75} src={MalePatient} className="SiderAvatar" />
        ) : (
          <Avatar size={75} src={FamalePatient} className="SiderAvatar" />
        )
      ) : null}
      <Divider />
      {Object.keys(listValues).map((key: string, index: number) => {
        return (
          <>
            <p className="msgShow" key={index}>
              <span>{listKeys[index]}:</span>
              <div>{listValues[key]}</div>
            </p>
            <Divider />
          </>
        );
      })}
      {/* <p className="msgShow">
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
      <Divider /> */}
    </div>
  );
};

export default PeopleMsg;
