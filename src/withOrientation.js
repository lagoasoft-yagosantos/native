import React from 'react';
import { Dimensions } from 'react-native';
import hoistNonReactStatic from 'hoist-non-react-statics';

export const isOrientationLandscape = ({ width, height }) => width > height;

export default function(WrappedComponent) {
  let dimensionsEvent;
  class withOrientation extends React.Component {
    constructor() {
      super();

      const isLandscape = isOrientationLandscape(Dimensions.get('window'));
      this.state = { isLandscape };
    }

    componentDidMount() {
      dimensionsEvent = Dimensions.addEventListener('change', this.handleOrientationChange);
    }

    componentWillUnmount() {
      dimensionsEvent.remove();
    }

    handleOrientationChange = ({ window }) => {
      const isLandscape = isOrientationLandscape(window);
      this.setState({ isLandscape });
    };

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  }

  return hoistNonReactStatic(withOrientation, WrappedComponent);
}
