import styled from "styled-components";
import { ITheme } from "../theme";
import { Flex } from "@rebass/grid";

interface ICardProps {
  theme?: ITheme;
}

const Card = styled(Flex)`
  height: 300px;
  max-width: 250px;
  margin: 15px;
  background-color: ${(props: ICardProps) =>
    (props.theme && props.theme.colors.greyLight) || "grey"};
  position: relative;
  padding: 20px;
  box-shadow: 5px 5px 20px ${(props: ICardProps) => props.theme ? props.theme.colors.grey : 'grey'};
  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 20px ${(props: ICardProps) => props.theme ? props.theme.colors.greyDark : 'grey'};
    transition: 0.1s all ease-in;
  }
`;

export default Card;
