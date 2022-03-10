import { Login, getPageQuery } from './service';
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
  // reducers: {
  //   logout() {
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('roles');
  //     // 不是login界面的话跳转到login界面
  //     if (window.location.pathname !== '/user/login') {
  //       history.replace({
  //         pathname: '/user/login',
  //         search: stringify({
  //           redirect: window.location.href,
  //         }),
  //       });
  //     }
  //   },
  // },

  effects: {
    *login({ payload }, { call, put }) {
      const { data, code } = yield call(Login, payload);
      console.log('back data', data);
      if (code === 200) {
        console.log('token', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('roles', data.role_id);
        console.log('localStorage.token', localStorage.getItem('roles'));
        if (data) {
          return true;
        } else {
          return false;
        }
        // if (redirect) {
        //   const redirectUrlParams = new URL(redirect);

        //   if (redirectUrlParams.origin === urlParams.origin) {
        //     redirect = redirect.substr(urlParams.origin.length);

        //     if (redirect.match(/^\/.*#/)) {
        //       redirect = redirect.substr(redirect.indexOf('#') + 1);
        //     }
        //   } else {
        //     window.location.href = '/';
        //     message.success('登录成功！');
        //     return true;
        //   }
        // }
        // redirect = redirect === 'login' ? '/' : redirect;
        // history.replace(redirect || '/');
      }
    },
  },

  reducers: {
    // effect获取数据处理方法
    changeLoginStatus(state, { payload }) {
      console.log('payload', payload);
      localStorage.setItem('token', payload.data.token);
      localStorage.setItem('roles', payload.data.role_id);
      console.log('localStorage.token', localStorage.getItem('roles'));
      // console.log(`login, ${payload.data.role_id}`);
      return { ...state };
    },
  },
};

export default Model;
