import {IconName, IconPrefix} from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {UserStatus} from "./User";
import {UserStatusIcon} from "./UserStatusIcon";

export interface ICurrentUserControlMenuButtonProps {
  desc?: string;
  icon?: [IconPrefix, IconName];
  label: string;
  status?: UserStatus;
}

export const CurrentUserControlMenuButton: React.FC<ICurrentUserControlMenuButtonProps> = props => {
  const {desc, icon, label, status} = props;
  const getIcon = () => {
    if (icon) {
      return <FontAwesomeIcon icon={icon} />;
    }
    if (status) {
      return <UserStatusIcon status={status} />;
    }
  };

  const getDesc = () => {
    if (desc) {
      return <p className="current-user-control-menu-button-desc">{desc}</p>;
    }
  };

  return (
    <button className="current-user-control-menu-button" type="button">
      <div className="current-user-control-menu-button-icon">{getIcon()}</div>
      <div className="current-user-control-menu-button-content">
        <p className="current-user-control-menu-button-label">{label}</p>
        {getDesc()}
      </div>
    </button>
  );
};
