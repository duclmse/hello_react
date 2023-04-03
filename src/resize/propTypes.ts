import {DraggableCore} from "react-draggable";
import type {ReactElement} from "react";

export type ReactRef<T extends HTMLElement> = {
  current: T | null;
};
export type Axis = "both" | "x" | "y" | "none";
export type ResizeHandleAxis = "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne";
export type ResizableState = void;
export type ResizableBoxState = {
  width: number;
  height: number;
  propsWidth: number;
  propsHeight: number;
};

export type DragCallbackData = {
  node: HTMLElement;
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
  lastX: number;
  lastY: number;
};

export type ResizeCallbackData = {
  node: HTMLElement;
  size: {
    width: number;
    height: number;
  };
  handle: ResizeHandleAxis;
};

export type DefaultProps = {
  axis: Axis;
  handleSize: [number, number];
  lockAspectRatio: boolean;
  minConstraints: [number, number];
  maxConstraints: [number, number];
  resizeHandles: ResizeHandleAxis[];
  transformScale: number;
};

export type Props = DefaultProps & {
  children: ReactElement<any>;
  className?: string | null;
  draggableOpts?: DraggableOpts;
  height: number;
  handle?: ReactElement<any> | ((resizeHandleAxis: ResizeHandleAxis, ref: ReactRef<HTMLElement>) => ReactElement<any>);
  onResizeStop?: ((e: React.SyntheticEvent, data: ResizeCallbackData) => any) | null;
  onResizeStart?: ((e: React.SyntheticEvent, data: ResizeCallbackData) => any) | null;
  onResize?: ((e: React.SyntheticEvent, data: ResizeCallbackData) => any) | null;
  width: number;
};

export interface DraggableOpts {
  allowAnyClick: boolean;
  cancel: string;
  children: Node;
  disabled: boolean;
  enableUserSelectHack: boolean;
  offsetParent: Node;
  grid: number[];
  handle: string;
  nodeRef: object;
  onStart: Function;
  onDrag: Function;
  onStop: Function;
  onMouseDown: Function;
  scale: number;
}

export interface resizableProps {
  /*
   * Restricts resizing to a particular axis (default: 'both')
   * 'both' - allows resizing by width or height
   * 'x' - only allows the width to be changed
   * 'y' - only allows the height to be changed
   * 'none' - disables resizing altogether
   */
  axis: "both" | "x" | "y" | "none";
  className: string;

  /* Require that one and only one child be present. */
  children: ReactElement;

  /*
   * These will be passed wholesale to react-draggable's DraggableCore
   */
  draggableOpts: DraggableOpts;

  /*
   * Initial height
   */
  height: (...args: any) => {
    // const [props] = args;
    // // Required if resizing height or both
    // if (props.axis === "both" || props.axis === "y") {
    //   return number.isRequired(...args);
    // }
    // return number(...args);
  };

  /*
   * Customize cursor resize handle
   */
  handle: Node | Function;

  /*
   * If you change this, be sure to update your css
   */
  handleSize: number[];
  lockAspectRatio: boolean;

  /*
   * Max X & Y measure
   */
  maxConstraints: number[];

  /*
   * Min X & Y measure
   */
  minConstraints: number[];

  /*
   * Called on stop resize event
   */
  onResizeStop: Function;
  /** Called on start resize event */
  onResizeStart: Function;
  /** Called on resize event */
  onResize: Function;

  /** Defines which resize handles should be rendered (default: 'se') */
  resizeHandles: Direction[];

  /*
   * If `transform: scale(n)` is set on the parent, this should be set to `n`.
   */
  transformScale: number;

  /*
   * Initial width
   */
  width: (...args: any) => {
    // const [props] = args;
    // // Required if resizing width or both
    // if (props.axis === "both" || props.axis === "x") {
    //   return number.isRequired(...args);
    // }
    // return number(...args);
  };
}

/**
 * 's' - South (bottom-center)
 * 'w' - West (left-center)
 * 'e' - East (right-center)
 * 'n' - North (top-center)
 * 'sw' - Southwest (bottom-left)
 * 'nw' - Northwest (top-left)
 * 'se' - Southeast (bottom-right)
 * 'ne' - Northeast (top-center)
 */
type Direction = "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne";
