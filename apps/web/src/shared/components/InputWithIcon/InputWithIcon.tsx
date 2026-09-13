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
  StyledInput,
  VisuallyHidden,
} from './InputWithIcon.styled';

export interface InputWithIconProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  label: string;
  hideLabel?: boolean;
  icon: ReactNode;
  iconAriaLabel: string;
  onIconClick?: () => void;
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
    ...props
  }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <Field>
        {hideLabel ? (
          <VisuallyHidden>
            <Label htmlFor={inputId}>{label}</Label>
          </VisuallyHidden>
        ) : (
          <Label htmlFor={inputId}>{label}</Label>
        )}
        <InputControl fit>
          <StyledInput
            {...props}
            ref={ref}
            id={inputId}
            type="text"
            disabled={disabled}
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
