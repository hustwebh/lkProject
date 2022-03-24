import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { CheckCard } from '@ant-design/pro-card';
import { Pagination } from 'antd';
import PatientCard from '@/components/Patient/index';
import style from './index.less';

interface mainContentProps {
  MainPage: any;
  // wappers: any;
}

const MainContent: any = (props: any) => {
  const { dispatch, PatientList, history } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(24);

  useEffect(() => {
    dispatch({
      type: 'mainContent/getPatientList',
    });
  }, [1]);

  const handleChange = (page: number, pageSize: number) => {
    // console.log(page, pageSize);
    if (page > 0) {
      setCurrentPage(page);
      setCurrentPageSize(pageSize);
    } else {
      setCurrentPage(1);
    }
  };

  const ChangeHandler = (clickTarget: any) => {
    console.log(clickTarget, PatientList[clickTarget].patient_id);
    // history.push(`/patientDetails/?patient_id=${PatientList[clickTarget].patient_id}`)
  };

  return (
    <div className={style.rightContent}>
      <div className={style.cardsContent}>
        <CheckCard.Group onChange={ChangeHandler}>
          {PatientList.slice(
            (currentPage - 1) * currentPageSize,
            (currentPage - 1) * currentPageSize + currentPageSize,
          ).map((item: object) => {
            return <PatientCard patientMsg={item} />;
          })}
        </CheckCard.Group>
        <Pagination
          showQuickJumper={true}
          pageSizeOptions={['12', '16', '20', '24']}
          defaultCurrent={currentPage}
          defaultPageSize={currentPageSize}
          onChange={handleChange}
          total={PatientList.length}
        />
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
