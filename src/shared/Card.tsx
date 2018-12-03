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
  padding: 20px;
  box-shadow: 5px 5px 20px #cccccc;
  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 20px #bbbbbb;
    transition: 0.10s all ease-in;
  }
`

export default Card;
