import { getUserMsg } from './service';
import { message } from 'antd';
import { Reducer, Effect } from 'umi';

interface UserTableStateType {
  UserMsg: any;
}
interface UserTableType {
  namespace: 'UserTable';
  state: {};
  effects: {
    getUserList: Effect;
  };
  reducers: {
    UserMsg: Reducer<UserTableStateType>;
  };
}

const Model: UserTableType = {
  namespace: 'UserTable',
  state: { UserMsg: undefined },

  effects: {
    *getUserList({ payload }, { call, put }) {
      const { code, data } = yield call(getUserMsg, payload);
      if (code === 200) {
        yield put({
          type: 'UserMsg',
          payload: data,
          //user[],total:number,pageSize:number
        });
        return true;
      } else {
        message.error('获取用户信息失败请刷新页面');
        return false;
      }
      // const data = {
      //   'user': [{
      //     'create_time': '111',
      //     'email': '111',
      //     'gender': '男',
      //     'hospital_name': '111',
      //     'id_card': '111',
      //     'medical_user_id': 13,
      //     'name': '111',
      //     'phone': '111',
      //     'role_id': 3
      //   }],
      //   'total': 1,
      //   'pageSize': 1
      // }
      // yield put({
      //   type: 'UserMsg',
      //   payload: data,
      //   //user[],total:number,pageSize:number
      // });
      // return true
    },
  },

  reducers: {
    UserMsg(state, { payload }) {
      const { user, total, pageSize } = payload;
      return {
        ...state,
        UserMsg: {
          success: true,
          data: user,
          total,
          pageSize,
        },
      };
    },
  },
};

export default Model;
