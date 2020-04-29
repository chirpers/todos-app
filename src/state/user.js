import { resetReducer, makeDuck, promiseHandler } from 'cooldux';
import { apiFetch } from '../lib/fetch';

const { verifyEnd, verifyHandler, verifyReducer } = promiseHandler('verify', { namespace: 'user', throwErrors: true });

const duck = makeDuck({
  validate: (token) => apiFetch(`/users/validate/${token}`, { method: 'PUT' }),
  oauthStart: () => apiFetch('/users/oauth_start'),
  oauthLogin: (token) => apiFetch(`/users/oauth_token`, { method: 'POST', body: {token} }),
  logout: async () => apiFetch('/users/logout'),
}, { namespace: 'user', throwErrors: true });

const {
  initialStateCombined,
  reducerCombined,  
} = duck;

export function verify() {
  return (dispatch, getState) => {
    const { auth } = getState().user;
    const promise = auth ? Promise.resolve(auth) : apiFetch('/users/me');
    return verifyHandler(promise, dispatch);
  }
}

export const { oauthStart, oauthLogin, oauthLoginEnd, logout } = duck;

const reducer = resetReducer(initialStateCombined, (state, action) => {
  state = reducerCombined(state, action);
  state = verifyReducer(state, action);
  const { payload } = action;
  switch (action.type) {
    case verifyEnd.type:
      return { ...state, auth: payload };
    case oauthLoginEnd.type:
      return { ...state, auth: payload };
    default:
      return state;
  }
});

export default reducer;
