/*
 * @Author: Meng Tian
 * @Date: 2021-11-09 21:05:45
 * @Description: Do not edit
 */
import type { Reducer, Effect } from 'umi';
import { message } from 'antd';

import { GetPatientList, GetCTUrl, FetchImg } from './service';
import request from '@/utils/request';
import { SERVICEURL } from '@/utils/const';

export type StateType = {
  patientsList: [];
  urlList: [];
  imgLists: [];
};

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    getPatientList: Effect;
    getCtUrl: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'ctseg',

  state: {
    patientsList: [],
    urlList: [],
    imgLists: [],
  },

  effects: {
    *getPatientList({ payload }, { call, put }) {
      // 当前 Instances 渲染左侧侧边栏
      const data = yield call(GetPatientList, payload);
      console.log('model', data);
      yield put({
        type: 'save',
        payload: { patientsList: data.data },
      });
    },
    *getCtUrl({ payload }, { call, put }) {
      // 当前 Instances 渲染左侧侧边栏
      const data = yield call(GetCTUrl, payload);
      console.log('model', data);
      const fetchImgList = data.data.map((item: any) => {
        return item.replace(/dicom/, 'kidney_seg_result/origin_png') + '.png';
      });

      // const imgLists = yield Promise.all(fetchImgList);
      console.log('fetch imgList ', fetchImgList);

      yield put({
        type: 'save',
        payload: { imgLists: fetchImgList },
      });
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
