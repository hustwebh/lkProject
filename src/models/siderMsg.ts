import {
  getLoginUserMsg,
  getHospitalList,
  getPatientMsg,
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
    PatientMsg: Effect;
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
        return true;
      }
    },
    *mainDoctorMsg({ payload }, { call, put }) {
      console.log('请求主治医生信息参数', payload);
      const { code, data } = yield call(getMainDoctorMsgByPatientId, payload);
      if (code === 200) {
        console.log('doctorMsg', data);

        yield put({
          type: 'saveSiderMsg',
          payload: data,
        });
        return true;
      }
    },
    *PatientMsg({ payload }, { call, put }) {
      console.log('请求病人信息参数', payload);
      const { code, data } = yield call(getPatientMsg, {
        patient_id: payload.patient_id,
      });
      if (code === 200) {
        yield put({
          type: 'saveSiderMsg',
          payload: data,
        });
        return true;
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
