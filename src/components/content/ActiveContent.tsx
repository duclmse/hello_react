import React from "react";
import {IDiscordAppContext} from "../Discord";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconName, IconPrefix} from "@fortawesome/fontawesome-svg-core";

export enum ContentID {
  AddServer = "Add Server",
  Explore = "Explore",
  Home = "Home",
}

export enum CustomContentID {
  GamingServer = "gaming-server",
  PandaPeopleServer = "panda-people-server",
  PizzaLoversServer = "pizza-lovers-server",
}

export interface IActiveContent {
  context: React.Context<IDiscordAppContext>;
}

export const ActiveContent: React.FC<IActiveContent> = props => {
  const {state} = React.useContext(props.context);

  function getContentIcon(): [IconPrefix, IconName] {
    switch (state.activeContentID) {
      case ContentID.Home:
        return ["fab", "discord"];
      case ContentID.AddServer:
        return ["fas", "plus"];
      case ContentID.Explore:
        return ["fas", "compass"];

      case CustomContentID.GamingServer:
        return ["fas", "gamepad"];
      case CustomContentID.PandaPeopleServer:
        return ["fas", "teddy-bear"];
      case CustomContentID.PizzaLoversServer:
        return ["fas", "pizza"];
      default:
        return ["fab", "discord"];
    }
  }

  return (
    <div id="active-content">
      <FontAwesomeIcon key={state.activeContentID} icon={getContentIcon()} size="5x" />
    </div>
  );
};
