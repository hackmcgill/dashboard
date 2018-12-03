import styled from 'styled-components';
const Image = styled.img`
    src: ${props => props.src};
    height: ${props => props.height};
    width: auto;
    padding: ${(props: { 'padding'?: string }) => props.padding ? props.padding : '0rem'};
`
export default Image; 
