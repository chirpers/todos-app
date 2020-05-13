import { resetReducer, makeDuck } from 'cooldux';
import client from '../lib/client';

const { apiFetch } = client;

const duck = makeDuck({
  browseTodos: () => apiFetch(`/todos`),
  addTodo: (body) => apiFetch('/todos', { method: 'POST', body }),
  delTodo: (_id) => apiFetch(`/todos/${_id}`, { method: 'DELETE'}),
  editTodo: (_id, body) => apiFetch(`/todos/${_id}`, { method: 'PUT', body}),
}, { namespace: 'todos', throwErrors: true });

export const { delTodoEnd, addTodoEnd, browseTodos, addTodo, delTodo, editTodo, initialStateCombined, reducerCombined } = duck;

const reducer = resetReducer(initialStateCombined, (state, action) => {
  state = reducerCombined(state, action);
  switch (action.type) {
    case addTodoEnd.type:
      if(state.browseTodos) {
        state.browseTodos.push(action.payload)
      }
      return { ...state };
    case delTodoEnd.type:
        if(state.browseTodos) {
          let remaining = [];
          state.browseTodos.forEach(t => {
            if(t._id !== action.payload._id) {
              remaining.push(t);
            }
          });;
          return { ...state, browseTodos: remaining };
        }
        return state;
    default:
      return state;
  }
});

export default reducer;
