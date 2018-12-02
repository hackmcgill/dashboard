import styled from 'styled-components';

interface IH1Props {
    color?: string;
    fontSize?: string;
}

const H1 = styled.h1`
font-size: ${(props: IH1Props) => props.fontSize ? props.fontSize : '36px'};
    color: ${(props: IH1Props) => props.color ? props.color : '#F2463A'};
`
export default H1;

