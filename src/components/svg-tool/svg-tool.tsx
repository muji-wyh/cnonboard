import "./svg-tool.css";
import { Divider, Button, Pagination, notification, Input } from "antd";
import { useCallback, useState } from "react";

type Item = [name: string, url: string];

export const SvgTool = () => {
  const [urlList, setUrlList] = useState([] as Item[]);
  const [curPage, setCurPage] = useState(1);
  const [pageSize, setPageSize] = useState(500);
  const [filterVal, setFilterVal] = useState("");
  const [notifyApi, notifyContextHolder] = notification.useNotification();

  const handlePickFolder = useCallback(async () => {
    const fileUrlList = [];

    // @ts-ignore
    const directoryPicker = await window.showDirectoryPicker();

    const iter = await directoryPicker.entries();

    for await (const info of iter) {
      const file = await info[1].getFile();
      const url = URL.createObjectURL(file);
      fileUrlList.push([info[0].replace(".svg", ""), url] as Item);
    }

    setUrlList(fileUrlList);
  }, []);

  const handlePageChange = useCallback((pageNum: number, pageSize: number) => {
    setCurPage(pageNum);
    setPageSize(pageSize);
  }, []);

  const handleFilterIptChange = useCallback((e: any) => {
    setFilterVal((e.target as HTMLInputElement)?.value);
  }, []);

  return (
    <div className="">
      {notifyContextHolder}
      <Divider />

      <div className="edit-wrap">
        <Button className="pick-folder-btn" onClick={handlePickFolder}>
          Pick Folder
        </Button>

        <div className="filter-wrap">
          <Input
            className="filter-ipt"
            value={filterVal}
            onChange={handleFilterIptChange}
          />
        </div>
      </div>

      <Divider />

      <ul className="img-list">
        {urlList
          .filter(([name]) => {
            const filter = filterVal.trim();
            if (!filter) {
              return true;
            }

            const filterReg = new RegExp(filter, "i");

            return filterReg.test(name);
          })
          .slice((curPage - 1) * pageSize, curPage * pageSize)
          .map(([name, url]) => (
            <li
              className="img-item"
              key={name}
              onClick={() => {
                navigator.clipboard
                  .writeText(name)
                  .then(() => {
                    notifyApi.success({
                      message: "copied",
                      description: name,
                      placement: "top",
                    });
                  })
                  .catch((err) => {
                    console.error("Failed to copy text: ", err);
                  });
              }}
            >
              <img src={url} alt="" className="img" />
              <p className="name" title={name}>
                {name}
              </p>
            </li>
          ))}
      </ul>

      <Divider />

      <Pagination
        current={curPage}
        onChange={handlePageChange}
        pageSizeOptions={[
          300, 500, 800, 1000, 1500, 2000, 3000, 4000, 5000, 8000, 10_000,
          15_000,
        ]}
        pageSize={pageSize}
        total={urlList.length}
      />
    </div>
  );
};
