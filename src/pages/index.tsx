import style from './index.less';

interface mainContentProps {
  MainPage: any;
}

const MainContent: React.FC<mainContentProps> = (props) => {
  return <div className={style.rightContent}>各个菜单界面</div>;
};

const mapStateToProps = ({ mainPage }: { mainPage: any }) => {
  return {
    MainPage: mainPage,
  };
};

export default connect(mapStateToProps)(MainContent);
