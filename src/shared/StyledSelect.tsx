import Select from "react-select";
import styled from "styled-components";
import inputStyles from 'src/shared/inputStyles';

const StyledSelect = styled(Select)`
  .react-select__control {
    ${inputStyles}
    display: flex;
  }

  .react-select__option {
    font-weight: normal;
    &: hover {
      background-color: ${props => props.theme.primaryLight};
    }

    &--is-focused {
      background-color: ${props => props.theme.primaryLight};
    }

    &--is-selected {
      background-color: ${props => props.theme.primary};
    }
  }
`;

export default StyledSelect;
