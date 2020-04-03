import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Frame = styled.View`
  flex-direction: row;
`;

export const Container = styled(RectButton)`
  flex: 1;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
