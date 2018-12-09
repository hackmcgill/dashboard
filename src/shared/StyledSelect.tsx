import Select from "react-select";
import styled from "styled-components";
import inputStyles from "src/shared/inputStyles";

const StyledSelect = styled(Select)`
  .react-select__control {
    ${inputStyles}
    display: flex;
  }

  .react-select__option {
    font-weight: normal;
    &:hover, &--is-focused, &--is-selected {
      background-color: ${props => props.theme.colors.primary};
    }
  }
`;

export default StyledSelect;
