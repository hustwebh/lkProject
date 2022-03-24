import { getPatientList, submitMedicalMsg } from './service';
import { message } from 'antd';
import { Reducer, Effect } from 'umi';

interface medicalInfoType {
  namespace: 'medicalInfo';
  state: {};
  effects: {
    getPatientList: Effect;
    submitMedicalInfo: Effect;
  };
  reducers: {
    savePatientList: Reducer;
  };
}

const Model: medicalInfoType = {
  namespace: 'medicalInfo',
  state: {},

  effects: {
    *getPatientList({ payload }, { call, put }) {
      const { code, data } = yield call(getPatientList, payload);
      if (code === 200) {
        yield put({
          type: 'savePatientList',
          payload: data,
        });
      }
    },
    *submitMedicalInfo({ payload }, { call, put }) {
      const { code } = yield call(submitMedicalMsg, payload);
      if (code === 200) {
        return true;
      } else {
        return false;
      }
    },
  },

  reducers: {
    savePatientList(state, { payload }) {
      return {
        ...state,
        PatientList: payload,
      };
    },
  },
};

export default Model;
