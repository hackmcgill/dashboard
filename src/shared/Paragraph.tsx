import styled from 'styled-components';

export interface IParagraphProps {
    fontSize?: string;
    textAlign?: string;
    paddingBottom?: string;
    maxWidth?: string;
    marginTop?: string;
    marginBottom?: string;
    color?: string;
}

const Paragraph = styled.p<IParagraphProps>`
    font-size: ${props => props.fontSize ? props.fontSize : '24px'};
    color: ${props => props.color ? props.color : props.theme.grey};
    text-align: ${props => props.textAlign ? props.textAlign : 'left'};
    padding-bottom: ${(props: IParagraphProps) => props.paddingBottom ? props.paddingBottom : '0px'};
    max-width: ${(props: IParagraphProps) => props.maxWidth ? props.maxWidth : '800px'};
    margin-bottom: ${(props: IParagraphProps) => props.marginBottom ? props.marginBottom : '18px'};
    margin-top: ${(props: IParagraphProps) => props.marginTop ? props.marginTop : '18px'};
`;

export default Paragraph;
