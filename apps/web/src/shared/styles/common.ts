import { CSSProperties } from 'react';
import { TColors, TTheme, theme } from '../theme';

export interface ICommonStyledProps {
  center?: boolean;
  centerX?: boolean;
  centerY?: boolean;
  flexRow?: boolean;
  absolute?: boolean;
  gap?: number;
  pad?: number;
  padV?: number;
  padH?: number;
  flex?: number;
  bg?: keyof TColors;
  colorScheme?: 'light' | 'dark';
  fit?: boolean;
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  radius?: number;
}
export const buildStyledProps = ({
  center,
  centerX,
  centerY,
  flexRow,
  gap,
  flex,
  bg,
  fit,
  justify,
  align,
  radius,
  colorScheme = 'dark',
  pad,
  padV,
  padH,
  absolute,
}: ICommonStyledProps & { theme?: TTheme }) => {
  return {
    ...(centerX && { justifyContent: 'center' }),
    ...(centerY && { alignItems: 'center' }),
    ...(center && { justifyContent: 'center', alignItems: 'center' }),
    ...(flexRow && { flexDirection: 'row' }),
    ...(gap && { gap: gap }),
    ...(bg && { backgroundColor: theme.colors[colorScheme][bg] }),
    flex: flex ?? 1,
    ...(fit && { flex: 0 }),
    ...(justify && { justifyContent: justify }),
    ...(align && { alignItems: align }),
    ...(radius && { borderRadius: radius }),
    ...(pad && { padding: pad }),
    ...(padV && { paddingVertical: padV }),
    ...(padH && { paddingHorizontal: padH }),
    ...(absolute && { position: 'absolute' }),
  };
};
