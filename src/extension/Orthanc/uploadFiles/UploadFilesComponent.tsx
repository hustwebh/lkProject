/*
 * @Author: linkenzone
 * @Date: 2021-05-27 16:35:45
 * @Descripttion: 文件上传的模块
 */

import React, { useState, useEffect } from 'react';
import { Upload, message, Button, Progress, Modal, Input, Select } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';

import request from 'umi-request';

import style from './style.less';

const { Dragger } = Upload;
const { TextArea } = Input;
const { Option } = Select;

// message.config({
//   top: 100,
//   duration: 2,
//   maxCount: 3,
//   rtl: true,
// })

type UploadFilesComponentProps = {
  bodyStyle?: React.CSSProperties;
};

const UploadFilesComponent: React.FC<UploadFilesComponentProps> = (props) => {
  // 待上传的文件列表
  const [fileList, setFileList] = useState<any[]>([]);
  // 上传状态
  const [uploading, setUploading] = useState<boolean>(false);
  // 上传成功的文件数目
  const [progressPercent, setProgressPercent] = useState(Number);
  // 选择文件弹窗显示
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 设置选择文件类型
  const [fileType, setFileType] = useState();
  // 是否禁用选择文件按钮
  const isDisabled: boolean = fileType === undefined;
  // 鼠标移动到select按钮上时提示内容
  const isTitle = isDisabled ? '请先设置选择文件类型' : '';
  const { bodyStyle } = props;

  const modifyFileStatus = (file: any, status: any) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList;
    newFileList[index].status = status;
    setFileList(newFileList);
  };

  const handleClear = () => {
    console.log('fileList', fileList);
    setFileList([]);
  };

  const handleUpload = async () => {
    console.log('fileList', fileList);

    // const formData = new FormData();
    // fileList.forEach((file) => {
    //   formData.append('files[]', file);
    // });

    setProgressPercent(0);
    setUploading(true);

    let count = 0;

    const requests = Object.values(fileList).map((file) => {
      const formData = new FormData();
      formData.append('files[]', file);

      modifyFileStatus(file, 'uploading');

      return (
        request(`http://27.17.30.150:20083/instances/`, {
          method: 'POST',
          data: formData,
          credentials: 'omit',
          getResponse: true,
        })
          // eslint-disable-next-line @typescript-eslint/no-loop-func
          .then(({ data, response }) => {
            console.log('data', data);
            console.log('response', response);
            if (response.status === 200) {
              count += 1;

              modifyFileStatus(file, 'success');

              setProgressPercent((count / fileList.length) * 100);
            }
          })
          .catch((error) => {
            console.log(error);

            const index = fileList.indexOf(file);
            const newFileList = fileList;
            newFileList[index].status = 'error';
            setFileList(newFileList);

            message.error('一个文件上传失败');
          })
      );
    });

    await Promise.all(requests);

    if (count === fileList.length) {
      message.success('上传成功');
      handleClear();
    } else {
      message.error('部分文件上传失败');
    }

    setUploading(false);
    // setFileList([]);
  };

  const beforeUpload = (file: any, _fileList: any[]) => {
    // 文件类型匹配  检查后缀
    if (!checkSuffix(file, fileType)) {
      return false;
    }
    // 文件个数小于5000
    const isLt5k = _fileList.length < 5000;
    if (!isLt5k) {
      message.destroy();
      message.error('The number of files must be less than 5000!');
      return false;
    }
    // 单个文件大小 不大于 10G
    const isLt10G = file.size / 1024 / 1024 / 1024 < 10;
    if (!isLt10G) {
      message.destroy();
      message.error('File must smaller than 10GB!');
      return false;
    }
    setFileList([...fileList, ..._fileList]);
    setIsModalVisible(false);
    return false;
  };

  const showUploadModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function handleChange(value: any) {
    setFileType(value);
  }

  // eslint-disable-next-line consistent-return
  function checkSuffix(file: any, type?: string) {
    if (type === 'DICOM_via_dcmtk') {
      const fileName = file.name.substr(file.name.lastIndexOf('.'));
      if (fileName !== '.dcm') {
        message.destroy();
        message.error(updateTips(type));
        return false;
      }
    }
    if (type === 'Analyze(SPM)') {
      const fileName = file.name.substr(file.name.lastIndexOf('.'));
      if (fileName !== '.spm') {
        message.destroy();
        message.error(updateTips(type));
        return false;
      }
    }

    if (type === 'DICOM 3.0_via_(X)MedCon') {
      const fileName = file.name.substr(file.name.lastIndexOf('.'));
      if (fileName !== ('.hdr' || '.img')) {
        message.destroy();
        message.error(updateTips(type));
        return false;
      }
    }
    if (type === 'DICOM 3.0_via_(X)MedCon') {
      const fileName = file.name.substr(file.name.lastIndexOf('.'));
      if (fileName !== '.nii') {
        message.destroy();
        message.error(updateTips(type));
        return false;
      }
    }
    if (type === 'Other_Type') {
      const fileName = file.name.substr(file.name.lastIndexOf('.'));
      if (fileName === ('.dcm' || '.spm' || 'hdr' || '.img' || '.nii')) {
        message.destroy();
        message.error('存在对应文件类型，请选择正确的文件类型');
        return false;
      }
    }
    message.destroy();
    message.success('添加上传列表成功，等待上传');
    return true;
  }

  function updateTips(type?: string) {
    if (type === 'DICOM_via_dcmtk') {
      return '请选择文件后缀为 .dcm 文件';
    }
    if (type === 'Analyze(SPM)') {
      return '请选择文件后缀为 .spm 文件';
    }
    if (type === 'DICOM 3.0_via_(X)MedCon') {
      return '请选择文件后缀为 .hdr 和 .img 文件';
    }
    if (type === 'NIFTI_via_(X)MedCon') {
      return '请选择文件后缀为 .nii 文件';
    }
    if (type === 'Raw_Data') {
      return '请自行填写如下说明';
    }
    if (type === 'Other_Type') {
      return '未知类型文件, 仅保存文件以供下载';
    }
    return '';
  }

  const Dragger_props = {
    name: 'file',
    multiple: true,
    fileList,
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload,
    onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  useEffect(() => {
    setFileType(undefined);
  }, [isModalVisible]);

  return (
    <div style={bodyStyle}>
      <div>
        <Button
          type="primary"
          icon={<UploadOutlined />}
          style={{
            marginTop: 8,
            width: '100%',
            fontSize: '18px',
            height: '36px',
          }}
          onClick={showUploadModal}
        >
          Select files to upload ...
        </Button>
        <Modal
          title="Select files to upload"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          destroyOnClose
          footer={
            <Upload
              beforeUpload={beforeUpload}
              fileList={fileList}
              showUploadList={false}
              multiple={true}
              style={{ width: '35%', display: 'inline-block' }}
              className={style.custom_upload_body}
            >
              <Button
                type="primary"
                icon={<UploadOutlined />}
                style={{
                  marginTop: 15,
                  fontSize: '18px',
                  height: '36px',
                }}
                disabled={isDisabled}
                title={isTitle}
              >
                Select files
              </Button>
            </Upload>
          }
        >
          <TextArea rows={4} placeholder="你可以在此添加注释" />
          <span style={{ display: 'inline-block', width: '28%' }}>
            设置选择文件类型：
          </span>
          <Select
            placeholder="Drop down to select the file type"
            onChange={handleChange}
            style={{ width: '72%', marginTop: 8, display: 'inline-block' }}
          >
            <Option value="DICOM_via_dcmtk">DICOM_via_dcmtk</Option>
            <Option value="Analyze(SPM)">Analyze(SPM)</Option>
            <Option value="DICOM 3.0_via_(X)MedCon">
              DICOM 3.0_via_(X)MedCon
            </Option>
            <Option value="NIFTI_via_(X)MedCon">NIFTI_via_(X)MedCon</Option>
            <Option value="Raw_Data">Raw_Data</Option>
            <Option value="Other_Type">Other_Type</Option>
          </Select>
          <p
            style={{
              fontSize: 6,
              color: 'red',
              width: '72%',
              float: 'right',
              marginTop: 5,
            }}
          >
            {updateTips(fileType)}
          </p>
        </Modal>
      </div>

      <div>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{
            marginTop: 8,
            width: '100%',
            fontSize: '18px',
            height: '36px',
          }}
        >
          {uploading ? 'Uploading' : 'Start the upload'}
        </Button>
      </div>

      <div>
        <Button
          type="primary"
          onClick={handleClear}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{
            marginTop: 8,
            width: '100%',
            fontSize: '18px',
            height: '36px',
          }}
        >
          Clear the pending uploads
        </Button>
      </div>

      <Progress
        percent={progressPercent}
        showInfo={false}
        strokeWidth={24}
        style={{ marginBottom: '8px', marginTop: '24px' }}
      />

      <Dragger listType="picture" {...Dragger_props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
    </div>
  );
};

export default UploadFilesComponent;
