import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Spinner, StyledButton } from './Button.styled';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', loading = false, fullWidth = false, disabled, type = 'button', children, ...props }, ref) => (
    <StyledButton
      {...props}
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || props['aria-busy']}
      $variant={variant}
      $fullWidth={fullWidth}
    >
      {loading && <Spinner aria-hidden="true" />}
      {children}
    </StyledButton>
  ),
);

Button.displayName = 'Button';

export default Button;