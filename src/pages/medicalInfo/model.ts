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
      // const data = [
      //   {
      //     address: '海南省甘孜藏族自治州青铜峡市',
      //     age: 43,
      //     create_time: '2022-03-07 15:18:30',
      //     doctor_id: 7,
      //     gender: '男',
      //     id_card: '40291118550612954X',
      //     kidney_ill_before: '0',
      //     married: '0',
      //     name: '曾秀英',
      //     patient_id: 10,
      //     phone: '18614844625',
      //   },
      //   {
      //     address: '海南省甘孜藏族自治州青铜峡市',
      //     age: 43,
      //     create_time: '2022-03-07 15:18:30',
      //     doctor_id: 7,
      //     gender: '女',
      //     id_card: '40291118550612954X',
      //     kidney_ill_before: '0',
      //     married: '0',
      //     name: '曾秀英',
      //     patient_id: 10,
      //     phone: '18614844625',
      //   },
      //   {
      //     address: '海南省甘孜藏族自治州青铜峡市',
      //     age: 43,
      //     create_time: '2022-03-07 15:18:30',
      //     doctor_id: 7,
      //     gender: '男',
      //     id_card: '40291118550612954X',
      //     kidney_ill_before: '0',
      //     married: '0',
      //     name: '曾秀英',
      //     patient_id: 10,
      //     phone: '18614844625',
      //   },
      //   {
      //     address: '海南省甘孜藏族自治州青铜峡市',
      //     age: 43,
      //     create_time: '2022-03-07 15:18:30',
      //     doctor_id: 7,
      //     gender: '男',
      //     id_card: '40291118550612954X',
      //     kidney_ill_before: '0',
      //     married: '0',
      //     name: '曾秀英',
      //     patient_id: 10,
      //     phone: '18614844625',
      //   },
      // ];

      // yield put({
      //   type: 'savePatientList',
      //   payload: data,
      // });
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
