import Select from 'react-select';
import inputStyles from '../Styles/inputStyles';
import styled from '../Styles/styled-components';

export const StyledSelect = styled(Select)`
  .react-select__control {
    ${inputStyles}
    display: flex;
  }

  .react-select__option {
    font-weight: normal;
    &--is-selected {
      background-color: ${(props) => props.theme.colors.red};
      color: ${(props) => props.theme.colors.white};
    }
    &--is-focused,
    &:hover {
      background-color: ${(props) => props.theme.colors.redLight};
      color: ${(props) => props.theme.colors.white};
    }
  }

  .react-select__value-container {
    padding-left: 0;
  }
`;

export default StyledSelect;
