import { connect } from 'umi';
import style from './index.less';

// interface mainContentProps {
//   MainPage: any;
//   wappers: any;
// }

const MainContent: any = (props: any) => {
  return <div className={style.rightContent}>各个菜单界面</div>;
};

// MainContent.wrappers = ['@/wrappers/auth'];

const mapStateToProps = ({ mainPage }: { mainPage: any }) => {
  return {
    MainPage: mainPage,
  };
};

export default connect(mapStateToProps)(MainContent);
