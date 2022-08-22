/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}"
    ],
    theme: {
        spaicing: {
            px: "1px",
            ...[
                ...(new Array(500 * 2 + 1)).keys(),
            ].reduce((acc, cur) => {
                acc[cur / 2] = `${cur / 2 / 4}rem`;

                return acc;
            }, new Object()),
        },
        width: (theme) => ({
            auto: "auto",
            ...theme("spaicing"),
            full: "100%",
            "1/2": "50%",
        }),
        height: (theme) => ({
            auto: "auto",
            ...theme("spaicing"),
            full: "100%",
            "1/2": "50%",
        }),
        extend: {},
    },
    plugins: [],
}
