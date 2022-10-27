import classNames from "classnames";
import {UserStatus} from "./User";

export interface IUserStatusIconProps {
  status: UserStatus;
}

export const UserStatusIcon: React.FC<IUserStatusIconProps> = (props) => {
  const {status} = props;
  const getIcon = (): string => {
    switch (status) {
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
      <div className={classNames("user-status-icon", status.toLowerCase())}>
        <i className={getIcon()}/>
      </div>
  );
};
