//Antd
import { Layout } from 'antd';
import { Link, useLocation } from 'react-router-dom';
const { Header } = Layout;

function HeaderComponent() {
    const location = useLocation();
    const path = {
        '/dashboard': 'Tổng quan',
        '/skill': 'Kỹ năng',
        '/logs': 'Lịch sử',
        '/stat': 'Thống kê'
    }
    const isLogin = true;

    return <Header className='default-layout__header'>
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