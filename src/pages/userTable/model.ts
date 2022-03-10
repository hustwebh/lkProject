import { getUserMsg } from './service';
import { message } from 'antd';
import { Reducer, Effect } from 'umi';

interface UserTableType {
  namespace: 'UserTable';
  state: {};
  effects: {
    getUserList: Effect;
  };
}

const Model: UserTableType = {
  namespace: 'UserTable',
  state: {
    UserMsg: undefined,
  },

  effects: {
    *getUserList({ payload }, { call, put }) {
      console.log('effects');
      // const { code, data } = yield call(getUserMsg, payload);
      // if (code === 200) {
      //   yield put({
      //     type: 'UserMsg',
      //     payload: {
      //       success: true,
      //       ...data, //user[],total:number,pageSize:number
      //     },
      //   });
      //   return true;
      // } else {
      //   message.error('获取用户信息失败请刷新页面');
      //   return false;
      // }
      const data = [
        {
          key: 1,
          id_card: '433130200212200139',
          name: 'zyr',
          gender: '男',
          hospital_name: '1',
          createdAt: '123',
          medical_user_id: 1,
          role_id: 1,
          phone: '111111111',
          email: `3115988782@qq.com`,
        },
      ];
      // yield put ({
      //       type:"UserMsg",
      //       payload:{
      //         success: true,
      //         data,
      //         total:100,
      //         current:1,
      //         pageSize:20,
      //       }
      //     })
      return {
        success: true,
        data,
        total: 100,
        current: 1,
        pageSize: 20,
      };
    },
  },
};

export default Model;

// const data = [{
//   key: 1,
//   id_card: '433130200212200139',
//   name: "zyr",
//   gender: '男',
//   hospital_name: '1',
//   createdAt: "123",
//   medical_user_id: 1,
//   role_id: 1,
//   phone: '111111111',
//   email: `3115988782@qq.com`,
// }];
// yield put ({
//       type:"UserMsg",
//       payload:{
//         success: true,
//         data,
//         total:100,
//         current:1,
//         pageSize:20,
//       }
//     })
