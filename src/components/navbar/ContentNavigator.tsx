import React, {MouseEventHandler} from "react";
import {IDiscordAppContext} from "../Discord";
import {CurrentUserControl} from "../user/CurrentUserControl";
import {UserStatus} from "../user/User";
import {ContentNavigatorButton} from "./ContentNavigatorButton";
import {DirectMessages} from "./DirectMessage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export interface IContentNavigator {
  context: React.Context<IDiscordAppContext>;
}

export const ContentNavigator: React.FC<IContentNavigator> = props => {
  let {context} = props;

  const createDM: MouseEventHandler<HTMLButtonElement> = e => {
    console.log(e);
  };

  return (
    <div id="content-navigator">
      <button id="content-navigator-search-bar-toggle" type="button">
        Find or start a conversation
      </button>

      <div className="content-navigator-section">
        <ContentNavigatorButton>
          <FontAwesomeIcon icon={["fas", "person-drowning"]} size="lg" />
          <p>Friends</p>
        </ContentNavigatorButton>
        <ContentNavigatorButton>
          <FontAwesomeIcon icon={["fas", "fire"]} size="lg" />
          <p>Nitro</p>
        </ContentNavigatorButton>
        <DirectMessages
          users={[
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
          ]}
          createDM={createDM}
        />
      </div>

      <CurrentUserControl context={context} />
    </div>
  );
};
