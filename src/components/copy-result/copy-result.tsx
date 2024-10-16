import "./copy-result.css";
import { Button } from "antd";

type Props = {
  list: string[];
};

export const CopyResult = ({ list }: Props) => {
  return (
    <span className="copy-wrap">
      <Button
        onClick={() => {
          navigator.clipboard
            .writeText(list.join(", "))
            .then(() => {
              console.log("Text copied to clipboard");
            })
            .catch((err) => {
              console.error("Failed to copy text: ", err);
            });
        }}
      >
        复制（成行）
      </Button>
      <Button
        onClick={() => {
          navigator.clipboard
            .writeText(list.join("\n"))
            .then(() => {
              console.log("Text copied to clipboard");
            })
            .catch((err) => {
              console.error("Failed to copy text: ", err);
            });
        }}
      >
        复制（成列）
      </Button>
    </span>
  );
};
