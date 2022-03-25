import {
  getLoginUserMsg,
  getHospitalList,
  getPatientMsg,
  getMainDoctorMsg,
  getMainDoctorMsgByPatientId,
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
    mainDoctorMsg: Effect;
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
      console.log('请求登录用户信息Model');
      const { code, data } = yield call(getLoginUserMsg, payload);
      if (code === 200) {
        yield put({
          type: 'saveSiderMsg',
          payload: data,
        });
      }
    },
    *mainDoctorMsg({ payload }, { call, put }) {
      console.log('请求主治医生信息Model');
      const { code, data } = yield call(getMainDoctorMsgByPatientId, payload);
      // const result = yield call(getPatientMsg, payload);

      // console.log('111111111111111', result);

      // const { code, data } = yield call(getMainDoctorMsg, {
      //   doctor_id: result.data.doctor_id,
      // });
      if (code === 200) {
        yield put({
          type: 'saveSiderMsg',
          payload: data,
        });
        // return true;
      }
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
