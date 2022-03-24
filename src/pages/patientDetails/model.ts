import { getTreatmentMsg, getBasicMsg } from './service';
import { message } from 'antd';
import { Reducer, Effect } from 'umi';

interface PatientMsgType {
  namespace: 'PatientMsg';
  state: {};
  effects: {
    TreatmentMsg: Effect;
    BasicMsg: Effect;
  };
  reducers: {
    saveTreatmentMsg: Reducer;
    saveBasicMsg: Reducer;
  };
}

const Model: PatientMsgType = {
  namespace: 'PatientMsg',
  state: {},

  effects: {
    *TreatmentMsg({ payload }, { call, put }) {
      //   const {code, data} = yield call(getTreatmentMsg,payload);
      //   if(code===200){
      //     yield put({
      //       type:'saveTreatmentMsg',
      //       payload:data,
      //     })
      //   }
      const data = [
        {
          create_time: '2021-02-11 21:15:07',
          id: 1,
          operation: 0,
          patient_id: 1,
          record:
            '彩超发现肾脏肿块＞3mm，未予重视。3月前再次彩超发现肿块增大＞5mm。半月前腹部增强CT提示肿瘤可能。病程中无肉眼血尿、腰痛、腹部包块、发热、体重减轻症状。血常规、肝肾功无明显异常。',
          treat_time: '2020-10-21 21:13:36',
        },
        {
          create_time: '2021-10-30 21:16:36',
          id: 2,
          operation: 0,
          patient_id: 1,
          record: '复诊确认为肾脏肿瘤',
          treat_time: '2021-11-12 21:15:47',
        },
      ];
      yield put({
        type: 'saveTreatmentMsg',
        payload: data,
      });
      return true;
    },
    *BasicMsg({ payload }, { call, put }) {
      const { code, data } = yield call(getBasicMsg, payload);
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
  },
};

export default Model;
