import "./vendor-manage-system.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { StoreContext } from "../../configs/store-context.ts";
import { VendorRadio } from "../vendor-radio/vendor-radio.tsx";
import type { Vendor } from "../../typings/vendor.ts";
import { Divider, Input, Space } from "antd";

const { Search } = Input;

const managerSystemConfig = [
  [
    "yiqiyoo",
    {
      url: "https://ibk.changjingtong.cn/",
      username: "msnyx",
      pwd: "msnyx888",
    },
  ],
];

export const VendorManageSystem = () => {
  const [vendor, setVendor] = useState("");
  const storeContext = useContext(StoreContext);
  const { isStaging } = storeContext;

  useEffect(() => {
    setVendor("");
  }, [isStaging]);

  const handleChangeVendor = useCallback((v: Vendor["VendorId"]) => {
    setVendor(v);
  }, []);

  return (
    <div className="">
      <p className="">请选择 vendor</p>
      <VendorRadio value={vendor} onChange={handleChangeVendor} />

      <Divider />

      <div className="">
        <Search addonBefore="url" allowClear />
        <Search addonBefore="username" allowClear />
        <Search addonBefore="pwd" allowClear />
      </div>

      <iframe className="ifm" src="https://ibk.changjingtong.cn/" />
    </div>
  );
};
