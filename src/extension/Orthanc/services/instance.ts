/*
 * @Author: linkenzone
 * @Date: 2021-10-23 20:37:58
 * @Descripttion: Do not edit
 */
import request from '../utils/request';

/**
 * @description: 获取 instances 信息
 * @param {object} uuid
 * @return {*}
 */
export async function FetchInstances({ uuid }: { uuid: string }) {
  return request(`/instances/${uuid}`, {
    method: 'GET',
  });
}

/**
 * @description: 获取 instances Header 信息
 * @param {object} uuid
 * @return {*}
 */
export async function FetchInstancesHeader({ uuid }: { uuid: string }) {
  return request(`/instances/${uuid}/header`, {
    method: 'GET',
  });
}

/**
 * @description: 获取 instances 下的 dicomtags 信息
 * @param {object} uuid
 * @return {*}
 */
export async function FetchDicomValues({ uuid }: { uuid: string }) {
  return request(`/instances/${uuid}/tags`, {
    method: 'GET',
  });
}

/**
 * @description: 获取 instances 下的 dicomtags 信息
 * @param {object} uuid
 * @return {*}
 */
export async function FetchDicomTags({ uuid }: { uuid: string }) {
  return request(`/instances/${uuid}/content`, {
    method: 'GET',
  });
}

/**
 * @description: 获取 instances 所属 Series 信息
 * @param {object} uuid
 * @return {*}
 */
export async function FetchInstanceSeries({ uuid }: { uuid: string }) {
  return request(`/instances/${uuid}/series`, {
    method: 'GET',
  });
}

/**
 * @description: 获取 instances 所属 Study 信息
 * @param {object} uuid
 * @return {*}
 */
export async function FetchInstanceStudy({ uuid }: { uuid: string }) {
  return request(`/instances/${uuid}/study`, {
    method: 'GET',
  });
}

/**
 * @description: 获取 instances 所属 Patient 信息
 * @param {object} uuid
 * @return {*}
 */
export async function FetchInstancePatient({ uuid }: { uuid: string }) {
  return request(`/instances/${uuid}/patient`, {
    method: 'GET',
  });
}

/**
 * @description: 根据 UUID 删除对应的 instance
 * @param {object} uuid
 * @returns {*}
 */
export async function DeleteInstances({ uuid }: { uuid: string }) {
  return request(`/instances/${uuid}`, {
    method: 'DELETE',
  });
}
