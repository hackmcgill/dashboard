import styled from "src/shared/styled-components";

export interface IParagraphProps {
  fontSize?: string;
  textAlign?: string;
  paddingBottom?: string;
  maxWidth?: string;
  marginTop?: string;
  marginBottom?: string;
  color?: string;
}

const Paragraph = styled.p<IParagraphProps>`
  font-size: ${props => (props.fontSize || "24px")};
  color: ${props => (props.color || props.theme.colors.greyDark)};
  text-align: ${props => (props.textAlign || "left")};
  padding-bottom: ${props => props.paddingBottom || "0px"};
  max-width: ${props => props.maxWidth || "600px"};
  margin-bottom: ${props => props.marginBottom || "18px"};
  margin-top: ${props => props.marginTop || "18px"};
`;

export default Paragraph;
