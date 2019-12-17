import CreatableSelect from 'react-select/lib/Creatable';
import { inputStyles } from '../Styles/inputStyles';
import styled from '../Styles/styled-components';

export const StyledCreatableSelect = styled(CreatableSelect)`
  font-family: ${(props) => props.theme.fonts.body};

  .react-select__control {
    ${inputStyles}
    display: flex;
    cursor: pointer;
  }

  .react-select__option {
    font-weight: normal;
    color: ${(props) => props.theme.colors.black70};
    padding-left: 18px;
    cursor: pointer;
    &--is-selected {
      background-color: ${(props) => props.theme.colors.white};
      color: ${(props) => props.theme.colors.black70};
    }
    &--is-focused,
    &:hover {
      background-color: ${(props) => props.theme.colors.black10};
      color: ${(props) => props.theme.colors.black70};
    }
  }

  .react-select__value-container {
    padding-left: 0;
  }

  .react-select__dropdown-indicator {
    transform: rotate(-90deg);
    transition: transform ease 0.3s;
  }

  .react-select__control--menu-is-open .react-select__dropdown-indicator {
    transform: rotate(0deg);
  }
`;

export default StyledCreatableSelect;
