import request from '@/utils/request';
import { SERVICEURL } from '@/utils/const';

export async function getUserMsg(body: object) {
  return request(`${SERVICEURL}/api/v1/user`, {
    method: 'POST',
    data: body,
  });
}
