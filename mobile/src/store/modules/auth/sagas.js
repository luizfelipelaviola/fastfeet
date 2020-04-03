import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';
import { signInRecover, signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { userId } = payload;
    if (!userId) {
      Alert.alert('Falha na autenticação', 'Usuário não informado.');
      return yield put(signInFailure());
    }
    const { data } = yield call(api.get, `sessions/deliveryman/${userId}`);
    return yield put(signInSuccess(userId, data));
  } catch (err) {
    if (err.response) {
      Alert.alert('Falha na autenticação', err.response.data.error);
    } else {
      Alert.alert('Falha na autenticação', 'Falha na conexão com o servidor.');
    }
    return yield put(signInFailure());
  }
}

export function* checkDeliveryman({ payload }) {
  try {
    if (payload.auth.userId) {
      yield put(signInRecover());
      const { userId } = payload.auth;
      const { data } = yield call(api.get, `sessions/deliveryman/${userId}`);
      return yield put(signInSuccess(userId, data));
    }
    return yield put(signInFailure());
  } catch (err) {
    if (err.response) {
      Alert.alert('Falha na autenticação', err.response.data.error);
    } else {
      Alert.alert('Falha na autenticação', 'Falha na conexão com o servidor.');
    }
    return yield put(signInFailure());
  }
}

export default all([
  takeLatest('persist/REHYDRATE', checkDeliveryman),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
