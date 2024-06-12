import React from 'react';

type ErrorBoundaryProps = {
  fallback?: React.JSX.Element;
  children: React.ReactNode | React.ReactNode[];
};
type ErrorBoundaryState = { hasError: boolean };

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState, {}> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown) {
    // Update state so the next render will show the fallback UI.
    console.error('An error has occurred within the React tree.');
    console.error(error);
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    console.error(`
        componentStack: ${info.componentStack}
        error: ${JSON.stringify(error, null, 2)}
      `);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default React.memo(ErrorBoundary);
