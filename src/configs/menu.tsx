import { type MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export const menuKeys = {
  checkDuplicate: "checkDuplicate",
  onboard: "onboard",
  debugInfo: "debugInfo",
  beforeOnboard: "beforeOnboard",
  onlineGameSummary: "onlineGameSummary",
};

export const menuItems: MenuItem[] = [
  {
    label: "Tools",
    key: "tools",
    children: [
      {
        label: "查重",
        key: menuKeys.checkDuplicate,
      },
      {
        label: "预上线检查",
        key: menuKeys.beforeOnboard,
      },
      {
        label: "现有游戏统计",
        key: menuKeys.onlineGameSummary,
      },
    ],
  },
  {
    label: "onboard",
    key: menuKeys.onboard,
  },
  {
    label: "debug info",
    key: menuKeys.debugInfo,
  },
];
