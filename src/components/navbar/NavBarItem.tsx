import classNames from "classnames";
import React from "react";
import {ContentID} from "../content/ActiveContent";
import {IDiscordAppContext} from "../Discord";
import {Tooltip} from "../utils/Tooltip";

export interface INavbarItemProps {
  color?: string;
  contentID: ContentID | string;
  icon?: string;
  image?: string;
  label: string;
  type: NavbarItemType;
  context: React.Context<IDiscordAppContext>;
}

export enum NavbarItemType {
  Custom = "Custom",
  Default = "Default",
  Home = "Home",
}

export interface ICustomNavbarItem {
  contentID: string;
  image: string;
  label: string;
}

export const NavbarItem: React.FC<INavbarItemProps> = (props) => {
  const {color, contentID, icon, image, label, type, context} = props;
  const {state, selectContentID} = React.useContext(context);

  const handleOnClick = () => {
    selectContentID(contentID as ContentID);
  };

  const getContent = () => {
    if (icon) {
      const getStyles = (): React.CSSProperties => {
        const styles: React.CSSProperties = {};

        if (color) {
          styles.color = `rgb(${color})`;
        }

        return styles;
      };

      return <i className={icon} style={getStyles()}/>;
    }
    if (image) {
      const styles: React.CSSProperties = {
        backgroundImage: `url(${image})`,
      };

      return <div className="navbar-item-image" style={styles}/>;
    }
  };

  const getClasses = (): string => {
    return classNames("navbar-item", type.toLowerCase(), {
      active: contentID === state.activeContentID,
    });
  };

  return (
      <button type="button" className={getClasses()} onClick={handleOnClick}>
        <div className="navbar-item-content">{getContent()}</div>
        <Tooltip text={label}/>
      </button>
  );
};
