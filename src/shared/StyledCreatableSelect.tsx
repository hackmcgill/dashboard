import CreatableSelect from "react-select/lib/Creatable";
import styled from "styled-components";

const StyledCreatableSelect = styled(CreatableSelect)`
  .react-select__control {
    border: 2px solid ${props => props.theme.greyLight};
    border-radius: ${props => props.theme.inputBorderRadius};
    font-weight: normal;
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

export default StyledCreatableSelect;
