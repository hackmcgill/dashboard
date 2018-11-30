import styled from 'styled-components';
const Paragraph = styled.p`
    font-size: ${(props: { 'fontSize': string, 'center': boolean, 'paddingBottom': string }) => props.fontSize};
    color: ${props => props.color};
    text-align: ${(props: { 'fontSize': string, 'center': boolean, 'paddingBottom': string }) => props.center ? 'center' : 'left'};
    padding-bottom: ${(props: { 'fontSize': string, 'center': boolean, 'paddingBottom': string }) => props.paddingBottom};
`;
export default Paragraph; 
