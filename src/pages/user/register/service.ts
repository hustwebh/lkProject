import request from "umi-request";

// 登录获取token和用户信息
export async function Register(body:any) {
  console.log(body);
  return request('/register', {
    method: 'POST',
    data: body,
  });
}
