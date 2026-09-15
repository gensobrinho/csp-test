import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';
import TEXTS from '@shared/i18n';
import Button from '../Button/Button';
import type { ButtonProps } from '../Button/Button';
import {
  Actions,
  Backdrop,
  CloseButton,
  Description,
  Header,
  Panel,
  Title,
} from './Dialog.styled';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  hasCloseButton?: boolean;
  closeAriaLabel?: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  primaryButtonAction?: () => void;
  secondaryButtonAction?: () => void;
  primaryButtonVariant?: ButtonProps['variant'];
  isPrimaryLoading?: boolean;
  disableCloseOnBackdrop?: boolean;
}

export default function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  hasCloseButton = true,
  closeAriaLabel = TEXTS.dialog.close,
  primaryButtonLabel,
  secondaryButtonLabel,
  primaryButtonAction,
  secondaryButtonAction,
  primaryButtonVariant = 'primary',
  isPrimaryLoading = false,
  disableCloseOnBackdrop = false,
}: DialogProps) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const handleBackdropClick = () => {
    if (!disableCloseOnBackdrop) {
      onClose();
    }
  };

  const handleSecondaryClick = () => {
    if (secondaryButtonAction) {
      secondaryButtonAction();
      return;
    }
    onClose();
  };

  return createPortal(
    <Backdrop onClick={handleBackdropClick} aria-hidden="true">
      <Panel
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <Header>
          <Title>{title}</Title>
          {hasCloseButton && (
            <CloseButton type="button" aria-label={closeAriaLabel} onClick={onClose}>
              <FiX aria-hidden="true" />
            </CloseButton>
          )}
        </Header>

        {description && <Description>{description}</Description>}
        {children}

        {(primaryButtonLabel || secondaryButtonLabel) && (
          <Actions>
            {secondaryButtonLabel && (
              <Button
                type="button"
                variant="secondary"
                disabled={isPrimaryLoading}
                onClick={handleSecondaryClick}
              >
                {secondaryButtonLabel}
              </Button>
            )}
            {primaryButtonLabel && (
              <Button
                type="button"
                variant={primaryButtonVariant}
                isLoading={isPrimaryLoading}
                onClick={primaryButtonAction}
              >
                {primaryButtonLabel}
              </Button>
            )}
          </Actions>
        )}
      </Panel>
    </Backdrop>,
    document.body,
  );
}
