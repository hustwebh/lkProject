import { Login } from './service';
// import CookieUtil from '@/utils/cookie.js';
import { message } from 'antd';

const Model = {
  namespace: 'login',

  state: { tokens: { 1: {}, 2: {} } },

  reducers: {
    add_tokens(state, { payload }) {
      return { ...state, tokens: { ...state.tokens, ...payload } };
    },
    clear_tokens(state) {
      return { ...state, tokens: { 1: {}, 2: {} } };
    },
  },

  effects: {
    *login({ payload }, { call }) {
      console.log('logindata', payload);
      // const data = false;
      const data = yield call(Login, payload);
      console.log('back data', data);
      if (data) {
        console.log('token', data);
        const { token, role } = data;
        // token 过期时间24小时
        let expires;
        // if (payload.remember) {
        //   expires = new Date(+new Date() + 7 * 24 * 60 * 60 * 1000);
        //   console.log('失效日期：', expires);
        // } else {
        //   expires = new Date(+new Date() + 24 * 60 * 60 * 1000);
        //   console.log('失效日期：', expires);
        // }

        // CookieUtil.set('token', token, expires, '/');
        // CookieUtil.set('role', role, expires, '/');
        // CookieUtil.set('userInfo', JSON.stringify(userInfo), new Date(+new Date() + 24 * 60 * 60 * 1000))
        message.success('登录成功！');
        return true;
      }
      return false;
    },
  },
};

export default Model;
