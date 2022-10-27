import React from "react";
import {IUser} from "./User";
import {UserStatusIcon} from "./UserStatusIcon";

export interface IUserIconProps {
  user: IUser;
}

export const UserIcon: React.FC<IUserIconProps> = (props) => {
  const {user} = props;

  const styles: React.CSSProperties = {
    backgroundImage: `url(${user.image})`,
  };

  return (
      <div className="user-icon" style={styles}>
        <UserStatusIcon status={user.status}/>
      </div>
  );
};
