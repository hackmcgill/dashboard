import { Flex } from '@rebass/grid';
import styled from '../Styles/styled-components';

interface ICardProps {
  disabled?: boolean;
}

export const Card = styled(Flex)<ICardProps>`
  height: 300px;
  max-width: 250px;
  margin: 15px;
  background-color: ${(props) => props.theme.colors.greyLighter};
  position: relative;
  padding: 20px;
  box-shadow: 5px 5px 20px ${(props) => props.theme.colors.greyLight};

  ${(props) =>
    props.disabled
      ? `
        cursor: not-allowed;
        filter: grayscale(100%);
        &:after {
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          background: rgba(0,0,0,0.1);
          top: 0;
          left: 0;
        }
      `
      : `
  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 20px ${props.theme.colors.grey};
    transition: 0.1s all ease-in;
  }
  `}
`;

export default Card;
