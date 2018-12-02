import styled from "styled-components";
import { Box } from '@rebass/grid';

const LeftContainer = styled(Box)`
  font-family: ${props => props.theme.fontFamily};
  float: left;
  width: 50%;
`
export default LeftContainer;