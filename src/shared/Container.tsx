import styled from "styled-components";
import { Box } from '@rebass/grid';

const Container = styled(Box)`
  font-family: ${props => props.theme.fontFamily};
  margin: 0 auto;
  max-width: 600px;
  height: 100%;
`
export default Container;