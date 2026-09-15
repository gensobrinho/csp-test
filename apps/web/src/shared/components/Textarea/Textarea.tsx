import { forwardRef, useId, type ComponentPropsWithoutRef } from 'react';
import { Field, Label, Message, RequiredMark, StyledTextarea } from './Textarea.styled';

export interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
  label: string;
  error?: string;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, id, required, disabled, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const message = error || helperText;
    const messageId = `${textareaId}-message`;
    const describedBy = [
      props['aria-describedby'],
      message ? messageId : undefined,
    ].filter(Boolean).join(' ') || undefined;

    return (
      <Field>
        <Label htmlFor={textareaId}>
          {label}
          {required && <RequiredMark aria-hidden="true"> *</RequiredMark>}
        </Label>
        <StyledTextarea
          {...props}
          ref={ref}
          id={textareaId}
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

Textarea.displayName = 'Textarea';

export default Textarea;
