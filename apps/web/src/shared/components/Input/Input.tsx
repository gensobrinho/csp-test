import { forwardRef, useId, useState, type ComponentPropsWithoutRef } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import TEXTS from '@shared/i18n';
import {
  Field, Label, RequiredMark, StyledInput, Message, InputControl, VisibilityButton,
} from './Input.styled';

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, id, required, disabled, type = 'text', ...props }, ref) => {
    const generatedId = useId();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPassword = type === 'password';
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
        <InputControl fit>
          <StyledInput
            {...props}
            ref={ref}
            id={inputId}
            type={isPassword && isPasswordVisible ? 'text' : type}
            $hasReveal={isPassword}
            required={required}
            disabled={disabled}
            aria-invalid={error ? true : props['aria-invalid']}
            aria-describedby={describedBy}
          />
          {isPassword && (
            <VisibilityButton
              type="button"
              disabled={disabled}
              aria-label={isPasswordVisible ? TEXTS.input.hidePassword : TEXTS.input.showPassword}
              aria-controls={inputId}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => setIsPasswordVisible((visible) => !visible)}
            >
              {isPasswordVisible ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
            </VisibilityButton>
          )}
        </InputControl>
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