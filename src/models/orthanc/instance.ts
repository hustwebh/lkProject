/*
 * @Author: linkenzone
 * @Date: 2021-10-23 19:48:41
 * @Descripttion: Do not edit
 */
import type { Reducer, Effect } from 'umi';
import { message } from 'antd';
import { services } from '@/extension/Orthanc/services/index';
import { headerKey, mainTagKey } from './mainTag';

export type StateType = {
  curPatientInfo: any;
  curStudyInfo: any;
  curSeriesInfo: any;
  curInstances: any;
  curHeaderKey: any[];
  curHeaderValue: any[];
  curDicom: any[];
  curDicomtags: any[];
  curDicomtagKey: any[];
  curDicomtagValue: any[];
  mainDicomKey: any[];
  mainDicomValue: any[];
  parentSeriesId: any;
};

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchInstances: Effect;
    deleteInstances: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'Orthanc_instances',

  state: {
    curPatientInfo: null,
    curStudyInfo: null,
    curSeriesInfo: null,
    curInstances: null,
    curHeaderKey: [],
    curHeaderValue: [],
    curDicom: [],
    curDicomtags: [],
    curDicomtagKey: [],
    curDicomtagValue: [],
    mainDicomKey: [],
    mainDicomValue: [],
    parentSeriesId: null,
  },

  effects: {
    *fetchInstances({ payload }, { call, put }) {
      // 当前 Instances 渲染左侧侧边栏
      const curInstances = yield call(services.FetchInstances, payload);
      // Dicom Dateset (key -- Value)
      const curDicom = yield call(services.FetchDicomValues, payload);
      // Dicom Header (key -- Value)
      const curHeader = yield call(services.FetchInstancesHeader, payload);

      if (curDicom) {
        const curDicomtagKey = Object.keys(curDicom);
        const curDicomtagValue = curDicomtagKey.map((i: any) => {
          return curDicom[i];
        });
        const mainDicomKey = [];
        for (const item of curDicomtagKey) {
          if (mainTagKey.includes(item)) {
            mainDicomKey.push(item);
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-for-in-array
        const mainDicomValue = [];
        for (const item in curDicom) {
          if (mainTagKey.includes(item)) {
            mainDicomValue.push(curDicom[item]);
          }
        }
        yield put({
          type: 'save',
          payload: {
            curDicom,
            curDicomtagKey,
            curDicomtagValue,
            mainDicomKey,
            mainDicomValue,
          },
        });
      }

      if (curHeader) {
        const keyList = [];
        const valueList = [];
        for (const item of Object.keys(curHeader)) {
          if (headerKey.includes(item)) {
            keyList.push(item);
          }
        }

        for (const item in curHeader) {
          if (headerKey.includes(item)) {
            valueList.push(curHeader[item]);
          }
        }

        yield put({
          type: 'save',
          payload: {
            curHeaderKey: keyList,
            curHeaderValue: valueList,
          },
        });
      }

      if (curInstances) {
        yield put({
          type: 'save',
          payload: {
            curInstances,
          },
        });

        const { ParentSeries } = curInstances;
        const curSeriesInfo = yield call(services.FetchSeries, {
          uuid: ParentSeries,
        });
        if (curSeriesInfo) {
          yield put({
            type: 'save',
            payload: {
              curSeriesInfo,
            },
          });
          const { ParentStudy } = curSeriesInfo;
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
      }
    },

    *deleteInstances({ payload }, { call }) {
      const instanceSeries = yield call(services.FetchInstanceSeries, payload);
      const instanceStudy = yield call(services.FetchInstanceStudy, payload);
      const instancePatient = yield call(
        services.FetchInstancePatient,
        payload,
      );
      const isDelete = yield call(services.DeleteInstances, payload);

      let instanceCount: any = instanceSeries.Instances.length;
      let seriesCount: any = instanceStudy.Series.length;
      let studiesCount: any = instancePatient.Studies.length;

      if (isDelete) {
        message.success('删除成功,返回上一级目录');
        // console.log(isDelete.RemainingAncestor);
        instanceCount -= 1;
        if (instanceCount > 0) {
          window.location.href = `/Series?uuid=${isDelete.RemainingAncestor.ID}`;
        } else {
          seriesCount -= 1;
          if (seriesCount > 0) {
            window.location.href = `/Study?uuid=${instanceStudy.ID}`;
          } else {
            studiesCount -= 1;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            studiesCount > 0
              ? (window.location.href = `/Patient?uuid=${instancePatient.ID}`)
              : (window.location.href = `/`);
          }
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
