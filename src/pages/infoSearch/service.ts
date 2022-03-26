import request from '@/utils/request';
import { SERVICEURL } from '@/utils/const';
export async function Search(body: any) {
  // console.log('body', body);
  return request(`${SERVICEURL}/api/v1/search`, {
    method: 'get',
    params: body,
  });
}
