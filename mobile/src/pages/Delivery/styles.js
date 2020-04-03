import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Head = styled.View`
  background: #7d40e7;
  height: 155px;
  padding: 20px;
`;

export const Body = styled.ScrollView.attrs({
  overScrollMode: 'never',
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 30,
  },
})`
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

export const Box = styled.View`
  align-self: stretch;
  background: #fff;
  border-radius: 4px;
  padding: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

export const BoxHead = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BoxTitle = styled.Text`
  color: #7d40e7;
  font-size: 16px;
  font-weight: bold;
  margin-left: 5px;
`;

export const BoxItem = styled.View`
  margin-top: 17px;
`;

export const BoxLabel = styled.Text`
  color: #999999;
  font-weight: bold;
  font-size: 14px;
`;

export const BoxText = styled.Text`
  color: #666666;
  font-size: 14px;
`;

export const BoxGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonBox = styled.View`
  flex-direction: row;
  background: #f8f9fd;
  align-items: center;
  height: 80px;
  border-radius: 4px;
`;

export const LeftButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 80px;
  opacity: ${(props) => (props.disabled ? 0.25 : 1)};
`;

export const MiddleButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 80px;
  border-left-color: #e5e5e5;
  border-left-width: 1px;
  border-right-color: #e5e5e5;
  border-right-width: 1px;
  border-style: solid;
  opacity: ${(props) => (props.disabled ? 0.25 : 1)};
`;

export const RightButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 80px;
  opacity: ${(props) => (props.disabled ? 0.25 : 1)};
`;

export const ButtonLabel = styled.Text`
  color: #999999;
  font-size: 12px;
  width: 60px;
  text-align: center;
  margin-top: 5px;
`;
