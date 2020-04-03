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

export const Body = styled.View`
  padding: 20px;
  margin-top: -55px;
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

export const Product = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  flex: 1;
  text-align: center;
  margin-top: 28px;
`;

export const Input = styled.TextInput.attrs({
  textAlignVertical: 'top',
})``;

export const List = styled.FlatList``;

export const Problem = styled.View`
  align-self: stretch;
  background: #fff;
  border-radius: 4px;
  padding: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  flex-direction: row;
`;

export const ProblemLoad = styled.View`
  align-self: stretch;
  background: #fff;
  border-radius: 4px;
  padding: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;

export const ProblemDate = styled.Text`
  justify-content: center;
  align-items: center;
  color: #c1c1c1;
  font-size: 12px;
`;

export const ProblemText = styled.Text`
  flex: 1;
  text-align: left;
  color: #999999;
  font-size: 16px;
`;

export const Empty = styled.Text`
  flex: 1;
  color: #999999;
  font-size: 16px;
  text-align: center;
`;
