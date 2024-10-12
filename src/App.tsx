import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { Button, RadioChangeEvent, Spin } from "antd";
import { Radio, Divider, Input, notification, Alert, Table } from "antd";
import "./App.css";
import { Game, Vendor, vendors } from "./venders.ts";

const { TextArea } = Input;

type AllGames = {
  [name: string]: Game;
};

type Column = {
  gameName: string;
  key: string;
  vendor: string;
};

const columns = [
  {
    title: "游戏名称",
    key: "gameName",
    dataIndex: "gameName",
  },
  {
    title: "vendor",
    key: "vendor",
    dataIndex: "vendor",
    sorter: (a: Column, b: Column) => (a.vendor > b.vendor ? -1 : 1),
  },
];

function App() {
  const [loading, setLoading] = useState(false);
  const [inputtedGameNames, setInputtedGameNames] = useState("");
  const [vendor, setVendor] = useState("");
  const [duplicatedGames, setDuplicatedGames] = useState([] as Game[]);
  const allGames = useRef({} as AllGames);
  const [notifyApi, notifyContextHolder] = notification.useNotification();

  const showNotify = useCallback((desc: string, msg: string = "错误") => {
    notifyApi.info({
      message: msg,
      description: desc,
      placement: "top",
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);

    Promise.all(
      vendors.map(
        (vendor: Vendor) =>
          new Promise<Game[]>((resolve, reject) => {
            fetch(vendor.Api, { signal })
              .then((res) => res.json())
              .then((data) => {
                let result: Game[];

                if (!Array.isArray(data)) {
                  result = data.data as Game[];
                } else {
                  result = data as Game[];
                }

                resolve(
                  result.map((d) =>
                    Object.assign(d, {
                      VendorId: vendor.VendorId,
                    }),
                  ),
                );
              })
              .catch((e) => {
                if (e.name === "AbortError") {
                  return;
                }

                reject(e);
              });
          }),
      ),
    )
      .then((data: Game[][]) => {
        allGames.current = data.reduce((acc, cur) => {
          for (const game of cur) {
            acc[game.Name] = game;
          }
          return acc;
        }, {} as AllGames);
        setLoading(false);
      })
      .catch((e) => {
        showNotify(e.message);
        setLoading(false);
      });

    return () => {
      setLoading(false);
      controller.abort();
    };
  }, []);

  const handleGameNameInput = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setInputtedGameNames(e.currentTarget?.value);
    },
    [],
  );

  const handleChangeVendor = useCallback((e: RadioChangeEvent) => {
    setVendor(e.target.value);
  }, []);

  const handleCheckDuplicate = useCallback(() => {
    if (!inputtedGameNames) {
      showNotify("请输入要检查的游戏");
      return;
    }

    if (!vendor) {
      showNotify("请选择 vendor");
      return;
    }

    // check duplicate
    const result = inputtedGameNames.split("\n").reduce((acc, cur) => {
      const name = cur.trim();
      const game = allGames.current[name];

      if (game && game.VendorId !== vendor) {
        acc.push(game);
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

      <div className="">
        <p>debug info</p>
        <span>{window.location.href}</span>
      </div>

      <Spin tip="Loading" size="large" spinning={loading}>
        <div className="check-duplicate">
          <h1 className="">新上架游戏查重</h1>

          <div className="">
            <Button onClick={handleCheckDuplicate}>开始</Button>
          </div>

          <Divider />

          {!!duplicatedGames.length && (
            <>
              <Alert
                message={
                  <div className="">
                    <p className="">查重结果:</p>
                    <Table
                      dataSource={duplicatedGames.map(
                        (game) =>
                          ({
                            key: game.Name,
                            gameName: game.Name,
                            vendor: game.VendorId,
                          }) as Column,
                      )}
                      columns={columns}
                    />
                  </div>
                }
                type="error"
              />
              <Divider />
            </>
          )}

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
            <TextArea
              rows={20}
              value={inputtedGameNames}
              onChange={handleGameNameInput}
            />
          </div>
        </div>
      </Spin>
    </div>
  );
}

export default App;
