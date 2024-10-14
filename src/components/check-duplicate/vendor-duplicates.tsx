import { ChangeEvent, useCallback, useState } from "react";
import { Button } from "antd";
import { Divider, Input, notification, Alert, Table } from "antd";
import "./vendor-duplicates.css";
import { type AllGames } from "../../utils/game-fetch.ts";
import { type Game } from "../../typings/game.ts";
import { type Vendor } from "../../typings/vendor.ts";
import type { CheckDuplicateTableColumn } from "../../typings/check-duplicate.ts";
import { checkDuplicateTableColumns } from "../../configs/check-duplicate.tsx";
import { VendorRadio } from "../vendor-radio/vendor-radio.tsx";

const { TextArea } = Input;

type Props = {
  gamesByVendor: {
    [vendorId: string]: Game[];
  };
  allGames: AllGames;
};

function VendorDuplicate({ gamesByVendor, allGames }: Props) {
  const [inputtedGameNames, setInputtedGameNames] = useState([] as string[]);
  const [vendor, setVendor] = useState("");
  const [duplicatedGames, setDuplicatedGames] = useState([] as Game[]);
  const [notifyApi, notifyContextHolder] = notification.useNotification();

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
      const onboardedGames = allGames[name];

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
    <div className="container">
      {notifyContextHolder}

      <div className="check-duplicate">
        <div className="">
          <p className="">请选择要查的游戏来自哪家 vendor</p>
          <VendorRadio value={vendor} onChange={handleChangeVendor} />
        </div>

        <Divider />

        <div className="">
          <p className="">请输入要检查的游戏的名字(每行一个名字)</p>
          <p className="">
            游戏数:{" "}
            <span className="">{inputtedGameNames.filter(Boolean).length}</span>
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

        {!!duplicatedGames.length && (
          <>
            <Alert
              message={
                <div className="">
                  <p className="">查重结果({duplicatedGames.length}):</p>
                  <Table
                    dataSource={duplicatedGames.map(
                      (game, i) =>
                        ({
                          key: game.Name + i,
                          gameName: game.Name,
                          vendor: game.VendorId,
                          playUrl: game.PlayUrl,
                          game,
                        }) as CheckDuplicateTableColumn,
                    )}
                    columns={checkDuplicateTableColumns}
                  />
                </div>
              }
              type="error"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default VendorDuplicate;
