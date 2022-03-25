/*
 * @Author: Meng Tian
 * @Date: 2021-11-09 21:05:45
 * @Description: Do not edit
 */
import type { Reducer, Effect } from 'umi';
import { message } from 'antd';
import {
  changeNetArch,
  getAvgHU,
  getNetInfo,
  getSegResult,
  PreProcess,
  saveResult,
} from './service';

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
  mask: any;
  mask_cover: any;
  process_img: any;
  net_info: string;
  refresh: boolean;
  avg: string;
  medium: string;
};

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    preProcess: Effect;
    getSegResult: Effect;
    changeNetArch: Effect;
    getNetInfo: Effect;
    saveResult: Effect;
    getAvgHU: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'detect',

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
    mask: '',
    mask_cover: '',
    process_img: null,
    net_info: '',
    refresh: false,
    avg: '',
    medium: '',
  },

  effects: {
    *preProcess({ payload }, { call, put }) {
      // 当前 Instances 渲染左侧侧边栏
      const { code, data } = yield call(PreProcess, payload);
      console.log('model', data);
      yield put({
        type: 'save',
        payload: { process_img: data.img },
      });
    },
    *getSegResult({ payload }, { call, put }) {
      // 当前 Instances 渲染左侧侧边栏
      const { code, data } = yield call(getSegResult, payload);
      console.log('获取分割结果：', data);
      yield put({
        type: 'save',
        payload: { ...data, refresh: true },
      });
    },
    *changeNetArch({ payload }, { call, put }) {
      // 当前 Instances 渲染左侧侧边栏
      console.log('改变网络结构请求参数', payload);
      const data = yield call(changeNetArch, payload);
      if (data) {
        message.success('切换成功');
      }
    },
    *getNetInfo({ payload }, { call, put }) {
      // 当前 Instances 渲染左侧侧边栏
      const { code, data } = yield call(getNetInfo, payload);
      yield put({
        type: 'save',
        payload: { net_info: data ? data : '' },
      });
    },
    *saveResult({ payload }, { call, put }) {
      console.log('保存分割结果的参数：', payload);
      const data = yield call(saveResult, payload);
      if (data) {
        message.success('保存成功');
        yield put({
          type: 'save',
          payload: { refresh: true },
        });
      }
    },
    *getAvgHU({ payload }, { call, put }) {
      const { code, data } = yield call(getAvgHU, payload);
      console.log('data', data);
      if (data) {
        message.success('获取成功');
        yield put({
          type: 'save',
          payload: { ...data },
        });
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
      console.log('存储信息*********', payload);
      return { ...state, ...payload };
    },
  },
};

export default Model;
