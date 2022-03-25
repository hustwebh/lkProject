import request from '@/utils/request';
import { SERVICEURL } from '@/utils/const';

export async function getLoginUserMsg() {
  console.log('向后端发起登陆用户请求');
  return request(`${SERVICEURL}/api/v1/user`, {
    method: 'GET',
    // headers: {
    //   token: localStorage.getItem('token'),
    // },
  });
}

export async function getHospitalList() {
  return request(`${SERVICEURL}/api/v1/hospitalAll`, {
    method: 'GET',
    // headers: {
    //   token: localStorage.getItem('token'),
    // },
  });
}

export async function getPatientMsg(body: any) {
  return request(`${SERVICEURL}/api/v1/patient`, {
    method: 'GET',
    params: body,
    // headers: {
    //   token: localStorage.getItem('token'),
    // },
  });
}
// export async function getMainDoctorMsg(body: any) {
//   console.log('触发获取主治医生信息', body);
//   return request(`${SERVICEURL}/api/v1/user/${body.doctor_id}`, {
//     method: 'GET',
//     headers: {
//       token: localStorage.getItem('token'),
//     },
//   });
// }

export async function getMainDoctorMsgByPatientId(body: any) {
  console.log('触发获取主治医生信息', body);
  return request(`${SERVICEURL}/api/v1/maindoctor`, {
    method: 'GET',
    params: body,
    // headers: {
    //   token: localStorage.getItem('token'),
    // },
  });
}
