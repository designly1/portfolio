import React from 'react'
import FormControl from '../UI/FormControl';

import { FaMinusSquare } from 'react-icons/fa';

const HeaderInput = ({ h, i, delHeader, handleHeaderChange, focusTo }) => {
    const keyId = `header-key-${i}`;
    const valId = `header-value-${i}`;
    const nextKeyId = `header-key-${i + 1}`;

    return (
        <div className="flex gap-2 [&>*]:my-auto">
            <FormControl
                inputId={keyId}
                outerClass="flex-1"
                type="text"
                name={keyId}
                placeholder="KEY"
                onBlur={(e) => {
                    handleHeaderChange(e);
                    focusTo(valId);
                }}
                defaultValue={h.key}
            />
            <FormControl
                inputId={valId}
                outerClass="flex-1"
                type="text"
                name={valId}
                placeholder="VALUE"
                onBlur={(e) => {
                    handleHeaderChange(e);
                    focusTo(nextKeyId);
                }}
                defaultValue={h.value}
            />
            <button className="text-2xl" onClick={() => delHeader(i)}><FaMinusSquare /></button>
        </div>
    )
}

export default HeaderInput;