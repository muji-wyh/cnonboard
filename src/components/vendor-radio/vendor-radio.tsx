import { vendors } from "../../configs/venders.ts";
import type { Vendor } from "../../typings/vendor.ts";
import { Radio, RadioChangeEvent } from "antd";

type Props = {
  value: Vendor["VendorId"];
  onChange: (value: Vendor["VendorId"]) => void;
};
export const VendorRadio = ({ value, onChange }: Props) => {
  return (
    <Radio.Group
      onChange={(e: RadioChangeEvent) => {
        onChange(e.target.value);
      }}
      value={value}
    >
      {vendors.map((v: Vendor) => (
        <Radio.Button key={v.VendorId} value={v.VendorId}>
          {v.VendorId}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};
