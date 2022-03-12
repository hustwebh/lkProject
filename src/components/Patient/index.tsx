// import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { CheckCard } from '@ant-design/pro-card';
import symbol from '@/assets/favicon.png';
import { Typography } from 'antd';
import manlogo from '@/assets/man.png';
import womanlogo from '@/assets/woman.png';

const { Paragraph } = Typography;

const PatientCard = (props: any) => {
  const { patientMsg } = props;
  console.log(patientMsg);

  return (
    <CheckCard
      style={{ height: 110 }}
      avatar={patientMsg.gender === '男' ? manlogo : womanlogo}
      title={`姓名:  ${patientMsg.name}`}
      description={
        <span>
          性别:{patientMsg.gender}
          <br />
          联系电话:{patientMsg.phone}
        </span>
        // `性别:${patientMsg.gender}联系电话:${patientMsg.phone}`
      }
    />
  );
};

export default PatientCard;
