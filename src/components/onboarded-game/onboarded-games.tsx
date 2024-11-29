import { Divider } from "antd";
import type { Vendor } from "../../typings/vendor.ts";
import { useCallback, useState } from "react";
import { VendorRadio } from "../vendor-radio/vendor-radio.tsx";
import "./onboarded-games.css";

export const OnboardedGames = () => {
  const [vendor, setVendor] = useState("");

  const handleChangeVendor = useCallback((v: Vendor["VendorId"]) => {
    setVendor(v);
  }, []);

  return (
    <div className="onboard-new-wrap">
      <div className="">
        <VendorRadio value={vendor} onChange={handleChangeVendor} />

        <Divider />
      </div>
    </div>
  );
};
