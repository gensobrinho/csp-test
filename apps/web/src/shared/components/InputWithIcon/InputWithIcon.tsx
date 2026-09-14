import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import {
  Field,
  IconButton,
  InputControl,
  Label,
  RequiredMark,
  StyledInput,
  VisuallyHidden,
} from './InputWithIcon.styled';

export interface InputWithIconProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  hideLabel?: boolean;
  icon: ReactNode;
  iconAriaLabel: string;
  onIconClick?: () => void;
  error?: string;
}

const InputWithIcon = forwardRef<HTMLInputElement, InputWithIconProps>(
  ({
    label,
    hideLabel = false,
    icon,
    iconAriaLabel,
    onIconClick,
    id,
    disabled,
    required,
    type = 'text',
    error,
    ...props
  }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <Field>
        {hideLabel ? (
          <VisuallyHidden>
            <Label htmlFor={inputId}>
              {label}
              {required && <RequiredMark aria-hidden="true"> *</RequiredMark>}
            </Label>
          </VisuallyHidden>
        ) : (
          <Label htmlFor={inputId}>
            {label}
            {required && <RequiredMark aria-hidden="true"> *</RequiredMark>}
          </Label>
        )}
        <InputControl fit>
          <StyledInput
            {...props}
            ref={ref}
            id={inputId}
            type={type}
            required={required}
            disabled={disabled}
            aria-invalid={error ? true : props['aria-invalid']}
          />
          <IconButton
            type="button"
            disabled={disabled}
            aria-label={iconAriaLabel}
            aria-controls={inputId}
            onMouseDown={(event) => event.preventDefault()}
            onClick={onIconClick}
          >
            {icon}
          </IconButton>
        </InputControl>
      </Field>
    );
  },
);

InputWithIcon.displayName = 'InputWithIcon';

export default InputWithIcon;
