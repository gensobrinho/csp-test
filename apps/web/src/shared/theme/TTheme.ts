import { CSSProperties } from "react";

export type TTextStyle = {
    fontSize: CSSProperties['fontSize'];
    fontWeight?: CSSProperties['fontWeight'];
    lineHeight?: CSSProperties['lineHeight'];
    lightColor?: string;
    darkColor?: string;
};

export type TColors = {
    bg: string;
}

export type TColorScheme = {
    default: TColors;
    light: TColors;
    dark: TColors;
  };

export type TTheme = {
    colors: TColorScheme,
}