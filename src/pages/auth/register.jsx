import { Button, Form, Input, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import { postJson } from "../../utils/request";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/userSlice";
import { useState } from "react";
const { Title } = Typography;

function RegisterPage() {
  const dispatch = useDispatch();
  const [registerLoading, setRegisterLoading] = useState(false);
  const navigate = useNavigate();
  const register = async (values) => {
    setRegisterLoading(true)
    const resultAction = await postJson("/auth/", values);
    if (!resultAction ||!resultAction.email || !resultAction.username) message.error("Email hoặc username đã tồn tại!");
    else {
      message.success("Chúc mừng đã đăng ký thành công!");
      const handleLogin = async (values) => {
        try {
          console.log(values)
          const formData = new URLSearchParams();
          formData.append("username", values.username);
          formData.append("password", values.password);
          console.log(formData)
          const resultAction = await dispatch(loginUser(formData));
          setRegisterLoading(false)
          //  Kiểm tra nếu thành công
          if (loginUser.fulfilled.match(resultAction)) {
            navigate("/");
            message.success("Đăng nhập thành công!");
          } else {
            message.error(resultAction.payload || "Đăng nhập thất bại");
          }
        } catch (err) {
          message.error("Lỗi không xác định");
        }
      };
      handleLogin(resultAction)
    }
  };
  const handleRegister = (values) => {
    register(values);
  };

  return (
    <div className="auth">
      <div className="auth__box">
        <Title level={2}>Đăng ký</Title>

        <Form
          layout="vertical"
          onFinish={handleRegister}
          className="auth__form"
        >
          <Form.Item
            label="Tên người dùng"
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên người dùng" },
            ]}
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
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={registerLoading}
            >
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