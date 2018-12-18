import { Flex } from '@rebass/grid';
import styled from '../Styles/styled-components';

export const Card = styled(Flex)`
  height: 300px;
  max-width: 250px;
  margin: 15px;
  background-color: ${(props) => props.theme.colors.greyLighter};
  position: relative;
  padding: 20px;
  box-shadow: 5px 5px 20px ${(props) => props.theme.colors.greyLight};

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 20px ${(props) => props.theme.colors.grey};
    transition: 0.1s all ease-in;
  }
`;

export default Card;
