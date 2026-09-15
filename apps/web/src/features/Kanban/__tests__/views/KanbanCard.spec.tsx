import { describe, expect, it, jest } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@shared/utils/testSetup';
import { KANBAN_TEST_DEMAND } from '../../mocks/kanban-test-data.mock';
import KanbanCard from '../../views/KanbanCard';

describe('KanbanCard', () => {
  describe('Rendering', () => {
    it('should display the demand title, responsible initials and deadline', () => {
      renderWithProviders(<KanbanCard demand={KANBAN_TEST_DEMAND} />);

      expect(screen.queryByText(KANBAN_TEST_DEMAND.title)).toBeInTheDocument();
      expect(screen.queryByText('JS')).toBeInTheDocument();
      expect(screen.queryByText('28/05/2025')).toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    it('should open the demand details when the card is clicked', async () => {
      const user = userEvent.setup();
      const onOpen = jest.fn();

      renderWithProviders(<KanbanCard demand={KANBAN_TEST_DEMAND} onOpen={onOpen} />);
      await user.click(screen.getByText(KANBAN_TEST_DEMAND.title));

      expect(onOpen).toHaveBeenCalledTimes(1);
      expect(onOpen).toHaveBeenCalledWith(KANBAN_TEST_DEMAND.id);
    });
  });
});
