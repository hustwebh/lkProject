import { Login } from './service';
import CookieUtil from '@/utils/cookie.js';
import { message } from 'antd';

const Model = {
  namespace: 'login',
  state: {},

  // reducers: {
  //   add_tokens(state, { payload }) {
  //     return { ...state, tokens: { ...state.tokens, ...payload } };
  //   },
  //   clear_tokens(state) {
  //     return { ...state, tokens: { 1: {}, 2: {} } };
  //   },
  // },

  effects: {
    *login({ payload }, { call, put }) {
      const { data, code } = yield call(Login, payload);
      console.log('back data', data);
      if (code === 200) {
        console.log('token', data);
        const { token, role } = data;

        message.success('登录成功！');
        return true;
      }
      message.error('登录失败，请充重试！');
      return false;
    },
  },
};

export default Model;
