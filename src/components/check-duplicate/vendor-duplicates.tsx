import { ChangeEvent, useCallback, useState } from "react";
import { Button, Popover, RadioChangeEvent } from "antd";
import { Radio, Divider, Input, notification, Alert, Table } from "antd";
import "./vendor-duplicates.css";
import { Game, Vendor, vendors } from "../../configs/venders.ts";
import { GameCard } from "../game-card/game-card.tsx";
import { type AllGames } from "../../utils/game-fetch.ts";

const { TextArea } = Input;

type Column = {
  gameName: string;
  key: string;
  vendor: string;
  playUrl: string;
  game: Game;
};

const columns = [
  {
    title: "游戏名称",
    key: "gameName",
    dataIndex: "gameName",
    render(_: string, { game }: Column) {
      return (
        <Popover
          content={
            <TextArea
              className="game-detail-data"
              value={JSON.stringify(Object.assign(game), undefined, 4)}
            />
          }
          title="数据详情"
          trigger="click"
        >
          <span className="">{game.Name}</span>
        </Popover>
      );
    },
  },
  {
    title: "vendor",
    key: "vendor",
    dataIndex: "vendor",
    sorter: (a: Column, b: Column) => (a.vendor > b.vendor ? -1 : 1),
  },
  {
    title: "playUrl",
    key: "playUrl",
    dataIndex: "playUrl",
    render(_: string, g: Column) {
      return (
        <div className="game-column">
          <GameCard game={g.game} type="vendor" />
          <GameCard game={g.game} type="msn" />
        </div>
      );
    },
  },
];

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

  const handleChangeVendor = useCallback((e: RadioChangeEvent) => {
    setVendor(e.target.value);
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
          <Radio.Group onChange={handleChangeVendor} value={vendor}>
            {vendors.map((v: Vendor) => (
              <Radio.Button key={v.VendorId} value={v.VendorId}>
                {v.VendorId}
              </Radio.Button>
            ))}
          </Radio.Group>
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
                        }) as Column,
                    )}
                    columns={columns}
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