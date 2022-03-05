/*
 * @Author: linkenzone
 * @Date: 2021-10-25 21:03:38
 * @Descripttion: Patient筛选页面
 */
import { List } from 'antd';
import React from 'react';
import { connect } from 'dva';
import style from '../index.less';

interface ConnectedSearchProps {
  patientList: any[];
  searchKey: any;
  searchValue?: any;
  searchList: any[];
}
const ConnectedSearch: React.FC<ConnectedSearchProps> = (props) => {
  const { patientList, searchKey, searchValue, searchList } = props;

  return (
    <>
      {searchValue !== undefined ? (
        <List
          bordered
          itemLayout="horizontal"
          dataSource={searchList}
          header={<div>Select by {searchKey}</div>}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
          }}
          renderItem={(item) => (
            <List.Item
              className={style.custom_list_item}
              onClick={() => {
                window.location.href = `/Patient?uuid=${item.ID}`;
              }}
            >
              <List.Item.Meta
                title={item.MainDicomTags.PatientName}
                description={
                  <div>
                    <div>{`PatientBirthDate : ${item.MainDicomTags.PatientBirthDate}`}</div>
                    <div>{`PatientID : ${item.MainDicomTags.PatientID}`}</div>
                    <div>{`PatientSex : ${item.MainDicomTags.PatientSex}`}</div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      ) : (
        <List
          bordered
          itemLayout="horizontal"
          dataSource={patientList}
          header={<div>All patients</div>}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
          }}
          renderItem={(item) => (
            <List.Item
              className={style.custom_list_item}
              onClick={() => {
                console.log('item: ', typeof item.MainDicomTags);
                window.location.href = `/Patient?uuid=${item.ID}`;
              }}
            >
              <List.Item.Meta
                title={item.MainDicomTags.PatientName}
                description={
                  <div>
                    <div>{`PatientBirthDate : ${item.MainDicomTags.PatientBirthDate}`}</div>
                    <div>{`PatientID : ${item.MainDicomTags.PatientID}`}</div>
                    <div>{`PatientSex : ${item.MainDicomTags.PatientSex}`}</div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default connect()(ConnectedSearch);
