import Modal from 'styled-react-modal';
import { ITheme } from '../Styles/theme';

export const StyledModal = Modal.styled`
width: 20rem;
height: 20rem;
display: flex;
align-items: center;
justify-content: center;
background-color: ${(props: { theme: ITheme }) => props.theme.colors.greyDark};
`;
