import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const BreadcrumbNav = styled.nav(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 8,
  color: theme.colors.default.secondaryText,
  fontSize: 13,
  lineHeight: 1.4,
}));

export const BreadcrumbLink = styled(Link)(({ theme }) => ({
  color: theme.colors.default.secondaryText,
  textDecoration: 'none',
  '&:hover': {
    color: theme.colors.default.primaryText,
    textDecoration: 'underline',
  },
}));

export const BreadcrumbCurrent = styled.span(({ theme }) => ({
  color: theme.colors.default.primaryText,
  fontWeight: 500,
}));

export const BreadcrumbSeparator = styled.span({
  userSelect: 'none',
});
