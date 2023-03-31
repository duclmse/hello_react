import {IconName, IconPrefix} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import {UserStatus} from "./User";

export interface IUserStatusIconProps {
  status: UserStatus;
}

export const UserStatusIcon: React.FC<IUserStatusIconProps> = props => {
  const {status} = props;
  const getIcon = (): [IconPrefix, IconName] => {
    switch (status) {
      case UserStatus.Away:
        return ["fas", "moon"];
      case UserStatus.Busy:
        return ["fas", "ban"];
      case UserStatus.Offline:
        return ["fas", "circle-dot"];
      case UserStatus.Online:
        return ["fas", "circle"];
    }
  };

  return (
    <div className={classNames("user-status-icon", status.toLowerCase())}>
      <FontAwesomeIcon icon={getIcon()} />
    </div>
  );
};
