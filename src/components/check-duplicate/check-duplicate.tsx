import { useCallback, useState } from "react";
import { Tabs } from "antd";
import "./check-duplicate.css";
import VendorDuplicate from "./vendor-duplicates.tsx";
import TotalDuplicate from "./total-duplicates.tsx";

const activeKeys = {
  vendor: "vendor",
  total: "total",
};

function CheckDuplicate() {
  const [activeKey, setActiveKey] = useState(activeKeys.vendor);

  const handleActiveKeyChange = useCallback((key: string) => {
    setActiveKey(key);
  }, []);

  return (
    <div className="container">
      <Tabs
        activeKey={activeKey}
        items={[
          {
            key: activeKeys.vendor,
            label: "查重",
            children: <VendorDuplicate />,
          },
          {
            key: activeKeys.total,
            label: "总体重复情况",
            children: <TotalDuplicate />,
          },
        ]}
        onChange={handleActiveKeyChange}
      />
    </div>
  );
}

export default CheckDuplicate;
