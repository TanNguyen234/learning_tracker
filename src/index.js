import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
// import store from "../src/config/redux-thunk.config";
const router = createBrowserRouter(
  [
    {
      path: "/*",
      element: <App />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);