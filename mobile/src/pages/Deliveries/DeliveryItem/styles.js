import styled from 'styled-components/native';

export const Container = styled.View`
  align-self: stretch;
  background: #fff;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
`;

export const Head = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
`;

export const Delivery = styled.Text`
  font-size: 14px;
  color: #7d40e7;
  font-weight: bold;
  margin-left: 10px;
`;

export const Body = styled.View``;

export const Status = styled.View`
  flex-direction: row;
  border-top-color: #7d40e7;
  border-top-width: 1px;
  border-style: solid;
  justify-content: space-between;
  margin: 10px 50px 0 50px;
  padding-bottom: 20px;
`;

export const StatusItem = styled.View`
  align-items: center;
  margin: -5px -30px;
`;

export const StatusDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.filled ? '#7d40e7' : '#FFF')};
  border: 1px solid #7d40e7;
`;

export const StatusLabel = styled.Text`
  color: #999999;
  font-size: 10px;
  width: 55px;
  text-align: center;
  margin-top: 5px;
`;

export const Footer = styled.View`
  background-color: #f8f9fd;
  padding: 15px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const FooterItem = styled.View``;

export const FooterLabel = styled.Text`
  color: #999999;
  font-size: 12px;
`;

export const FooterText = styled.Text`
  color: #444444;
  font-size: 14px;
  font-weight: bold;
`;

export const FooterButton = styled.TouchableOpacity`
  justify-content: center;
  height: 35px;
`;

export const FooterButtonText = styled.Text`
  color: #7d40e7;
  font-size: 14px;
  font-weight: bold;
`;
