import { NavLink, Outlet } from "react-router-dom";
import { Button, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { createContext, useCallback, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BookOutlined,
  LineChartOutlined,
  InfoCircleOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import "./style.scss";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../../actions/user";

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "Tài khoản",
    children: [
      {
        key: "1-1",
        icon: <InfoCircleOutlined />,
        label: <NavLink to="/user/profile">Thông tin tài khoản</NavLink>,
      },
      {
        key: "1-2",
        icon: <AuditOutlined />,
        label: <NavLink to="/user/forgot-password">Thay đổi mật khẩu tài khoản</NavLink>,
      },
      {
        key: "1-3",
        icon: <LineChartOutlined />,
        label: <NavLink to="/exam/statistics">Thống kê bài làm</NavLink>,
      },
    ],
  }
];


const itemsPublic = [
  {
    key: "1",
    icon: <BookOutlined />,
    label: <NavLink to="/topics">Chủ đề câu hỏi</NavLink>,
  },
];

// const itemsAdmin = [
//   {
//     key: "3",
//     icon: (
//       <NavLink to="/admin/topics">
//         <DiffOutlined />
//       </NavLink>
//     ),
//     label: "Quản lý chủ đề",
//   },
//   {
//     key: "4",
//     label: "Quản lý câu hỏi",
//     icon: (
//       <NavLink to="/admin/questions">
//         <QuestionOutlined />
//       </NavLink>
//     ),
//   },
//   {
//     key: "5",
//     icon: (
//       <NavLink to="/admin/users">
//         <UserSwitchOutlined />
//       </NavLink>
//     ),
//     label: "Quản lý users",
//   },
//   {
//     key: "6",
//     icon: (
//       <NavLink to="/admin/accounts">
//         <BookOutlined />
//       </NavLink>
//     ),
//     label: "Quản lý admins",
//   },
// ];

export const searchContext = createContext();

function DefaultLayout() {
  //   const dispatch = useDispatch();
  //   const isLogin = useSelector((state) => state.userReducer.state);
  const isLogin = true;

  const [collapsed, setCollapsed] = useState(false);
  const [isExpanded, setExpended] = useState(false);
  const [openKeys, setOpenKeys] = useState(null);

  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const handleClick = useCallback((e) => {
    const element = document.querySelectorAll(".ant-menu-submenu-open");

    if (element.length > 1) {
      element.forEach((el) => {
        el.classList.remove("ant-menu-submenu-open");
      });
      e.target.classList.remove("ant-menu-submenu-open");
    } else if (element.length === 1) {
      setExpended(true);
    } else {
      const e = document.querySelector('div[aria-expanded="true"]');
      if (!e) {
        setExpended(false);
      }
    }
  }, []);

  const handleCollapse = () => {
    setExpended(false);
    setCollapsed(!collapsed);
    if (!collapsed) {
      setOpenKeys([]); // Đóng submenu
    }
  };

  return (
    <>
      <Layout className="layout-default" style={{ minHeight: "100vh" }}>
        <Outlet />
        {/* <Sider
          className="layout-default__sider"
          trigger={null}
          breakpoint="lg"
          collapsible
          collapsed={collapsed}
          width={isExpanded ? "20%" : "12%"}
          onClick={handleClick}
        >
          <NavLink to="/">
            <div className="layout-default__logo">
              <img className="aligh-center" src="/images/logo.svg" alt="logo" />
            </div>
          </NavLink>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["1-1"]}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={isLogin ? items : itemsPublic}
          />
        </Sider>
        <Layout
          style={{
            marginLeft: collapsed ? 80 : 190,
            transition: "margin 0.3s ease-in-out",
          }}
        >
          <Header
            className="layout-default__header"
            style={{
              padding: 0,
              position: "fixed",
              zIndex: 100,
              top: 0,
              left: 0,
              width: "100vw",
              overflow: "auto",
            }}
          >
            <Button
              type="text"
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined style={{ fill: "#fff" }} />
                ) : (
                  <MenuFoldOutlined />
                )
              }
              onClick={handleCollapse}
              style={{
                marginLeft: collapsed ? 90 : 190,
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <span className="layout-default__header--box">
              {isLogin ? (
                // <NavLink onClick={() => dispatch(logout())} to="/">
                //   Đăng xuất
                // </NavLink>
                <NavLink to="/">Đăng xuất</NavLink>
              ) : (
                <>
                  <NavLink to="/user/login">Đăng nhập</NavLink>
                  <NavLink to="/user/register">Đăng ký</NavLink>
                </>
              )}
            </span>
          </Header>
          <Content
            style={{
              margin: "64px 16px",
              padding: 24,
              background: "#fff",
              borderRadius: "5px",
            }}
          >
            <main className="layout-default__main">
              <Outlet />
            </main>
          </Content>
          <Footer
            className="layout-default__footer"
            style={{
              textAlign: "center",
            }}
          >
            Foxy ©{new Date().getFullYear()} Created by Tan
          </Footer>
        </Layout> */}
      </Layout>
    </>
  );
}

export default DefaultLayout;
