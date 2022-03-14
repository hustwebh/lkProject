import request from '@/utils/request';
import { SERVICEURL } from '@/utils/const';

export async function getPatientList() {
  return request(`${SERVICEURL}/api/v1/patientList`, {
    method: 'GET',
    headers: {
      token: localStorage.getItem('token'),
    },
  });
}

export async function submitMedicalMsg(body: any) {
  return request(`${SERVICEURL}/api/v1/treatment`, {
    method: 'POST',
    body,
    requestType: 'form',
    headers: {
      token: localStorage.getItem('token'),
    },
  });
}
