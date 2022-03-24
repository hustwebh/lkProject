import request from '@/utils/request';
import { SERVICEURL } from '@/utils/const';

export async function getTreatmentMsg(body: any) {
  return request(
    `${SERVICEURL}/api/v1/treatment?patient_id=${body.patient_id}`,
    {
      method: 'GET',
    },
  );
}
export async function getBasicMsg(body: any) {
  return request(`${SERVICEURL}/api/v1/patient?patient_id=${body.patient_id}`, {
    method: 'GET',
  });
}

export async function getCTMsg(body: any) {
  return request(`${SERVICEURL}/api/v1/cturl?patient_id=${body.patient_id}`, {
    method: 'GET',
  });
}
