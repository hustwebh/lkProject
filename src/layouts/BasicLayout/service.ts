import request from '@/utils/request';
import { SERVICEURL } from '@/utils/const';

export async function getLoginUserMsg() {
  return request(`${SERVICEURL}/api/v1/user`, {
    method: 'GET',
    headers: {
      token: localStorage.getItem('token'),
    },
  });
}

export async function getHospitalList() {
  return request(`${SERVICEURL}/api/v1/hospitalAll`, {
    method: 'GET',
    headers: {
      token: localStorage.getItem('token'),
    },
  });
}
