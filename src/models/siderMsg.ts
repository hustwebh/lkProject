import {
  getLoginUserMsg,
  getHospitalList,
  getPatientMsg,
} from '@/layouts/BasicLayout/service';
import { message } from 'antd';
import { Reducer, Effect } from 'umi';

interface SiderMsgType {
  namespace: 'SiderMsg';
  state: {
    siderMsg: Object;
    hospitalList: [];
  };
  effects: {
    loginUserMsg: Effect;
    hospitalList: Effect;
    patientMsg: Effect;
  };
  reducers: {
    saveSiderMsg: Reducer;
    saveHospitalList: Reducer;
  };
}

const Model: SiderMsgType = {
  namespace: 'SiderMsg',
  state: {
    siderMsg: {},
    hospitalList: [],
  },

  effects: {
    *loginUserMsg({ payload }, { call, put }) {
      const { code, data } = yield call(getLoginUserMsg, payload);
      if (code === 200) {
        yield put({
          type: 'saveSiderMsg',
          payload: data,
        });
      }
    },
    *patientMsg({ payload }, { call, put }) {
      // const { code, data } = yield call(getPatientMsg, payload);
      // if(code===200) {
      //   yield put({
      //     type: 'saveSiderMsg',
      //     payload: data,
      //   })
      // }
      const data = {
        address: '河南省郑州市金雀路103号',
        age: 25,
        create_time: '2021-10-14 21:00:04',
        doctor_id: 2,
        gender: '男',
        id_card: '412726198708042412',
        kidney_ill_before: '1',
        married: '0',
        name: '王华',
        patient_id: 1,
        phone: '13893990715',
      };
      yield put({
        type: 'saveSiderMsg',
        payload: data,
      });
    },
    *hospitalList({ payload }, { call, put }) {
      const { code, data } = yield call(getHospitalList, payload);
      if (code === 200) {
        yield put({
          type: 'saveHospitalList',
          payload: data,
        });
      }
    },
  },

  reducers: {
    saveSiderMsg(state, { payload }) {
      return {
        ...state,
        siderMsg: payload,
      };
    },
    saveHospitalList(state, { payload }) {
      return {
        ...state,
        hospitalList: [...payload],
      };
    },
  },
};

export default Model;
