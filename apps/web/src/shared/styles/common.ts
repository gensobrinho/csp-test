import { CSSProperties } from 'react';
import { TColors, theme } from '../theme';

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
  colorScheme?: 'light' | 'dark' | 'default';
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
}: ICommonStyledProps) => {
  return {
    display: 'flex',
    flexDirection: flexRow ? ('row' as const) : ('column' as const),
    ...(centerX && { justifyContent: 'center' }),
    ...(centerY && { alignItems: 'center' }),
    ...(center && { justifyContent: 'center', alignItems: 'center' }),
    ...(gap !== undefined && { gap }),
    ...(bg && { backgroundColor: theme.colors[colorScheme][bg] }),
    flex: flex ?? 1,
    ...(fit && { flex: 0 }),
    ...(justify && { justifyContent: justify }),
    ...(align && { alignItems: align }),
    ...(radius !== undefined && { borderRadius: radius }),
    ...(pad !== undefined && { padding: pad }),
    ...(padV !== undefined && { paddingTop: padV, paddingBottom: padV }),
    ...(padH !== undefined && { paddingLeft: padH, paddingRight: padH }),
    ...(absolute && { position: 'absolute' as const }),
  };
};
