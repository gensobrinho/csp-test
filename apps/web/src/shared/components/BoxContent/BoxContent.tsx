import styled from '@emotion/styled';
import { buildStyledProps, type ICommonStyledProps } from '../../styles/common';

export type IContentProps = ICommonStyledProps;

const BoxContent = styled.div((styledProps: ICommonStyledProps) =>
  buildStyledProps(styledProps),
);

export default BoxContent;
