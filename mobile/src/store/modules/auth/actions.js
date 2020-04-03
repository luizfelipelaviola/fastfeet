export function signInRecover() {
  return {
    type: '@auth/SIGN_IN_RECOVER',
  };
}

export function signInRequest(userId) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { userId },
  };
}

export function signInSuccess(userId, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { userId, user },
  };
}

export function signInFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
