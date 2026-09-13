import TEXTS from '@shared/i18n';
import { SpinnerCenter, SpinnerRoot } from './Spinner.styled';

export interface SpinnerProps {
  size?: number;
  thickness?: number;
  label?: string;
  centered?: boolean;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export default function Spinner({
  size = 20,
  thickness = 2,
  label = TEXTS.spinner.loading,
  centered = false,
  'aria-hidden': ariaHidden,
}: SpinnerProps) {
  const isDecorative = ariaHidden === true || ariaHidden === 'true';

  const spinner = (
    <SpinnerRoot
      role={isDecorative ? undefined : 'status'}
      aria-label={isDecorative ? undefined : label}
      aria-hidden={isDecorative ? true : undefined}
      $size={size}
      $thickness={thickness}
    />
  );

  if (centered) {
    return <SpinnerCenter>{spinner}</SpinnerCenter>;
  }

  return spinner;
}
