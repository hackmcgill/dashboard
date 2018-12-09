import styled from "src/shared/styled-components";
import { ITheme } from "src/theme";

interface ILabelProps {
  width?: string;
  fontWeight?: string;
  theme?: ITheme;
}

const Label = styled.label`
  span {
    margin-left: 10px;
    display: inline-block;
  }
  font-weight: ${(props: ILabelProps) =>
    props.fontWeight ? props.fontWeight : "bold"};
  color: ${(props: ILabelProps) =>
    props.theme ? props.theme.colors.greyDark : "grey"};
  display: block;
  width: ${(props: ILabelProps) => (props.width ? props.width : "100%")};
`;

export default Label;
