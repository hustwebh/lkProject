// import React from 'react';
import { Card } from 'antd';
import symbol from '@/assets/favicon.png';

const Patient = (props:any) => {
  const { Meta } = Card;

  const changePage = (e:any)=>{
    console.log(e)
  }

  return (
    // <div>Patient</div>
    <Card
      hoverable
      // style={{ width: 240 }}
      cover={<img alt="example" src={symbol} />}
      onClick = {changePage}
    >
      <Meta title={props.name} />
    </Card>
  )
}


export default Patient;