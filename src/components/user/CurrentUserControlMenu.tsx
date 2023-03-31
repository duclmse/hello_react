import React from "react";
import {CurrentUserControlMenuButton} from "./CurrentUserControlMenuButton";
import {UserStatus} from "./User";

export const CurrentUserControlMenu: React.FC = () => {
  return (
    <div id="current-user-control-menu">
      <div className="current-user-control-menu-section">
        <CurrentUserControlMenuButton label="Online" status={UserStatus.Online} />
      </div>
      <div className="current-user-control-menu-section">
        <CurrentUserControlMenuButton label="Idle" status={UserStatus.Away} />
        <CurrentUserControlMenuButton
          label="Do Not Disturb"
          desc="You will not receive any desktop notifications."
          status={UserStatus.Busy}
        />
        <CurrentUserControlMenuButton
          label="Invisible"
          desc="You will not appear online, but will have full access to all of Discord."
          status={UserStatus.Offline}
        />
      </div>
      <div className="current-user-control-menu-section">
        <CurrentUserControlMenuButton icon={["far", "face-grin"]} label="Set a custom status" />
      </div>
      <div className="current-user-control-menu-section">
        <CurrentUserControlMenuButton icon={["fas", "repeat"]} label="Switch Accounts" />
      </div>
    </div>
  );
};
