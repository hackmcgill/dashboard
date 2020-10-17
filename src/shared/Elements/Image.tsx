import styled from '../Styles/styled-components';

export interface IImageProps {
  src: any;
  imgHeight?: string;
  imgWidth?: string;
  padding?: string;
}
export const Image = styled.img`
  src: ${(props: IImageProps) => props.src};
  height: ${(props: IImageProps) => props.imgHeight || 'auto'};
  width: ${(props: IImageProps) => props.imgWidth || 'auto'};
  padding: ${(props: IImageProps) => props.padding || 0};
`;
export default Image;
