import request from '@/utils/request';
import { SERVICEURL } from '@/utils/const';

export async function getLoginUserMsg() {
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
  console.log('触发获取病人信息111', body);
  return request(`${SERVICEURL}/api/v1/patient`, {
    method: 'GET',
    param: body,
    // headers: {
    //   token: localStorage.getItem('token'),
    // },
  });
}
export async function getMainDoctorMsg(body: any) {
  console.log('触发获取主治医生信息', body);
  return request(`${SERVICEURL}/api/v1/user/${body.doctor_id}`, {
    method: 'GET',
    // headers: {
    //   token: localStorage.getItem('token'),
    // },
  });
}

export async function getMainDoctorMsgByPatientId(body: any) {
  console.log('触发获取主治医生信息', body);
  return request(`${SERVICEURL}/api/v1/user/${body.patient_id}`, {
    method: 'GET',
    // headers: {
    //   token: localStorage.getItem('token'),
    // },
  });
}
