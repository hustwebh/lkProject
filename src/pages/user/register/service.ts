import request from 'umi-request';
import { SERVICEURL } from '@/utils/const';

// 登录获取token和用户信息
export async function Register(body: any) {
  console.log(body);
  return request(`${SERVICEURL}/api/v1/register`, {
    method: 'POST',
    data: body,
    requestType: 'form',
  });
}
