import { resetReducer, makeDuck } from 'cooldux';
import client from '../lib/client';

const duck = makeDuck({
  message: (body) => client.apiFetch('/message', { method: 'POST', body }),
}, { namespace: 'messages', throwErrors: true });

export const { message, initialStateCombined, reducerCombined } = duck;

const reducer = resetReducer(initialStateCombined, (state, action) => {
  return reducerCombined(state, action);
});

export default reducer;
