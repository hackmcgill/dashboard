import CreatableSelect from "react-select/lib/Creatable";
import styled from "styled-components";

const StyledCreatableSelect = styled(CreatableSelect)`
  .react-select__control {
    border: 2px solid ${props => props.theme.greyLight};
    border-radius: ${props => props.theme.inputBorderRadius};
    padding-left: 10px;
    width: 80%;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 20px;

    &:hover {
      border: 2px solid ${props => props.theme.grey};
    }
  }
`;

export default StyledCreatableSelect;
