import Select from 'react-select';
import inputStyles from '../Styles/inputStyles';
import styled from '../Styles/styled-components';

export const StyledSelect = styled(Select)`
  font-family: ${(props) => props.theme.fonts.body};

  .react-select__control {
    ${inputStyles}
    display: flex;
    cursor: pointer;
    &--is-focused {
      box-shadow: 2px 2px 16px 0px ${(props: any) => props.theme.colors.blueLight};
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
`;

export default StyledSelect;
