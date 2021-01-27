import styled from '../../shared/Styles/styled-components';

export const StyledGIF = styled.img`
    width: 100%;

    @media only screen and (min-width: ${(props) => props.theme.screens.smUp}) {
        width: 80%;
    }
`

export default StyledGIF;