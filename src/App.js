import './App.css';
import AllRoutes from './components/Allroutes';
import 'antd/dist/antd.css';
import './assets/scss/base.scss';
import './assets/scss/variables.scss';

// import { useDispatch } from 'react-redux';


function App() {
  // const dispatch = useDispatch()
  // const token = getCookie('token');

  // if(token) {
  //   dispatch(autoLogin(token));
  // }

  return (
    <AllRoutes />
  );
}

export default App;