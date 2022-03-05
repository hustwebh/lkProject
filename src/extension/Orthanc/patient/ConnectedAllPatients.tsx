/*
 * @Author: linkenzone
 * @Date: 2021-06-03 17:13:02
 * @Descripttion: Do not edit
 */
import { Select, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import type { Dispatch } from 'dva';
import { connect } from 'dva';
import type { StateType } from '@/models/orthanc/patients';
import {
  useWinSize,
  fetchFromStudy,
  fetchFromSeries,
} from '../utils/useSelect';
import ConnectedSearch from './components/ConnectedSearch';

const { Option } = Select;
const { Search } = Input;

type AllPatientsProps = {
  dispatch: Dispatch;
  patientList: any[];
  studiesList: any[];
  seriesList: any[];
};
const AllPatients: React.FC<AllPatientsProps> = (props) => {
  const { dispatch, patientList, studiesList, seriesList } = props;

  const [searchKey, setSearchKey] = useState('PatientID');
  const [searchValue, setSearchValue] = useState();
  // 搜索框寬度动态变化
  const winWidth = useWinSize();

  function handleChange(key: any) {
    setSearchKey(key);
  }
  const onSearch = (value: any) => {
    setSearchValue(value);
  };

  const _StudyDateList: any[] = [];
  const _SeriesDateList: any[] = [];

  // models 数据查询
  const PatientIDList: any[] = patientList.filter((array) =>
    array.MainDicomTags.PatientID.match(searchValue),
  );
  const PatientNameList: any[] = patientList.filter((array) =>
    array.MainDicomTags.PatientName.match(searchValue),
  );
  const StudyDateList: any[] = studiesList.filter((array) =>
    array.MainDicomTags.StudyDate.match(searchValue),
  );
  const SeriesDateList: any[] = seriesList.filter((array) =>
    array.MainDicomTags.SeriesDate
      ? array.MainDicomTags.SeriesDate.match(searchValue)
      : null,
  );

  function checkList(selectKey: string) {
    if (selectKey === 'PatientID') {
      return PatientIDList;
    }
    if (selectKey === 'StudyDate') {
      return fetchFromStudy(StudyDateList, _StudyDateList, patientList);
    }
    if (selectKey === 'SeriesDate') {
      return fetchFromSeries(
        SeriesDateList,
        _SeriesDateList,
        _StudyDateList,
        studiesList,
        patientList,
      );
    }
    return PatientNameList;
  }

  const searchList: any[] = checkList(searchKey);
  useEffect(() => {
    dispatch({
      type: 'Orthanc_patients/fetchAllPatients',
      payload: { params: { expand: '', since: 0, limit: 300 } },
    });
    // 销毁的时候
    return () => {};
  }, []);

  return (
    <>
      <div className="global-search-wrapper" style={{ width: winWidth.width }}>
        <Select
          bordered
          defaultValue="Patient ID"
          size="middle"
          style={{
            width: 150,
            display: 'inline-block',
            marginRight: 8,
            marginBottom: 8,
          }}
          onChange={handleChange}
        >
          <Option value="PatientID">Patient ID</Option>
          <Option value="PatientName">Patient Name</Option>
          <Option value="StudyDate">Study Date</Option>
          <Option value="SeriesDate">Series Date</Option>
        </Select>
        <Search
          bordered
          style={{
            width: winWidth.width - 210,
            display: 'inline-block',
            marginBottom: 8,
            marginRight: 8,
          }}
          placeholder="input search text"
          allowClear
          enterButton="搜索"
          size="middle"
          onSearch={onSearch}
        />
      </div>

      <ConnectedSearch
        searchKey={searchKey}
        searchValue={searchValue}
        searchList={searchList}
        patientList={patientList}
      />
    </>
  );
};

const mapStateToProps = ({
  Orthanc_patients,
}: {
  Orthanc_patients: StateType;
}) => {
  return {
    patientList: Orthanc_patients.patientList,
    studiesList: Orthanc_patients.studiesList,
    seriesList: Orthanc_patients.seriesList,
  };
};

const ConnectedAllPatients = connect(mapStateToProps)(AllPatients);

export default ConnectedAllPatients;
