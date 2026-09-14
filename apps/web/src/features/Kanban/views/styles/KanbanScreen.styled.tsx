import styled from '@emotion/styled';

export const KanbanPage = styled.main(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  boxSizing: 'border-box',
  height: '100%',
  minHeight: 0,
  padding: 32,
  overflow: 'hidden',
  backgroundColor: theme.colors.default.bg,
}));

export const KanbanHeader = styled.header({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 24,
  flexWrap: 'wrap',
  flexShrink: 0,
});

export const HeaderActions = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  flex: '1 1 320px',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
});

export const KanbanTitle = styled.h1(({ theme }) => ({
  margin: 0,
  fontSize: 32,
  fontWeight: 700,
  lineHeight: 1.2,
  color: theme.colors.default.primaryText,
}));

export const SearchField = styled.div({
  width: '100%',
  maxWidth: 360,
  minWidth: 220,
  flex: '1 1 240px',
});

export const BoardFeedback = styled.p(({ theme }) => ({
  margin: 0,
  color: theme.colors.default.danger,
  fontSize: 14,
  fontWeight: 500,
}));

export const Board = styled.div({
  display: 'flex',
  alignItems: 'stretch',
  gap: 16,
  flex: 1,
  minHeight: 0,
  overflowX: 'auto',
  overflowY: 'hidden',
});

export const ColumnRoot = styled.section<{
  $background: string;
  $borderColor?: string;
  $isDragOver?: boolean;
}>(({ $background, $borderColor, $isDragOver }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  boxSizing: 'border-box',
  width: 280,
  minWidth: 280,
  height: '100%',
  padding: 12,
  borderRadius: 12,
  backgroundColor: $background,
  border: $borderColor ? `1px solid ${$borderColor}` : '1px solid transparent',
  outline: $isDragOver ? '2px dashed rgba(27, 58, 75, 0.35)' : 'none',
  outlineOffset: -2,
  transition: 'outline-color 120ms ease',
}));

export const ColumnHeader = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  minHeight: 28,
});

export const StatusDot = styled.span<{ $color: string }>(({ $color }) => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: $color,
  flexShrink: 0,
}));

export const ColumnTitle = styled.h2(({ theme }) => ({
  margin: 0,
  flex: 1,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1.3,
  color: theme.colors.default.primaryText,
}));

export const ColumnCount = styled.span(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 22,
  height: 22,
  padding: '0 6px',
  borderRadius: 999,
  backgroundColor: 'rgba(27, 58, 75, 0.12)',
  color: theme.colors.default.primaryText,
  fontSize: 12,
  fontWeight: 600,
}));

export const ColumnBody = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  overflowY: 'auto',
  minHeight: 0,
  flex: 1,
  scrollbarWidth: 'thin',
  scrollbarColor: `${theme.colors.default.grey} transparent`,
  '&::-webkit-scrollbar': {
    width: 4,
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.colors.default.grey,
    borderRadius: 999,
  },
  '&::-webkit-scrollbar-button': {
    display: 'none',
    width: 0,
    height: 0,
  },
}));

export const LoadMoreButton = styled.button(({ theme }) => {
  const colors = theme.colors.default;
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: 36,
    marginTop: 4,
    padding: '8px 12px',
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    backgroundColor: colors.surface,
    color: colors.primaryText,
    fontFamily: 'inherit',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    '&:hover:not(:disabled)': {
      backgroundColor: colors.accentSurface,
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.65,
    },
    '&:focus-visible': {
      outline: `2px solid ${colors.focus}`,
      outlineOffset: 2,
    },
  };
});

export const CardRoot = styled.article<{ $draggable?: boolean }>(({ theme, $draggable }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  boxSizing: 'border-box',
  padding: 12,
  borderRadius: 10,
  backgroundColor: theme.colors.default.surface,
  border: `1px solid ${theme.colors.default.border}`,
  boxShadow: '0 1px 2px rgba(27, 58, 75, 0.06)',
  cursor: $draggable ? 'grab' : 'pointer',
  userSelect: $draggable ? 'none' : 'auto',
  WebkitUserDrag: $draggable ? 'element' : 'auto',
  '&:active': {
    cursor: $draggable ? 'grabbing' : 'pointer',
  },
  '&[draggable="true"]:hover': {
    boxShadow: '0 2px 8px rgba(27, 58, 75, 0.12)',
  },
}));

export const CardTop = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 8,
});

export const CardTitle = styled.h3(({ theme }) => ({
  margin: 0,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1.35,
  color: theme.colors.default.primaryText,
}));

export const CardMenuButton = styled.button(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  padding: 0,
  border: 0,
  borderRadius: 6,
  background: 'transparent',
  color: theme.colors.default.secondaryText,
  cursor: 'pointer',
  flexShrink: 0,
  '&:hover': {
    backgroundColor: theme.colors.default.disabledBg,
    color: theme.colors.default.primaryText,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.colors.default.focus}`,
    outlineOffset: 1,
  },
}));

export const CardMeta = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  minWidth: 0,
});

export const CardMetaLeft = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  minWidth: 0,
  flex: 1,
});

export const Avatar = styled.span(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  borderRadius: '50%',
  backgroundColor: theme.colors.default.lightBlue,
  color: theme.colors.default.primaryText,
  fontSize: 10,
  fontWeight: 700,
  flexShrink: 0,
}));

export const StatusPill = styled.span<{ $background: string }>(({ theme, $background }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  alignSelf: 'flex-start',
  width: 'fit-content',
  maxWidth: '100%',
  height: 22,
  padding: '0 8px',
  borderRadius: 999,
  backgroundColor: $background,
  color: theme.colors.default.primaryText,
  fontSize: 11,
  fontWeight: 600,
  lineHeight: 1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

export const Deadline = styled.span(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  height: 22,
  flexShrink: 0,
  color: theme.colors.default.accentHover,
  fontSize: 11,
  fontWeight: 400,
  lineHeight: 1,
  whiteSpace: 'nowrap',
  svg: {
    width: 14,
    height: 14,
    flexShrink: 0,
    color: theme.colors.default.primaryText,
  },
}));

export const EmptyColumnMessage = styled.p(({ theme }) => ({
  margin: 0,
  padding: '12px 4px',
  color: theme.colors.default.secondaryText,
  fontSize: 13,
  textAlign: 'center',
}));
