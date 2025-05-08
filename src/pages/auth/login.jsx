import { Button, Form, Input, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import "./style.scss";
import { loginUser } from "../../redux/userSlice";

const { Title } = Typography;

function LoginPage() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate()

  const handleLogin = async (values) => {
    try {
      const resultAction = await dispatch(loginUser(values));
      //  Kiểm tra nếu thành công
      if (loginUser.fulfilled.match(resultAction)) {
        navigate('/')
        message.success("Đăng nhập thành công!");
      } else {
        message.error(resultAction.payload || "Đăng nhập thất bại");
      }
    } catch (err) {
      message.error("Lỗi không xác định");
    }
  };

  return (
    <div className="auth">
      <div className="auth__box">
        <Title level={2}>Đăng nhập</Title>

        <Form layout="vertical" onFinish={handleLogin} className="auth__form">
          <Form.Item
            label="Tên Đăng Nhập"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
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