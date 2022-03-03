import { Register } from './service';
import { message } from 'antd';

const Model = {
  namespace: 'register',

  state: {},

  reducers: {},

  effects: {
    *register({ payload }, { call }) {
      // console.log('logindata', payload);
      const data = yield call(Register, payload);

      if (data) {
        console.log(data);
        message.success('注册成功！');
        return true;
      }
      return false;
    },
  },
};

export default Model;
