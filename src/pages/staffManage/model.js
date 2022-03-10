import { getUserMsg } from './service';
import { message } from 'antd';

const Model = {
  namespace: 'UserTable',
  state: {},

  reducers: {},

  effects: {
    *getUserList({ payload }, { call, put }) {
      const { code, data, current, pageSize } = yield call(getUserMsg, payload);
      if (code === 200) {
        return {
          success: true,
          data,
          total,
          current,
          pageSize,
        };
      } else {
        message.error('获取用户信息失败请刷新页面');
      }
    },
  },
};

export default Model;
