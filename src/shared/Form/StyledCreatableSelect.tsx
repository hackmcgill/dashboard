import CreatableSelect from 'react-select/lib/Creatable';
import { inputStyles } from '../Styles/inputStyles';
import styled from '../Styles/styled-components';

export const StyledCreatableSelect = styled(CreatableSelect)`
  font-family: ${(props) => props.theme.fonts.body};

  .react-select__control {
    ${inputStyles}
    display: flex;
    cursor: pointer;
    &--is-focused {
      box-shadow: 2px 2px 16px 0px ${(props) => props.theme.colors.blueLight};
    }
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

  .react-select__multi-value__label {
    background-color: ${(props) => props.theme.colors.black10};
    color: ${(props) => props.theme.colors.purple};
  }

  .react-select__multi-value__remove {
    background-color: ${(props) => props.theme.colors.black10};
  }
`;

export default StyledCreatableSelect;
