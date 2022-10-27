import classNames from "classnames";
import React from "react";

export interface ITooltipProps {
  direction?: TooltipDirection;
  text: string;
}

export enum TooltipDirection {
  Right = "Right",
  Top = "Top",
}

export const Tooltip: React.FC<ITooltipProps> = (props) => {
  const {direction, text} = props;
  const d = direction || TooltipDirection.Right;

  return (
      <div className={classNames("tooltip", d.toLowerCase())}>
        <p>{text}</p>
      </div>
  );
};
