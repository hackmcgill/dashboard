import styled from 'styled-components';

interface IBackgroundImageProps {
    top?: string | number;
    bottom?: string | number;
    left?: string | number;
    right?: string | number;
    height: string | number;
}

const BackgroundImage = styled.img`
    position: absolute;
    z-index: -1000;
    user-select: none;
    top: ${(props: IBackgroundImageProps) => props.top ? props.top : ''};
    left: ${(props: IBackgroundImageProps) => props.left ? props.left : ''};
    bottom: ${(props: IBackgroundImageProps) => props.bottom ? props.bottom : ''};
    right: ${(props: IBackgroundImageProps) => props.right ? props.right : ''};
    height: ${(props: IBackgroundImageProps) => props.height ? props.height : ''};
    width: ${props => props.width};
    src: ${props => props.src};
`
export default BackgroundImage;
