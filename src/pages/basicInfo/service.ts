import request from '@/utils/request';
import { SERVICEURL } from '@/utils/const';

export async function SubmitBasicInfo(body: any) {
  return request(`${SERVICEURL}/api/v1/patient`, {
    method: 'POST',
    body,
    requestType: 'form',
    headers: {
      token: localStorage.getItem('token'),
    },
  });
}

export async function getLoginUserMsg() {
  return request(`${SERVICEURL}/api/v1/user`, {
    method: 'GET',
    headers: {
      token: localStorage.getItem('token'),
    },
  });
}
export async function getDoctorList() {
  return request(`${SERVICEURL}/api/v1/patientuser`, {
    method: 'GET',
    headers: {
      token: localStorage.getItem('token'),
    },
  });
}
