import { forwardRef, useId, type ComponentPropsWithoutRef } from 'react';
import { Field, Label, RequiredMark, StyledInput, Message } from './Input.styled';

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, id, required, disabled, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const message = error || helperText;
    const messageId = `${inputId}-message`;
    const describedBy = [
      props['aria-describedby'],
      message ? messageId : undefined,
    ].filter(Boolean).join(' ') || undefined;

    return (
      <Field>
        <Label htmlFor={inputId}>
          {label}
          {required && <RequiredMark aria-hidden="true"> *</RequiredMark>}
        </Label>
        <StyledInput
          {...props}
          ref={ref}
          id={inputId}
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : props['aria-invalid']}
          aria-describedby={describedBy}
        />
        {message && (
          <Message id={messageId} $error={Boolean(error)} role={error ? 'alert' : undefined}>
            {message}
          </Message>
        )}
      </Field>
    );
  },
);

Input.displayName = 'Input';

export default Input;