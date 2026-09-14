import { FormEvent, useEffect, useMemo, useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Breadcrumb,
  Button,
  Input,
  InputWithIcon,
  Select,
  Spinner,
  Textarea,
} from '@shared/components';
import TEXTS from '@shared/i18n';
import { RoutesEnum } from '@/src/_app/types/RoutesEnum';
import { useDemandDetails } from '@features/Kanban/hooks/useDemandDetails';
import { useGetUsers } from '@features/User/hooks/useGetUsers';
import {
  FormActions,
  FormCard,
  FormFields,
  FormHeader,
  FormPage,
  FormTitle,
} from './styles/DemandForm.styled';

export default function DemandFormScreen() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { demand, isLoading } = useDemandDetails(id ?? null);
  const { users, isLoading: isLoadingUsers } = useGetUsers();

  const [title, setTitle] = useState('');
  const [responsibleId, setResponsibleId] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const responsibleOptions = useMemo(
    () => users.map((user) => ({ value: user.id, label: user.name })),
    [users],
  );

  useEffect(() => {
    if (!demand) {
      return;
    }
    setTitle(demand.title);
    setResponsibleId(demand.responsibleId);
    setDeadline(demand.deadline);
    setDescription(demand.description);
  }, [demand]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !responsibleId || !deadline || !description.trim()) {
      return;
    }

    setIsSaving(true);
    window.setTimeout(() => {
      setIsSaving(false);
      navigate(RoutesEnum.KANBAN);
    }, 300);
  };

  const handleCancel = () => {
    navigate(isEdit ? RoutesEnum.KANBAN : RoutesEnum.DEMANDS);
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
            { label: TEXTS.sidebar.demandas, to: RoutesEnum.DEMANDS },
            { label: isEdit ? TEXTS.common.edit : TEXTS.common.new },
          ]}
        />
        <FormTitle>
          {isEdit ? TEXTS.demands.editTitle : TEXTS.demands.createTitle}
        </FormTitle>
      </FormHeader>

      <FormCard onSubmit={handleSubmit}>
        <FormFields>
          <Input
            label={TEXTS.demands.fields.title}
            placeholder={TEXTS.demands.placeholders.title}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <Select
            label={TEXTS.demands.fields.responsible}
            placeholder={TEXTS.demands.placeholders.responsible}
            options={responsibleOptions}
            value={responsibleId}
            onChange={(event) => setResponsibleId(event.target.value)}
            disabled={isLoadingUsers}
            required
          />

          <InputWithIcon
            label={TEXTS.demands.fields.deadline}
            type="date"
            icon={<FiCalendar aria-hidden="true" />}
            iconAriaLabel={TEXTS.demands.openDeadlineCalendar}
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
            required
          />

          <Textarea
            label={TEXTS.demands.fields.description}
            placeholder={TEXTS.demands.placeholders.description}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </FormFields>

        <FormActions>
          <Button
            type="button"
            variant="secondary"
            disabled={isSaving}
            onClick={handleCancel}
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
