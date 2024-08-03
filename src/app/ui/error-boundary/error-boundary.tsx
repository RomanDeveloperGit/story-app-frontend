/* eslint-disable react/destructuring-assignment */

import { Component, ReactNode } from 'react';

import { Fallback } from './fallback';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  // eslint-disable-next-line react/sort-comp
  constructor(props: Props) {
    super(props);

    // eslint-disable-next-line react/state-in-constructor
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Fallback />;
    }

    return this.props.children;
  }
}
