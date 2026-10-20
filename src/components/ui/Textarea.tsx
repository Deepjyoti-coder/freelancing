import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full mb-4">
        {label && (
          <label className="block text-sm font-medium text-slate-700 mb-1.5 pl-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none ${
            error ? 'border-red-400 focus:ring-red-100 focus:border-red-500' : ''
          } ${className}`}
          {...props}
        />
        {error && (
          <span className="block text-xs font-medium text-red-500 mt-1 pl-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
