import styled from '../Styles/styled-components';

interface IHorizontalSpacerProps {
  paddingLeft?: string;
  paddingRight?: string;
}

// A div with with some horizontal padding
// ---
// Example use case: To indent forms so that they can be centered in space not
// filled by sidebar
export const HorizontalSpacer = styled.div<IHorizontalSpacerProps>`
  padding-left: ${(props) => props.paddingLeft || '0'};
  padding-right: ${(props) => props.paddingRight || '0'};
`;

export default HorizontalSpacer;
