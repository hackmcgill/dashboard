import inputStyles from './inputStyles';
import styled from './styled-components';

export const Textarea = styled.textarea`
  ${inputStyles}
  padding: 16px;
  min-height: 200px;
  resize: none;
`;
export default Textarea;
