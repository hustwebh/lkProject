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
      const { code, data } = yield call(Search, payload);
      console.log('searchData', data);
      if (code === 200) {
        yield put({
          type: 'save',
          payload: { searchList: data },
        });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      console.log('payload', payload);

      return {
        ...state,
        searchList: payload,
      };
    },
  },
};

export default Model;
