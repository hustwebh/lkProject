import { getUserMsg } from './service';
import { message } from 'antd';

const Model = {
  namespace: 'UserTable',
  state: {},

  reducers: {},

  effects: {
    *getUserList({ payload }, { call, put }) {
      const result = yield call(getUserMsg, payload);
      if (result.code === 200) {
        return {
          // ...payload,//current和pageSize参数
          success: true,
          data: [...result.data],
          total: result.data.length,
        };
      } else {
        message.error('获取用户信息失败请刷新页面');
      }
    },
  },
};

export default Model;
