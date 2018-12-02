import styled from 'styled-components';

interface IH1Props {
    color?: string;
    fontSize?: string;
    textAlign?: string;
}

const H1 = styled.h1`
font-size: ${(props: IH1Props) => props.fontSize ? props.fontSize : '36px'};
text-align: ${(props: IH1Props) => props.textAlign ? props.textAlign : 'center'};
color: ${(props: IH1Props) => props.color ? props.color : '#F2463A'};
`
export default H1;

