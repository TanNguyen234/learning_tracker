// LoginPage.jsx
import { Button, Form, Input, Typography, message } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import "./style.scss";
import { userSlice } from "./userSlice";

const { Title } = Typography;

function LoginPage() {
  const dispatch = useDispatch();

  const handleLogin = (values) => {
    message.success("Đăng nhập thành công!");
    console.log("Login values:", values);
    dispatch(userSlice.actions.login({...values, token: 'successfully'}))
  };

  return (
    <div className="auth">
      <div className="auth__box">
        <Title level={2}>Đăng nhập</Title>

        <Form layout="vertical" onFinish={handleLogin} className="auth__form">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>

          <div className="auth__switch">
            Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;