import "./game-card.css";
import { type Game } from "../../typings/game.ts";

type Props = {
  game: Game;
  type: "msn" | "vendor";
};

export const GameCard = ({ game, type }: Props) => {
  const href = type === "vendor" ? game.PlayUrl : `${game.PlayUrl}`;

  return (
    <a className="card" href={href} target="_blank">
      <img
        referrerPolicy="no-referrer"
        src={game.Thumbnail}
        alt={game.Name}
        className="img"
      />
      <span className="label">{type}</span>
    </a>
  );
};
