import React from "react";
import {Tooltip, TooltipDirection} from "../utils/Tooltip";

export interface ICurrentUserControlButtonProps {
  icon: string;
  tooltip: string;
}

export const CurrentUserControlButton: React.FC<ICurrentUserControlButtonProps> = (props) => {
  return (
      <button className="current-user-control-button">
        <i className={props.icon}/>
        <Tooltip direction={TooltipDirection.Top} text={props.tooltip}/>
      </button>
  );
};
