import React from "react";
import {Tooltip, TooltipDirection} from "../utils/Tooltip";
import {IUser, UserStatus} from "../user/User";
import {UserIcon} from "../user/UserIcon";

export interface IDirectMessages {
  users: IUser[];
}

export const DirectMessages: React.FC<IDirectMessages> = props => {
  const {users} = props;
  return (
    <div id="direct-messages">
      <div id="direct-messages-header">
        <h3 id="direct-messages-title">Direct Messages</h3>
        <button id="direct-messages-add-button" type="button">
          <i className="fa-solid fa-plus" />
          <Tooltip direction={TooltipDirection.Right} text="Create DM" />
        </button>
      </div>
      <div id="direct-messages-items">
        {users.map((user: IUser) => (
          <div className="direct-messages-item content-navigator-button" key={user.id}>
            <UserIcon user={user} />
            <div className="direct-messages-item-user-info">
              <p className="direct-messages-item-username">{user.username}</p>
              {user.activity && <p className="direct-messages-item-user-activity">{user.activity}</p>}
            </div>
            <button className="direct-messages-item-close-button" type="button">
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
