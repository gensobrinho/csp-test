import { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, Drawer, Spinner } from '@shared/components';
import TEXTS from '@shared/i18n';
import { useDeleteUser } from '../hooks/useDeleteUser';
import { useUserDetails } from '../hooks/useUserDetails';
import {
  DetailsActions,
  DetailsError,
  DetailsField,
  DetailsFieldLabel,
  DetailsProfile,
  DetailsValue,
} from './styles/UserDetailsDrawer.styled';

const ROLE_LABELS = {
  admin: TEXTS.auth.roles.admin,
  agilist: TEXTS.auth.roles.agilist,
  developer: TEXTS.auth.roles.developer,
} as const;

export interface UserDetailsDrawerProps {
  userId: string | null;
  onClose: () => void;
}

export default function UserDetailsDrawer({ userId, onClose }: UserDetailsDrawerProps) {
  const navigate = useNavigate();
  const { user, isLoading } = useUserDetails(userId);
  const { deleteUser, isDeleting } = useDeleteUser();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = () => {
    if (!userId) {
      return;
    }
    onClose();
    navigate(`/usuarios/${userId}/editar`);
  };

  const handleConfirmDelete = async () => {
    if (!userId) {
      return;
    }

    setError(null);
    try {
      await deleteUser(userId);
      setIsDeleteDialogOpen(false);
      onClose();
    } catch {
      setError(TEXTS.users.errors.deleteFailed);
    }
  };

  return (
    <>
      <Drawer
        open={Boolean(userId)}
        onClose={onClose}
        title={TEXTS.users.detailsTitle}
        closeAriaLabel={TEXTS.users.closeDetails}
        footer={(
          <DetailsActions>
            <Button variant="secondary" type="button" onClick={handleEdit}>
              <FiEdit2 aria-hidden="true" />
              {TEXTS.users.edit}
            </Button>
            <Button
              variant="danger"
              type="button"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <FiTrash2 aria-hidden="true" />
              {TEXTS.users.delete}
            </Button>
          </DetailsActions>
        )}
      >
        {isLoading || !user ? (
          <Spinner centered size={24} />
        ) : (
          <>
            <DetailsField>
              <DetailsFieldLabel>{TEXTS.users.fields.name}</DetailsFieldLabel>
              <DetailsValue>{user.name}</DetailsValue>
            </DetailsField>

            <DetailsField>
              <DetailsFieldLabel>{TEXTS.users.fields.profile}</DetailsFieldLabel>
              <DetailsProfile>{ROLE_LABELS[user.role]}</DetailsProfile>
            </DetailsField>
          </>
        )}
      </Drawer>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => !isDeleting && setIsDeleteDialogOpen(false)}
        title={TEXTS.users.deleteDialog.title}
        description={TEXTS.users.deleteDialog.description}
        hasCloseButton
        primaryButtonLabel={TEXTS.common.delete}
        secondaryButtonLabel={TEXTS.common.cancel}
        primaryButtonVariant="danger"
        primaryButtonAction={() => {
          void handleConfirmDelete();
        }}
        isPrimaryLoading={isDeleting}
        disableCloseOnBackdrop={isDeleting}
      >
        {error && <DetailsError role="alert">{error}</DetailsError>}
      </Dialog>
    </>
  );
}
