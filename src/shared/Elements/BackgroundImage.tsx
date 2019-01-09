import styled from '../Styles/styled-components';

interface IBackgroundImageProps {
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
  minHeight?: string | number;
  imgHeight?: string | number;
  minWidth?: string | number;
  imgWidth?: string | number;
}

export const BackgroundImage = styled.img`
  position: absolute;
  z-index: -1000;
  user-select: none;
  top: ${(props: IBackgroundImageProps) => props.top || ''};
  left: ${(props: IBackgroundImageProps) => props.left || ''};
  bottom: ${(props: IBackgroundImageProps) => props.bottom || ''};
  right: ${(props: IBackgroundImageProps) => props.right || ''};
  min-height: ${(props: IBackgroundImageProps) => props.minHeight || ''};
  min-width: ${(props: IBackgroundImageProps) => props.minWidth || ''};
  height: ${(props: IBackgroundImageProps) => props.imgHeight || 'auto'};
  width: ${(props) => props.imgWidth || 'auto'};
  src: ${(props) => props.src};
`;

export default BackgroundImage;
