import {
  getLoginUserMsg,
  getHospitalList,
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
      console.log('result.data', data);
      if (code === 200) {
        yield put({
          type: 'saveSiderMsg',
          payload: data,
        });
      }
      // const result = {
      //   name: "111",
      //   gender: "nan",
      //   email: "111@qq.com",
      //   id_card: "111",
      //   phone: "111",
      //   hospital_name: '武汉市第一人民医院',
      //   role_id: 1,
      //   creat_time: '1',
      // }
      // yield put({
      //   type: 'saveSiderMsg',
      //   payload: result,
      // })
    },
    *hospitalList({ payload }, { call, put }) {
      const { code, data } = yield call(getHospitalList, payload);
      if (code === 200) {
        yield put({
          type: 'saveHospitalList',
          payload: data,
        });
      }
      // const result =
      //   [
      //     {
      //       "create_time": "2021-09-16 20:55:31",
      //       "hospital_id": 1,
      //       "name": "湖北省第三人民医院",
      //     },
      //     {
      //       "create_time": "2021-09-16 20:56:16",
      //       "hospital_id": 2,
      //       "name": "武汉市第一人民医院",
      //     },
      //     {
      //       "create_time": "2021-05-14 20:56:48",
      //       "hospital_id": 3,
      //       "name": "武汉市妇幼保健院",
      //     }
      //   ]

      // yield put({
      //   type: 'saveHospitalList',
      //   payload: result,
      // })
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
