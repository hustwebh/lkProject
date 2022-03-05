/*
 * @Author: linkenzone
 * @Date: 2021-06-02 19:22:11
 * @Descripttion: orthanc 服务器的请求
 */
import {
  FetchAllPatients,
  FetchPatient,
  FetchPatientStudies,
  DeletePatient,
} from './patients';
import {
  FetchAllStudies,
  FetchSeriesOfStudies,
  FetchStudies,
  FetchStudiesPatient,
  DeleteStudy,
} from './studies';
import {
  FetchSeries,
  FetchInstancesOfSeries,
  FetchSeriesStudy,
  FetchSeriesPatient,
  FetchAllSeries,
  DeleteSeries,
} from './Series';
import {
  FetchInstances,
  FetchInstancesHeader,
  FetchDicomValues,
  FetchDicomTags,
  FetchInstanceSeries,
  FetchInstanceStudy,
  FetchInstancePatient,
  DeleteInstances,
} from './instance';

const services = {
  // patients
  FetchAllPatients,
  FetchPatient,
  FetchPatientStudies,
  DeletePatient,
  // studies
  FetchAllStudies,
  FetchSeriesOfStudies,
  FetchStudies,
  FetchStudiesPatient,
  DeleteStudy,
  // Series
  FetchAllSeries,
  FetchSeries,
  FetchSeriesStudy,
  FetchSeriesPatient,
  FetchInstancesOfSeries,
  DeleteSeries,
  // instance
  FetchInstances,
  FetchInstancesHeader,
  FetchDicomValues,
  FetchDicomTags,
  FetchInstanceSeries,
  FetchInstanceStudy,
  FetchInstancePatient,
  DeleteInstances,
};

export default services;
