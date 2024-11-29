import "./vendor-manage-system.css";
import { Divider } from "antd";

export const VendorManageSystem = () => {
  return (
    <div className="main">
      <div className="vendor">
        <h4 className="head">yiqiyoo3</h4>
        <div className="body">
          <p className="item">
            <span className="label">URL</span>
            <a
              href="https://ibk.changjingtong.cn/"
              target="_blank"
              className="content"
            >
              https://ibk.changjingtong.cn/
            </a>
          </p>
          <p className="item">
            <span className="label">username</span>
            <span className="content">msnyx</span>
          </p>
          <p className="item">
            <span className="label">pwd</span>
            <span className="content">msnyx888</span>
          </p>
        </div>
      </div>
      <Divider />
    </div>
  );
};
