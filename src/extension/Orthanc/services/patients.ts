/*
 * @Author: linkenzone
 * @Date: 2021-06-02 19:12:28
 * @Descripttion: Do not edit
 */

import request from '../utils/request';

/**
 * @description: 获取所有 病人信息
 * @param {object} param1
 * @return {*}
 */
export async function FetchAllPatients({ params }: { params: any }) {
  return request(`/patients`, {
    method: 'GET',
    params,
  });
}

/**
 * @description: 获取 病人信息
 * @param {object} uuid
 * @return {*}
 */
export async function FetchPatient({ uuid }: { uuid: string }) {
  return request(`/patients/${uuid}`, {
    method: 'GET',
  });
}

/**
 * @description: 获取 病人下 studies 信息
 * @param {object} uuid
 * @return {*}
 */
export async function FetchPatientStudies({ uuid }: { uuid: string }) {
  return request(`/patients/${uuid}/studies`, {
    method: 'GET',
  });
}

/**
 * @description: 删除 病人信息
 * @param {object} uuid
 * @return {*}
 */
export async function DeletePatient({ uuid }: { uuid: string }) {
  return request(`/patients/${uuid}`, {
    method: 'DELETE',
  });
}
