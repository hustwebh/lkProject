import type { Reducer, Effect } from 'umi';

import { Search } from './service';

export interface ModelType {
  namespace: string;
  state: {};
  effects: {
    getSearchList: Effect;
  };
  reducers: {
    save: Reducer;
  };
}

const Model: ModelType = {
  namespace: 'searchInfo',
  state: {},
  effects: {
    *getSearchList({ payload }, { call, put }) {
      // 当前 Instances 渲染左侧侧边栏
      console.log('11111111111111111111111', payload);
      const data = yield call(Search, payload);
      console.log('searchData', data);
      yield put({
        type: 'save',
        payload: { searchList: data.data },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default Model;
