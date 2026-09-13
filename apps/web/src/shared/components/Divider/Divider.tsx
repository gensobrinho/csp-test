/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import { Container, Line } from './Divider.styled';

export interface IDividerProps {
  width?: number | string;
  margin?: number | string;
}

const Divider: React.FC<IDividerProps> = (props) => {
  return (
    <Container>
      <Line width={props.width} margin={props.margin} />
    </Container>
  );
};

export default Divider;
