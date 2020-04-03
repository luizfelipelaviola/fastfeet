import React, { useRef, useState } from 'react';
import { StatusBar, Alert, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RNCamera } from 'react-native-camera';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import api from '~/services/api';

import {
  Container,
  Head,
  HeadLine,
  PageTitle,
  Body,
  BackButton,
  Button,
  Preview,
  Capture,
} from './styles';

export default function Confirm({ route, navigation }) {
  const user = useSelector((state) => state.auth.user);
  const { id } = route.params;
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef(null);

  if (!id) {
    navigation.navigate('Dashboard');
  }

  navigation.setOptions({
    headerShown: false,
  });
  async function takePicture() {
    const options = {
      quality: 0.5,
      base64: true,
      forceUpOrientation: true,
      fixOrientation: true,
    };
    const data = await cameraRef.current.takePictureAsync(options);
    setPhoto(data);
  }

  async function handleSubmit() {
    console.tron.log('fora do try');
    try {
      if (!photo) return;
      console.tron.log('passei pelo if');
      setLoading(true);
      // eslint-disable-next-line no-undef
      const data = new FormData();
      data.append('file', {
        type: 'image/jpg',
        uri: photo.uri,
        name: photo.uri,
      });
      console.tron.log('declarei o formdata');
      const file = await api.post('files', data);
      await api.put(`deliveryman/${user.id}/delivery/${id}`, {
        end: true,
        signature_id: file.data.id,
      });
      Alert.alert('Confirmar entrega', 'Entrega registrada com sucesso.');
      navigation.goBack();
      setLoading(false);
    } catch (err) {
      console.tron.log(err);
      if (err.response) {
        Alert.alert('Falha na requisição', err.response.data.error);
      } else {
        Alert.alert('Falha na requisição', 'Falha na conexão com o servidor.');
      }
      setLoading(false);
    }
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Head>
        <HeadLine>
          <BackButton onPress={() => navigation.goBack()}>
            <Icon name="keyboard-arrow-left" size={25} color="#FFF" />
          </BackButton>
          <PageTitle>Confirmar entrega</PageTitle>
        </HeadLine>
      </Head>
      <Body>
        <Preview>
          {photo ? (
            <TouchableOpacity
              style={{
                flex: 1,
                alignSelf: 'stretch',
              }}
              onPress={() => setPhoto(null)}
            >
              <Image
                source={{ uri: photo.uri }}
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                }}
              />
            </TouchableOpacity>
          ) : (
            <>
              <RNCamera
                ref={cameraRef}
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                }}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                captureAudio={false}
                androidCameraPermissionOptions={{
                  title: 'Câmera',
                  message: 'Precisamos acessar sua câmera',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
              />
              <Capture onPress={takePicture}>
                <Icon name="camera-alt" size={30} color="#FFF" />
              </Capture>
            </>
          )}
        </Preview>

        <Button
          disabled={!photo}
          loading={loading}
          onPress={() => handleSubmit()}
        >
          Enviar
        </Button>
      </Body>
    </Container>
  );
}

Confirm.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
