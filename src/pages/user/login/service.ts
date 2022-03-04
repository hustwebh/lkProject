import request from 'umi-request';
import { SERVICEURL } from "@/utils/const"

// 登录获取token和用户信息
export async function Login(body:object) {
  // console.log(body);
  return request(`${SERVICEURL}/login`, {
    method: 'POST',
    data: body
  })
}