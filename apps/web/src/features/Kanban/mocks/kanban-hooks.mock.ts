import { jest } from '@jest/globals';
import type { useAuthState } from '@features/Auth/hooks/useAuthState';
import { AUTH_TEST_USER } from '@features/Auth/mocks/auth-test-data.mock';
import type { useDeleteDemand } from '../hooks/useDeleteDemand';
import type { useDemandDetails } from '../hooks/useDemandDetails';
import type { useKanbanSearchState } from '../hooks/useKanbanSearchState';
import type { useLoadColumnDemands } from '../hooks/useLoadColumnDemands';
import type { useMoveDemand } from '../hooks/useMoveDemand';
import type { useSelectedDemandState } from '../hooks/useSelectedDemandState';
import { KANBAN_TEST_DEMAND } from './kanban-test-data.mock';

export const mockSetSearchQuery = jest.fn<ReturnType<typeof useKanbanSearchState>['setSearchQuery']>();
export const mockSetSelectedDemandId = jest.fn<ReturnType<typeof useSelectedDemandState>['setSelectedDemandId']>();
export const mockMoveDemand = jest.fn<ReturnType<typeof useMoveDemand>['moveDemand']>();
export const mockResetMoveError = jest.fn<ReturnType<typeof useMoveDemand>['reset']>();
export const mockLoadMore = jest.fn();
export const mockSetSession = jest.fn<ReturnType<typeof useAuthState>['setSession']>();
export const mockMoveDemandAsync = jest.fn();
export const mockDeleteDemand = jest.fn<ReturnType<typeof useDeleteDemand>['deleteDemand']>();

export const mockUseAuthState = jest.fn<typeof useAuthState>();
export const mockUseKanbanSearchState = jest.fn<typeof useKanbanSearchState>();
export const mockUseSelectedDemandState = jest.fn<typeof useSelectedDemandState>();
export const mockUseMoveDemand = jest.fn<typeof useMoveDemand>();
export const mockUseLoadColumnDemands = jest.fn<typeof useLoadColumnDemands>();
export const mockUseDemandDetails = jest.fn<typeof useDemandDetails>();
export const mockUseDeleteDemand = jest.fn<typeof useDeleteDemand>();

jest.mock('@features/Auth/hooks/useAuthState', () => ({ useAuthState: mockUseAuthState }));
jest.mock('../hooks/useKanbanSearchState', () => ({ useKanbanSearchState: mockUseKanbanSearchState }));
jest.mock('../hooks/useSelectedDemandState', () => ({ useSelectedDemandState: mockUseSelectedDemandState }));
jest.mock('../hooks/useMoveDemand', () => ({ useMoveDemand: mockUseMoveDemand }));
jest.mock('../hooks/useLoadColumnDemands', () => ({ useLoadColumnDemands: mockUseLoadColumnDemands }));
jest.mock('../hooks/useDemandDetails', () => ({ useDemandDetails: mockUseDemandDetails }));
jest.mock('../hooks/useDeleteDemand', () => ({ useDeleteDemand: mockUseDeleteDemand }));

export function columnDemandsResult(
  overrides: Partial<ReturnType<typeof useLoadColumnDemands>> = {},
): ReturnType<typeof useLoadColumnDemands> {
  return {
    data: [],
    total: 0,
    hasMore: false,
    isLoading: false,
    isFetchingMore: false,
    loadMore: mockLoadMore as ReturnType<typeof useLoadColumnDemands>['loadMore'],
    error: null,
    ...overrides,
  };
}

export function resetKanbanMocks() {
  jest.clearAllMocks();

  mockUseAuthState.mockReturnValue({
    user: AUTH_TEST_USER,
    isHydrated: true,
    setSession: mockSetSession,
  });

  mockUseKanbanSearchState.mockReturnValue({
    searchQuery: '',
    setSearchQuery: mockSetSearchQuery,
  });

  mockUseSelectedDemandState.mockReturnValue({
    selectedDemandId: null,
    setSelectedDemandId: mockSetSelectedDemandId,
  });

  mockUseMoveDemand.mockReturnValue({
    moveDemand: mockMoveDemand,
    moveDemandAsync: mockMoveDemandAsync as ReturnType<typeof useMoveDemand>['moveDemandAsync'],
    isMoving: false,
    error: null,
    reset: mockResetMoveError,
  });

  mockUseLoadColumnDemands.mockImplementation((status) => (
    status === 'not_started'
      ? columnDemandsResult({ data: [KANBAN_TEST_DEMAND], total: 1 })
      : columnDemandsResult()
  ));

  mockUseDemandDetails.mockReturnValue({
    demand: KANBAN_TEST_DEMAND,
    isLoading: false,
    error: null,
  });

  mockUseDeleteDemand.mockReturnValue({
    deleteDemand: mockDeleteDemand,
    isDeleting: false,
    error: null,
  });
}
