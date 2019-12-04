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
    color: ${(props) => props.theme.colors.black70}
    &--is-focused,
    &:hover {
      background-color: ${(props) => props.theme.colors.black10};
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

export default StyledSelect;
