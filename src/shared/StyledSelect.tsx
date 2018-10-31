import Select from "react-select";
import styled from "styled-components";
const StyledSelect = styled(Select)`
  .react-select__control {
    border: 2px solid ${props => props.theme.greyLight};
    border-radius: 20px;
    padding-left: 10px;
    width: 80%;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 20px;

    &:hover {
      border: 2px solid ${props => props.theme.grey};
    }
  }

  .react-select__option {
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
