import { useState, type KeyboardEvent, type MouseEvent } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, Spinner } from '@shared/components';
import TEXTS from '@shared/i18n';
import { getInitials } from '@/src/shared/utils/helperFunctions';
import { RoutesEnum } from '@/src/_app/types/RoutesEnum';
import { useDeleteUser } from '../hooks/useDeleteUser';
import { useGetUsers } from '../hooks/useGetUsers';
import UserDetailsDrawer from './UserDetailsDrawer';
import {
  DeleteButton,
  EmptyState,
  Feedback,
  UserAvatar,
  UserCard,
  UserName,
  UsersHeader,
  UsersList,
  UsersPage,
  UsersTitle,
} from './styles/UserScreen.styled';

export default function UserScreen() {
  const navigate = useNavigate();
  const { users, isLoading } = useGetUsers();
  const { deleteUser, isDeleting } = useDeleteUser();

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOpenDetails = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLLIElement>, userId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOpenDetails(userId);
    }
  };

  const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>, userId: string) => {
    event.stopPropagation();
    setError(null);
    setUserIdToDelete(userId);
  };

  const handleConfirmDelete = async () => {
    if (!userIdToDelete) {
      return;
    }

    setError(null);
    try {
      await deleteUser(userIdToDelete);
      if (selectedUserId === userIdToDelete) {
        setSelectedUserId(null);
      }
      setUserIdToDelete(null);
    } catch {
      setError(TEXTS.users.errors.deleteFailed);
    }
  };

  return (
    <UsersPage>
      <UsersHeader>
        <UsersTitle>{TEXTS.placeholders.usersTitle}</UsersTitle>
        <Button onClick={() => navigate(RoutesEnum.USER_CREATE)}>
          <FiPlus aria-hidden="true" />
          {TEXTS.users.newUser}
        </Button>
      </UsersHeader>

      {isLoading ? (
        <Spinner centered size={28} />
      ) : users.length === 0 ? (
        <EmptyState>{TEXTS.users.emptyList}</EmptyState>
      ) : (
        <UsersList>
          {users.map((user) => (
            <UserCard
              key={user.id}
              role="button"
              tabIndex={0}
              onClick={() => handleOpenDetails(user.id)}
              onKeyDown={(event) => handleCardKeyDown(event, user.id)}
              aria-label={user.name}
            >
              <UserAvatar aria-hidden="true">{getInitials(user.name)}</UserAvatar>
              <UserName>{user.name}</UserName>
              <DeleteButton
                type="button"
                aria-label={`${TEXTS.users.delete} ${user.name}`}
                onClick={(event) => handleDeleteClick(event, user.id)}
              >
                <FiTrash2 aria-hidden="true" />
              </DeleteButton>
            </UserCard>
          ))}
        </UsersList>
      )}

      <UserDetailsDrawer
        userId={selectedUserId}
        onClose={() => setSelectedUserId(null)}
      />

      <Dialog
        open={Boolean(userIdToDelete)}
        onClose={() => !isDeleting && setUserIdToDelete(null)}
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
        {error && <Feedback role="alert">{error}</Feedback>}
      </Dialog>
    </UsersPage>
  );
}
