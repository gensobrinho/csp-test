import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TEXTS from '@shared/i18n';
import { renderWithProviders } from '@shared/utils/testSetup';
import { mockUseDemandDetails, resetKanbanMocks } from '../../mocks/kanban-hooks.mock';
import { KANBAN_TEST_DEMAND } from '../../mocks/kanban-test-data.mock';
import DemandDetailsDrawer from '../../views/DemandDetailsDrawer';

describe('DemandDetailsDrawer', () => {
  beforeEach(() => { resetKanbanMocks(); });

  describe('Rendering', () => {
    it('should not render the dialog when there is no selected demand', () => {
      renderWithProviders(<DemandDetailsDrawer demandId={null} onClose={() => undefined} />);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should render demand details when data is available', () => {
      renderWithProviders(
        <DemandDetailsDrawer demandId={KANBAN_TEST_DEMAND.id} onClose={() => undefined} />,
      );

      expect(screen.queryByRole('dialog', { name: TEXTS.demands.detailsTitle })).toBeInTheDocument();
      expect(screen.queryByText(KANBAN_TEST_DEMAND.title)).toBeInTheDocument();
      expect(screen.queryByText(KANBAN_TEST_DEMAND.responsibleName)).toBeInTheDocument();
      expect(screen.queryByText(TEXTS.kanban.columns.notStarted)).toBeInTheDocument();
      expect(screen.queryByText(KANBAN_TEST_DEMAND.description)).toBeInTheDocument();
    });

    it('should show a loading spinner while details are loading', () => {
      mockUseDemandDetails.mockReturnValue({
        demand: null,
        isLoading: true,
        error: null,
      });

      renderWithProviders(
        <DemandDetailsDrawer demandId={KANBAN_TEST_DEMAND.id} onClose={() => undefined} />,
      );

      expect(screen.queryByRole('status', { name: TEXTS.spinner.loading })).toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    it('should close the drawer when the close button is clicked', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();

      renderWithProviders(
        <DemandDetailsDrawer demandId={KANBAN_TEST_DEMAND.id} onClose={onClose} />,
      );

      await user.click(screen.getByRole('button', { name: TEXTS.demands.closeDetails }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
