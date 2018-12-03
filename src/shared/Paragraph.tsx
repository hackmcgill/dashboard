import styled from 'styled-components';

export interface IParagraphProps {
    fontSize?: string;
    center?: boolean;
    paddingBottom?: string;
    maxWidth?: string;
    marginTop?: string;
    marginBottom?: string;
}

const Paragraph = styled.p`
    font-size: ${(props: IParagraphProps) => props.fontSize ? props.fontSize : ''};
    color: ${props => props.color};
    text-align: ${(props: IParagraphProps) => props.center ? 'center' : 'left'};
    padding-bottom: ${(props: IParagraphProps) => props.paddingBottom ? props.paddingBottom : '0px'};
    max-width: ${(props: IParagraphProps) => props.maxWidth ? props.maxWidth : '800px'};
    margin-bottom: ${(props: IParagraphProps) => props.marginBottom ? props.marginBottom : '18px'};
    margin-top: ${(props: IParagraphProps) => props.marginTop ? props.marginTop : '18px'};
`;

export default Paragraph;
