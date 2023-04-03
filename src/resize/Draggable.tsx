import * as React from 'react';
import DraggableCore, { DraggableCorePropTypes } from './DraggableCore';
import type {ControlPosition, PositionOffsetControlPosition, DraggableCoreProps, DraggableCoreDefaultProps} from './DraggableCore';
import type {Bounds} from './utils/types';
import log from './utils/log';
import {dontSetMe} from './utils/shims';

// import clsx from 'clsx';
// import {createCSSTransform, createSVGTransform} from './utils/domFns';
// import {canDragX, canDragY, createDraggableData, getBoundPosition} from './utils/positionFns';

type DraggableState = {
  dragging?: boolean,
  dragged?: boolean,
  x: number,
  y: number,
  slackX?: number,
  slackY?: number,
  isElementSVG?: boolean,
  prevPropsPosition?: ControlPosition,
};

export type DraggableDefaultProps = DraggableCoreDefaultProps & {
  axis: 'both' | 'x' | 'y' | 'none',
  bounds: Bounds | string | false,
  defaultClassName: string,
  defaultClassNameDragging: string,
  defaultClassNameDragged: string,
  defaultPosition: ControlPosition,
  scale: number,
};

export type DraggableProps = 
  DraggableCoreProps &
  DraggableDefaultProps &
  {
  positionOffset: PositionOffsetControlPosition,
  position: ControlPosition,
};

//
// Define <Draggable>
//

export type Axis = 'both' | 'x' | 'y' |  'none';

interface DraggablePropTypes extends  DraggableCorePropTypes {
    // Accepts all props <DraggableCore> accepts.

    /**
     * `axis` determines which axis the draggable can move.
     *
     *  Note that all callbacks will still return data as normal. This only
     *  controls flushing to the DOM.
     *
     * 'both' allows movement horizontally and vertically.
     * 'x' limits movement to horizontal axis.
     * 'y' limits movement to vertical axis.
     * 'none' limits all movement.
     *
     * Defaults to 'both'.
     */
    axis: Axis,

    /**
     * `bounds` determines the range of movement available to the element.
     * Available values are:
     *
     * 'parent' restricts movement within the Draggable's parent node.
     *
     * Alternatively, pass an object with the following properties, all of which are optional:
     *
     * {left: LEFT_BOUND, right: RIGHT_BOUND, bottom: BOTTOM_BOUND, top: TOP_BOUND}
     *
     * All values are in px.
     *
     * Example:
     *
     * ```jsx
     *   let App = React.createClass({
     *       render: function () {
     *         return (
     *            <Draggable bounds={{right: 300, bottom: 300}}>
     *              <div>Content</div>
     *           </Draggable>
     *         );
     *       }
     *   });
     * ```
     */
    bounds: {
        left: number,
        right: number,
        top: number,
        bottom: number
    } | string |false,

    defaultClassName: string,
    defaultClassNameDragging: string,
    defaultClassNameDragged: string,

    /**
     * `defaultPosition` specifies the x and y that the dragged item should start at
     *
     * Example:
     *
     * ```jsx
     *      let App = React.createClass({
     *          render: function () {
     *              return (
     *                  <Draggable defaultPosition={{x: 25, y: 25}}>
     *                      <div>I start with transformX: 25px and transformY: 25px;</div>
     *                  </Draggable>
     *              );
     *          }
     *      });
     * ```
     */
    defaultPosition: {
      x: number,
      y: number,
    },
    positionOffset: {
      x: number | string,
      y: number | string
    },

    /**
     * `position`, if present, defines the current position of the element.
     *
     *  This is similar to how form elements in React work - if no `position` is supplied, the component
     *  is uncontrolled.
     *
     * Example:
     *
     * ```jsx
     *      let App = React.createClass({
     *          render: function () {
     *              return (
     *                  <Draggable position={{x: 25, y: 25}}>
     *                      <div>I start with transformX: 25px and transformY: 25px;</div>
     *                  </Draggable>
     *              );
     *          }
     *      });
     * ```
     */
    position: {
      x: number,
      y: number
    },

    /**
     * These properties should be defined on the child, not here.
     */
    className: typeof dontSetMe,
    style: typeof dontSetMe,
    transform: typeof dontSetMe
  };

export class Draggable extends React.Component<DraggableProps, DraggableState> {

  static displayName?: string = 'Draggable';

  

  static defaultProps: DraggableDefaultProps = {
    ...DraggableCore.defaultProps,
    axis: 'both',
    bounds: false,
    defaultClassName: 'react-draggable',
    defaultClassNameDragging: 'react-draggable-dragging',
    defaultClassNameDragged: 'react-draggable-dragged',
    defaultPosition: {x: 0, y: 0},
    scale: 1
  };

  // React 16.3+
  // Arity (props, state)
  static getDerivedStateFromProps({position}: DraggableProps, {prevPropsPosition}: DraggableState): DraggableState | null {
    // Set x/y if a new position is provided in props that is different than the previous.
    if (
      position &&
      (!prevPropsPosition || position.x !== prevPropsPosition.x || position.y !== prevPropsPosition.y )
    ) {
      log('Draggable: getDerivedStateFromProps %j', {position, prevPropsPosition});
      return {
        x: position.x,
        y: position.y,
        prevPropsPosition: {...position}
      };
    }
    return null;
  }

  constructor(props: DraggableProps) {
    super(props);

    this.state = {
      // Whether or not we are currently dragging.
      dragging: false,

      // Whether or not we have been dragged before.
      dragged: false,

      // Current transform x and y.
      x: props.position ? props.position.x : props.defaultPosition.x,
      y: props.position ? props.position.y : props.defaultPosition.y,

      prevPropsPosition: {...props.position},

      // Used for compensating for out-of-bounds drags
      slackX: 0, slackY: 0,

      // Can only determine if SVG after mounting
      isElementSVG: false
    };

    if (props.position && !(props.onDrag || props.onStop)) {
      // eslint-disable-next-line no-console
      console.warn('A `position` was applied to this <Draggable>, without drag handlers. This will make this ' +
        'component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the ' +
        '`position` of this element.');
    }
  }

  componentDidMount() {
    // Check to see if the element passed is an instanceof SVGElement
    if(typeof window.SVGElement !== 'undefined' && this.findDOMNode() instanceof window.SVGElement) {
      this.setState({isElementSVG: true});
    }
  }

  componentWillUnmount() {