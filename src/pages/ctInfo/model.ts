/*
 * @Author: Meng Tian
 * @Date: 2021-11-09 21:05:45
 * @Description: Do not edit
 */
import type { Reducer, Effect } from 'umi';
import { message } from 'antd';

import { GetPatientList, GetCTUrl, FetchImg } from './service';
import request from 'umi-request';
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
  namespace: 'ctInfo',

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
      const fetchImgList = data.data.map((item) => {
        // const imgData = yield call();
        return new Promise((resolve) => {
          const imgData = request(`${SERVICEURL}/api/v1/ct`, {
            method: 'get',
            headers: {
              token: localStorage.getItem('token'),
            },
            params: {
              url: item,
            },
          });

          resolve(imgData);
        });
      });

      const imgLists = yield Promise.all(fetchImgList);
      console.log('fetch imgList ', imgLists);

      yield put({
        type: 'save',
        payload: { imgLists: imgLists },
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
