import styled from 'styled-components/native';
import { transparentize } from 'polished';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  align-items: center;
  justify-content: center;
  padding: 35px;
`;

export const Avatar = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  padding: 7px;
  border-radius: 75px;
  background: ${(props) => transparentize(0.8, props.color)};
  position: relative;
  text-align: center;
  margin-bottom: 40px;
`;

export const AvatarImage = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  position: absolute;
  top: 0;
  left: 0;
`;

export const AvatarChar = styled.Text`
  color: ${(props) => props.color};
  font-size: 60px;
`;

export const Row = styled.View`
  align-self: stretch;
  margin-bottom: 15px;
`;

export const Label = styled.Text`
  color: #666666;
  font-size: 12px;
`;

export const Content = styled.Text`
  color: #444444;
  font-size: 22px;
  font-weight: bold;
`;

export const Logout = styled.TouchableOpacity`
  margin-top: 30px;
  background: #e74040;
  align-self: stretch;
  height: 40px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const LogoutText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
