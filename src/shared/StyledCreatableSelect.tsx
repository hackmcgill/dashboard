import CreatableSelect from "react-select/lib/Creatable";
import styled from "styled-components";

const StyledCreatableSelect = styled(CreatableSelect)`
  .react-select__control {
    border-radius: 20px;
    padding-left: 10px;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 20px;
  }
`;

export default StyledCreatableSelect;
