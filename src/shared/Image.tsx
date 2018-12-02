import styled from 'styled-components';

export interface IImageProps {
    src: any;
    height?: string;
    padding?: string;
}
const Image = styled.img`
    src: ${(props: IImageProps) => props.src};
    height: ${(props: IImageProps) => props.height || 'auto'};
    width: auto;
    padding: ${(props: IImageProps) => props.padding || 0};
`
export default Image; 
