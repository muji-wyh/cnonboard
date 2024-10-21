import "./debug-info.css";
import { Descriptions } from "antd";

export const DebugInfo = () => {
  return (
    <div className="debug-wrap">
      <Descriptions
        title="Location Info"
        items={[
          {
            key: "location-info",
            label: "Location Info",
            children: window.location.href,
          },
        ]}
      />
    </div>
  );
};
