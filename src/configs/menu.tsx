import { type MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export const menuKeys = {
  checkDuplicate: "checkDuplicate",
  onboard: "onboard",
  debugInfo: "debugInfo",
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
