import styled from 'styled-components';

export const List = styled.ul`
  max-height: 260px;
  overflow-y: auto;
  list-dtyle: none;
  padding: ${p => p.theme.space[0]}px;
  margin: ${p => p.theme.space[0]}px;
`;
