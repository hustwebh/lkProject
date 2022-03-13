import React, { useEffect } from 'react';
import { connect } from 'dva';
import { CheckCard } from '@ant-design/pro-card';
import PatientCard from '@/components/Patient/index';
import style from './index.less';

interface mainContentProps {
  MainPage: any;
  // wappers: any;
}

const MainContent: any = (props: any) => {
  const { dispatch, PatientList } = props;

  useEffect(() => {
    dispatch({
      type: 'mainContent/getPatientList',
    });
  }, [1]);

  return (
    <div className={style.rightContent}>
      <div className={style.cardsContent}>
        <CheckCard.Group>
          {PatientList.map((item: object) => {
            return <PatientCard patientMsg={item} />;
          })}
        </CheckCard.Group>
      </div>
    </div>
  );
};

// MainContent.wrappers = ['@/wrappers/auth'];

const mapStateToProps = ({ mainContent }: { mainContent: any }) => {
  const { PatientList } = mainContent;
  return {
    PatientList,
  };
};

export default connect(mapStateToProps)(MainContent);
