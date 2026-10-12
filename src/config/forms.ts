// Web3Forms configuration.
//
// The access key is read from the VITE_WEB3FORMS_KEY environment variable.
// Set it locally in a `.env` file (see `.env.example`) and in your host /
// Lovable build settings for production — otherwise form submissions will fail.
//
// NOTE: This is a client-side app, so this value is compiled into the browser
// bundle and is NOT secret. That's fine — Web3Forms access keys are designed to
// be public; they only allow submitting your form (which emails you), not reading
// data. Restrict abuse via domain-locking / captcha in the Web3Forms dashboard.
export const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string;

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
