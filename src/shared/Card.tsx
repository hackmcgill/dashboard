import styled from 'styled-components';
import { ITheme } from '../theme';
import { Flex } from '@rebass/grid';

interface ICardProps {
  theme?: ITheme
}

const Card = styled(Flex)`
  height: 300px;
  max-width: 250px;
  margin: 15px;
  background-color: ${(props:ICardProps) => props.theme && props.theme.greyLight || 'grey'};
  position: relative;
  cursor: pointer;
  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 20px #cccccc;
    transition: 0.10s all ease-in;
  }
`

export default Card;
