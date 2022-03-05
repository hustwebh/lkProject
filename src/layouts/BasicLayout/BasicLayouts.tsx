/*
 * @Author: Meng Tian
 * @Date: 2022-03-05 11:13:10
 * @Descripttion: Do not edit
 */
// export default connect(mapStateToProps)(BasicLayouts)
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
import topLogo from '@/assets/rayplus.png';
import moment from 'moment';
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
  const {
    dispatch,
    // sound_list,
    // soundListLoading,
    // searchListLoading,
    location,
  } = props;
  console.log('reRender2');

  // useEffect(() => {
  //   dispatch({
  //     type: 'soundList/fetchSoundList',
  //   });
  //   return () => {};
  // }, [1]);

  // useEffect(() => {
  //   if (sound_list) {
  //     console.log('sound_list', sound_list);
  //   }
  // }, [sound_list]);

  // useEffect(() => {
  //   dispatch({
  //     type: 'pretreatment/setAudio',
  //     payload: {
  //       audio_id: undefined,
  //       audio_name: undefined,
  //       audio_versions: undefined,
  //       tips: undefined,
  //     },
  //   });
  //   dispatch({
  //     type: 'features/setAudio',
  //     payload: {
  //       audio_id: undefined,
  //       audio_name: undefined,
  //     },
  //   });
  //   dispatch({
  //     type: 'target/setAudio',
  //     payload: {
  //       audio_id: undefined,
  //       audio_name: undefined,
  //     },
  //   });
  // }, [location]);

  const [sumForm] = Form.useForm();
  const [loading, setloading] = useState(false);

  // const InforDrawer = ({ id, visible, setvisible }:{id:number,visible:any,setvisible:any}) => {
  //   const [item, setitem] = useState(undefined);

  //   useEffect(() => {
  //     // console.log("audioID", id);
  //     if (id && visible === true) {
  //       dispatch({
  //         type: 'soundList/getAudioInforById',
  //         payload: { id: id },
  //         setitem: setitem,
  //       });
  //     }
  //     return () => {};
  //   }, [visible]);

  //   useEffect(() => {
  //     // console.log("detail", item);
  //     if (item) {
  //       if (visible) {
  //         // console.log('sound_data', item);
  //         sumForm.resetFields();
  //         sumForm.setFieldsValue({
  //           ...item,
  //           collect_d: item.collect_time
  //             ? moment(item.collect_time?.split(' ')[0], 'YYYY/MM/DD')
  //             : undefined,
  //           collect_t: item.collect_time
  //             ? moment(item.collect_time?.split(' ')[1], 'HH:mm:ss')
  //             : undefined,
  //           shaft_blade_rotationl: `${item.shaft_count}_${item.blade_count}_${item.rotationl_speed}`,
  //         });
  //       }
  //     }
  //   }, [item]);

  //   return (
  //     <Drawer
  //       title={item?.name}
  //       visible={visible}
  //       // onOk={() => setvisible(false)}
  //       onClose={() => setvisible(false)}
  //       placement="left"
  //       width={850}
  //       footer={
  //         <div
  //           style={{
  //             textAlign: 'right',
  //           }}
  //         >
  //           <Button
  //             onClick={() => {
  //               sumForm.submit();
  //             }}
  //             type="primary"
  //             // disabled={CookieUtil.get('role') === '3' ? true : false}
  //           >
  //             修改信息
  //           </Button>
  //         </div>
  //       }
  //     >
  //       {/* <AddSound sound_data={item} sumForm={sumForm} /> */}
  //     </Drawer>
  //   );
  // };

  // 左侧文件列表
  // const SideCardList = () => {
  //   const [visible, setvisible] = useState(false);
  //   const [audioID, setaudioID] = useState(undefined);

  //   return (
  //     <div
  //       style={{
  //         overflowY: 'auto',
  //         width: '100%',
  //         height: '100%',
  //         overflowX: 'hidden',
  //       }}
  //     >
  //       <Spin spinning={soundListLoading || loading}>
  //         <List
  //           grid={{ gutter: 16, column: 1 }}
  //           dataSource={sound_list}
  //           renderItem={(item: any) => {
  //             return (
  //               <List.Item>
  //                 <Tooltip title={item.name}>
  //                   <Card
  //                     hoverable={true}
  //                     title={item.name}
  //                     style={{
  //                       width: '92%',
  //                       marginLeft: '4%',
  //                       borderColor: '#595959',
  //                     }}
  //                   >
  //                     <Actions
  //                       id={item.id}
  //                       setvisible={setvisible}
  //                       setaudioID={setaudioID}
  //                     />
  //                   </Card>
  //                 </Tooltip>
  //               </List.Item>
  //             );
  //           }}
  //         />
  //       </Spin>
  //       <InforDrawer id={audioID} visible={visible} setvisible={setvisible} />
  //     </div>
  //   );
  // };

  // 顶部菜单
  const TopMenu = () => {
    const { SubMenu } = Menu;
    const handleClick = (e: any) => {
      console.log(e);
    }

    return (
      <Menu
        onClick={handleClick}
        defaultSelectedKeys={[props.location.pathname]}
        mode="horizontal"
        style={{ float: 'left' }}
      >
          <SubMenu key="SubMenu" title="信息录入">
            <Menu.Item key="setting:1">
              <Link to="/basicInfo-input">基本信息录入</Link>
            </Menu.Item>
            <Menu.Item key="setting:2">
              <Link to="/doctorInfo-input">诊疗信息录入</Link>
              </Menu.Item>
            <Menu.Item key="setting:2">
              <Link to="/CTInfo-input">CT影像录入</Link>
            </Menu.Item>
          </SubMenu>
        <Menu.Item key="/info-search" icon={<HomeOutlined />}>
          <Link to="/info-search">信息检索</Link>
        </Menu.Item>
        <Menu.Item key="/img-split" icon={<HomeOutlined />}>
          <Link to="/img-split">肾脏图像分割</Link>
        </Menu.Item>
      </Menu>
    );
  }

  // 更改密码modal框
  // const ChangePasswordModal = () => {
  //   const [visible, setvisible] = useState(false);
  //   const [pwform] = Form.useForm();
  //   useEffect(() => {
  //     if (visible) {
  //       pwform.resetFields();
  //     }
  //   }, [visible]);

  // //   const handleSubmit = (values: any) => {
  // //     // console.log(values);
  // //     request('/v1/user/password', {
  // //       method: 'PUT',
  // //       data: values,
  // //     }).then((res) => {
  // //       if (res) {
  // //         message.success('修改成功！');
  // //       } else {
  // //         message.error('修改失败！');
  // //       }
  // //       setvisible(false);
  // //     });
  // //   };

  // //   return (
  // //     <>
  // //       <a
  // //         onClick={() => {
  // //           setvisible(true);
  // //         }}
  // //       >
  // //         修改密码
  // //       </a>

  // //       <Modal
  // //         title="修改密码"
  // //         visible={visible}
  // //         onCancel={() => {
  // //           setvisible(false);
  // //         }}
  // //         onOk={() => {
  // //           pwform.submit();
  // //         }}
  // //       >
  // //         <Form form={pwform} onFinish={handleSubmit}>
  // //           <Form.Item
  // //             label="旧密码"
  // //             name="oldpassword"
  // //             labelAlign="right"
  // //             labelCol={{ span: 4 }}
  // //             rules={[
  // //               {
  // //                 required: true,
  // //                 message: '请输入旧密码!',
  // //               },
  // //               {
  // //                 pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
  // //                 message: '密码必须包含数字和英文，长度6-20!',
  // //               },
  // //             ]}
  // //           >
  // //             <Input autoComplete="off" />
  // //           </Form.Item>
  // //           <Form.Item
  // //             label="新密码"
  // //             name="newpassword"
  // //             labelAlign="right"
  // //             labelCol={{ span: 4 }}
  // //             rules={[
  // //               {
  // //                 required: true,
  // //                 message: '请输入密码!',
  // //               },
  // //               {
  // //                 pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
  // //                 message: '新密码必须包含数字和英文，长度6-20!',
  // //               },
  // //             ]}
  // //             hasFeedback
  // //           >
  // //             <Input autoComplete="off" />
  // //           </Form.Item>
  // //           <Form.Item
  // //             label="确认密码"
  // //             name="renewpassword"
  // //             labelAlign="right"
  // //             labelCol={{ span: 4 }}
  // //             rules={[
  // //               {
  // //                 required: true,
  // //                 message: '请输入密码!',
  // //               },
  // //               ({ getFieldValue }) => ({
  // //                 validator(rule, value) {
  // //                   if (!value || getFieldValue('newpassword') === value) {
  // //                     return Promise.resolve();
  // //                   }
  // //                   return Promise.reject('两次输入的密码不一致！');
  // //                 },
  // //               }),
  // //             ]}
  // //           >
  // //             <Input autoComplete="off" />
  // //           </Form.Item>
  // //         </Form>
  // //       </Modal>
  // //     </>
  // //   );
  // // };

  // // 更改用户名modal框
  // // const ChangeNicknameModal = () => {
  // //   const [visible, setvisible] = useState(false);
  // //   const [form] = Form.useForm();
  // //   useEffect(() => {
  // //     if (visible) {
  // //       form.resetFields();
  // //     }
  // //   }, [visible]);

  //   // const handleSubmit = (values: any) => {
  //   //   // console.log(values);
  //   //   request('/v1/user/nickname', {
  //   //     method: 'PUT',
  //   //     data: values,
  //   //   }).then((res) => {
  //   //     if (res) {
  //   //       message.success('修改成功！');
  //   //     } else {
  //   //       message.error('修改失败！');
  //   //     }
  //   //     setvisible(false);
  //   //   });
  //   // };

  //   // return (
  //   //   <>
  //   //     <a
  //   //       onClick={() => {
  //   //         setvisible(true);
  //   //       }}
  //   //     >
  //   //       修改昵称
  //   //     </a>

  //   //     <Modal
  //   //       title="修改昵称"
  //   //       visible={visible}
  //   //       onCancel={() => {
  //   //         setvisible(false);
  //   //       }}
  //   //       onOk={() => {
  //   //         form.submit();
  //   //       }}
  //   //     >
  //   //       <Form form={form} onFinish={handleSubmit}>
  //   //         <Form.Item
  //   //           label="新昵称"
  //   //           name="nickname"
  //   //           labelAlign="right"
  //   //           labelCol={{ span: 4 }}
  //   //         >
  //   //           <Input autoComplete="off" />
  //   //         </Form.Item>
  //   //       </Form>
  //   //     </Modal>
  //   //   </>
  //   // );
  // };

  // 头像下拉菜单
  const menu = (
    <Menu>
      <Menu.Item>
        {/* <ChangeNicknameModal /> */}
      </Menu.Item>
      <Menu.Item>
        {/* <ChangePasswordModal /> */}
      </Menu.Item>
      {/* <Menu.Item>
        <a
          onClick={() => {
            CookieUtil.unsetAll();
            history.push('/user/login');
          }}
        >
          退出登录
        </a>
      </Menu.Item> */}
    </Menu>
  );

  return (
    <div>
      <Layout>
        <Header style={{ backgroundColor: '#2D2D2D', zIndex: 999, height: 66 }}>
          <div className="logo">
            <img src={topLogo} alt="水声系统" style={{ width: 60 }} />
            <b>肾脏诊疗系统</b>
          </div>

          <TopMenu />

          <div style={{ float: 'right' }}>
            <Dropdown overlay={menu} placement="bottomRight">
              <Avatar
                size={48}
                style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                icon={<UserOutlined />}
              />
            </Dropdown>
          </div>

          <div className="info">
            <span
              style={
                {
                  // display: CookieUtil.get('role') == 1 ? 'inline' : 'none',
                }
              }
            >
              <Link to="/staffManage">用户中心 </Link>|
            </span>

            {/* <span>{` 您好，${
              CookieUtil.get('role')
                ? roles[CookieUtil.get('role') - 1]
                : 'null'
            }`}</span> */}
          </div>
        </Header>
        <Layout style={{ backgroundColor: '#343434' }}>
          <Sider className="side" width={350}>
            左侧工具栏
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
}

const mapStateToProps = ({ loading, soundList }: { loading: boolean, soundList: any }) => {
  // console.log(loading)
  return {
    // InforImport: inforImport,
    // soundListLoading: loading.effects['soundList/fetchSoundList'],
    // sound_list: soundList.sound_list,
  };
};

export default connect(mapStateToProps)(BasicLayouts);
