import styled from "src/shared/styled-components";
import { ITheme } from "src/theme";

interface IH2Props {
  color?: string;
  fontSize?: string;
  textAlign?: string;
  theme?: ITheme;
}

const H2 = styled.h2`
  font-size: ${(props: IH2Props) => (props.fontSize ? props.fontSize : "36px")};
  text-align: ${(props: IH2Props) =>
    props.textAlign ? props.textAlign : "center"};
  color: ${(props: IH2Props) =>
    props.color
      ? props.color
      : (props.theme && props.theme.colors.primary) || "red"};
`;
export default H2;
