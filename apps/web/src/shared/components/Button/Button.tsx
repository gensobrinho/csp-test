import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Spinner, StyledButton } from './Button.styled';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', isLoading = false, fullWidth = false, disabled, type = 'button', children, ...props }, ref) => (
    <StyledButton
      {...props}
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || props['aria-busy']}
      $variant={variant}
      $fullWidth={fullWidth}
    >
      {isLoading && <Spinner aria-hidden="true" />}
      {children}
    </StyledButton>
  ),
);

Button.displayName = 'Button';

export default Button;