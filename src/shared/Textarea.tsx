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
    padding-left: 16px;
    padding-right: 16px;
    width: 80%;
`
export default Textarea; 
