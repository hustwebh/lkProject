/*
 * @Author: linkenzone
 * @Date: 2021-10-24 13:53:01
 * @Descripttion: Do not edit
 */
import { useState, useEffect, useCallback } from 'react';
/**
 * @description 获取当前窗口宽度
 * @returns {*}
 */
export function useWinSize() {
  const [width, setWidth] = useState({
    width: document.documentElement.clientWidth,
  });

  const onResize = useCallback(() => {
    setWidth({
      width: document.documentElement.clientWidth,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return width;
}
/**
 * @description 根据StudyDate查询patient
 * @returns {*}
 */
export function fetchFromStudy(
  StudyList: any[],
  _StudyList: any[],
  patientList: any[],
) {
  Object.keys(StudyList).forEach(function (key: string) {
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < patientList.length; index++) {
      if (
        patientList[index].ID === StudyList[key].ParentPatient &&
        !_StudyList.includes(patientList[index])
      ) {
        _StudyList.push(patientList[index]);
      }
    }
  });
  return _StudyList;
}
/**
 * @description 根据SeriesDate查询patient
 * @returns {*}
 */
export function fetchFromSeries(
  SeriesList: any[],
  _SeriesList: any[],
  _StudyList: any[],
  studiesList: any[],
  patientList: any[],
) {
  Object.keys(SeriesList).forEach(function (key: string) {
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < studiesList.length; index++) {
      if (studiesList[index].ID === SeriesList[key].ParentStudy) {
        _StudyList.push(studiesList[index]);
      }
    }
  });
  return fetchFromStudy(_StudyList, _SeriesList, patientList);
}
