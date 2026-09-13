import { useInfiniteQuery } from '@tanstack/react-query';
import kanbanManager from '../services';
import { KanbanQueryEnum } from '../types/KanbanQueryEnum';
import type { TDemandStatus } from '../types/TDemandStatus';
import { useKanbanSearchState } from './useKanbanSearchState';

const PAGE_LIMIT = 10;

export function useLoadColumnDemands(status: TDemandStatus) {
  const { searchQuery } = useKanbanSearchState();

  const query = useInfiniteQuery({
    queryKey: [KanbanQueryEnum.getDemandsByStatus, status, searchQuery],
    queryFn: ({ pageParam }) => kanbanManager.getDemands({
      status,
      page: pageParam,
      limit: PAGE_LIMIT,
      search: searchQuery,
    }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.page + 1 : undefined),
  });

  const data = query.data?.pages.flatMap((page) => page.data) ?? [];
  const pages = query.data?.pages;
  const total = pages && pages.length > 0 ? pages[pages.length - 1].total : 0;

  return {
    data,
    total,
    hasMore: Boolean(query.hasNextPage),
    isLoading: query.isLoading,
    isFetchingMore: query.isFetchingNextPage,
    loadMore: () => {
      if (query.hasNextPage && !query.isFetchingNextPage) {
        void query.fetchNextPage();
      }
    },
    error: query.error,
  };
}
