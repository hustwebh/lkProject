// import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'umi';
import { CheckCard } from '@ant-design/pro-card';
import symbol from '@/assets/favicon.png';
import { Typography } from 'antd';
import manlogo from '@/assets/man.png';
import womanlogo from '@/assets/woman.png';

const { Paragraph } = Typography;

const PatientCard = (props: any) => {
  const { patientMsg } = props;

  const ClickHandler = (e: any) => {
    console.log(e);
  };

  return (
    <Link to={`/patientDetails?patient_id=${patientMsg.patient_id}`}>
      <CheckCard
        value={patientMsg.patient_id}
        style={{ height: 110, marginLeft: 20 }}
        avatar={patientMsg.gender === '男' ? manlogo : womanlogo}
        title={`姓名:  ${patientMsg.name}`}
        description={
          <span>
            性别:{patientMsg.gender}
            <br />
            联系电话:{patientMsg.phone}
          </span>
        }
      />
    </Link>
  );
};

export default PatientCard;
