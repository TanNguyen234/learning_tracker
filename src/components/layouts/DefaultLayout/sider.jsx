//Antd
import { DashboardOutlined, FileProtectOutlined, PieChartOutlined, PlusOutlined } from '@ant-design/icons';

import { Layout } from 'antd';
import { Link, NavLink, useLocation } from 'react-router-dom';
const { Sider } = Layout;


function SiderComponent() {
    const location = useLocation();
    const noneactive = "default-layout__sider--submenu";
    const active = noneactive + " active";

    return <Sider className='default-layout__sider'>
        <div className='default-layout__sider--logo'>
            <img src="/logo.png" alt="logo"/>
        </div>
        <div className='default-layout__sider--menu'>
                <Link to="/" className={location.pathname === '/' ? active : noneactive}>
                    <DashboardOutlined />
                    <span className='default-layout__sider--subtitle'>Tổng quan</span>
                </Link>
                <Link to="/skill" className={location.pathname === '/skill' ? active : noneactive}>
                    <PlusOutlined />
                    <span className='default-layout__sider--subtitle'>Thêm kĩ năng</span>
                </Link>
                <Link to='logs' className={location.pathname === '/logs' ? active : noneactive}>
                    <FileProtectOutlined />
                    <span className='default-layout__sider--subtitle'>Lịch sử</span>
                </Link>
                <Link to='stat' className={location.pathname === '/stat' ? active : noneactive}>
                    <PieChartOutlined />
                    <span className='default-layout__sider--subtitle'>Thống kê</span>
                </Link>
            </div>
    </Sider>
}

export default SiderComponent;