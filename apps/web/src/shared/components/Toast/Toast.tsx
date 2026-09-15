import { FiX } from 'react-icons/fi';
import TEXTS from '@shared/i18n';
import type { TToastItem } from './Toast.types';
import {
  CloseButton,
  Content,
  Description,
  IconSlot,
  Title,
  ToastCard,
} from './Toast.styled';

export interface ToastProps {
  toast: TToastItem;
  onClose: (id: string) => void;
}

export default function Toast({ toast, onClose }: ToastProps) {
  return (
    <ToastCard role="status" aria-live="polite" aria-atomic="true">
      {toast.icon && <IconSlot aria-hidden="true">{toast.icon}</IconSlot>}
      <Content>
        <Title>{toast.title}</Title>
        {toast.description && <Description>{toast.description}</Description>}
      </Content>
      <CloseButton
        type="button"
        aria-label={TEXTS.toast.close}
        onClick={() => onClose(toast.id)}
      >
        <FiX aria-hidden="true" />
      </CloseButton>
    </ToastCard>
  );
}
