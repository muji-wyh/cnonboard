import { Button, Divider, Input, Radio, RadioChangeEvent } from "antd";
import { vendors } from "../../configs/venders.ts";
import type { Vendor } from "../../typings/vendor.ts";
import { useCallback, useState } from "react";

const { TextArea } = Input;

export const OnboardNewGame = () => {
  const [vendor, setVendor] = useState("");

  const handleChangeVendor = useCallback((e: RadioChangeEvent) => {
    setVendor(e.target.value);
  }, []);

  const handleClick = useCallback(() => {}, []);

  return (
    <div className="">
      <div className="">
        <p className="">请选择要上架哪家 vendor</p>

        <Radio.Group onChange={handleChangeVendor} value={vendor}>
          {vendors.map((v: Vendor) => (
            <Radio.Button key={v.VendorId} value={v.VendorId}>
              {v.VendorId}
            </Radio.Button>
          ))}
        </Radio.Group>

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
