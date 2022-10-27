import React from "react";
import {CurrentUserControlMenuButton} from "./CurrentUserControlMenuButton";
import {UserStatus} from "./User";

export const CurrentUserControlMenu: React.FC = () => {
  return (
      <div id="current-user-control-menu">
        <div className="current-user-control-menu-section">
          <CurrentUserControlMenuButton label="Online" status={UserStatus.Online}/>
        </div>
        <div className="current-user-control-menu-section">
          <CurrentUserControlMenuButton label="Idle" status={UserStatus.Away}/>
          <CurrentUserControlMenuButton
              desc="You will not receive any desktop notifications."
              label="Do Not Disturb"
              status={UserStatus.Busy}
          />
          <CurrentUserControlMenuButton
              desc="You will not appear online, but will have full access to all of Discord."
              label="Invisible"
              status={UserStatus.Offline}
          />
        </div>
        <div className="current-user-control-menu-section">
          <CurrentUserControlMenuButton icon="fa-regular fa-face-grin" label="Set a custom status"/>
        </div>
        <div className="current-user-control-menu-section">
          <CurrentUserControlMenuButton icon="fa-solid fa-arrows-repeat" label="Switch Accounts"/>
        </div>
      </div>
  );
};
