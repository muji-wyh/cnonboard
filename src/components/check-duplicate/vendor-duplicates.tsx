import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button } from "antd";
import { Divider, Input, notification } from "antd";
import "./vendor-duplicates.css";
import { type Game } from "../../typings/game.ts";
import { type Vendor } from "../../typings/vendor.ts";
import { VendorRadio } from "../vendor-radio/vendor-radio.tsx";
import { StoreContext } from "../../configs/store-context.ts";
import { getTableColumn } from "../../utils/game.ts";
import { Tips } from "../tips/tips.tsx";
import { GameTable } from "../game-table/game-table.tsx";

const { TextArea } = Input;

function VendorDuplicate() {
  const [inputtedGameNames, setInputtedGameNames] = useState([] as string[]);
  const [vendor, setVendor] = useState("");
  const [duplicatedGames, setDuplicatedGames] = useState([] as Game[]);
  const [notifyApi, notifyContextHolder] = notification.useNotification();
  const storeContext = useContext(StoreContext);
  const { gamesByVendor, allVendorGamesMap, isStaging } = storeContext;

  useEffect(() => {
    setInputtedGameNames([]);
    setVendor("");
    setDuplicatedGames([]);
  }, [isStaging]);

  const showNotify = useCallback((desc: string, msg: string = "错误") => {
    notifyApi.info({
      message: msg,
      description: desc,
      placement: "top",
    });
  }, []);

  const handleGameNameInput = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setInputtedGameNames(
        e.currentTarget?.value.split("\n").map((d) => d.trim()),
      );
    },
    [],
  );

  const handleChangeVendor = useCallback((v: Vendor["VendorId"]) => {
    setVendor(v);
    setInputtedGameNames([]);
  }, []);

  const handleCheckDuplicate = useCallback(() => {
    if (!vendor) {
      showNotify("请选择 vendor");
      return;
    }

    let gamesToBeChecked: string[] = inputtedGameNames.filter(Boolean);

    if (!gamesToBeChecked.length) {
      gamesToBeChecked = gamesByVendor[vendor].map((d) => d.Name);
      setInputtedGameNames(gamesToBeChecked);
    }

    // check duplicate
    const result = gamesToBeChecked.reduce((acc, cur) => {
      const name = cur.trim();
      const onboardedGames = allVendorGamesMap[name];

      if (onboardedGames) {
        for (const onboardedGame of onboardedGames) {
          if (onboardedGame.VendorId !== vendor) {
            acc.push(onboardedGame);
          }
        }
      }

      return acc;
    }, [] as Game[]);

    if (!result.length) {
      showNotify("无重复", "查重结果");
    }

    setDuplicatedGames(result);
  }, [vendor, inputtedGameNames]);

  return (
    <div className="vendor-dup-container">
      {notifyContextHolder}

      <Tips content="各 vendor 间相互查重" />

      <div className="check-duplicate">
        <div className="">
          <p className="">请选择要查的游戏来自哪家 vendor</p>
          <VendorRadio value={vendor} onChange={handleChangeVendor} />
        </div>

        {!!vendor && (
          <>
            <Divider />

            <div className="">
              <p className="">
                请输入要检查的游戏的名字（每行一个名字）（为空时检查所有游戏）
              </p>
              <p className="">
                游戏数:{" "}
                <span className="">
                  {inputtedGameNames.filter(Boolean).length}
                </span>
              </p>
              <TextArea
                rows={10}
                value={inputtedGameNames.join("\n")}
                onChange={handleGameNameInput}
              />
            </div>

            <Divider />

            <div className="">
              <Button onClick={handleCheckDuplicate}>开始</Button>
            </div>

            <Divider />

            <GameTable
              list={duplicatedGames.map((game, i) =>
                getTableColumn(game, "vendor", i),
              )}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default VendorDuplicate;
