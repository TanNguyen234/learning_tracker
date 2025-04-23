import { Button, Form, Input, Typography, message } from "antd";
import { Link } from "react-router-dom";
import "./style.scss";

const { Title } = Typography;

function RegisterPage() {
  const handleRegister = (values) => {
    message.success("Đăng ký thành công!");
    console.log("Register values:", values);
  };

  return (
    <div className="auth">
      <div className="auth__box">
        <Title level={2}>Đăng ký</Title>

        <Form layout="vertical" onFinish={handleRegister} className="auth__form">
          <Form.Item
            label="Tên người dùng"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên người dùng" }]}
          >
            <Input />
          </Form.Item>

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
              Đăng ký
            </Button>
          </Form.Item>

          <div className="auth__switch">
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;