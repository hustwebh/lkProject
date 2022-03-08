import request from '@/utils/request';
import { SERVICEURL } from '@/utils/const';
import { parse } from 'querystring';

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

// 登录获取token和用户信息
export async function Login(body: object) {
  console.log(body);
  return request(`/api/v1/login`, {
    method: 'POST',
    data: body,
  });
}
