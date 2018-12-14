import styled from './styled-components';
import inputStyles from './inputStyles';

const Textarea = styled.textarea`
    ${inputStyles}
    padding: 16px;
    min-height: 200px;
    resize: none;
`
export default Textarea; 
