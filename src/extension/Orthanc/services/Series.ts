/*
 * @Author: linkenzone
 * @Date: 2021-06-08 19:32:13
 * @Descripttion: Do not edit
 */

import request from '../utils/request';
/**
 * @description: 获取 allSeries 信息
 * @param {object} param0
 * @returns {*}
 */
export async function FetchAllSeries({ params }: { params: any }) {
  return request(`/series`, {
    method: 'GET',
    params,
  });
}
/**
 * @description: 获取 series 信息
 * @param {object} uuid
 * @return {*}
 */
export async function FetchSeries({ uuid }: { uuid: string }) {
  return request(`/series/${uuid}`, {
    method: 'GET',
  });
}

/**
 * @description: 获取 series对应的 patient 信息
 * @param {object} uuid
 * @return {*}
 */
export async function FetchSeriesStudy({ uuid }: { uuid: string }) {
  return request(`/series/${uuid}/study`, {
    method: 'GET',
  });
}

/**
 * @description: 获取 series对应的 patient 信息
 * @param {object} uuid
 * @return {*}
 */
export async function FetchSeriesPatient({ uuid }: { uuid: string }) {
  return request(`/series/${uuid}/patient`, {
    method: 'GET',
  });
}

/**
 * @description: 获取 series 下Instance 信息
 * @param {object} uuid
 * @return {*}
 */
export async function FetchInstancesOfSeries({ uuid }: { uuid: string }) {
  return request(`/series/${uuid}/instances`, {
    method: 'GET',
  });
}

/**
 * @description: 删除对应 uuid 下的 series
 * @param {object} uuid
 * @return {*}
 */
export async function DeleteSeries({ uuid }: { uuid: string }) {
  return request(`/series/${uuid}`, {
    method: 'DELETE',
  });
}
