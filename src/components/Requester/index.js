import React, { useState } from 'react'
import Heading from '@/components/UI/Heading'
import FormControl from '@/components/UI/FormControl'
import Switch from '../UI/Buttons/Switch'
import ButtonGroup from '@/components/UI/Buttons/ButtonGroup'
import HeaderInput from './HeaderInput'
import BodyField from './BodyField'
import RequesterResult from './RequesterResult'
import Swal from 'sweetalert2'
import { v4 } from 'uuid'

import { FaPlusSquare, FaMinusSquare } from 'react-icons/fa'

const initialFormData = {
    url: '',
    method: 'GET',
    isJson: false,
    bodyJson: ''
}

const initialHeaders = [{
    key: '',
    value: ''
}]

const initialBodyFields = [{
    key: '',
    value: ''
}]

const methodOpts = [
    'GET',
    'POST',
    'HEAD',
    'PUT',
    'DELETE',
    'PATCH'
];

export default function Requester() {
    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [headers, setHeaders] = useState(initialHeaders);
    const [bodyFields, setBodyFields] = useState(initialBodyFields);
    const [results, setResults] = useState('');
    const [responseHeaders, setResponseHeaders] = useState('');

    const setValue = (k, v) => {
        setFormData((oldData) => (
            {
                ...oldData,
                [k]: v
            }
        ))
    }

    const handleFormChange = (e) => {
        setValue(e.target.name, e.target.value);
    }

    const handleSubmit = async () => {
        if (isLoading) return;

        let useBody = false;
        let body;
        const useBodyMethods = ['POST', 'PATCH'];

        if (useBodyMethods.includes(formData.method)) useBody = true;

        const thisHeaders = {}
        headers.forEach((h) => {
            if (h.key) thisHeaders[h.key] = h.value;
        });

        if (useBody) {
            if (formData.isJson) {
                thisHeaders.append('Content-Type', 'application/json');
                body = JSON.stringify(formData.bodyJson);
            } else {
                body = new FormData();
                bodyFields.forEach((f) => {
                    body.append(f.key, f.value);
                });
            }
        }

        const options = {
            method: formData.method,
            headers: {
                ...thisHeaders
            }
        }

        if (useBody) options['body'] = body;

        setIsLoading(true);

        try {
            const result = await fetch(formData.url, options);
            if (result.ok) {
                const outcome = await result.text();
                try {
                    const json = JSON.parse(outcome);
                    setResults(JSON.stringify(json, null, 2));
                } catch (err) {
                    setResults(outcome);
                }
            } else {
                let errorText;
                try {
                    errorText = await result.text();
                } catch (err) {
                    errorText = 'Unknown error';
                }
                setResults(errorText);
                throw new Error(`Request failed with code ${result.status}: ${errorText}`);
            }
            setResponseHeaders(JSON.stringify(result.headers, null, 2));
        } catch (err) {
            Swal.fire('Error', err.message, 'error');
        } finally {
            setIsLoading(false);
        }
    }

    const resetForm = () => {
        setFormData(initialFormData);
        setHeaders(initialHeaders);
        setBodyFields(initialBodyFields);
    }

    const addHeader = () => {
        setHeaders(prevHeaders => [
            ...prevHeaders,
            {
                key: '',
                value: ''
            }
        ])
    }

    const delHeader = (index) => {
        setHeaders(prevHeaders => prevHeaders.filter((h, i) => i !== index));
    }

    const addBodyField = () => {
        setBodyFields(prev => [
            ...prev,
            {
                key: '',
                value: ''
            }
        ])
    }

    const delBodyField = (index) => {
        setBodyFields(prev => prev.filter((h, i) => i !== index));
    }

    const handleHeaderChange = (e) => {
        const nameArr = e.target.name.split('-');
        const key = nameArr[1];
        const index = parseInt(nameArr[2]);
        const newHeader = headers[index];
        newHeader[key] = e.target.value;
        setHeaders(prevHeaders =>
            prevHeaders.map((header, i) => i === index ? newHeader : header)
        );
    }

    const handleBodyFieldChange = (e) => {
        const nameArr = e.target.name.split('-');
        const key = nameArr[1];
        const index = parseInt(nameArr[2]);
        const newField = bodyFields[index];
        newField[key] = e.target.value;
        setBodyFields(prev =>
            prev.map((field, i) => i === index ? newField : field)
        );
    }

    const focusTo = (id) => {
        console.log(id)
        setTimeout(() => {
            const ele = document.getElementById(id);
            if (ele) ele.focus();
        }, 5);
    }



    const FormButtons = () => <ButtonGroup isLoading={isLoading} hoverClass="bg-gray-500" buttons={[
        {
            title: "Submit",
            className: 'bg-gray-800',
            onClick: handleSubmit
        },
        {
            title: "Reset",
            className: "bg-gray-700",
            onClick: resetForm
        }
    ]} />

    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col gap-6 bg-bg2 md:min-h-screen px-4 py-20">
                <Heading type='h1'>HTTP Requester</Heading>
                <FormControl
                    type="text"
                    name="url"
                    placeholder="URL"
                    value={formData.url}
                    onChange={handleFormChange}
                />
                <Heading type='h3'>Request Method</Heading>
                <FormControl
                    type="select"
                    name="method"
                    placeholder="METHOD"
                    options={methodOpts}
                    value={formData.method}
                    onChange={handleFormChange}
                />
                <Heading type='h3' appendClass="btn-gap">
                    <div>Headers</div>
                    <button
                        type='button'
                        onClick={addHeader}
                    ><FaPlusSquare /></button>
                </Heading>
                {
                    headers.map((h, i) => <HeaderInput
                        h={h}
                        i={i}
                        delHeader={delHeader}
                        handleHeaderChange={handleHeaderChange}
                        focusTo={focusTo}
                        key={['header', i].join('-')}
                    />)
                }
                <Heading type='h3'>Payload Type</Heading>
                <Switch
                    on="JSON"
                    off="URL Encoded"
                    value={formData.isJson}
                    onClick={() => {
                        setValue('isJson', !formData.isJson);
                    }}
                />
                {
                    formData.isJson
                        ?
                        <FormControl
                            type="textarea"
                            name="bodyJson"
                            placeholder="{}"
                            value={formData.bodyJson}
                            onChange={handleFormChange}
                        />
                        :
                        <>
                            <Heading type='h3' appendClass="btn-gap">
                                <div>Body Fields</div>
                                <button
                                    type='button'
                                    onClick={addBodyField}
                                ><FaPlusSquare /></button>
                            </Heading>
                            {
                                bodyFields.map((f, i) => <BodyField
                                    f={f}
                                    i={i}
                                    delBodyField={delBodyField}
                                    handleBodyFieldChange={handleBodyFieldChange}
                                    focusTo={focusTo}
                                    key={['body-field', i].join('-')}
                                />)
                            }
                        </>
                }
                <FormButtons />
            </div>
            <RequesterResult results={results} />
        </div>
    )
}
