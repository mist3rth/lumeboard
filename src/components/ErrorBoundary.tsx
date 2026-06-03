import { Component, ErrorInfo, ReactNode } from "react";
import { ShieldAlert } from "lucide-react";
import { log } from "../utils/logger";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    log.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center bg-black text-white p-8 border border-neutral-800 rounded-2xl m-4">
          <div className="text-center space-y-4 max-w-md">
            <ShieldAlert className="w-12 h-12 text-red-500 mx-auto" />
            <h2 className="text-xl font-display uppercase tracking-wider text-red-400">
              Système Interrompu
            </h2>
            <p className="text-sm text-neutral-400 font-mono">
              Une erreur inattendue s'est produite dans ce composant.
            </p>
            <button
              className="mt-6 px-6 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs uppercase tracking-wider font-mono rounded-lg transition-colors cursor-pointer"
              onClick={() => this.setState({ hasError: false })}
            >
              Tenter une récupération
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
