/*
 * @Author: linkenzone
 * @Date: 2021-11-02 10:39:35
 * @Descripttion: Do not edit
 */
import { List, Collapse } from 'antd';
import React from 'react';
import { connect } from 'dva';
// import { splitDicomTags, splitDicomValue } from '../utils/dicomTags';
import ConnectedCollapse from './ConnectedCollapse';

const { Panel } = Collapse;
interface TagProps {
  DicomTagName: any[];
  DicomTagValue: any[];
  item: any;
}

const ConnectedTag: React.FC<TagProps> = (props) => {
  const { item, DicomTagName, DicomTagValue } = props;

  console.log('name: ', DicomTagName);
  console.log('value: ', DicomTagValue);
  return (
    <List.Item.Meta
      className={'Item_Meta'}
      description={
        <Collapse ghost className={'List_Collaps'}>
          {/* 最外层显示：→ (xxxx,xxxx) xxxx: xxxxx */}
          <Panel header={`${item} (${DicomTagName}) :`} key="1">
            <ConnectedCollapse DicomTagValue={DicomTagValue} />
            {/* {DicomTagValue.map((value: any, idx: number) => (
              <Collapse ghost>
                <Panel header={`item${idx + 1} :`} key="1">
                  {splitDicomTags(value)?.map((tag, i) => (
                    // Dicomtag是每一项十六进制标签, i标识每一项, 对应DicomValue[i]为属性值
                    <p key={tag}>
                      {tag} ({splitDicomValue(value)[i].Name}) :{' '}
                      {splitDicomValue(value)[i].Type === 'Sequence' ? (
                        <ConnectedCollapse DicomTagName={splitDicomValue(value)[i].Name} DicomTagValue={splitDicomValue(value)[i].Value} />
                      ) : (
                        splitDicomValue(value)[i].Value
                      )}
                    </p>
                  ))}
                </Panel>
              </Collapse>
            ))} */}
          </Panel>
        </Collapse>
      }
    />
  );
};

export default connect()(ConnectedTag);
