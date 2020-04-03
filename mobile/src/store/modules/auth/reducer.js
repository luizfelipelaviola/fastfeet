import produce from 'immer';

const INITIAL_STATE = {
  userId: null,
  user: {},
  signed: false,
  loading: false,
  connecting: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_RECOVER': {
        draft.connecting = true;
        break;
      }

      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@auth/SIGN_IN_SUCCESS': {
        draft.userId = action.payload.userId;
        draft.user = action.payload.user;
        draft.signed = true;
        draft.loading = false;
        draft.connecting = false;
        break;
      }

      case '@auth/SIGN_IN_FAILURE': {
        draft.userId = null;
        draft.user = {};
        draft.signed = false;
        draft.loading = false;
        draft.connecting = false;
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.userId = null;
        draft.user = {};
        draft.signed = false;
        draft.loading = false;
        draft.connecting = false;
        break;
      }

      default:
    }
  });
}
