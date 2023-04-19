import React from 'react'
import Turnstile from 'react-turnstile'
import { siteConfig } from '@/constants/siteConfig';

export default function Captcha({ show, setValue, setter, className }) {
    return (
        <div className={`h-[65px] ${className ? className : ''}`}>
            {
                show
                    ?
                    <Turnstile
                        sitekey={siteConfig.turnstileSiteKey}
                        onVerify={(token) => {
                            if (typeof setValue === 'function') {
                                setValue('token', token);
                            } else if (typeof setter === 'function') {
                                setter(token);
                            }
                        }}
                        theme="dark"
                    />
                    :
                    <></>
            }
        </div>
    )
}
