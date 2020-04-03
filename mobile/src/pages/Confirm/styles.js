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

export const Button = styled(ButtonComponent)`
  background: #7d40e7;
  height: 45px;
  margin-top: 15px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const Preview = styled.View`
  align-self: stretch;
  background: #fff;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  height: 450px;
  position: relative;
  align-items: center;
`;

export const Capture = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  position: absolute;
  bottom: 20px;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
`;

export const Image = styled.Image`
  width: 100px;
  height: 100px;
  background: red;
`;
