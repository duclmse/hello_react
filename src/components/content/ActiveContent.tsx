import React from "react";
import {IDiscordAppContext} from "../Discord";

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
  context: React.Context<IDiscordAppContext>
}

export const ActiveContent: React.FC<IActiveContent> = (props) => {
  const {state} = React.useContext(props.context);

  const getContentIcon = () => {
    switch (state.activeContentID) {
      case ContentID.Home:
        return "fa-brands fa-discord";
      case ContentID.AddServer:
        return "fa-solid fa-plus";
      case ContentID.Explore:
        return "fa-solid fa-compass";

      case CustomContentID.GamingServer:
        return "fa-solid fa-gamepad-modern";
      case CustomContentID.PandaPeopleServer:
        return "fa-regular fa-teddy-bear";
      case CustomContentID.PizzaLoversServer:
        return "fa-regular fa-pizza-slice";
    }
  };

  return (
      <div id="active-content">
        <i key={state.activeContentID} className={getContentIcon()}/>
      </div>
  );
};
