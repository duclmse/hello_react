import * as React from "react";

export type Axis = "both" | "x" | "y" | "none";
export type ResizeHandle = "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne";

export interface ResizableState {
  resizing: boolean;
  width: number;
  height: number;
  slackW: number;
  slackH: number;
}

export interface DragCallbackData {
  node: HTMLElement;
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
  lastX: number;
  lastY: number;
}

export interface ResizeCallbackData {
  node: HTMLElement;
  size: {width: number; height: number};
  handle: ResizeHandle;
}

export type ResizableProps = {
  children?: React.ReactNode;
  className?: string | undefined;
  handle?: React.ReactNode | ((resizeHandle: ResizeHandle, ref: React.RefObject<any>) => React.ReactNode) | undefined;
  handleSize?: [number, number] | undefined;
  lockAspectRatio?: boolean | undefined;
  minConstraints?: [number, number] | undefined;
  maxConstraints?: [number, number] | undefined;
  onResizeStop?: (e: React.SyntheticEvent, data: ResizeCallbackData) => any;
  onResizeStart?: (e: React.SyntheticEvent, data: ResizeCallbackData) => any;
  onResize?: (e: React.SyntheticEvent, data: ResizeCallbackData) => any;
  draggableOpts?: any;
  resizeHandles?: ResizeHandle[] | undefined;
  transformScale?: number;
} & {
  width: number;
  height?: number | undefined;
  axis?: "x" | "y" | "both" | "none";
};

export class Resizable extends React.Component<ResizableProps, ResizableState> {}

export interface ResizableBoxState {
  height: number;
  width: number;
}

export type ResizableBoxProps = ResizableProps & {style?: React.CSSProperties};

export class ResizableBox extends React.Component<ResizableBoxProps, ResizableBoxState> {}
