import Turnstile, { useTurnstile } from "react-hook-turnstile";

export default function useCaptcha({
    onVerify,
    theme = 'dark'
}) {
    const { reset } = useTurnstile();

    const render = (callback) => (
        <Turnstile
            sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            onVerify={token => callback ? callback(token) : onVerify(token)}
            theme={theme}
        />
    )

    return {
        reset,
        render
    }
}