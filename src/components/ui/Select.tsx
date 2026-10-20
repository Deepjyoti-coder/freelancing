import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full mb-4">
        {label && (
          <label className="block text-sm font-medium text-slate-700 mb-1.5 pl-1">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition appearance-none cursor-pointer ${
            error ? 'border-red-400 focus:ring-red-100 focus:border-red-500' : ''
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="block text-xs font-medium text-red-500 mt-1 pl-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
