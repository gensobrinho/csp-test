
import styled from '@emotion/styled';
import { buildStyledProps, ICommonStyledProps } from '../../styles/common';

export interface IContentProps extends ICommonStyledProps { }

const BoxContent = styled.div((styledProps: ICommonStyledProps) => buildStyledProps(styledProps) as any);

export default BoxContent;
