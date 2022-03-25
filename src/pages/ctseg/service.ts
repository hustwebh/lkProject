/*
 * @Author: Meng Tian
 * @Date: 2021-11-09 21:05:51
 * @Description: Do not edit
 */
// import requestNoAuth from '@/utils/requestNoAuth';
// import request from '@utils/request';
import request from '@/utils/request';
import { SERVICEURL } from '@/utils/const';
// 样例:修改样本入组时间
export async function GetPatientList(body: any) {
  console.log('localStorage.getItem', localStorage.getItem('token'));
  // console.log('body', body);
  return request(`${SERVICEURL}/api/v1/patientList`, {
    method: 'get',
  });
}
export async function GetCTUrl(body: any) {
  // console.log('localStorage.getItem', localStorage.getItem('token'));
  // console.log('body', body);
  return request(`${SERVICEURL}/api/v1/cturl`, {
    method: 'get',
    params: {
      patient_id: body.patient_id,
    },
  });
}
export async function FetchImg(body: any) {
  // console.log('localStorage.getItem', localStorage.getItem('token'));
  console.log('FetchImg body', body);
  // return request(body, {
  //   method: 'get',
  //   headers: {
  //     token: localStorage.getItem('token'),
  //   },
  // });
}
