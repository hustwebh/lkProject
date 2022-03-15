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
  reducers: {
    saveDoctors: Reducer;
  };
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
        yield put({
          type: 'saveDoctors',
          payload: data,
        });
        return true;
      }
      // const data = [{ name: 'ayr', age: '18' },{ name: 'zyr', age: '18' }]
      // yield put({
      //   type: 'saveDoctors',
      //   payload: data
      // })
      // return true;
    },
    *getDoctorList({ payload }, { call, put }) {
      const { code, data } = yield call(getDoctorList);
      if (code === 200) {
        yield put({
          type: 'saveDoctors',
          payload: data,
        });
        return true;
      }
      // const data = [{ name: 'ayr', age: '18' },{ name: 'zyr', age: '18' }]
      // yield put({
      //   type: 'saveDoctors',
      //   payload: data
      // })
    },
  },

  reducers: {
    saveDoctors(state, { payload }) {
      return {
        ...state,
        doctorsMsg: payload,
      };
    },
  },
};

export default Model;
