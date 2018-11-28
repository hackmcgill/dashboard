import styled from 'styled-components';
const Paragraph = styled.p`
    font-size: ${(props : {'fontSize': string, 'center': boolean}) => props.fontSize};
    color: ${props => props.color};
    text-align: ${(props : {'fontSize': string, 'center': boolean}) => props.center ? 'center' : 'left'};
`;

export default Paragraph;