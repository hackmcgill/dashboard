import styled from 'styled-components';

export interface IImageProps {
    src: any;
    imgHeight?: string;
    padding?: string;
}
const Image = styled.img`
    src: ${(props: IImageProps) => props.src};
    height: ${(props: IImageProps) => props.imgHeight || 'auto'};
    width: auto;
    padding: ${(props: IImageProps) => props.padding || 0};
`
export default Image; 
