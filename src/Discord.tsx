import React from "react";
import classNames from "classnames";

import "./Discord.css";

enum ContentID {
  AddServer = "Add Server",
  Explore = "Explore",
  Home = "Home",
}

enum CustomContentID {
  GamingServer = "gaming-server",
  PandaPeopleServer = "panda-people-server",
  PizzaLoversServer = "pizza-lovers-server",
}

enum NavbarItemType {
  Custom = "Custom",
  Default = "Default",
  Home = "Home",
}

enum UserStatus {
  Away = "Away",
  Busy = "Busy",
  Offline = "Offline",
  Online = "Online",
}

enum TooltipDirection {
  Right = "Right",
  Top = "Top",
}

interface IUser {
  activity?: string;
  id: string;
  image: string;
  status: UserStatus;
  username: string;
}

interface ICustomNavbarItem {
  contentID: string;
  image: string;
  label: string;
}

interface ITooltipProps {
  direction?: TooltipDirection;
  text: string;
}

interface IUserStatusIconProps {
  status: UserStatus;
}

interface IUserIconProps {
  user: IUser;
}

interface ICurrentUserControlButtonProps {
  icon: string;
  tooltip: string;
}

interface IContentNavigatorButtonProps {
  children: any;
}

interface INavbarItemProps {
  color?: string;
  contentID: ContentID | string;
  icon?: string;
  image?: string;
  label: string;
  type: NavbarItemType;
}


interface IDiscordAppState {
  activeContentID: ContentID | string;
  user: IUser;
}

interface IDiscordAppContext {
  state: IDiscordAppState;
  user: IUser;
  setStateTo: (state: IDiscordAppState) => void;
  selectContentID: (id: ContentID) => void;
}

interface ICurrentUserControlMenuButtonProps {
  desc?: string;
  icon?: string;
  label: string;
  status?: UserStatus;
}

const Tooltip: React.FC<ITooltipProps> = (props: ITooltipProps) => {
  const direction: TooltipDirection = props.direction || TooltipDirection.Right;

  return (
    <div className={classNames("tooltip", direction.toLowerCase())}>
      <p>{props.text}</p>
    </div>
  );
};

const ActiveContent: React.FC = () => {
  const {state} = React.useContext(AppContext);

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
      <i key={state.activeContentID} className={getContentIcon()} />
    </div>
  );
};

const UserStatusIcon: React.FC<IUserStatusIconProps> = (props: IUserStatusIconProps) => {
  const getIcon = (): string => {
    switch (props.status) {
      case UserStatus.Away:
        return "fa-solid fa-moon";
      case UserStatus.Busy:
        return "fa-solid fa-do-not-enter";
      case UserStatus.Offline:
        return "fa-solid fa-circle-dot";
      case UserStatus.Online:
        return "fa-solid fa-circle";
    }
  };

  return (
    <div className={classNames("user-status-icon", props.status.toLowerCase())}>
      <i className={getIcon()} />
    </div>
  );
};

const UserIcon: React.FC<IUserIconProps> = (props: IUserIconProps) => {
  const {user} = props;

  const styles: React.CSSProperties = {
    backgroundImage: `url(${user.image})`,
  };

  return (
    <div className="user-icon" style={styles}>
      <UserStatusIcon status={user.status} />
    </div>
  );
};

const CurrentUserControlMenuButton: React.FC<ICurrentUserControlMenuButtonProps> = (
  props: ICurrentUserControlMenuButtonProps
) => {
  const getIcon = () => {
    if (props.icon) {
      return <i className={props.icon} />;
    } else if (props.status) {
      return <UserStatusIcon status={props.status} />;
    }
  };

  const getDesc = () => {
    if (props.desc) {
      return <p className="current-user-control-menu-button-desc">{props.desc}</p>;
    }
  };

  return (
    <button className="current-user-control-menu-button" type="button">
      <div className="current-user-control-menu-button-icon">{getIcon()}</div>
      <div className="current-user-control-menu-button-content">
        <p className="current-user-control-menu-button-label">{props.label}</p>
        {getDesc()}
      </div>
    </button>
  );
};

const CurrentUserControlMenu: React.FC = () => {
  return (
    <div id="current-user-control-menu">
      <div className="current-user-control-menu-section">
        <CurrentUserControlMenuButton label="Online" status={UserStatus.Online} />
      </div>
      <div className="current-user-control-menu-section">
        <CurrentUserControlMenuButton label="Idle" status={UserStatus.Away} />
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
        <CurrentUserControlMenuButton icon="fa-regular fa-face-grin" label="Set a custom status" />
      </div>
      <div className="current-user-control-menu-section">
        <CurrentUserControlMenuButton icon="fa-solid fa-arrows-repeat" label="Switch Accounts" />
      </div>
    </div>
  );
};

const CurrentUserControlButton: React.FC<ICurrentUserControlButtonProps> = (props: ICurrentUserControlButtonProps) => {
  return (
    <button className="current-user-control-button">
      <i className={props.icon} />
      <Tooltip direction={TooltipDirection.Top} text={props.tooltip} />
    </button>
  );
};

const CurrentUserControl: React.FC = () => {
  const {user} = React.useContext(AppContext);

  const [menuToggled, toggleMenu] = React.useState<boolean>(true);

  const handleOnClick = (): void => {
    toggleMenu(!menuToggled);
  };

  const getMenu = () => {
    if (menuToggled) {
      return <CurrentUserControlMenu />;
    }
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
          <CurrentUserControlButton icon="fa-solid fa-microphone" tooltip="Mute" />
          <CurrentUserControlButton icon="fa-solid fa-headphones" tooltip="Deafen" />
          <CurrentUserControlButton icon="fa-solid fa-gear" tooltip="User Settings" />
        </div>
      </div>
      {getMenu()}
    </div>
  );
};

const DirectMessages: React.FC = () => {
  const getItems = (): JSX.Element[] => {
    const users: IUser[] = [
      {
        id: "2345",
        image:
          "https://images.unsplash.com/photo-1609372332255-611485350f25?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGlrYWNodXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        status: UserStatus.Away,
        username: "Pikachu",
      },
      {
        activity: "Streaming Fire",
        id: "3456",
        image:
          "https://images.unsplash.com/photo-1594037419616-5685d4595223?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVkJTIwbGl6YXJkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        status: UserStatus.Busy,
        username: "Charmander",
      },
      {
        id: "4567",
        image:
          "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dHVydGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        status: UserStatus.Online,
        username: "Squirtle",
      },
    ];

    return users.map((user: IUser) => {
      const getActivity = () => {
        if (user.activity) {
          return <p className="direct-messages-item-user-activity">{user.activity}</p>;
        }
      };

      return (
        <div className="direct-messages-item content-navigator-button" key={user.id}>
          <UserIcon user={user} />
          <div className="direct-messages-item-user-info">
            <p className="direct-messages-item-username">{user.username}</p>
            {getActivity()}
          </div>
          <button className="direct-messages-item-close-button" type="button">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
      );
    });
  };
  return (
    <div id="direct-messages">
      <div id="direct-messages-header">
        <h3 id="direct-messages-title">Direct Messages</h3>
        <button id="direct-messages-add-button" type="button">
          <i className="fa-solid fa-plus" />
          <Tooltip direction={TooltipDirection.Top} text="Create DM" />
        </button>
      </div>
      <div id="direct-messages-items">{getItems()}</div>
    </div>
  );
};

const ContentNavigatorButton: React.FC<IContentNavigatorButtonProps> = (props: IContentNavigatorButtonProps) => {
  return (
    <button className="content-navigator-button" type="button">
      {props.children}
    </button>
  );
};

const ContentNavigator: React.FC = () => {
  return (
    <div id="content-navigator">
      <button id="content-navigator-search-bar-toggle" type="button">
        Find or start a conversation
      </button>

      <div className="content-navigator-section">
        <ContentNavigatorButton>
          <i className="fa-solid fa-person-drowning" />
          <p>Friends</p>
        </ContentNavigatorButton>
        <ContentNavigatorButton>
          <i className="fa-solid fa-fire" />
          <p>Nitro</p>
        </ContentNavigatorButton>
        <DirectMessages />
      </div>

      <CurrentUserControl />
    </div>
  );
};

const AppContext = React.createContext<IDiscordAppContext>({} as IDiscordAppContext);

const NavbarItem: React.FC<INavbarItemProps> = (props: INavbarItemProps) => {
  const {state, selectContentID} = React.useContext(AppContext);

  const handleOnClick = () => {
    selectContentID(props.contentID as ContentID);
  };

  const getContent = () => {
    if (props.icon) {
      const getStyles = (): React.CSSProperties => {
        const styles: React.CSSProperties = {};

        if (props.color) {
          styles.color = `rgb(${props.color})`;
        }

        return styles;
      };

      return <i className={props.icon} style={getStyles()} />;
    } else if (props.image) {
      const styles: React.CSSProperties = {
        backgroundImage: `url(${props.image})`,
      };

      return <div className="navbar-item-image" style={styles} />;
    }
  };

  const getClasses = (): string => {
    return classNames("navbar-item", props.type.toLowerCase(), {
      active: props.contentID === state.activeContentID,
    });
  };

  return (
    <button type="button" className={getClasses()} onClick={handleOnClick}>
      <div className="navbar-item-content">{getContent()}</div>
      <Tooltip text={props.label} />
    </button>
  );
};

const Navbar: React.FC = () => {
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
      />
    ));
  };

  return (
    <div id="navbar-wrapper">
      <div id="navbar">
        <div className="navbar-section">
          <NavbarItem contentID={ContentID.Home} icon="fa-brands fa-discord" label="Home" type={NavbarItemType.Home} />
        </div>
        <div className="navbar-section">
          {getCustomItems()}
          <NavbarItem
            contentID={ContentID.AddServer}
            icon="fa-solid fa-plus"
            label="Add a Server"
            type={NavbarItemType.Default}
          />
          <NavbarItem
            contentID={ContentID.Explore}
            icon="fa-solid fa-compass"
            label="Explore Public Servers"
            type={NavbarItemType.Default}
          />
        </div>
      </div>
    </div>
  );
};

const Discord: React.FC = () => {
  const [state, setStateTo] = React.useState<IDiscordAppState>({
    activeContentID: ContentID.Home,
    user: {
      id: "1234",
      image:
        "https://images.unsplash.com/photo-1562376552-0d160a2f238d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2FmZmxlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      status: UserStatus.Online,
      username: "Hyperplexed",
    },
  });

  const selectContentID = (contentID: ContentID): void => {
    setStateTo({...state, activeContentID: contentID});
  };

  return (
    <AppContext.Provider value={{state, user: state.user, setStateTo, selectContentID}}>
      <div id="discord-app">
        <Navbar />
        <ContentNavigator />
        <ActiveContent />
      </div>
    </AppContext.Provider>
  );
};

export default Discord;
