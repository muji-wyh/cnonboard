import "./game-card.css";
import { type Game } from "../../typings/game.ts";
import { vendorMap } from "../../configs/venders.ts";

type Props = {
  game: Game;
  type: "msn" | "vendor";
};

export const GameCard = ({ game, type }: Props) => {
  const href =
    type === "vendor" || game.VendorId === vendorMap["360"].VendorId
      ? game.PlayUrl
      : `https://www.msn.com/zh-cn/play/games/testing/cg-test-game?dev-playground=${game.PlayUrl}`;

  return (
    <a
      className="card"
      href={href}
      target={
        game.VendorId === vendorMap["360"].VendorId
          ? `tab_360_${game.Name}`
          : "_blank"
      }
    >
      <img
        referrerPolicy="no-referrer"
        src={game.Thumbnail}
        alt={game.Name}
        className="img"
      />
      <span className="label">{type}</span>
      <h2 className="title">{game.Name}</h2>
    </a>
  );
};
