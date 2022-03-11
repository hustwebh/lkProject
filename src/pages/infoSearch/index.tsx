import React from 'react';
import style from './index.less';
import { Input } from 'antd';

const Index = () => {
  const { Search } = Input;

  const onSearch = (value: string) => console.log(value);

  return (
    <div className={style.rightContent}>
      <div className={style.inputContent}>
        <Search
          // maxLength={20}
          style={{ width: 500 }}
          placeholder="请输入查询内容"
          allowClear
          enterButton="搜索"
          size="large"
          onSearch={onSearch}
        />
      </div>
    </div>
  );
};
export default Index;
