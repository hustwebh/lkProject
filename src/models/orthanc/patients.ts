/*
 * @Author: linkenzone
 * @Date: 2021-06-03 17:15:23
 * @Descripttion: Do not edit
 */

import type { Reducer, Effect } from 'umi';
import { services } from '@/extension/Orthanc/services/index';
import { message } from 'antd';

export type StateType = {
  patientList: any[];
  patientInfo: any;
  patientStudies: any[];
  studiesList: any[];
  seriesList: any[];
};

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchAllPatients: Effect;
    fetchPatient: Effect;
    fetchStudy: Effect;
    deletePatient: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'Orthanc_patients',

  state: {
    patientList: [],
    patientInfo: null,
    patientStudies: [],
    studiesList: [],
    seriesList: [],
  },

  effects: {
    *fetchAllPatients({ payload }, { call, put }) {
      const data = yield call(services.FetchAllPatients, payload);
      const studiesList = yield call(services.FetchAllStudies, payload);
      const seriesList = yield call(services.FetchAllSeries, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            patientList: data,
          },
        });
      }
      if (studiesList) {
        yield put({
          type: 'save',
          payload: {
            studiesList,
          },
        });
      }
      if (seriesList) {
        yield put({
          type: 'save',
          payload: {
            seriesList,
          },
        });
      }
    },

    *fetchPatient({ payload }, { call, put }) {
      const patientInfo = yield call(services.FetchPatient, payload);

      if (patientInfo) {
        yield put({
          type: 'save',
          payload: {
            patientInfo,
          },
        });
      }

      const patientStudies = yield call(services.FetchPatientStudies, payload);

      if (patientStudies) {
        yield put({
          type: 'save',
          payload: {
            patientStudies,
          },
        });
      }
    },

    *fetchStudy({ payload }, { call, put }) {
      const curStudyInfo = yield call(services.FetchStudies, payload);
      const curSeriesList = yield call(services.FetchSeriesOfStudies, payload);

      if (curSeriesList) {
        yield put({
          type: 'save',
          payload: {
            curSeriesList,
          },
        });
      }

      if (curStudyInfo) {
        yield put({
          type: 'save',
          payload: {
            curStudyInfo,
          },
        });
        const { ParentPatient } = curStudyInfo;
        const patientInfo = yield call(services.FetchPatient, ParentPatient);
        if (patientInfo) {
          yield put({
            type: 'save',
            payload: {
              patientInfo,
            },
          });
        }
      }
    },

    *deletePatient({ payload }, { call }) {
      const isDelete = yield call(services.DeletePatient, payload);

      if (isDelete) {
        message.success('删除成功,返回上一级目录');
        window.location.href = `/`;
      } else {
        message.success('删除失败');
      }
    },
  },

  reducers: {
    /**
     * @description: 储存配置
     * @Param:
     * @param {*} state
     * @param {*} param2
     */
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default Model;
