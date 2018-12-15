import NumberFormat from "react-number-format";
import styled from "./styled-components";
import inputStyles from "./inputStyles";

export const StyledNumberFormat = styled(NumberFormat)`
    ${inputStyles};
`;

export default StyledNumberFormat;
