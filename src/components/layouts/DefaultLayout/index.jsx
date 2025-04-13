import './style.scss';

//Component
import SiderComponent from './sider';
import HeaderComponent from './header';

//Package
import { Outlet } from 'react-router-dom';

//Antd
import { Layout } from 'antd';
const { Content } = Layout;

const DefaultLayout = () => (
  <Layout className='default-layout'>
      <SiderComponent />
      <Layout className='default-layout__inner'>
        <HeaderComponent />
        <Content className='default-layout__content' 
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}>
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
);
export default DefaultLayout;