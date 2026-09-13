import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';
import TEXTS from '@shared/i18n';
import { Backdrop, Body, CloseButton, Footer, Header, Panel, Title } from './Drawer.styled';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  closeAriaLabel?: string;
  width?: string;
}

export default function Drawer({
  open,
  onClose,
  title,
  children,
  footer,
  closeAriaLabel = TEXTS.drawer.close,
  width = 'min(420px, 100vw)',
}: DrawerProps) {
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

  return createPortal(
    <>
      <Backdrop onClick={onClose} aria-hidden="true" />
      <Panel
        role="dialog"
        aria-modal="true"
        aria-label={title}
        $width={width}
      >
        <Header>
          <Title>{title}</Title>
          <CloseButton type="button" aria-label={closeAriaLabel} onClick={onClose}>
            <FiX aria-hidden="true" />
          </CloseButton>
        </Header>
        <Body>{children}</Body>
        {footer && <Footer>{footer}</Footer>}
      </Panel>
    </>,
    document.body,
  );
}
