import React from "react";

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    ErrorBoundaryState
> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error("React runtime error caught:", error, info);

        // ✅ Integrasi opsional ke Sentry, Bugsnag, atau LogRocket
        // Sentry.captureException(error);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
                    <h1 className="text-2xl font-semibold text-red-600 mb-3">
                        Oops! Something went wrong 😢
                    </h1>
                    <p className="text-gray-600 mb-4">
                        Kami menemukan kesalahan tak terduga. Silakan muat ulang halaman ini.
                    </p>
                    <button
                        onClick={this.handleReload}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Muat Ulang
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
