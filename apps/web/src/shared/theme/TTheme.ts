import { CSSProperties } from "react";

export type TTextStyle = {
    fontSize: CSSProperties['fontSize'];
    fontWeight?: CSSProperties['fontWeight'];
    lineHeight?: CSSProperties['lineHeight'];
    lightColor?: string;
    darkColor?: string;
};

export type TColors = {
    surface: string;
    accent: string;
    accentHover: string;
    accentBorder: string;
    accentSurface: string;
    focus: string;
    danger: string;
    dangerSurface: string;
    disabledBg: string;
    bg: string;
    primary: string;
    primaryText: string;
    secondaryText: string;
    border: string;
    grey: string;
    lightBlue: string;
    lightPink: string;
    yellow: string;
    lightGreen: string;
}

export type TColorScheme = {
    default: TColors;
    light: TColors;
    dark: TColors;
  };

export type TTheme = {
    colors: TColorScheme,
}