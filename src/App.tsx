import { type MenuProps, Menu } from "antd";
import CheckDuplicate from "./components/check-duplicate/check-duplicate";
import { menuItems, menuKeys } from "./configs/menu.tsx";
import { useState } from "react";
import { OnboardNewGame } from "./components/onboard-new-game/onboard-new-game.tsx";

function App() {
  const [currentMenuKey, setCurrentMenuKey] = useState(menuKeys.checkDuplicate);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrentMenuKey(e.key);
  };

  const compMap = {
    [menuKeys.checkDuplicate]: <CheckDuplicate />,
    [menuKeys.onboard]: <OnboardNewGame />,
  };

  return (
    <div className="">
      <Menu
        onClick={onClick}
        selectedKeys={[currentMenuKey]}
        mode="horizontal"
        items={menuItems}
      />
      {compMap[currentMenuKey]}
    </div>
  );
}

export default App;
