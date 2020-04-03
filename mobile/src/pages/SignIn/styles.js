import styled from 'styled-components/native';
import ButtonComponent from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #7d40e7;
  align-items: center;
  justify-content: center;
  padding: 0 25px;
`;

export const Main = styled.View`
  align-self: stretch;
  align-items: center;
`;

export const Logo = styled.Image`
  margin-bottom: 40px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  flex: 1;
  font-size: 16px;
  color: #666;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px 15px;
`;

export const InputComponent = styled.View`
  flex-direction: row;
`;
export const Button = styled(ButtonComponent)`
  background: #82bf18;
  height: 45px;
  margin-top: 15px;
`;
