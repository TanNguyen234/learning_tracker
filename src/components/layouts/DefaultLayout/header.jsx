//Antd
import { MenuOutlined } from '@ant-design/icons';
import { Button, Grid, Layout } from 'antd';
import { Link, useLocation } from 'react-router-dom';
const { Header } = Layout;

const path = {
    '/': 'Tổng quan',
    '/skill': 'Kỹ năng',
    '/logs': 'Lịch sử',
    '/stat': 'Thống kê'
}
const { useBreakpoint } = Grid;


function HeaderComponent({ onOpenDrawer }) {
    const location = useLocation();
    const screens = useBreakpoint(); // 👈 lấy trạng thái responsive

    const isLogin = true;

    return <Header className='default-layout__header'>
        {/* Chỉ hiển thị menu icon khi có onOpenDrawer */}
      {!screens.md &&  onOpenDrawer && (
        <button className="menu-btn" onClick={onOpenDrawer}>
          <MenuOutlined />
        </button>
      )}
        <div className='default-layout__header--title'>
            {location.pathname in path && path[location.pathname]}
        </div>
        <div className='default-layout__header--login'>
            {isLogin ? <Link to="/">
                Đăng xuất
            </Link>: <>
                <Link to="/login">
                    Đăng nhập
                </Link>
            </>}
        </div>
    </Header>
}

export default HeaderComponent;