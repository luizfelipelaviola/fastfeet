import styled from 'styled-components/native';
import { transparentize } from 'polished';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  padding: 20px 20px 0 20px;
`;

export const ProfileContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Profile = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const Avatar = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 68px;
  padding: 7px;
  border-radius: 34px;
  background: ${(props) => transparentize(0.8, props.color)};
  position: relative;
  text-align: center;
`;

export const AvatarImage = styled.Image`
  width: 68px;
  height: 68px;
  border-radius: 34px;
  position: absolute;
  top: 0;
  left: 0;
`;

export const AvatarChar = styled.Text`
  color: ${(props) => props.color};
  font-size: 31px;
`;

export const WelcomeContainer = styled.View`
  margin-left: 12px;
  flex: 1;
`;

export const Welcome = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const ProfileName = styled.Text`
  font-size: 22px;
  color: #444;
  font-weight: bold;
`;

export const SignOut = styled.TouchableOpacity``;

export const TabBar = styled.View`
  margin-top: 25px;
  margin-bottom: 15px;
  justify-content: space-between;
  align-self: stretch;
  flex-direction: row;
  align-items: center;
`;

export const TabBarTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;

export const Tabs = styled.View`
  flex-direction: row;
`;

export const TabButton = styled.TouchableOpacity`
  margin-left: 15px;
`;

export const TabButtonText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => (props.selected ? '#7D40E7' : '#999999')};
  border-bottom-color: ${(props) => (props.selected ? '#7D40E7' : 'null')};
  border-bottom-width: ${(props) => (props.selected ? '1px' : 0)};
`;

export const TabContainer = styled.FlatList`
  flex: 1;
  background: #fff;
`;

export const Empty = styled.Text`
  text-align: center;
`;
