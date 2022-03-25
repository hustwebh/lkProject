import {
  getLoginUserMsg,
  getHospitalList,
  getPatientMsg,
  getMainDoctorMsg,
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
      const { code, data } = yield call(getLoginUserMsg, payload);
      if (code === 200) {
        yield put({
          type: 'saveSiderMsg',
          payload: data,
        });
      }
    },
    *mainDoctorMsg({ payload }, { call, put }) {
      const result = yield call(getPatientMsg, payload);
      const { code, data } = yield call(getMainDoctorMsg, {
        doctor_id: result.data.doctor_id,
      });
      if (code === 200) {
        yield put({
          type: 'saveSiderMsg',
          payload: data,
        });
        return true;
      }
      // const data = {
      //   "authorize_code": null,
      //   "create_time": "2022-03-05 21:14:13",
      //   "email": "1324598012@qq.com",
      //   "gender": "男",
      //   "hospital_name": "湖北省第三人民医院",
      //   "id_card": "412826199608185215",
      //   "medical_user_id": 1,
      //   "name": "张华",
      //   "phone": "13866666666",
      //   "role_id": 1,
      //   "role_name": "医生"
      // };
      // yield put({
      //   type: 'saveSiderMsg',
      //   payload: data,
      // });
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
