/*
 * @Author: linkenzone
 * @Date: 2021-05-27 16:35:04
 * @Descripttion: Do not edit
 */
import UploadFilesComponent from './uploadFiles/UploadFilesComponent';
import ConnectedAllPatients from './patient/ConnectedAllPatients';
import ConnectedPatient from './patient/ConnectedPatient';
import ConnectedStudy from './study/ConnectedStudy';
import ConnectedSeries from './series/ConnectedSeries';
import ConnectedInstance from './instance/ConnectedInstance';
import services from './services';

const OrthancExtension = {
  ConnectedAllPatients,
  ConnectedPatient,
  ConnectedStudy,
  ConnectedSeries,
  ConnectedInstance,
  UploadFilesComponent,
  services,
};

export {
  ConnectedAllPatients,
  ConnectedPatient,
  ConnectedStudy,
  ConnectedSeries,
  ConnectedInstance,
  UploadFilesComponent,
  services,
};

export default OrthancExtension;
