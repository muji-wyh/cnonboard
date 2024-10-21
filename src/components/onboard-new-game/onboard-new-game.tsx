import { Button, Divider, Input } from "antd";
import type { Vendor } from "../../typings/vendor.ts";
import { useCallback, useState } from "react";
import { VendorRadio } from "../vendor-radio/vendor-radio.tsx";
import { Tips } from "../tips/tips.tsx";
import "./onboard-new-game.css";

const { TextArea } = Input;

export const OnboardNewGame = () => {
  const [vendor, setVendor] = useState("");

  const handleChangeVendor = useCallback((v: Vendor["VendorId"]) => {
    setVendor(v);
  }, []);

  const handleClick = useCallback(() => {}, []);

  return (
    <div className="onboard-new-wrap">
      <Tips content="上线工具 TODO" />

      <div className="">
        <p className="">请选择要上架哪家 vendor</p>

        <VendorRadio value={vendor} onChange={handleChangeVendor} />

        <Divider />

        <div className="">
          <p className="">请输入游戏名(每行一个)</p>
          <p className="">
            游戏数: <span className="">0</span>
          </p>

          <TextArea />
        </div>

        <Divider />

        <div className="">
          <Button onClick={handleClick}>开始</Button>
        </div>
      </div>
    </div>
  );
};
