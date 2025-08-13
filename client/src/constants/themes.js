export const THEME_OPTIONS = [
    {
        value: "cotton-candy",
        label: "Cotton Candy",
        hex: {
            primary: "#ffb3d9",
            secondary: "#ffe0f0",
            accent: "#fff5fa",
        },
    },
    {
        value: "brick-rose",
        label: "Brick Rose",
        hex: {
            primary: "#e8a3a3",
            secondary: "#f5d1d1",
            accent: "#faf0f0",
        },
    },
    {
        value: "peach-sorbet",
        label: "Peach Sorbet",
        hex: {
            primary: "#ffcc99",
            secondary: "#ffe0c2",
            accent: "#fff7f0",
        },
    },
    {
        value: "sage-meadow",
        label: "Sage Meadow",
        hex: {
            primary: "#b3d9b3",
            secondary: "#d1f0d1",
            accent: "#f0faf0",
        },
    },
    {
        value: "lavender-dreams",
        label: "Lavender Dreams",
        hex: {
            primary: "#d9b3ff",
            secondary: "#f0d9ff",
            accent: "#faf5ff",
        },
    },
    {
        value: "sky-blush",
        label: "Sky Blush",
        hex: {
            primary: "#b3e6ff",
            secondary: "#d9f5ff",
            accent: "#f0faff",
        },
    },
    {
        value: "cherry-blossom",
        label: "Cherry Blossom",
        hex: {
            primary: "#ffb3cc",
            secondary: "#ffd9e6",
            accent: "#fff0f5",
        },
    },
];

export const DEFAULT_THEME = "cotton-candy";

export const getThemeHex = (themeValue, colorType = "primary") => {
    const theme = THEME_OPTIONS.find((option) => option.value === themeValue);

    if (!theme) return THEME_OPTIONS[0].hex[colorType];
    return theme.hex[colorType] || THEME_OPTIONS[0].hex[colorType];
};
