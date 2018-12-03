import styled from 'styled-components';

interface IH1Props {
    color?: string;
    fontSize?: string;
    textAlign?: string;
    marginLeft?: string;
    marginTop?: string;
    marginBottom?: string;
}

const H1 = styled.h1`
font-size: ${(props: IH1Props) => props.fontSize ? props.fontSize : '36px'};
text-align: ${(props: IH1Props) => props.textAlign ? props.textAlign : 'center'};
color: ${(props: IH1Props) => props.color ? props.color : '#F2463A'};
margin-left: ${(props: IH1Props) => props.marginLeft ? props.marginLeft : '18px'};
margin-bottom: ${(props: IH1Props) => props.marginBottom ? props.marginBottom : '18px'};
margin-top: ${(props: IH1Props) => props.marginTop ? props.marginTop : '18px'};
`
export default H1;

