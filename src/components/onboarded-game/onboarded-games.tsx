import type { Vendor } from "../../typings/vendor.ts";
import { useCallback, useContext, useState } from "react";
import { VendorRadio } from "../vendor-radio/vendor-radio.tsx";
import "./onboarded-games.css";
import { getTableColumn } from "../../utils/game.ts";
import { GameTable } from "../game-table/game-table.tsx";
import { StoreContext } from "../../configs/store-context.ts";

export const OnboardedGames = () => {
  const [vendor, setVendor] = useState("");
  const storeContext = useContext(StoreContext);
  const { allMsnGamesByVendor } = storeContext;

  const handleChangeVendor = useCallback((v: Vendor["VendorId"]) => {
    setVendor(v);
  }, []);

  return (
    <div className="onboard-new-wrap">
      <div className="">
        <VendorRadio value={vendor} onChange={handleChangeVendor} />

        <div className="table-wrap">
          <GameTable
            showPendingDiv={false}
            list={(allMsnGamesByVendor[vendor] ?? []).map((game, i) =>
              getTableColumn(game, "msn", i),
            )}
          />
        </div>
      </div>
    </div>
  );
};
