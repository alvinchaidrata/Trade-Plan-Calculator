import React, { PropsWithChildren } from 'react'

interface InputInterface {
    name            : string
    value           : string | number
    error?          : string | null
    onChange?       : any
    onBlur?         : any
    label?          : string
    className?      : string
    inputClass?     : string  // used to modify input's padding incase there is logo
    disabled?       : boolean
    type?           : string
    autoComplete?   : string
    placeholder?    : string
}

interface InputLogo {
    className? : string  // specifies the position of the logo
}

const Input = ({
    name,
    label,
    error,
    value,
    className,
    inputClass,
    disabled,
    children,
    ...props
} : PropsWithChildren<InputInterface>) => (
    <div className={className?? ''}>
        {label &&
            <label htmlFor={name} className={`${disabled? 'text-primary/30' : 'text-primary'} mb-1 block text-sm font-medium capitalize`}>
                {label}
            </label>
        }
        <div className="relative rounded-md">
            <input
                id={name}
                name={name}
                value={value}
                className={`
                    ${error ? 'border-danger' : 'border-primary/80'}
                    ${disabled? 'text-primary/30' : 'text-primary hover:border-primary'}
                    block w-full py-2 px-3 rounded-md border bg-inherit
                    placeholder:text-primary/30
                    focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition
                    ${inputClass?? ''}
                `}
                disabled={disabled}
                {...props}
            />
            {children}
        </div>
        {error &&
            <span className='mt-1 text-xs text-danger'>
                { error }
            </span>
        }
    </div>
)

Input.Logo = ({
    className,
    children
} : PropsWithChildren<InputLogo>) => (
    <div className={`${className} pointer-events-none absolute inset-y-0 flex items-center`}>
        {children}
    </div>
)

export default Input
