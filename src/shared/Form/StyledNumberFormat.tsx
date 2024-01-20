import { NumericFormat, PatternFormat } from 'react-number-format';
import styled from 'styled-components';
import inputStyles from '../Styles/inputStyles';

export const StyledPatternFormat = styled(PatternFormat)`
  ${inputStyles};
`;

export const StyledNumericFormat = styled(NumericFormat)`
  ${inputStyles};
`;
