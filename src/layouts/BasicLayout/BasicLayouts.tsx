import React, { useState, useEffect } from 'react';
import './BasicLayouts.css';
import {
  Menu,
  List,
  Card,
  Modal,
  Form,
  InputNumber,
  Spin,
  message,
  Drawer,
  Row,
  Col,
  TimePicker,
  DatePicker,
  Radio,
  Select,
  Dropdown,
  Image,
  Layout,
  Input,
  Button,
  Avatar,
  Upload,
  Tooltip,
  Popover,
} from 'antd';
import request from 'umi-request';
import { Link, connect, Dispatch, history } from 'umi';
import {
  UserOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  ScissorOutlined,
  SnippetsOutlined,
  RobotOutlined,
  UploadOutlined,
  EditOutlined,
} from '@ant-design/icons';
import topLogo from '@/assets/favicon.png';
import moment from 'moment';
import PeopleMsg from '@/components/SiderMsg';
import { SERVICEURL } from '@/utils/const';

const { Header, Sider, Footer, Content } = Layout;

const { Option } = Select;
const { Search } = Input;

const roles = ['医生', '护士', '管理员'];

interface BasicLayoutsContentProps {
  dispatch: Dispatch;
  sound_list: any;
  soundListLoading: boolean;
  // loading: boolean;
}

const BasicLayouts: React.FC<BasicLayoutsContentProps> = (props: any) => {
  const { dispatch, location, siderMsg } = props;
  console.log('siderMsg', siderMsg);
  const { pathname, query } = location;
  const [loading, setLoading] = useState(false);
  // const [sideMsg, setSideMsg] = useState({});

  const tmpuuid = 'bfd34afd-f97a9f7c-c0551428-93a0c48a-0285c8ce';
  useEffect(() => {
    if (
      ['/patientDetails'].indexOf(pathname) !== -1 &&
      Object.keys(query).length
    ) {
      console.log('dispatch主治医生');
      dispatch({
        type: 'SiderMsg/mainDoctorMsg',
        payload: query,
      });
    } else if (
      ['/segInfo', '/detect'].indexOf(pathname) !== -1 &&
      Object.keys(query).length
    ) {
      console.log('dispatch病人信息');
      dispatch({
        type: 'SiderMsg/PatientMsg',
        payload: query,
      });
    } else {
      console.log('dispatch用户');
      dispatch({
        type: 'SiderMsg/loginUserMsg',
      });
      // dispatch({
      //   type: 'SiderMsg/hospitalList',
      // });
    }
    return () => {};
  }, [location]);

  // 顶部菜单
  const TopMenu = () => {
    const { SubMenu } = Menu;
    const handleClick = (e: any) => {
      console.log(e);
    };

    return (
      <Menu
        onClick={handleClick}
        defaultSelectedKeys={[props.location.pathname]}
        mode="horizontal"
        style={{
          backgroundColor: '#f0f0f0',
          marginLeft: '18%',
        }}
      >
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link to="/">主页</Link>
        </Menu.Item>
        <SubMenu key="SubMenu" title="信息录入">
          <Menu.Item key="/basicInfo">
            <Link to="/basicInfo">基本信息录入</Link>
          </Menu.Item>
          <Menu.Item key="/medicalInfo">
            <Link to="/medicalInfo">诊疗信息录入</Link>
          </Menu.Item>
          <Menu.Item key="/CTInfo">
            <Link to="/CTInfo">CT影像录入</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="/infoSearch">
          <Link to="/infoSearch">信息检索</Link>
        </Menu.Item>
        <Menu.Item key="/segInfo">
          {/* uuid从props中获得，现在先用tmpuuid代替 */}
          {/* <Link to={`/imgSplit?uuid=${uuid}`}>肾脏图像分割</Link> */}
          <Link to={`/segInfo`}>肾脏图像分割</Link>
        </Menu.Item>
      </Menu>
    );
  };
  // 头像下拉菜单
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('roles');
            history.push('/user/login');
          }}
        >
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Layout>
        <Header
          style={{
            backgroundColor: '#f0f0f0',
            zIndex: 999,
            height: 66,
            // width:'100%'
          }}
        >
          <div className="leftMenu">
            <div className="logo">
              <img src={topLogo} alt="肾脏诊疗系统" style={{ width: 30 }} />
              <b>肾脏图像分割系统</b>
            </div>
            <TopMenu />
          </div>

          <div className="info">
            <span>
              <Link to="/staffManage">用户中心 </Link>
              {/* <Button>用户中心</Button> */}
            </span>
            <div style={{ float: 'right' }}>
              <Dropdown overlay={menu} placement="bottomRight">
                <Avatar
                  size={50}
                  style={{
                    color: '#f56a00',
                    backgroundColor: '#fde3cf',
                    marginTop: -7,
                  }}
                  icon={<UserOutlined />}
                />
              </Dropdown>
            </div>

            {/* <span>{` 您好，${
              CookieUtil.get('role')
                ? roles[CookieUtil.get('role') - 1]
                : 'null'
            }`}</span> */}
          </div>
        </Header>

        <Layout style={{ backgroundColor: '#343434' }}>
          <Sider className="side" width={350}>
            <PeopleMsg siderMsg={siderMsg} />
          </Sider>
          <Content className="main-content">{props.children}</Content>
        </Layout>

        <Footer
          style={{
            backgroundColor: '#292929',
            textAlign: 'center',
            padding: '12px 50px',
          }}
        >
          <div style={{ margin: '0 auto', width: 240, fontSize: 20 }}>
            <b>xxx</b>
          </div>
        </Footer>
      </Layout>
    </div>
  );
};

const mapStateToProps = ({ SiderMsg }: { SiderMsg: any }) => {
  const { siderMsg, hospitalList } = SiderMsg;
  return {
    siderMsg,
    hospitalList,
  };
};

export default connect(mapStateToProps)(BasicLayouts);
