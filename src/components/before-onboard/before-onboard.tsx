import "./before-onboard.css";
import { Button, Divider } from "antd";
import { VendorRadio } from "../vendor-radio/vendor-radio.tsx";
import { useCallback, useState } from "react";
import type { Vendor } from "../../typings/vendor.ts";

export const BeforeOnboard = () => {
  const [vendor, setVendor] = useState("");

  const handleChangeVendor = useCallback((v: Vendor["VendorId"]) => {
    setVendor(v);
  }, []);

  const handleCheck = useCallback(() => {
    // todo-Yoki
    console.info(">>> checking");
  }, []);

  return (
    <div className="">
      <p className="">检查某个 vendor 的接口变动（跟现有线上数据的 dif）</p>

      <Divider />

      <p className="">请选择 vendor</p>
      <VendorRadio value={vendor} onChange={handleChangeVendor} />

      <Divider />

      <h4 className="">要上架的新游戏：</h4>

      <Divider />

      <h4 className="">将被删除的游戏：</h4>

      <Divider />

      <div className="">
        <Button onClick={handleCheck}>开始</Button>
      </div>
    </div>
  );
};
