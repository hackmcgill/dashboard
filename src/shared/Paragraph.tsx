import styled from 'styled-components';

export interface IParagraphProps {
    fontSize?: string;
    center?: boolean;
    paddingBottom?: string;
}

const Paragraph = styled.p`
    font-size: ${(props: IParagraphProps) => props.fontSize ? props.fontSize : '14px'};
    color: ${props => props.color};
    text-align: ${(props: IParagraphProps) => props.center ? 'center' : 'left'};
    padding-bottom: ${(props: IParagraphProps) => props.paddingBottom ? props.paddingBottom : '0px'};
`;

export default Paragraph;