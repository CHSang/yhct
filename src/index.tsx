import "antd/dist/antd.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import UnsupportedPlatform from "./pages/UnsupportedPlatform";
import reportWebVitals from "./reportWebVitals";
import { isPlatformSupported, getBrowser } from "./services/PlatformService";
import { BROWSER } from "./share/EnumType";

ReactDOM.render(
  <React.StrictMode>
    {!isPlatformSupported() ? (
      <UnsupportedPlatform
        errorMessage={"Phiên bản dành cho máy tính chưa được hỗ trợ"}
      />
    ) : getBrowser() === BROWSER.UNKNOWN ? (
      <UnsupportedPlatform
        errorMessage={"Vui lòng truy cập bằng trình duyệt điện thoại"}
      />
    ) : (
      <App />
    )}
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
