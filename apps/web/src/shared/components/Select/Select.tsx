import { forwardRef, useId, type ComponentPropsWithoutRef } from 'react';
import {
  Field, Label, Message, RequiredMark, SelectControl, StyledSelect,
} from './Select.styled';

export type SelectOption = {
  value: string;
  label: string;
};

export interface SelectProps extends Omit<ComponentPropsWithoutRef<'select'>, 'children'> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  helperText?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({
    label,
    options,
    placeholder,
    error,
    helperText,
    id,
    required,
    disabled,
    value,
    ...props
  }, ref) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const message = error || helperText;
    const messageId = `${selectId}-message`;
    const describedBy = [
      props['aria-describedby'],
      message ? messageId : undefined,
    ].filter(Boolean).join(' ') || undefined;

    return (
      <Field>
        <Label htmlFor={selectId}>
          {label}
          {required && <RequiredMark aria-hidden="true"> *</RequiredMark>}
        </Label>
        <SelectControl fit>
          <StyledSelect
            {...props}
            ref={ref}
            id={selectId}
            required={required}
            disabled={disabled}
            value={value}
            aria-invalid={error ? true : props['aria-invalid']}
            aria-describedby={describedBy}
          >
            {placeholder && (
              <option value="" disabled={required}>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </StyledSelect>
        </SelectControl>
        {message && (
          <Message id={messageId} $error={Boolean(error)} role={error ? 'alert' : undefined}>
            {message}
          </Message>
        )}
      </Field>
    );
  },
);

Select.displayName = 'Select';

export default Select;
