import { Link, connect } from 'umi';
import React from 'react';
import logo from '../assets/logo.svg';
import styles from './UserLayouts.less';
import back from '../../assets/back.png';

const UserLayout = (props: any) => {
  return (
    <div
      style={{ width: '100%', height: '100%' }}
      className={styles.background}
    >
      {/* <img
        style={{ width: '100%', height: '100%', objectFit: 'fill', zIndex: -1 }}
        src={back}
      /> */}
      <div
        style={{
          position: 'absolute',
          zIndex: 1,
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default UserLayout;
