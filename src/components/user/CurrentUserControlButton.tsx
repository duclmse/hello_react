import {IconName, IconPrefix} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {Tooltip, TooltipDirection} from "../utils/Tooltip";

export interface ICurrentUserControlButtonProps {
  icon: [IconPrefix, IconName];
  tooltip: string;
}

export const CurrentUserControlButton: React.FC<ICurrentUserControlButtonProps> = props => {
  return (
    <button className="current-user-control-button">
      <FontAwesomeIcon icon={props.icon} />
      <Tooltip direction={TooltipDirection.Top} text={props.tooltip} />
    </button>
  );
};
