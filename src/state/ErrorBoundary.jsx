/* eslint-disable react/destructuring-assignment */

import React from 'react';
import ErrorRedirect from '../components/pages/error/errorRedirect';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorRedirect />;
    }
    return this.props.children;
  }
}
