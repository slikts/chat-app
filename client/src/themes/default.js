import { createTheme } from "@uifabric/styling";

const defaultTheme = createTheme({
  palette: {
    themePrimary: "#3f00d4",
    themeLighterAlt: "#f6f3fd",
    themeLighter: "#dcd0f8",
    themeLight: "#bfa9f2",
    themeTertiary: "#855ce5",
    themeSecondary: "#531ad9",
    themeDarkAlt: "#3900be",
    themeDark: "#3000a1",
    themeDarker: "#240077",
    neutralLighterAlt: "#f8f8f8",
    neutralLighter: "#f4f4f4",
    neutralLight: "#eaeaea",
    neutralQuaternaryAlt: "#dadada",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c8c8",
    neutralTertiary: "#c2c2c2",
    neutralSecondary: "#858585",
    neutralPrimaryAlt: "#4b4b4b",
    neutralPrimary: "#333333",
    neutralDark: "#272727",
    black: "#1d1d1d",
    white: "#ffffff",
  },
});

export default defaultTheme;

const { palette } = defaultTheme;

export const inverted = createTheme({
  palette: {
    themePrimary: palette.white,
    white: palette.themePrimary,
    black: palette.white,
    neutralPrimary: palette.white,
    neutralDark: palette.naturalLight,
    neutralSecondary: palette.white,
    themeDarkAlt: palette.white,
    themeDarker: palette.white,
    // themeLighterAlt: "#f06",
    // themeLighter: "#f06",
    // themeLight: "#f06",
    // themeTertiary: "#f06",
    // themeSecondary: "#f06",
    // themeDark: "#f06",
    // neutralLighterAlt: "#f06",
    // neutralLighter: "#f06",
    // neutralLight: "#f06",
    // neutralQuaternaryAlt: "#f06",
    // neutralQuaternary: "#f06",
    // neutralTertiaryAlt: "#f06",
    // neutralTertiary: "#f06",
    // neutralPrimaryAlt: "#f06",
  },
});
