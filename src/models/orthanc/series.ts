/*
 * @Author: linkenzone
 * @Date: 2021-06-08 19:35:06
 * @Descripttion: Do not edit
 */

import type { Reducer, Effect } from 'umi';
import { message } from 'antd';
import { services } from '@/extension/Orthanc/services/index';

export type StateType = {
  curPatientInfo: any;
  curStudyInfo: any;
  curSeries: any;
  curInstanceList: any[];
};

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchSeries: Effect;
    deleteSeries: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'Orthanc_series',

  state: {
    curPatientInfo: null,
    curStudyInfo: null,
    curSeries: null,
    curInstanceList: [],
  },

  effects: {
    *fetchSeries({ payload }, { call, put }) {
      const SeriesList = yield call(services.FetchAllSeries, payload);
      const curSeries = yield call(services.FetchSeries, payload);
      const curInstanceList = yield call(
        services.FetchInstancesOfSeries,
        payload,
      );
      Object.keys(SeriesList);
      if (curInstanceList) {
        yield put({
          type: 'save',
          payload: {
            curInstanceList,
          },
        });
      }
      if (curSeries) {
        yield put({
          type: 'save',
          payload: {
            curSeries,
          },
        });
        const { ParentStudy } = curSeries;
        const curStudyInfo = yield call(services.FetchStudies, {
          uuid: ParentStudy,
        });
        if (curStudyInfo) {
          yield put({
            type: 'save',
            payload: {
              curStudyInfo,
            },
          });
          const { ParentPatient } = curStudyInfo;
          const curPatientInfo = yield call(services.FetchPatient, {
            uuid: ParentPatient,
          });
          if (curPatientInfo) {
            yield put({
              type: 'save',
              payload: {
                curPatientInfo,
              },
            });
          }
        }
      }
    },

    *deleteSeries({ payload }, { call }) {
      const seriesStudy = yield call(services.FetchSeriesStudy, payload);
      const seriesPatient = yield call(services.FetchSeriesPatient, payload);
      const isDelete = yield call(services.DeleteSeries, payload);

      let seriesCount: any = seriesStudy.Series.length;
      let studiesCount: any = seriesPatient.Studies.length;
      if (isDelete) {
        message.success('删除成功，返回上一级目录');
        // console.log(isDelete.RemainingAncestor);
        seriesCount -= 1;
        if (seriesCount > 0) {
          window.location.href = `/Study?uuid=${isDelete.RemainingAncestor.ID}`;
        } else {
          studiesCount -= 1;
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          studiesCount > 0
            ? (window.location.href = `/Patient?uuid=${seriesPatient.ID}`)
            : (window.location.href = `/`);
        }
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
