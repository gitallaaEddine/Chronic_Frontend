import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Enhanced error logging with more context
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Sanitize error details before logging to prevent log injection
    const sanitizedDetails = {
      ...errorDetails,
      message: String(errorDetails.message || "")
        .replace(/[\r\n\t]/g, " ")
        .slice(0, 500),
      stack: String(errorDetails.stack || "")
        .replace(/[\r\n\t]/g, " ")
        .slice(0, 1000),
      componentStack: String(errorDetails.componentStack || "")
        .replace(/[\r\n\t]/g, " ")
        .slice(0, 1000),
    };
    console.error("Error caught by boundary:", sanitizedDetails);

    // In production, you might want to send this to an error reporting service
    // if (import.meta.env.NODE_ENV === "production") {
    //   // Example: sendErrorToService(errorDetails);
    // }
  }

  render() {
    if (this.state.hasError) {
      const showErrorDetails = import.meta.env.NODE_ENV === "development";

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 max-w-md">
            <h1 className="text-2xl font-bold text-secondary mb-4">
              Something went wrong
            </h1>
            <p className="text-secondary/60 mb-6">
              We're sorry, but something unexpected happened. Please try
              reloading the page.
            </p>
            {showErrorDetails && this.state.error && (
              <details className="mb-6 text-left bg-red-50 p-4 rounded border">
                <summary className="cursor-pointer font-medium text-red-800 mb-2">
                  Error Details (Development)
                </summary>
                <pre className="text-xs text-red-700 overflow-auto">
                  {this.state.error.message}
                  {this.state.error.stack && (
                    <>
                      {"\n\nStack Trace:\n"}
                      {this.state.error.stack}
                    </>
                  )}
                </pre>
              </details>
            )}
            <div className="space-x-4">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-secondary text-primary px-4 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
