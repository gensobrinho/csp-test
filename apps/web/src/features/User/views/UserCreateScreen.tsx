import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { TRole } from '@features/Auth';
import { Breadcrumb, Button, Input, Select, Spinner } from '@shared/components';
import TEXTS from '@shared/i18n';
import { RoutesEnum } from '@/src/_app/types/RoutesEnum';
import { ROLE_OPTIONS } from '../constants/roleOptions';
import { useCreateUser } from '../hooks/useCreateUser';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { useUserDetails } from '../hooks/useUserDetails';
import {
  FormActions,
  FormCard,
  FormError,
  FormFields,
  FormHeader,
  FormPage,
  FormTitle,
} from './styles/UserForm.styled';

export default function UserCreateScreen() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { user, isLoading } = useUserDetails(id ?? null);
  const { createUser, isCreating } = useCreateUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const [name, setName] = useState('');
  const [role, setRole] = useState<TRole | ''>('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isSaving = isCreating || isUpdating;

  useEffect(() => {
    if (!user) {
      return;
    }
    setName(user.name);
    setRole(user.role);
  }, [user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !role) {
      return;
    }
    if (!isEdit && !password) {
      return;
    }

    setError(null);

    try {
      if (isEdit && id) {
        await updateUser({
          id,
          payload: {
            name: name.trim(),
            role,
            ...(password ? { password } : {}),
          },
        });
      } else {
        await createUser({
          name: name.trim(),
          role,
          password,
        });
      }
      navigate(RoutesEnum.USERS);
    } catch {
      setError(TEXTS.users.errors.saveFailed);
    }
  };

  if (isEdit && isLoading) {
    return (
      <FormPage>
        <Spinner centered size={28} />
      </FormPage>
    );
  }

  return (
    <FormPage>
      <FormHeader>
        <Breadcrumb
          items={[
            { label: TEXTS.common.home, to: RoutesEnum.HOME },
            { label: TEXTS.sidebar.usuarios, to: RoutesEnum.USERS },
            { label: isEdit ? TEXTS.common.edit : TEXTS.common.new },
          ]}
        />
        <FormTitle>
          {isEdit ? TEXTS.users.editTitle : TEXTS.users.createTitle}
        </FormTitle>
      </FormHeader>

      <FormCard onSubmit={handleSubmit}>
        <FormFields>
          <Input
            label={TEXTS.users.fields.name}
            placeholder={TEXTS.users.placeholders.name}
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <Select
            label={TEXTS.users.fields.profile}
            placeholder={TEXTS.users.placeholders.profile}
            options={ROLE_OPTIONS}
            value={role}
            onChange={(event) => setRole(event.target.value as TRole | '')}
            required
          />
          <Input
            label={TEXTS.users.fields.password}
            type="password"
            placeholder={
              isEdit
                ? TEXTS.users.placeholders.passwordEdit
                : TEXTS.users.placeholders.password
            }
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required={!isEdit}
            autoComplete={isEdit ? 'new-password' : 'new-password'}
          />
          {error && <FormError role="alert">{error}</FormError>}
        </FormFields>

        <FormActions>
          <Button
            type="button"
            variant="secondary"
            disabled={isSaving}
            onClick={() => navigate(RoutesEnum.USERS)}
          >
            {TEXTS.common.cancel}
          </Button>
          <Button type="submit" isLoading={isSaving}>
            {TEXTS.common.save}
          </Button>
        </FormActions>
      </FormCard>
    </FormPage>
  );
}
