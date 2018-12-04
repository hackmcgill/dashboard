import styled from 'styled-components';
const Textarea = styled.textarea`
    border-radius: 20px;
    border: 2px solid ${props => props.theme.greyLight};
    box-sizing: border-box;
    display: block;
    font-size: 16px;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 20px;
    min-height: 200px;
    padding: 16px;
    width: 80%;
    &:hover {
        border: 2px solid ${props => props.theme.grey};
    }
`
export default Textarea; 
