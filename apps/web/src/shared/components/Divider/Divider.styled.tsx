import styled from '@emotion/styled';

export const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});

export const Line = styled.div(
  ({ width = '100%', margin = 0 }: { width?: number | string; margin?: number | string }) => ({
    width,
    margin,
    borderBottom: '1px solid #E7EAEE',
  }),
);
