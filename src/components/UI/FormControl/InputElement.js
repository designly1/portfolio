import React from 'react'
import InputMask from 'react-input-mask'
import { v4 } from 'uuid';

export default function InputElement({
    type = 'text',
    placeholder,
    name,
    mask,
    value,
    defaultValue,
    options,
    onChange,
    onBlur,
    autoComplete,
    autoCapitalize,
    inputId,
    inputRef,
    inputClass,
    showPassword
}) {
    switch (type) {
        case 'select':
            return (
                <select
                    id={inputId}
                    ref={inputRef}
                    className={inputClass}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                >
                    <option className="bg-bg0" disabled selected={!value}>{placeholder}</option>
                    {
                        options.map((o) => {
                            let optionValue, optionName;
                            if (typeof o === 'object') {
                                optionName = o.name;
                                optionValue = o.value;
                            } else {
                                optionName = o;
                                optionValue = o;
                            }
                            return (
                                <option
                                    key={v4()}
                                    className="bg-bg0"
                                    value={optionValue}
                                    selected={value === optionValue}
                                >
                                    {optionName}
                                </option>
                            )
                        })
                    }
                </select>
            )
        case 'textarea':
            return (
                <textarea
                    id={inputId}
                    ref={inputRef}
                    className={inputClass}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    onBlur={onBlur}
                ></textarea>
            )
        default:
            // Use react-input-mask if mask definition is supplied
            if (typeof mask === typeof "s" && mask.length) {
                return (
                    <InputMask
                        id={inputId}
                        inputRef={inputRef}
                        alwaysShowMask={false}
                        maskChar=""
                        className={inputClass}
                        mask={mask}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        defaultValue={defaultValue}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                )
            } else {
                // Component for all remaining types
                return (
                    <input
                        id={inputId}
                        ref={inputRef}
                        className={inputClass}
                        type={showPassword ? 'text' : type}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        defaultValue={defaultValue}
                        onChange={onChange}
                        onBlur={onBlur}
                        autoCapitalize={autoCapitalize}
                        autoComplete={autoComplete}
                    />
                )
            }
    }
}
