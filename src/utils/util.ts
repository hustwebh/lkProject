/*
 * @Descripttion: 通用的工具类
 * @Author: linkenzone
 * @Date: 2020-09-06 22:14:37
 */

import moment from 'moment';
import React from 'react';
import { MultipleChoiceDataType } from '@/models/data';

/**
 * @description: 去掉请求中的NULL元素
 * @param data: any
 * @return data: any
 */
export function removeNull(data: any) {
  if (Object.prototype.toString.call(data) !== '[object Object]') {
    throw new Error('request data is not a object.');
  }
  // 两层去掉null 和 空对象
  // for (const key in data) {
  //   if (data[key] === null || JSON.stringify(data[key]) === '{}') {
  //     delete data[key];
  //   } else if (Object.prototype.toString.call(data[key]) === '[object Object]') {
  //     for (const _key in data[key]) {
  //       if (data[key][_key] === null) {
  //         delete data[key][_key];
  //       }
  //     }
  //   }
  // }

  // 两层去掉 "" , [] 和 空对象
  // for (const key in data) {
  //   if (
  //     data[key] === '' ||
  //     JSON.stringify(data[key]) === '{}' ||
  //     JSON.stringify(data[key]) === '[]'
  //   ) {
  //     data[key] = null;
  //   } else if (Object.prototype.toString.call(data[key]) === '[object Object]') {
  //     for (const _key in data[key]) {
  //       if (
  //         data[key][_key] === '' ||
  //         JSON.stringify(data[key]) === '{}' ||
  //         JSON.stringify(data[key]) === '[]'
  //       ) {
  //         data[key][_key] = null;
  //       }
  //     }
  //   }
  // }
  return data;
}

/**
 * @description: 根据获得的生日返回年龄
 * @param birthday: any （传入moment类型即可)
 * @return number
 */
export function getAge(birthday: any) {
  const duration = moment.duration(moment().diff(birthday));
  return duration.years();
}

/**
 * @description: 根据身份证号码，返回生日
 * @param id_number: string
 * @return string
 */
export const getBirthDay = (id_number: string) => {
  const regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (regIdCard.test(id_number)) {
    const year = id_number.slice(6, 10);
    const month = id_number.slice(10, 12);
    const day = id_number.slice(12, 14);
    return `${year}-${month}-${day}`;
    // const date = moment(`${year}-${month}-${day}`);
    // if (date.isValid()) {
    //   return `${year}-${month}-${day}`;
    // }
    // console.log('请输入正确的身份证号');
  }
  console.log('身份证输入不合法');
  return '';
};

/**
 * @description: 处理多选框 get
 * @Param:
 */
export const getMultipleChoiceGet = ({
  multipleChoice,
  setOther,
}: {
  multipleChoice: MultipleChoiceDataType;
  setOther?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // 如果 multipleChoice 不存在，直接返回
  if (!multipleChoice) {
    if (setOther) {
      setOther(false);
    }
    return multipleChoice;
  }
  // 如果为字符串，将它转换
  if (typeof multipleChoice === 'string')
    multipleChoice = JSON.parse(multipleChoice);
  if (multipleChoice.other === null) {
    // 不存在其他
    if (setOther) {
      setOther(false);
    }
    return multipleChoice;
  }
  // 存在其他
  if (setOther) {
    setOther(true);
  }
  // list中push一个 其他
  multipleChoice.radio.push('其他');
  return multipleChoice;
};

/**
 * @description: 处理多选框 post
 * @Param:
 */
export const getMultipleChoicePost = ({
  multipleChoice,
  other,
}: {
  multipleChoice: MultipleChoiceDataType;
  other?: boolean;
}) => {
  if (!multipleChoice) return multipleChoice;
  const result: string[] = [];
  if (!other) {
    if (!multipleChoice.radio) {
      // 不存在radio时，设置为[]
      multipleChoice.radio = result;
    }
    // 不存在其他
    multipleChoice.other = null;
    return multipleChoice;
  }
  // 存在其他 , 则删除多选中的其他
  if (multipleChoice.radio) {
    // eslint-disable-next-line guard-for-in
    for (const item of multipleChoice.radio) {
      if (item !== '其他') {
        result.push(item);
      }
    }
  }
  // 如果此时other为 null,undefined 设置为''
  if (multipleChoice.other === null || multipleChoice.other === undefined)
    multipleChoice.other = '';
  multipleChoice.radio = result;
  return multipleChoice;
};
