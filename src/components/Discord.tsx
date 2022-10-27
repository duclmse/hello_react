import React from "react";

import "./Discord.css";
import {ActiveContent, ContentID} from "./content/ActiveContent";
import {ContentNavigator} from "./navbar/ContentNavigator";
import {Navbar} from "./navbar/NavBar";
import {IUser, UserStatus} from "./user/User";

interface IDiscordAppState {
  activeContentID: ContentID | string;
  user: IUser;
}

export interface IDiscordAppContext {
  state: IDiscordAppState;
  user: IUser;
  setState: (state: IDiscordAppState) => void;
  selectContentID: (id: ContentID) => void;
}

const AppContext = React.createContext<IDiscordAppContext>({} as IDiscordAppContext);

export const Discord: React.FC = () => {
  const [state, setState] = React.useState<IDiscordAppState>({
    activeContentID: ContentID.Home,
    user: {
      id: "1234",
      image:
          "https://images.unsplash.com/photo-1562376552-0d160a2f238d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2FmZmxlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=50&q=60",
      status: UserStatus.Online,
      username: "Hyperplexed",
    },
  });

  const selectContentID = (contentID: ContentID): void => {
    setState({...state, activeContentID: contentID});
  };

  return (
      <AppContext.Provider value={{state, user: state.user, setState: setState, selectContentID}}>
        <div id="discord-app">
          <Navbar context={AppContext}/>
          <ContentNavigator context={AppContext}/>
          <ActiveContent context={AppContext}/>
        </div>
      </AppContext.Provider>
  );
};

