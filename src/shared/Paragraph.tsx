import styled from "src/shared/styled-components";

export interface IParagraphProps {
  fontSize?: string;
  textAlign?: string;
  italic?: boolean;
  paddingBottom?: string;
  maxWidth?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  color?: string;
}

const Paragraph = styled.p<IParagraphProps>`
  ${props => props.italic && 'font-style: italic;'}
  font-size: ${props => (props.fontSize || "24px")};
  color: ${props => (props.color || props.theme.colors.greyDark)};
  text-align: ${props => (props.textAlign || "left")};
  padding-bottom: ${props => props.paddingBottom || "0px"};
  max-width: ${props => props.maxWidth || "600px"};
  margin-bottom: ${props => props.marginBottom || "18px"};
  margin-left: ${props => props.marginLeft || 0};
  margin-right: ${props => props.marginRight || 0};
  margin-top: ${props => props.marginTop || "18px"};
`;

export default Paragraph;
