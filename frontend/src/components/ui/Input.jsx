import React from 'react';

export function Input({ label, id, error, ...props }) {
    return (
        <div className="flex flex-col space-y-1 mb-4">
            {label && <label htmlFor={id} className="text-sm font-medium text-slate-700">{label}</label>}
            <input
                id={id}
                className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${error ? "border-red-500" : "border-slate-300"}`}
                {...props}
            />
        </div>
    );
}