// import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { CheckCard } from '@ant-design/pro-card';
import symbol from '@/assets/favicon.png';
import { Typography } from 'antd';
import logo from '@/assets/favicon1.png';

const { Paragraph } = Typography;

const PatientCard = (props: any) => {
  const { patientMsg } = props;
  console.log(patientMsg);

  return (
    <CheckCard
      style={{ height: 120 }}
      avatar={logo}
      title={patientMsg.name}
      description={`病人注册时间${patientMsg.create_time},更多信息点击进入详情页面`}
    />
  );
};

export default PatientCard;
