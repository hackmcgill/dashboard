import styled from 'styled-components';

interface ILabelInput {
  marginLeft?: string;
  width?: string;
}

const Label = styled.label`
  margin-left: ${(props: ILabelInput) => props.marginLeft ? props.marginLeft : '12%'};
  font-weight: bold;
  color: #4D4D4D;
  width: ${(props: ILabelInput) => props.width ? props.width : '100%'};
`

export default Label;
