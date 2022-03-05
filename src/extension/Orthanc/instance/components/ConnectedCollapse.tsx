/*
 * @Author: linkenzone
 * @Date: 2021-11-02 11:26:03
 * @Descripttion: Do not edit
 */

import { Collapse } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { splitDicomTags, splitDicomValue } from '../../utils/dicomTags';

const { Panel } = Collapse;
interface TagProps {
  DicomTagValue: any[]; // object
}

const ConnectedCollapse: React.FC<TagProps> = (props) => {
  const { DicomTagValue } = props;

  return (
    <>
      {DicomTagValue.map((value: any, idx: number) => (
        <Collapse ghost className={'List_Collaps'}>
          <Panel header={`item${idx + 1} :`} key="1">
            {splitDicomTags(value)?.map((tag, i) => (
              // Dicomtag是每一项十六进制标签, i标识每一项, 对应DicomValue[i]为属性值
              <p key={tag}>
                {tag} ({splitDicomValue(value)[i].Name}) :{' '}
                {splitDicomValue(value)[i].Type === 'Sequence' ? (
                  <ConnectedCollapse
                    DicomTagValue={splitDicomValue(value)[i].Value}
                  />
                ) : (
                  <span style={{ fontWeight: 700 }}>
                    {splitDicomValue(value)[i].Value}
                  </span>
                )}
              </p>
            ))}
          </Panel>
        </Collapse>
      ))}
    </>
  );
};

export default connect()(ConnectedCollapse);
