import { getTreatmentMsg, getBasicMsg, getCTMsg } from './service';
import { message } from 'antd';
import { Reducer, Effect } from 'umi';

interface PatientMsgType {
  namespace: 'PatientMsg';
  state: {};
  effects: {
    TreatmentMsg: Effect;
    BasicMsg: Effect;
    CTMsg: Effect;
  };
  reducers: {
    saveTreatmentMsg: Reducer;
    saveBasicMsg: Reducer;
    saveCTMsg: Reducer;
  };
}

const Model: PatientMsgType = {
  namespace: 'PatientMsg',
  state: {},

  effects: {
    *TreatmentMsg({ payload }, { call, put }) {
      // console.log('2. 请求诊疗信息！');
      const { code, data } = yield call(getTreatmentMsg, payload);
      if (code === 200) {
        yield put({
          type: 'saveTreatmentMsg',
          payload: data,
        });
      }
    },
    *BasicMsg({ payload }, { call, put }) {
      const { code, data } = yield call(getBasicMsg, payload);
      if (code === 200) {
        yield put({
          type: 'saveBasicMsg',
          payload: data,
        });
      }
    },
    *CTMsg({ payload }, { call, put }) {
      // console.log('3. 请求CT图片信息！');

      const { code, data } = yield call(getCTMsg, payload);
      // console.log(code, data);

      const newData = data.map((item: any) => {
        // console.log(item);
        const tempUrl = item.replace(/dicom/, 'kidney_seg_result/origin_png');

        return tempUrl + '.png';
      });

      if (code === 200) {
        yield put({
          type: 'saveCTMsg',
          payload: newData,
        });
      }
    },
  },

  reducers: {
    saveTreatmentMsg(state, { payload }) {
      return {
        ...state,
        PatientTreatment: payload,
      };
    },
    saveBasicMsg(state, { payload }) {
      return {
        ...state,
        PatientBasicMsg: payload,
      };
    },
    saveCTMsg(state, { payload }) {
      return {
        ...state,
        PatientCTMsg: payload,
      };
    },
  },
};

export default Model;
