/*
 * @Author: Meng Tian
 * @Date: 2021-11-09 21:05:51
 * @Description: Do not edit
 */
// import requestNoAuth from '@/utils/requestNoAuth';
import request from '@/utils/request';
import { SERVICEURL } from '@/utils/const';
// 样例:修改样本入组时间
export async function PreProcess(body: any) {
  console.log('preProcess body', body);
  return request(`${SERVICEURL}/api/v1/processCT?uuid=${body.uuid}`, {
    method: 'get',
    // data: {
    //   UUID: body.uuid,
    // },
  });
}
export async function getSegResult(body: any) {
  console.log('body', body);
  return request(`${SERVICEURL}/api/v1/seg?uuid=${body.uuid}`, {
    method: 'get',
    // data: {
    //   UUID: body.uuid,
    // },
  });
}

export async function changeNetArch(body: any) {
  console.log('body', body);
  return request(`${SERVICEURL}/api/v1/net`, {
    method: 'put',
    params: {
      name: body.name,
    },
  });
}

export async function getNetInfo(body: any) {
  return request(`${SERVICEURL}/api/v1/net`, {
    method: 'get',
  });
}

export async function saveResult(body: any) {
  return request(`${SERVICEURL}/api/v1/save`, {
    method: 'post',
    data: { uuid: body.uuid },
    requestType: 'form',
  });
}

export async function getAvgHU(body: any) {
  return request(`${SERVICEURL}/api/v1/cthu`, {
    method: 'get',
  });
}
