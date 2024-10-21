import { type MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export const menuKeys = {
  checkDuplicate: "checkDuplicate",
  totalDuplicate: "totalDuplicate",
  onboard: "onboard",
  debugInfo: "debugInfo",
  beforeOnboard: "beforeOnboard",
  onlineGameSummary: "onlineGameSummary",
};

export const menuItems: MenuItem[] = [
  {
    key: menuKeys.checkDuplicate,
    label: "查重",
  },
  {
    key: menuKeys.beforeOnboard,
    label: "预上线检查",
  },
  {
    key: menuKeys.onboard,
    label: "onboard",
  },
  {
    key: menuKeys.totalDuplicate,
    label: "total-duplicate",
  },
  {
    key: menuKeys.debugInfo,
    label: "debug info",
  },
];
