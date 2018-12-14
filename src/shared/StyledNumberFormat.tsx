import NumberFormat from "react-number-format";
import styled from "src/shared/styled-components";
import inputStyles from "src/shared/inputStyles";

export const StyledNumberFormat = styled(NumberFormat)`
    ${inputStyles};
`;

export default StyledNumberFormat;
