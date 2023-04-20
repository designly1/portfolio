import Turnstile, { useTurnstile } from "react-hook-turnstile";

export default function useCaptcha({
    onVerify
}) {
    const { reset } = useTurnstile();

    const render = () => (
        <Turnstile
            sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            onVerify={onVerify}
            theme="dark"
        />
    )

    return {
        reset,
        render
    }
}