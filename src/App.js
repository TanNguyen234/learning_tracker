import "./App.css";
import AllRoutes from "./components/Allroutes";
import "antd/dist/antd.css";
import "./assets/scss/base.scss";
import "./assets/scss/variables.scss";
import { useDispatch } from "react-redux";
import { autoLoginUser } from "./redux/userSlice";
import { getCookie } from "./helpers/cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAutoLogin = async () => {
    try {
      const refresh_token = getCookie("refresh_token");
      if (!refresh_token) {
        navigate("/login");
        return;
      }
      const resultAction = await dispatch(autoLoginUser(refresh_token));
      //  Kiểm tra nếu thành công
      if (autoLoginUser.fulfilled.match(resultAction)) {
        navigate("/");
        message.success("Đăng nhập thành công!");
      } else {
        navigate("/login")
        message.error(resultAction.payload || "Đăng nhập thất bại");
      }
    } catch (err) {
      message.error("Lỗi không xác định");
    }
  };
  useEffect(() => {
    handleAutoLogin()
  }, []);

  return <AllRoutes />;
}

export default App;
