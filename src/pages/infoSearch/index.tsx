// import React from 'react';
// import style from './index.less';
// import { Input } from 'antd';

// const Index = () => {
//   const { Search } = Input;

//   const onSearch = (value: string) => console.log(value);

//   return (
//     <div className={style.rightContent}>
//       <div className={style.inputContent}>
//         <Search
//           // maxLength={20}
//           style={{ width: 500 }}
//           placeholder="请输入查询内容"
//           allowClear
//           enterButton="搜索"
//           size="large"
//           onSearch={onSearch}
//         />
//       </div>
//     </div>
//   );
// };
// export default Index;
import React, { useState, useEffect, useRef } from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  List,
  message,
  Avatar,
} from 'antd';
import VirtualList from 'rc-virtual-list';
import { connect } from 'umi';

const { Option } = Select;
const ContainerHeight = 400;

const Index = (props: any) => {
  const [form] = Form.useForm();
  const { dispatch, searchList } = props;

  console.log('searchList', searchList);
  const d = [
    { name: 'name', value: 1 },
    { name: 'name', value: 1 },
    { name: 'name', value: 1 },
    { name: 'name', value: 1 },
  ];

  useEffect(() => {
    console.log('useEffect', searchList);
  }, [searchList]);

  const getFields = () => {
    const children = [];
    children.push(
      <Col span={8} key={1}>
        <Form.Item
          name={`name`}
          label={`姓名`}
          rules={[
            {
              required: false,
              message: 'Input something!',
            },
          ]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>
      </Col>,
    );
    children.push(
      <Col span={8} key={2}>
        <Form.Item
          name={`age`}
          label={`年龄`}
          rules={[
            {
              required: false,
              message: 'Input something!',
            },
          ]}
        >
          <Input placeholder="请输入年龄" />
        </Form.Item>
      </Col>,
    );
    children.push(
      <Col span={8} key={3}>
        <Form.Item
          name={`phone`}
          label={`手机号`}
          rules={[
            {
              required: false,
              message: 'Input something!',
            },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
      </Col>,
    );
    children.push(
      <Col span={8} key={4}>
        <Form.Item
          name={`address`}
          label={`家庭住址`}
          rules={[
            {
              required: false,
              message: 'Input something!',
            },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
      </Col>,
    );
    children.push(
      <Col span={8} key={5}>
        <Form.Item
          name={`id_card`}
          label={`身份证号`}
          rules={[
            {
              required: false,
              message: 'Input something!',
            },
          ]}
        >
          <Input placeholder="请输入身份证号码" />
        </Form.Item>
      </Col>,
    );
    return children;
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    dispatch({
      type: 'searchInfo/getSearchList',
      payload: values,
    });
  };

  return (
    <div>
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
      >
        <div style={{ padding: '30px' }}>
          <Row gutter={12}>{getFields()}</Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button
                style={{ margin: '0 8px' }}
                onClick={() => {
                  form.resetFields();
                }}
              >
                Clear
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
      <div>
        <List
          itemLayout="horizontal"
          dataSource={searchList}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<a href="https://ant.design">{item.name}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
const mapStateToProps = ({ searchInfo }: { searchInfo: any }) => {
  const { searchList } = searchInfo;
  return { searchList };
};
export default connect(mapStateToProps)(Index);
