import styled from 'styled-components';

interface IBackgroundImageProps {
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
  minHeight?: string | number;
  imgHeight?: string | number;
  minWidth?: string | number;
  imgWidth?: string | number;
  position?: string;
  zIndex?: number;
}

export const BackgroundImage = styled.img`
  position: ${(props: IBackgroundImageProps) => props.position || 'absolute'};
  z-index: ${(props: IBackgroundImageProps) => props.zIndex || '1'};
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
