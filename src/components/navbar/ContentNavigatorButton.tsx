import React from "react";

export interface IContentNavigatorButtonProps {
  children: any;
}

export const ContentNavigatorButton: React.FC<IContentNavigatorButtonProps> = props => {
  return (
    <button className="content-navigator-button" type="button">
      {props.children}
    </button>
  );
};
