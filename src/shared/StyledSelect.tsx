import Select from "react-select";
import styled from "./styled-components";
import inputStyles from "./inputStyles";

export const StyledSelect = styled(Select)`
  .react-select__control {
    ${inputStyles}
    display: flex;
  }

  .react-select__option {
    font-weight: normal;
    &--is-selected {
      background-color: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.white};
    }
    &--is-focused,
    &:hover {
      background-color: ${props => props.theme.colors.primaryLight};
      color: ${props => props.theme.colors.white};      
    }
  }
`;

export default StyledSelect;
