import ErrorOutline from '@mui/icons-material/ErrorOutline';
import CircularProgress from '@mui/material/CircularProgress';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  label: string;
  hasErrors?: boolean
  isLoading?: boolean
}

export default function Input({
  placeholder,
  label,
  disabled = false,
  hasErrors = false,
  isLoading = false,
  ...inputProps // Spread other input props
}: InputProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="tailwind-input" className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id="tailwind-input"
          type="text"
          placeholder={placeholder}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 disabled:bg-gray-100 disabled:cursor-not-allowed pr-10`}
          aria-invalid={hasErrors ? 'true' : 'false'}
          aria-describedby={hasErrors ? 'input-error' : undefined}
          {...inputProps}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">

          {hasErrors && (
            <ErrorOutline className="h-5 w-5 text-red-500" />
          )}
          {isLoading && (
            <CircularProgress className="h-5 w-5 text-primary animate-spin" />
          )}
        </div>
      </div>
      {/* {hasErrors && (
        <p id="input-error" className="text-red-500 text-sm" role="alert">{error}</p>
      )} */}
    </div>
  );
}
