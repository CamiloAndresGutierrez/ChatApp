import { ButtonHTMLAttributes } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorOutline from "@mui/icons-material/ErrorOutline";

interface TailwindButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean; // Optional loading state
  error?: string | null; // Optional error message
}

export default function Button({
  isLoading = false,
  error = null,
  children,
  ...buttonProps
}: TailwindButtonProps) {
  return (
    <div className="flex flex-col space-y-2 mb-4 mt-4">
      <button
        {...buttonProps}
        disabled={isLoading || buttonProps.disabled}
        className={`bg-primary  hover:bg-primary-400 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px] h-10 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }
            mt-
        `}
        aria-busy={isLoading}
        aria-live="polite"
      >
        {isLoading ? (
          <CircularProgress className="mr-2 h-5 w-5 animate-spin text-primary-foreground" />
        ) : error ? (
          <ErrorOutline className="mr-2 h-5 w-5 text-primary-foreground" />
        ) : null}
        <span>{children}</span>
      </button>
      {error && (
        <p className="text-red-500 text-sm mt-2" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
