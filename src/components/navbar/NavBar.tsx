import React from "react";
import {ContentID, CustomContentID} from "../content/ActiveContent";
import {IDiscordAppContext} from "../Discord";
import {ICustomNavbarItem, NavbarItem, NavbarItemType} from "./NavBarItem";

export interface INavBar {
  context: React.Context<IDiscordAppContext>;
}

export const Navbar: React.FC<INavBar> = props => {
  const {context} = props;
  const getCustomItems = (): JSX.Element[] => {
    const items: ICustomNavbarItem[] = [
      {
        contentID: CustomContentID.PizzaLoversServer,
        image:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGl6emF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        label: "Pizza Lovers",
      },
      {
        contentID: CustomContentID.GamingServer,
        image:
          "https://images.unsplash.com/photo-1586182987320-4f376d39d787?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Z2FtaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        label: "The Game Players",
      },
      {
        contentID: CustomContentID.PandaPeopleServer,
        image:
          "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YW5pbWFsc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        label: "Panda Peeps",
      },
    ];

    return items.map((item: ICustomNavbarItem) => (
      <NavbarItem
        key={item.contentID}
        contentID={item.contentID}
        image={item.image}
        label={item.label}
        type={NavbarItemType.Custom}
        context={context}
      />
    ));
  };

  return (
    <div id="navbar-wrapper">
      <div id="navbar">
        <div className="navbar-section">
          <NavbarItem
            contentID={ContentID.Home}
            icon={["fab", "discord"]}
            label="Home"
            type={NavbarItemType.Home}
            context={props.context}
          />
        </div>
        <div className="navbar-section">
          {getCustomItems()}
          <NavbarItem
            contentID={ContentID.AddServer}
            icon={["fas", "plus"]}
            label="Add a Server"
            type={NavbarItemType.Default}
            context={context}
          />
          <NavbarItem
            contentID={ContentID.Explore}
            icon={["fas", "compass"]}
            label="Explore Public Servers"
            type={NavbarItemType.Default}
            context={context}
          />
        </div>
      </div>
    </div>
  );
};
