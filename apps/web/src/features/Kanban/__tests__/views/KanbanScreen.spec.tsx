import { beforeEach, describe, expect, it } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import TEXTS from '@shared/i18n';
import { renderWithProviders } from '@shared/utils/testSetup';
import {
  columnDemandsResult,
  mockSetSelectedDemandId,
  mockUseLoadColumnDemands,
  resetKanbanMocks,
} from '../../mocks/kanban-hooks.mock';
import { KANBAN_TEST_DEMAND } from '../../mocks/kanban-test-data.mock';
import KanbanScreen from '../../views/KanbanScreen';

describe('KanbanScreen', () => {
  beforeEach(() => { resetKanbanMocks(); });

  describe('Rendering', () => {
    it('should render the header, search and all status columns', () => {
      renderWithProviders(<KanbanScreen />);

      expect(screen.queryByRole('heading', { name: TEXTS.kanban.title })).toBeInTheDocument();
      expect(screen.queryByPlaceholderText(TEXTS.kanban.searchPlaceholder)).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: TEXTS.kanban.newDemand })).toBeInTheDocument();
      expect(screen.queryByLabelText(TEXTS.kanban.columns.notStarted)).toBeInTheDocument();
      expect(screen.queryByLabelText(TEXTS.kanban.columns.inProgress)).toBeInTheDocument();
      expect(screen.queryByLabelText(TEXTS.kanban.columns.paused)).toBeInTheDocument();
      expect(screen.queryByLabelText(TEXTS.kanban.columns.inHomologation)).toBeInTheDocument();
      expect(screen.queryByLabelText(TEXTS.kanban.columns.inProduction)).toBeInTheDocument();
      expect(screen.queryByText(KANBAN_TEST_DEMAND.title)).toBeInTheDocument();
    });

    it('should show load more when the column has additional pages', () => {
      mockUseLoadColumnDemands.mockImplementation((status) => (
        status === 'not_started'
          ? columnDemandsResult({ data: [KANBAN_TEST_DEMAND], total: 12, hasMore: true })
          : columnDemandsResult()
      ));

      renderWithProviders(<KanbanScreen />);
      expect(screen.queryByRole('button', { name: TEXTS.kanban.loadMore })).toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    it('should select the demand when a card is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<KanbanScreen />);

      await user.click(screen.getByText(KANBAN_TEST_DEMAND.title));

      expect(mockSetSelectedDemandId).toHaveBeenCalledTimes(1);
      expect(mockSetSelectedDemandId).toHaveBeenCalledWith(KANBAN_TEST_DEMAND.id);
    });

    it('should navigate to demand creation when clicking new demand', async () => {
      const user = userEvent.setup();
      renderWithProviders(
        <Routes>
          <Route path="/" element={<KanbanScreen />} />
          <Route path="/demandas/novo" element={<h1>{TEXTS.demands.createTitle}</h1>} />
        </Routes>,
      );

      await user.click(screen.getByRole('button', { name: TEXTS.kanban.newDemand }));

      expect(screen.queryByRole('heading', { name: TEXTS.demands.createTitle })).toBeInTheDocument();
    });
  });
});
