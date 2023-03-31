import React from "react";
import {IDiscordAppContext} from "../Discord";
import {CurrentUserControlButton} from "./CurrentUserControlButton";
import {CurrentUserControlMenu} from "./CurrentUserControlMenu";
import {UserIcon} from "./UserIcon";

export interface ICurrentUserControl {
  context: React.Context<IDiscordAppContext>;
}

export const CurrentUserControl: React.FC<ICurrentUserControl> = props => {
  const {user} = React.useContext(props.context);

  const [menuToggled, toggleMenu] = React.useState<boolean>(false);

  const handleOnClick = (): void => {
    toggleMenu(!menuToggled);
  };

  return (
    <div id="current-user-control">
      <div id="current-user">
        <button id="current-user-menu-button" type="button" onClick={handleOnClick}>
          <UserIcon user={user} />
        </button>
        <div id="current-user-details">
          <label id="current-user-username">{user.username}</label>
          <label id="current-user-id">#{user.id}</label>
        </div>
        <div id="current-user-control-buttons">
          <CurrentUserControlButton icon={["fas", "microphone"]} tooltip="Mute" />
          <CurrentUserControlButton icon={["fas", "headphones"]} tooltip="Deafen" />
          <CurrentUserControlButton icon={["fas", "gear"]} tooltip="User Settings" />
        </div>
      </div>
      {menuToggled && <CurrentUserControlMenu />}
    </div>
  );
};
