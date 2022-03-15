import { SubmitBasicInfo, getLoginUserMsg, getDoctorList } from './service';
import { message } from 'antd';
import { Reducer, Effect } from 'umi';
import { useEffect } from '@umijs/renderer-react/node_modules/@types/react';

interface basicInfoType {
  namespace: 'basicInfo';
  state: {};
  effects: {
    SubmitBasicInfo: Effect;
    getLoginMsg: Effect;
    getDoctorList: Effect;
  };
  reducers: {};
}

const Model: basicInfoType = {
  namespace: 'basicInfo',
  state: {},

  effects: {
    *SubmitBasicInfo({ payload }, { call, put }) {
      const result = yield call(SubmitBasicInfo, { payload });
      if (result) {
        return true;
      }
    },
    *getLoginMsg({ payload }, { call, put }) {
      const { code, data } = yield call(getLoginUserMsg);
      if (code === 200) {
        return data;
      }
    },
    *getDoctorList({ payload }, { call, put }) {
      const { code, data } = yield call(getDoctorList);
      if (code === 200) {
        return data;
      }
    },
  },

  reducers: {},
};

export default Model;
