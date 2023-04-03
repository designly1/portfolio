import React from 'react'
import FormControl from '../UI/FormControl';

import { FaMinusSquare } from 'react-icons/fa';

const BodyField = ({ f, i, delBodyField, handleBodyFieldChange, focusTo }) => {
    const keyId = `body-key-${i}`;
    const valId = `body-value-${i}`;
    const nextKeyId = `body-key-${i + 1}`;

    return (
        <div className="flex gap-2 [&>*]:my-auto">
            <FormControl
                inputId={keyId}
                outerClass="flex-1"
                type="text"
                name={keyId}
                placeholder="KEY"
                onBlur={(e) => {
                    handleBodyFieldChange(e);
                    focusTo(valId);
                }}
                defaultValue={f.key}
            />
            <FormControl
                inputId={valId}
                outerClass="flex-1"
                type="text"
                name={valId}
                placeholder="VALUE"
                onBlur={(e) => {
                    handleBodyFieldChange(e);
                    focusTo(nextKeyId);
                }}
                defaultValue={f.value}
            />
            <button className="text-2xl" onClick={() => delBodyField(i)}><FaMinusSquare /></button>
        </div>
    )
}

export default BodyField;