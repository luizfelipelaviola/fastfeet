import styled from 'styled-components/native';
import ButtonComponent from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Head = styled.View`
  background: #7d40e7;
  height: 155px;
  padding: 20px;
`;

export const Body = styled.View`
  padding: 20px;
  margin-top: -100px;
`;

export const HeadLine = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const PageTitle = styled.Text`
  color: #fff;
  font-size: 17px;
  font-weight: bold;
  flex: 1;
  text-align: center;
  margin-right: 25px;
`;

export const Input = styled.TextInput.attrs({
  textAlignVertical: 'top',
})`
  align-self: stretch;
  background: #fff;
  border-radius: 4px;
  padding: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  height: 300px;
`;

export const Button = styled(ButtonComponent)`
  background: #7d40e7;
  height: 45px;
  margin-top: 15px;
`;
