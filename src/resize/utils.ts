import React, {CSSProperties} from "react";
import type {ReactElement} from "react";

export interface ClonableProps {
  style?: CSSProperties;
  className?: string;
  children: any[];
}

// React.addons.cloneWithProps look-alike that merges style & className.
export function cloneElement(element: ReactElement<any>, props: ClonableProps): ReactElement<any> {
  if (props.style && element.props.style) {
    props.style = {...element.props.style, ...props.style};
  }
  if (props.className && element.props.className) {
    props.className = `${element.props.className} ${props.className}`;
  }
  return React.cloneElement(element, props);
}
