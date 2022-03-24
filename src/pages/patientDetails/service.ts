import request from '@/utils/request';
import { SERVICEURL } from '@/utils/const';

export async function getTreatmentMsg(body: any) {
  return request(`${SERVICEURL}/api/v1/treatment`, {
    method: 'GET',
    body,
    headers: {
      token: localStorage.getItem('token'),
    },
  });
}
export async function getBasicMsg(body: any) {
  return request(`${SERVICEURL}/api/v1/patient`, {
    method: 'GET',
    body,
    headers: {
      token: localStorage.getItem('token'),
    },
  });
}
