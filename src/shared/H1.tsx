import styled from 'styled-components';
const H1 = styled.h1`
font-size: ${(props: { 'fontSize': string }) => props.fontSize};
    color: ${props => props.color};
`
export default H1;

