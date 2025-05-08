import './App.css';
import AllRoutes from './components/Allroutes';
import 'antd/dist/antd.css';
import './assets/scss/base.scss';
import './assets/scss/variables.scss';
import { useDispatch } from 'react-redux';
import { autoLoginUser } from './redux/userSlice';
import { getCookie } from './helpers/cookie'
import { useEffect } from 'react';


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const refresh_token = getCookie('refresh_token');
    if(refresh_token) {
      console.log(refresh_token)
      dispatch(autoLoginUser(refresh_token));
    }
  }, []);
  
  return (
    <AllRoutes />
  );
}

export default App;